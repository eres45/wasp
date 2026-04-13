# Wasp Code Installation Script
# Downloads and installs the Wasp Code VS Code extension

$ErrorActionPreference = "Stop"

Write-Host "🚀 Wasp Code Installer" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host ""

# Check if VS Code is installed
Write-Host "Checking for VS Code..." -ForegroundColor Yellow
$vscodePath = Get-Command code -ErrorAction SilentlyContinue

if (-not $vscodePath) {
    Write-Host "❌ VS Code is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install VS Code from: https://code.visualstudio.com" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ VS Code found" -ForegroundColor Green
Write-Host ""

# Download the extension
Write-Host "Downloading Wasp Code extension..." -ForegroundColor Yellow
$downloadUrl = "https://github.com/eres45/wasp/releases/download/v1.0.0/wasp-code-1.0.0.vsix"
$tempFile = "$env:TEMP\wasp-code-1.0.0.vsix"

try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $tempFile -UseBasicParsing
    Write-Host "✅ Download complete" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to download extension" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install the extension
Write-Host "Installing extension..." -ForegroundColor Yellow
try {
    & code --install-extension $tempFile --force
    Write-Host "✅ Installation complete!" -ForegroundColor Green
} catch {
    Write-Host "❌ Installation failed" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

# Cleanup
Remove-Item $tempFile -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "🎉 Wasp Code is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Reload VS Code (Ctrl+R or restart)" -ForegroundColor White
Write-Host "2. Click the Wasp Code icon in the sidebar" -ForegroundColor White
Write-Host "3. Select an AI model and start chatting" -ForegroundColor White
Write-Host ""
Write-Host "No API keys needed - everything is configured!" -ForegroundColor Green
Write-Host ""
