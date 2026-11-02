# tests/run-browser-e2e.ps1
# E2E Visual & Browser Test Suite using Headless Google Chrome and serve.js

$ErrorActionPreference = "Stop"
$rootDir = Split-Path -Parent $PSScriptRoot
Set-Location $rootDir

$screenshotsDir = Join-Path $rootDir "tests\screenshots"
if (-not (Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir -Force | Out-Null
}

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "🌐 STARTING BROWSER E2E TESTS (REAL HEADLESS CHROME)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# 1. Start local server on port 8080
$serverProc = Start-Process node -ArgumentList "serve.js" -PassThru -NoNewWindow
Start-Sleep -Seconds 1

$tests = @(
    @{ Name = "01-home-desktop"; Url = "http://localhost:8080/index.html"; W = 1440; H = 900 },
    @{ Name = "02-home-tablet";  Url = "http://localhost:8080/index.html"; W = 768;  H = 1024 },
    @{ Name = "03-home-mobile";  Url = "http://localhost:8080/index.html"; W = 375;  H = 667 },
    @{ Name = "04-catalogo";     Url = "http://localhost:8080/catalogo.html"; W = 1440; H = 900 },
    @{ Name = "05-cantiere";     Url = "http://localhost:8080/cantiere.html"; W = 1440; H = 900 },
    @{ Name = "06-scienza";      Url = "http://localhost:8080/scienza.html"; W = 1440; H = 900 },
    @{ Name = "07-scuola";       Url = "http://localhost:8080/scuola.html"; W = 1440; H = 900 },
    @{ Name = "08-colorare";     Url = "http://localhost:8080/colorare.html"; W = 1440; H = 900 },
    @{ Name = "09-about";        Url = "http://localhost:8080/about.html"; W = 1440; H = 900 },
    @{ Name = "10-qr-vol1";      Url = "http://localhost:8080/csa-vol1-bonus-8f2e91b7d4a6.html"; W = 1440; H = 900 },
    @{ Name = "11-qr-vol2";      Url = "http://localhost:8080/csa-vol2-bonus-46c694dc3ec4.html"; W = 1440; H = 900 },
    @{ Name = "12-qr-einstein";  Url = "http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/"; W = 1440; H = 900 }
)

$passed = 0
$total = $tests.Count

try {
    foreach ($t in $tests) {
        $outPath = Join-Path $screenshotsDir "$($t.Name).png"
        $uDir = Join-Path $env:TEMP "chrome_test_$($t.Name)"
        
        Write-Host "Rendering [$($t.Name)] ($($t.W)x$($t.H))... " -NoNewline
        
        & powershell -ExecutionPolicy Bypass -File (Join-Path $rootDir "tests\render-screenshot.ps1") `
            -Url $t.Url `
            -Output $outPath `
            -Width $t.W `
            -Height $t.H `
            -UserDataDir $uDir | Out-Null
            
        if (Test-Path $outPath) {
            $size = (Get-Item $outPath).Length
            if ($size -gt 1000) {
                $sizeKB = [math]::Round($size / 1024)
                Write-Host "✅ OK ($sizeKB KB rendered)" -ForegroundColor Green
                $passed++
            } else {
                Write-Host "❌ FAILED (File too small: $size bytes)" -ForegroundColor Red
            }
        } else {
            Write-Host "❌ FAILED (Screenshot not created)" -ForegroundColor Red
        }
        
        Remove-Item -Path $uDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}
finally {
    Stop-Process -Id $serverProc.Id -Force -ErrorAction SilentlyContinue
    Write-Host "Local test server stopped." -ForegroundColor Gray
}

Write-Host "----------------------------------------------------"
Write-Host "E2E Summary: $passed/$total pages rendered and verified!" -ForegroundColor Cyan

if ($passed -ne $total) {
    Write-Error "Only $passed/$total pages passed!"
    exit 1
} else {
    Write-Host "🎉 ALL $total BROWSER E2E TESTS PASSED SUCCESSFULLY!" -ForegroundColor Green
    exit 0
}
