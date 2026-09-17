$ErrorActionPreference = 'Continue'
$dir = 'E:\deepseek harness\ff14-idle\docs\_research\_patchnotes'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$r = Invoke-WebRequest -Uri "https://na.finalfantasyxiv.com/lodestone/special/patchnote_log/" -UseBasicParsing -TimeoutSec 60
$c = $r.Content
$ms = [regex]::Matches($c, '(?s)<a href="(/lodestone/topics/detail/[^"]+)"[^>]*>(Patch [0-9]+[0-9a-z]*[^<]*)</a>')
"links=$($ms.Count)"
$index = @()
foreach ($m in $ms) {
  $url = "https://na.finalfantasyxiv.com$($m.Groups[1].Value)"
  $title = $m.Groups[2].Value.Trim()
  if ($title -notmatch '^Patch\s+([0-9]+(?:\.[0-9]+[a-z]?)?)\s+Notes$') { continue }
  $patch = $Matches[1]
  try { $rr = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 60 } catch { Write-Host "FAIL $patch"; continue }
  $h = $rr.Content
  # header datetime id
  $hid = [regex]::Match($h, 'news__ic--topics">\s*<span id="(datetime-[^"]+)"')
  $date = ''
  if ($hid.Success) {
    $sid = $hid.Groups[1].Value
    $dm = [regex]::Match($h, "getElementById\('" + [regex]::Escape($sid) + "'\)\.innerHTML = ldst_strftime\((\d+),")
    if ($dm.Success) {
      $date = ([datetimeoffset]::FromUnixTimeSeconds([long]$dm.Groups[1].Value)).UtcDateTime.ToString('yyyy-MM-dd')
    }
  }
  $txt = $h -replace '(?s)<script.*?</script>', ' ' -replace '(?s)<style.*?</style>', ' ' -replace '<[^>]+>', ' '
  $txt = [System.Net.WebUtility]::HtmlDecode($txt) -replace '\s+', ' '
  Set-Content -Path "$dir\$patch.txt" -Value $txt -Encoding UTF8
  $index += [pscustomobject]@{Patch=$patch; Date=$date; Url=$url}
  Write-Host "$patch`t$date`tlen=$($txt.Length)"
  Start-Sleep -Milliseconds 80
}
$index | Sort-Object { [double]($_.Patch -replace '[a-z]$','') } | Export-Csv -Path 'E:\deepseek harness\ff14-idle\docs\_research\_patch_index.csv' -NoTypeInformation -Encoding UTF8
Write-Host "DONE $($index.Count)"
