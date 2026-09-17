# Test runner with a self-contained preview server lifecycle.
#
# Why: background jobs get reclaimed at round/session boundaries, which caused
# the "server unexpectedly closed" problem. This script starts the preview
# server, runs the requested suites, then kills the server -- all in one command.
#
# Usage:
#   powershell -File tools/run-tests.ps1 -All
#   powershell -File tools/run-tests.ps1 -Tests smoke_test,cadence_test
#
# NOTE: ASCII-only on purpose. Windows PowerShell 5.1 reads BOM-less .ps1 files
# as ANSI/GBK, which corrupts non-ASCII text and breaks parsing.
param(
  [string[]]$Tests = @(),
  [switch]$All,
  [int]$Port = 4173,
  [switch]$NoBuild,
  [int]$SuiteTimeoutSec = 180
)

$ErrorActionPreference = 'Stop'
$env:PATH = 'C:\Users\18405\AppData\Local\nvm\v22.12.0;' + $env:PATH
# Make Python's UTF-8 output readable in the console
try {
  [Console]::OutputEncoding = [Text.Encoding]::UTF8
  $OutputEncoding = [Text.Encoding]::UTF8
} catch { }
$appDir = Split-Path -Parent $PSScriptRoot
Set-Location $appDir

$py = 'C:\Users\18405\AppData\Local\Programs\Python\Python310\python.exe'
$suites = @('smoke_test', 'cadence_test', 'trial_test', 'mastery_test', 'relic_test', 'facility_test', 'tower_test', 'ui_flow_test', 'ui_shot', 'singlefile_test', 'pages_test', 'balance_test')
# Accept both "-Tests a,b" (single string) and "-Tests a b" (array)
$Tests = @($Tests | ForEach-Object { $_ -split ',' } | Where-Object { $_ -ne '' })
if ($All -or $Tests.Count -eq 0) { $Tests = $suites }

# --- Build freshness gate -------------------------------------------------
# Why: `vite preview` and the single-file test serve *pre-built* artifacts.
# Without this, editing src/ and running the suite happily verifies the OLD
# bundle and reports ALL PASS -- a false green. So: if src/ is newer than the
# build output, rebuild first.
$distFiles = @('dist\index.html', 'dist-single\index.html')
# NOTE: keep the recursive scan limited to src/. Passing file paths alongside a
# directory to `Get-ChildItem -Recurse` also walks *their* parent directory,
# which dragged dist/ into the "newest source" set and made the gate report
# "stale" on every single run.
$newestSrc = Get-ChildItem -Path 'src' -Recurse -File -ErrorAction SilentlyContinue |
  Sort-Object LastWriteTime -Descending | Select-Object -First 1
foreach ($extra in @('index.html', 'vite.config.ts', 'vite.config.single.ts')) {
  if (Test-Path $extra) {
    $f = Get-Item $extra
    if (-not $newestSrc -or $f.LastWriteTime -gt $newestSrc.LastWriteTime) { $newestSrc = $f }
  }
}
$stale = $false
if (-not $newestSrc) { $stale = $true }
foreach ($f in $distFiles) {
  if (-not (Test-Path $f)) { $stale = $true; continue }
  if ($newestSrc -and (Get-Item $f).LastWriteTime -lt $newestSrc.LastWriteTime) { $stale = $true }
}
if ($NoBuild) {
  Write-Output "build: skipped (-NoBuild); testing existing artifacts"
} elseif (-not $stale) {
  Write-Output "build: up to date"
} else {
  Write-Output "build: stale or missing -> rebuilding (npx.cmd vite build x2)"
  & npx.cmd vite build 2>&1 | Select-Object -Last 3 | ForEach-Object { "  $_" }
  if ($LASTEXITCODE -ne 0) { Write-Output "RESULT: BUILD FAILED"; exit 1 }
  & npx.cmd vite build --config vite.config.single.ts 2>&1 | Select-Object -Last 3 | ForEach-Object { "  $_" }
  if ($LASTEXITCODE -ne 0) { Write-Output "RESULT: BUILD FAILED"; exit 1 }
}

$server = Start-Process -FilePath 'npx.cmd' `
  -ArgumentList @('vite', 'preview', '--port', "$Port", '--host', '127.0.0.1') `
  -PassThru -WindowStyle Hidden

$ready = $false
for ($i = 0; $i -lt 24; $i++) {
  Start-Sleep -Milliseconds 500
  try {
    $r = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/" -UseBasicParsing -TimeoutSec 2
    if ($r.StatusCode -eq 200) { $ready = $true; break }
  } catch { }
}
Write-Output "preview server http://127.0.0.1:$Port/ ready=$ready"

$results = @()
$anyFail = $false
try {
  foreach ($t in $Tests) {
    Write-Output ""
    Write-Output ("########## {0} ##########" -f $t)

    # Per-suite timeout. Why: a browser-driven suite can deadlock (Playwright
    # waiting on a browser that never comes back). Without a timeout the runner
    # waits *forever* -- a hung suite is worse than a failing one, because no
    # verdict ever arrives. Timeout => exit code 124 => TIMEOUT verdict.
    #
    # NOTE: this uses the .NET Process API, not `Start-Process -PassThru`.
    # Start-Process with redirection returns a Process object whose ExitCode
    # stays $null even after WaitForExit(), which made every suite read as
    # "CRASH(exit )". The .NET API returns real codes and decodes UTF-8 itself.
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $py
    $psi.Arguments = "tools/$t.py"
    $psi.WorkingDirectory = $appDir
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.UseShellExecute = $false
    $psi.StandardOutputEncoding = [Text.Encoding]::UTF8
    $psi.StandardErrorEncoding = [Text.Encoding]::UTF8
    $proc = [System.Diagnostics.Process]::Start($psi)
    $stdoutTask = $proc.StandardOutput.ReadToEndAsync()
    $stderrTask = $proc.StandardError.ReadToEndAsync()
    $finished = $proc.WaitForExit($SuiteTimeoutSec * 1000)
    if (-not $finished) {
      & taskkill.exe /PID $proc.Id /T /F 2>&1 | Out-Null
      $code = 124
    } else {
      $code = $proc.ExitCode
    }
    $out = @()
    if ($stdoutTask.Result) { $out += $stdoutTask.Result -split "`r?`n" }
    if ($stderrTask.Result) { $out += $stderrTask.Result -split "`r?`n" }
    $proc.Dispose()
    $out | Select-Object -Last 6 | ForEach-Object { "  $_" }

    # 判定方式必须是「退出码 + 文本」双保险：
    # 曾经只 grep 'FAIL:'，结果**崩溃的套件被误判为通过**——
    # 脚本崩了就打不出汇总行，自然也就没有 'FAIL:' 可匹配。
    $failed = ($out | Select-String -Pattern '^\s*FAIL\s' | Measure-Object).Count
    $crashed = ($code -ne 0) -and ($failed -eq 0)
    $status = if (-not $finished) { "TIMEOUT(${SuiteTimeoutSec}s)" } `
      elseif ($code -eq 0 -and $failed -eq 0) { 'PASS' } `
      elseif ($crashed) { "CRASH(exit $code)" } `
      else { "FAIL($failed)" }
    if ($status -ne 'PASS') { $anyFail = $true }
    $results += [pscustomobject]@{ Suite = $t; Summary = $status }
  }
} finally {
  if ($server -and -not $server.HasExited) {
    & taskkill.exe /PID $server.Id /T /F 2>&1 | Out-Null
  }
  # 只清 Playwright 起的临时 profile 浏览器（命令行里带 playwright_chromiumdev）。
  # 绝不按进程名杀 chrome.exe —— 那会连带杀掉用户自己开着的 Chrome。
  $stray = Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -like '*playwright_chromiumdev*' }
  if ($stray) {
    $stray | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
    Write-Output "cleaned up $($stray.Count) stray Playwright browser(s)"
  }
}

Write-Output ""
Write-Output "==================== SUMMARY ===================="
$results | ForEach-Object { "  {0,-20} {1}" -f $_.Suite, $_.Summary }
Write-Output ""
if ($anyFail) {
  Write-Output "RESULT: FAILED"
  exit 1
}
Write-Output "RESULT: ALL PASS"
exit 0
