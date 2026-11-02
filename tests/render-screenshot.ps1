param(
    [Parameter(Mandatory=$true)][string]$Url,
    [Parameter(Mandatory=$true)][string]$Output,
    [Parameter(Mandatory=$true)][int]$Width,
    [Parameter(Mandatory=$true)][int]$Height,
    [Parameter(Mandatory=$true)][string]$UserDataDir
)

$chromePath = "C:\Users\Marco\AppData\Local\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chromePath)) {
    Write-Error "Chrome not found at $chromePath"
    exit 1
}

$resolvedOutput = [System.IO.Path]::GetFullPath($Output)
$outDir = [System.IO.Path]::GetDirectoryName($resolvedOutput)
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$argList = @(
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--window-size=$Width,$Height",
    "--user-data-dir=$UserDataDir",
    "--screenshot=$resolvedOutput",
    $Url
)

$proc = Start-Process -FilePath $chromePath -ArgumentList $argList -PassThru -NoNewWindow
$proc.WaitForExit(10000)

if (Test-Path $resolvedOutput) {
    exit 0
} else {
    exit 1
}
