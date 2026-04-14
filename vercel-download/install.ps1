# Wasp Code Installer
# Downloads and installs the Wasp Code VS Code extension

$ErrorActionPreference = "Stop"

Write-Host "🚀 Wasp Code Installer" -ForegroundColor Cyan
Write-Host ""

# Check if VS Code is installed
Write-Host "Checking for VS Code..." -ForegroundColor Yellow
$vscodePath = Get-Command code -ErrorAction SilentlyContinue

if (-not $vscodePath) {
    Write-Host "❌ VS Code not found!" -ForegroundColor Red
    Write-Host "Please install VS Code from https://code.visualstudio.com" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ VS Code found" -ForegroundColor Green
Write-Host ""

# Download the extension
Write-Host "📥 Downloading Wasp Code extension..." -ForegroundColor Yellow

$tempDir = [System.IO.Path]::GetTempPath()
$vsixPath = Join-Path $tempDir "wasp-code.vsix"

try {
    # Get the latest release from GitHub
    $releaseUrl = "https://api.github.com/repos/eres45/wasp/releases/latest"
    $release = Invoke-RestMethod -Uri $releaseUrl -ErrorAction Stop
    
    # Find the .vsix asset
    $vsixAsset = $release.assets | Where-Object { $_.name -like "*.vsix" } | Select-Object -First 1
    
    if (-not $vsixAsset) {
        Write-Host "❌ No .vsix file found in latest release" -ForegroundColor Red
        exit 1
    }
    
    # Download the .vsix file
    Invoke-WebRequest -Uri $vsixAsset.browser_download_url -OutFile $vsixPath -ErrorAction Stop
    Write-Host "✅ Downloaded: $($vsixAsset.name)" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Download failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install the extension
Write-Host "📦 Installing extension..." -ForegroundColor Yellow

try {
    & code --install-extension $vsixPath --force
    Write-Host "✅ Installation complete!" -ForegroundColor Green
} catch {
    Write-Host "❌ Installation failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Wasp Code is ready to use!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart VS Code" -ForegroundColor White
Write-Host "2. Look for the Wasp Code icon in the activity bar" -ForegroundColor White
Write-Host "3. Configure your AI models in settings" -ForegroundColor White
Write-Host ""
Write-Host "Documentation: https://github.com/eres45/wasp" -ForegroundColor Cyan

# Cleanup
Remove-Item $vsixPath -Force -ErrorAction SilentlyContinue
