# Wasp Code - One-Command Installation Script
# Usage: irm https://raw.githubusercontent.com/eres45/wasp/main/install.ps1 | iex

Write-Host "🚀 Installing Wasp Code..." -ForegroundColor Cyan

# Check if VS Code is installed
$vscodePath = Get-Command code -ErrorAction SilentlyContinue
if (-not $vscodePath) {
    Write-Host "❌ VS Code is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install VS Code from https://code.visualstudio.com" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ VS Code found" -ForegroundColor Green

# Create temp directory
$tempDir = Join-Path $env:TEMP "wasp-code-install"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "📥 Downloading Wasp Code extension..." -ForegroundColor Cyan

# Download the latest release
$releaseUrl = "https://api.github.com/repos/eres45/wasp/releases/latest"
try {
    $release = Invoke-RestMethod -Uri $releaseUrl -ErrorAction Stop
    $vsixUrl = $release.assets | Where-Object { $_.name -like "*.vsix" } | Select-Object -First 1 -ExpandProperty browser_download_url
    
    if (-not $vsixUrl) {
        Write-Host "❌ Could not find extension file in release" -ForegroundColor Red
        exit 1
    }
    
    $vsixPath = Join-Path $tempDir "wasp-code.vsix"
    Write-Host "Downloading from: $vsixUrl" -ForegroundColor Gray
    
    Invoke-WebRequest -Uri $vsixUrl -OutFile $vsixPath -ErrorAction Stop
    
    Write-Host "✅ Download complete" -ForegroundColor Green
    
    # Install the extension
    Write-Host "📦 Installing extension..." -ForegroundColor Cyan
    & code --install-extension $vsixPath --force
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Installation successful!" -ForegroundColor Green
        Write-Host "" -ForegroundColor White
        Write-Host "🎉 Wasp Code is now installed!" -ForegroundColor Cyan
        Write-Host "" -ForegroundColor White
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Restart VS Code" -ForegroundColor White
        Write-Host "2. Look for the Wasp Code icon in the Activity Bar" -ForegroundColor White
        Write-Host "3. Get a free API key from https://api.frenix.sh" -ForegroundColor White
        Write-Host "4. Configure your models in Wasp Code settings" -ForegroundColor White
        Write-Host "5. Start coding with AI!" -ForegroundColor White
        Write-Host "" -ForegroundColor White
        Write-Host "Features:" -ForegroundColor Cyan
        Write-Host "  ✨ 20 powerful AI models" -ForegroundColor White
        Write-Host "  💬 Chat with AI about your code" -ForegroundColor White
        Write-Host "  🔧 Automated refactoring" -ForegroundColor White
        Write-Host "  📝 Documentation generation" -ForegroundColor White
        Write-Host "  🐛 Bug detection and fixes" -ForegroundColor White
        Write-Host "" -ForegroundColor White
        Write-Host "Support: https://github.com/eres45/wasp/issues" -ForegroundColor Gray
    } else {
        Write-Host "❌ Installation failed" -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    exit 1
} finally {
    # Cleanup
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}
