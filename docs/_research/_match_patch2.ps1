$ErrorActionPreference='Continue'
$dir = 'E:\deepseek harness\ff14-idle\docs\_research\_patchnotes'
$idx = Import-Csv 'E:\deepseek harness\ff14-idle\docs\_research\_patch_index.csv'
function PV($p) { $m=[regex]::Match($p,'^(\d+)\.(\d+)'); return [double]"$($m.Groups[1].Value).$($m.Groups[2].Value)" }
$idx = $idx | Sort-Object { PV $_.Patch }
$texts = @{}
foreach ($p in $idx) { $f = Join-Path $dir "$($p.Patch).txt"; if (Test-Path $f) { $texts[$p.Patch] = [System.IO.File]::ReadAllText($f,[System.Text.Encoding]::UTF8) } }
$order = @($idx | ForEach-Object { $_.Patch })

$duties = Import-Csv 'E:\deepseek harness\ff14-idle\docs\_research\_duties.csv'
$res = @()
foreach ($d in $duties) {
  $name = $d.Name -replace '<[^>]+>',''
  $strong = ''; $weak = ''
  foreach ($p in $order) {
    if (-not $texts.ContainsKey($p)) { continue }
    $t = $texts[$p]
    $pos = $t.IndexOf($name)
    if ($pos -lt 0) { continue }
    if ($weak -eq '') { $weak = $p }
    $hit = $false
    $scan = 0
    while ($pos -ge 0 -and $scan -lt 12) {
      $a = [Math]::Max(0, $pos-450); $b = [Math]::Min($t.Length, $pos + $name.Length + 450)
      $ctx = $t.Substring($a, $b-$a)
      if ($ctx -match 'been added|have been added|has been added') { $hit = $true; break }
      $pos = $t.IndexOf($name, $pos+1); $scan++
    }
    if ($hit) { $strong = $p; break }
  }
  $final = if ($strong -ne '') { $strong } else { $weak }
  $res += [pscustomobject]@{Cat=$d.Cat; Name=$name; Patch=$final; Strong=$strong; Weak=$weak; ReqLevel=$d.ReqLevel; AvgIL=$d.AvgItemLevel}
}
$res | Export-Csv 'E:\deepseek harness\ff14-idle\docs\_research\_duty_patch2.csv' -NoTypeInformation -Encoding UTF8
$res | ForEach-Object { "$($_.Cat)`t$($_.Patch)`t(s=$($_.Strong))`t$($_.ReqLevel)`t$($_.AvgIL)`t$($_.Name)" }
"=== UNREAL MENTIONS ==="
foreach ($p in $order) {
  if (-not $texts.ContainsKey($p)) { continue }
  $t = $texts[$p]
  $ms = [regex]::Matches($t, '([A-Z][^.]{0,90}?\(Unreal\))')
  foreach ($m in $ms) { "$p`t$($m.Groups[1].Value.Trim())" }
}
"=== ULTIMATE MENTIONS ==="
foreach ($p in $order) {
  if (-not $texts.ContainsKey($p)) { continue }
  $t = $texts[$p]
  $ms = [regex]::Matches($t, '([A-Z][^.]{0,90}?\(Ultimate\))')
  foreach ($m in $ms) { "$p`t$($m.Groups[1].Value.Trim())" }
}
