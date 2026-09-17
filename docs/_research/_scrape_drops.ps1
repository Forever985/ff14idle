$ErrorActionPreference = 'Continue'
$rows = Import-Csv 'E:\deepseek harness\ff14-idle\docs\_research\_duties.csv'
$out = @()
$n = 0
foreach ($row in $rows) {
  $n++
  $url = "https://na.finalfantasyxiv.com$($row.Link)"
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 60
  } catch { Write-Host "FAIL $url"; continue }
  $c = $r.Content
  # max item level in treasure coffer / rewards
  $ms = [regex]::Matches($c, 'Item Lv\.\s*(\d+)')
  $mx = 0
  foreach ($m in $ms) { $v = [int]$m.Groups[1].Value; if ($v -gt $mx) { $mx = $v } }
  # requirement iLvl on page
  $req = [regex]::Match($c, '(?s)Average Item Level.*?db-view__data__value[^>]*>\s*([0-9]+)')
  $reqv = if ($req.Success) { $req.Groups[1].Value } else { '' }
  $pt = [regex]::Match($c, 'Party Size</h3>.*?([0-9]+)')
  $out += [pscustomobject]@{Cat=$row.Cat; Ver=$row.Ver; Name=$row.Name; ReqLevel=$row.ReqLevel; AvgIL=$row.AvgItemLevel; MaxDropIL=$mx; New=$row.New}
  Write-Host "$n/$($rows.Count)`t$($row.Name)`t$($row.AvgItemLevel)`t$mx"
  Start-Sleep -Milliseconds 120
}
$out | Export-Csv -Path 'E:\deepseek harness\ff14-idle\docs\_research\_duty_drops.csv' -NoTypeInformation -Encoding UTF8
Write-Host "DONE $($out.Count)"
