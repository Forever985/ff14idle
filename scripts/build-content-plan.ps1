# Enrich the raw Lodestone duty data into a game-ready content plan.
# Input : data/duties.csv, data/dungeons.csv
# Output: data/content-plan.csv
# ASCII-only source: Windows PowerShell 5.1 reads BOM-less .ps1 as ANSI.

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
if (-not $root) { $root = 'E:\deepseek harness\ff14-idle' }
$dataDir = Join-Path $root 'data'

$expansion = @{
  '0' = @{ Chapter = 1; Name = 'ARR (2.0)' }
  '1' = @{ Chapter = 2; Name = 'Heavensward (3.0)' }
  '2' = @{ Chapter = 3; Name = 'Stormblood (4.0)' }
  '3' = @{ Chapter = 4; Name = 'Shadowbringers (5.0)' }
  '4' = @{ Chapter = 5; Name = 'Endwalker (6.0)' }
  '5' = @{ Chapter = 6; Name = 'Dawntrail (7.0)' }
}

# 24-player Alliance Raids are named without a common pattern, so they are listed explicitly.
# Each expansion carries exactly one 3-part Alliance Raid series.
$allianceRaids = @(
  # ARR - Crystal Tower
  'The Labyrinth of the Ancients', 'Syrcus Tower', 'The World of Darkness',
  # HW - Mhach
  'The Void Ark', 'The Weeping City of Mhach', 'Dun Scaith',
  # SB - Ivalice
  'The Royal City of Rabanastre', 'The Ridorana Lighthouse', 'The Orbonne Monastery',
  # ShB - YoRHa: Dark Apocalypse
  'The Copied Factory', "The Puppets' Bunker", "The Tower at Paradigm's Breach",
  # EW - Myths of the Realm
  'Aglaia', 'Euphrosyne', 'Thaleia',
  # DT - FFXI crossover trilogy
  'Jeuno: The First Walk', "San d'Oria: The Second Walk", 'Windurst: The Third Walk'
)

function Get-Tier([string]$cat, [string]$name) {
  if ($cat -eq 'Ultimate') { return 'Ultimate' }
  if ($cat -eq 'Trials') {
    if ($name -like '*Extreme*') { return 'Trial-Extreme' }
    if ($name -like '*Unreal*')  { return 'Trial-Unreal' }
    return 'Trial-Normal'
  }
  if ($cat -eq 'Raids') {
    if ($name -like '*Savage*') { return 'Raid-Savage' }
    if ($allianceRaids -contains $name) { return 'Alliance-Raid' }
    return 'Raid-Normal'
  }
  return 'Unknown'
}

$rows = @()

foreach ($d in (Import-Csv (Join-Path $dataDir 'duties.csv') -Encoding UTF8)) {
  $exp = $expansion[$d.Ver]
  $rows += [pscustomobject]@{
    Chapter    = $exp.Chapter
    Expansion  = $exp.Name
    Kind       = 'Duty'
    Category   = $d.Cat
    Tier       = Get-Tier $d.Cat $d.Name
    Name       = $d.Name
    ReqLevel   = [int]$d.ReqLevel
    ItemLevel  = if ($d.AvgItemLevel -match '^\d+$') { [int]$d.AvgItemLevel } else { $null }
    Link       = "https://na.finalfantasyxiv.com$($d.Link)"
  }
}

foreach ($d in (Import-Csv (Join-Path $dataDir 'dungeons.csv') -Encoding UTF8)) {
  $exp = $expansion[$d.Ver]
  $rows += [pscustomobject]@{
    Chapter    = $exp.Chapter
    Expansion  = $exp.Name
    Kind       = 'Dungeon'
    Category   = 'Dungeon'
    Tier       = 'Dungeon'
    Name       = $d.Name
    ReqLevel   = [int]$d.ReqLevel
    ItemLevel  = if ($d.AvgItemLevel -match '^\d+$') { [int]$d.AvgItemLevel } else { $null }
    Link       = "https://na.finalfantasyxiv.com$($d.Link)"
  }
}

$rows = $rows | Sort-Object Chapter, Tier, ItemLevel, ReqLevel, Name
$out = Join-Path $dataDir 'content-plan.csv'
$rows | Export-Csv -Path $out -NoTypeInformation -Encoding UTF8

Write-Output "written: $out"
Write-Output "total rows: $($rows.Count)"
Write-Output ""
Write-Output "=== by Chapter x Tier ==="
$rows | Group-Object Chapter, Tier | Sort-Object Name | ForEach-Object {
  $p = $_.Name -split ', '
  "  ch{0}  {1,-16} {2,4}" -f $p[0], $p[1], $_.Count
}
Write-Output ""
Write-Output "=== iLvl band per chapter (dungeons only) ==="
foreach ($ch in 1..6) {
  $il = $rows | Where-Object { $_.Chapter -eq $ch -and $_.Tier -eq 'Dungeon' -and $_.ItemLevel } | ForEach-Object { $_.ItemLevel }
  if ($il) {
    "  ch{0}  n={1,3}  iLvl {2}-{3}" -f $ch, $il.Count, ($il | Measure-Object -Minimum).Minimum, ($il | Measure-Object -Maximum).Maximum
  }
}
