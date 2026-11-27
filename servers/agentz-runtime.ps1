# iFINITY AgentZ: resolves the links in one candidate runtime's path for
# servers/agentz-mcp.cmd. The .cmd applies the runtime-trust policy itself
# (src/config/runtime-trust.ts) and calls this only when a candidate's path
# holds a link (a symbolic link or junction, as nvm-windows' Program Files\nodejs
# is), since cmd.exe cannot read a link's target. Prints the canonical path, or
# nothing when it cannot be resolved. It runs nothing else.
param([string]$Candidate)

$ErrorActionPreference = 'Stop'

# The path with every link in it resolved, or $null when it does not exist.
function Resolve-Canonical([string]$Path) {
  try { $current = [System.IO.Path]::GetFullPath($Path) } catch { return $null }
  for ($hop = 0; $hop -lt 40; $hop++) {
    $root = [System.IO.Path]::GetPathRoot($current)
    if (-not $root) { return $null }
    $parts = $current.Substring($root.Length).Split([char]'\', [System.StringSplitOptions]::RemoveEmptyEntries)
    $built = $root
    $relinked = $false
    for ($i = 0; $i -lt $parts.Length; $i++) {
      $built = [System.IO.Path]::Combine($built, $parts[$i])
      if (-not (Test-Path -LiteralPath $built)) { return $null }
      $item = Get-Item -LiteralPath $built -Force
      if ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint) {
        $target = @($item.Target)[0]
        if (-not $target) { continue }
        if (-not [System.IO.Path]::IsPathRooted($target)) { $target = [System.IO.Path]::Combine((Split-Path -Parent $built), $target) }
        $next = $target
        if ($i + 1 -lt $parts.Length) { foreach ($part in $parts[($i + 1)..($parts.Length - 1)]) { $next = [System.IO.Path]::Combine($next, $part) } }
        $current = [System.IO.Path]::GetFullPath($next)
        $relinked = $true
        break
      }
    }
    if (-not $relinked) { return $built }
  }
  return $null
}

if (-not $Candidate) { exit 0 }
$canon = Resolve-Canonical $Candidate
if ($canon) { [Console]::Out.WriteLine($canon) }
exit 0
