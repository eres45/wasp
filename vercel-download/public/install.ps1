# Wasp Code - One-Command Installation Script
# Usage: irm https://wasp-code.vercel.app/install.ps1 | iex

$ErrorActionPreference = "Continue"

Write-Host "Installing Wasp Code..." -ForegroundColor Cyan

# Check if VS Code is installed
Write-Host "Checking for VS Code..."
$vscodePath = Get-Command code -ErrorAction SilentlyContinue

if (-not $vscodePath) {
    # Try common installation paths
    $commonPaths = @(
        "C:\Program Files\Microsoft VS Code\bin\code.cmd",
        "C:\Program Files (x86)\Microsoft VS Code\bin\code.cmd",
        "$env:LOCALAPPDATA\Programs\Microsoft VS Code\bin\code.cmd"
    )
    
    $found = $false
    foreach ($path in $commonPaths) {
        if (Test-Path $path) {
            $vscodePath = $path
            $found = $true
            break
        }
    }
    
    if (-not $found) {
        Write-Host "ERROR: VS Code not found" -ForegroundColor Red
        Write-Host "Please install VS Code from https://code.visualstudio.com" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host "VS Code found" -ForegroundColor Green

# Create temp directory
$tempDir = Join-Path $env:TEMP "wasp-code-install"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

Write-Host "Downloading extension..."

# Download the latest release
$releaseUrl = "https://api.github.com/repos/eres45/wasp/releases/latest"

try {
    $release = Invoke-RestMethod -Uri $releaseUrl -ErrorAction Stop
    $vsixUrl = $release.assets | Where-Object { $_.name -like "*.vsix" } | Select-Object -First 1 -ExpandProperty browser_download_url
    
    if (-not $vsixUrl) {
        Write-Host "ERROR: Could not find extension file" -ForegroundColor Red
        exit 1
    }
    
    $vsixPath = Join-Path $tempDir "wasp-code.vsix"
    
    Write-Host "Downloading from GitHub..."
    Invoke-WebRequest -Uri $vsixUrl -OutFile $vsixPath -ErrorAction Stop
    
    Write-Host "Download complete" -ForegroundColor Green
    
    # Install the extension
    Write-Host "Installing extension..."
    
    if ($vscodePath -like "*.cmd") {
        & $vscodePath --install-extension $vsixPath --force
    } else {
        & code --install-extension $vsixPath --force
    }
    
    Write-Host "Installation complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Wasp Code installed successfully!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next: Restart VS Code and look for the Wasp Code icon" -ForegroundColor Yellow
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} finally {
    # Cleanup
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}
