# Scrape the official FFXIV job list from na.finalfantasyxiv.com/jobguide/
# Output: data/jobs.csv  (Role, Section, JobKey, Name, Url)
# ASCII-only source: Windows PowerShell 5.1 reads BOM-less .ps1 as ANSI.

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
if (-not $root) { $root = 'E:\deepseek harness\ff14-idle' }
$outDir = Join-Path $root 'data'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$url = 'https://na.finalfantasyxiv.com/jobguide/battle/'
$tmp = New-TemporaryFile
curl.exe -s --max-time 60 -o $tmp $url
$html = [IO.File]::ReadAllText($tmp)
Remove-Item $tmp -Force
Write-Output "fetched bytes: $($html.Length)"

$fallback = @{
  'tank'    = 'Tank'
  'healer'  = 'Healer'
  'dps'     = 'Melee DPS'
  'dpsr'    = 'Physical Ranged DPS'
  'dpsc'    = 'Magical Ranged DPS'
  'limited' = 'Limited Job'
}

# The official page lumps every DPS job under a single "DPS" section, while the game
# itself groups jobs as Melee / Physical Ranged / Magical Ranged DPS (Character window).
# Sub-roles below follow that in-game grouping.
$subRole = @{
  'monk'        = 'Melee DPS'
  'dragoon'     = 'Melee DPS'
  'ninja'       = 'Melee DPS'
  'samurai'     = 'Melee DPS'
  'reaper'      = 'Melee DPS'
  'viper'       = 'Melee DPS'
  'beastmaster' = 'Melee DPS'
  'bard'        = 'Physical Ranged DPS'
  'machinist'   = 'Physical Ranged DPS'
  'dancer'      = 'Physical Ranged DPS'
  'blackmage'   = 'Magical Ranged DPS'
  'summoner'    = 'Magical Ranged DPS'
  'redmage'     = 'Magical Ranged DPS'
  'pictomancer' = 'Magical Ranged DPS'
  'bluemage'    = 'Magical Ranged DPS'
}

# 1) every role section marker with its offset + h2 label
$sections = @()
foreach ($m in [regex]::Matches($html, '(?s)<div class="jobguide__index__joblink--([a-z]+)">\s*(<h2.*?</h2>)?')) {
    $key = $m.Groups[1].Value
    $label = if ($m.Groups[2].Success) { ($m.Groups[2].Value -replace '<[^>]+>', ' ' -replace '\s+', ' ').Trim() } else { '' }
    if (-not $label) { $label = $fallback[$key] }
    $sections += [pscustomobject]@{ Key = $key; Label = $label; Index = $m.Index }
}
Write-Output "role sections: $($sections.Count)"
$sections | ForEach-Object { "  {0,-8} {1,-24} @{2}" -f $_.Key, $_.Label, $_.Index }

# 2) every job link with its offset
$jobs = @()
foreach ($m in [regex]::Matches($html, '(?s)<li>\s*<a href="/jobguide/([a-z]+)/">\s*<img[^>]*>\s*([^<\r\n]+)')) {
    $jobs += [pscustomobject]@{
        JobKey = $m.Groups[1].Value
        Name   = ($m.Groups[2].Value -replace '\s+', ' ').Trim()
        Index  = $m.Index
    }
}
Write-Output "job links: $($jobs.Count)"

# 3) assign each job to the nearest preceding role section
$rows = foreach ($j in $jobs) {
    $sec = $sections | Where-Object { $_.Index -lt $j.Index } | Sort-Object Index | Select-Object -Last 1
    $baseRole = if ($sec) { $sec.Label } else { 'Unknown' }
    $role = if ($subRole.ContainsKey($j.JobKey)) { $subRole[$j.JobKey] } else { $baseRole }
    [pscustomobject]@{
        Role      = $role
        RoleGroup = $baseRole
        Section   = if ($sec) { $sec.Key } else { '' }
        JobKey    = $j.JobKey
        Name      = $j.Name
        Limited   = ($j.Name -like '*Limited Job*')
        Url       = "https://na.finalfantasyxiv.com/jobguide/$($j.JobKey)/"
    }
}
$rows = $rows | Sort-Object RoleGroup, Role, Name

$csv = Join-Path $outDir 'jobs.csv'
$rows | Export-Csv -Path $csv -NoTypeInformation -Encoding UTF8

Write-Output ""
Write-Output "=== parsed: $($rows.Count) jobs ==="
$rows | Format-Table Role, JobKey, Name, Limited -AutoSize
Write-Output "written: $csv"
