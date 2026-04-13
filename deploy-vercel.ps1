# Deploy Wasp Code Download Site to Vercel
# This script deploys the professional download page

Write-Host "🚀 Deploying Wasp Code to Vercel" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking for Vercel CLI..." -ForegroundColor Yellow
$vercelPath = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelPath) {
    Write-Host "❌ Vercel CLI not found" -ForegroundColor Red
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "✅ Vercel CLI found" -ForegroundColor Green
Write-Host ""

# Navigate to vercel-download directory
Write-Host "Navigating to vercel-download..." -ForegroundColor Yellow
cd vercel-download

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "Follow the prompts to complete deployment" -ForegroundColor Cyan
Write-Host ""

vercel --prod

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your download page is live at:" -ForegroundColor Cyan
Write-Host "https://wasp-code.vercel.app" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create GitHub Release: .\create-release.ps1" -ForegroundColor White
Write-Host "2. Share installation command:" -ForegroundColor White
Write-Host "   irm https://wasp-code.vercel.app/install.ps1 | iex" -ForegroundColor Green
Write-Host ""
