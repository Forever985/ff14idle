$ErrorActionPreference='Continue'
$dir = 'E:\deepseek harness\ff14-idle\docs\_research\_patchnotes'
$idx = Import-Csv 'E:\deepseek harness\ff14-idle\docs\_research\_patch_index.csv'
# build ordered list by patch sequence
function PV($p) { $m=[regex]::Match($p,'^(\d+)\.(\d+)'); return [double]"$($m.Groups[1].Value).$($m.Groups[2].Value)" }
$idx = $idx | Sort-Object { PV $_.Patch }
$duties = Import-Csv 'E:\deepseek harness\ff14-idle\docs\_research\_duties.csv'
$res = @()
foreach ($d in $duties) {
  $name = $d.Name -replace '<[^>]+>',''
  $found = ''
  foreach ($p in $idx) {
    $f = Join-Path $dir "$($p.Patch).txt"
    if (-not (Test-Path $f)) { continue }
    $t = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
    if ($t -like "*$name*") { $found = $p.Patch; break }
  }
  $res += [pscustomobject]@{Cat=$d.Cat; Name=$name; FirstPatch=$found; ReqLevel=$d.ReqLevel; AvgIL=$d.AvgItemLevel}
}
$res | Export-Csv 'E:\deepseek harness\ff14-idle\docs\_research\_duty_patch.csv' -NoTypeInformation -Encoding UTF8
$res | ForEach-Object { "$($_.Cat)`t$($_.FirstPatch)`t$($_.ReqLevel)`t$($_.AvgIL)`t$($_.Name)" }
"MISSING: " + (($res | Where-Object { $_.FirstPatch -eq '' }).Count)
