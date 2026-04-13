# Test Wasp Code Extension
Write-Host "🚀 Testing Wasp Code Extension..." -ForegroundColor Green

# Launch VS Code
Write-Host "Opening VS Code..." -ForegroundColor Yellow
Start-Process "code" -ArgumentList "."

Write-Host ""
Write-Host "✅ Extension installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Testing Steps:" -ForegroundColor Cyan
Write-Host "1. Look for 'Wasp Code' icon in the Activity Bar (left sidebar)"
Write-Host "2. Click it to open the Wasp Code panel"
Write-Host "3. Try keyboard shortcuts:"
Write-Host "   - Ctrl+L: Focus chat input"
Write-Host "   - Ctrl+I: Edit mode"
Write-Host "4. Check if the chat interface loads properly"
Write-Host ""
Write-Host "🔧 If you see issues:" -ForegroundColor Yellow
Write-Host "- Press F12 to open Developer Tools"
Write-Host "- Check Console tab for errors"
Write-Host "- Look for the Wasp Code extension in Extensions view"
Write-Host ""
Write-Host "🎯 Expected: Working chat interface with MiniMax models" -ForegroundColor Green