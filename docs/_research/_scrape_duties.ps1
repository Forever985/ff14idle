$ErrorActionPreference = 'Continue'
$out = @()
$cats = @(
  @{n='Trials';   c=4;  vers=@(0,1,2,3,4,5)},
  @{n='Raids';    c=5;  vers=@(0,1,2,3,4,5)},
  @{n='Ultimate'; c=28; vers=@(2,3,4,5)},
  @{n='Chaotic';  c=37; vers=@(0)}
)
foreach ($cat in $cats) {
  foreach ($v in $cat.vers) {
    $url = "https://na.finalfantasyxiv.com/lodestone/playguide/db/duty/?category2=$($cat.c)&ex_version=$v"
    try {
      $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 60
    } catch { Write-Host "FAIL $url"; continue }
    $c = $r.Content
    $i = $c.IndexOf('<table class="db-table">')
    if ($i -lt 0) { Write-Host "NOTABLE $url"; continue }
    $j = $c.IndexOf('</table>', $i)
    $tbl = $c.Substring($i, $j-$i)
    $rows = [regex]::Matches($tbl, '(?s)<tr>(.*?)</tr>')
    foreach ($row in $rows) {
      $h = $row.Groups[1].Value
      $m = [regex]::Match($h, 'class="db_popup db-table__txt--detail_link">(.*?)</a>')
      if (-not $m.Success) { continue }
      $name = $m.Groups[1].Value
      $link = [regex]::Match($h, 'href="(/lodestone/playguide/db/duty/[^"]+)"').Groups[1].Value
      $lvls = [regex]::Matches($h, 'db-table__body--center">(.*?)</td>')
      $lvl = if ($lvls.Count -ge 1) { $lvls[0].Groups[1].Value } else { '' }
      $ilvl = if ($lvls.Count -ge 2) { $lvls[1].Groups[1].Value } else { '' }
      $new = if ($h -match 'latest_patch__major__icon') { 'NEW' } else { '' }
      $out += [pscustomobject]@{Cat=$cat.n; Ver=$v; Name=$name; ReqLevel=$lvl; AvgItemLevel=$ilvl; New=$new; Link=$link}
      Write-Host "$($cat.n)`t$v`t$name`t$lvl`t$ilvl`t$new`t$link"
    }
  }
}
$out | Export-Csv -Path 'E:\deepseek harness\ff14-idle\docs\_research\_duties.csv' -NoTypeInformation -Encoding UTF8
Write-Host "TOTAL $($out.Count)"
