# Create GitHub Release with .vsix attachment
# This script creates a release on GitHub and uploads the built extension

param(
    [string]$Token = $env:GITHUB_TOKEN,
    [string]$Owner = "eres45",
    [string]$Repo = "wasp",
    [string]$TagName = "v1.0.0",
    [string]$VsixPath = "extensions/vscode/build/wasp-code-1.0.0.vsix"
)

if (-not $Token) {
    Write-Host "ERROR: GITHUB_TOKEN environment variable not set"
    exit 1
}

if (-not (Test-Path $VsixPath)) {
    Write-Host "ERROR: .vsix file not found at $VsixPath"
    exit 1
}

$VsixSize = (Get-Item $VsixPath).Length / 1MB
Write-Host "Found .vsix file: $VsixPath ($([math]::Round($VsixSize, 2)) MB)"

# Create release
$releaseBody = @"
# Wasp Code v1.0.0

AI-powered VS Code extension with 20 models and Cloudflare proxy.

## Features
- 20 AI models from top providers (Meta, Qwen, Mistral, Google, etc.)
- Cloudflare Worker proxy for zero-setup API access
- Sidebar chat interface
- Rate limiting (10 requests/minute)
- One-command installation

## Installation

Run this in PowerShell:
\`\`\`powershell
irm https://wasp-code.vercel.app/install.ps1 | iex
\`\`\`

Or manually:
1. Download wasp-code-1.0.0.vsix from this release
2. Run: code --install-extension wasp-code-1.0.0.vsix

## Models Included
- Meta Llama (4 models)
- Qwen (4 models)
- Mistral (3 models)
- Google Gemini (3 models)
- GLM (2 models)
- DeepSeek (1 model)
- OpenAI (1 model)
- Kimi (1 model)
- MiniMax (1 model)

## Documentation
- Installation Guide: https://github.com/eres45/wasp#installation
- Configuration: https://github.com/eres45/wasp#configuration
- Troubleshooting: https://github.com/eres45/wasp#troubleshooting
"@

$headers = @{
    "Authorization" = "token $Token"
    "Accept" = "application/vnd.github.v3+json"
}

$releaseData = @{
    tag_name = $TagName
    name = "Wasp Code v1.0.0"
    body = $releaseBody
    draft = $false
    prerelease = $false
} | ConvertTo-Json

Write-Host "Creating release..."
try {
    $releaseResponse = Invoke-RestMethod `
        -Uri "https://api.github.com/repos/$Owner/$Repo/releases" `
        -Method POST `
        -Headers $headers `
        -Body $releaseData `
        -ContentType "application/json"

    $releaseId = $releaseResponse.id
    Write-Host "Release created: $($releaseResponse.html_url)"
} catch {
    Write-Host "Error creating release: $_"
    exit 1
}

# Upload .vsix file
Write-Host "Uploading .vsix file..."
$uploadUrl = "https://uploads.github.com/repos/$Owner/$Repo/releases/$releaseId/assets?name=$(Split-Path $VsixPath -Leaf)"

try {
    $vsixContent = [System.IO.File]::ReadAllBytes($VsixPath)
    $uploadResponse = Invoke-RestMethod `
        -Uri $uploadUrl `
        -Method POST `
        -Headers $headers `
        -Body $vsixContent `
        -ContentType "application/octet-stream"

    Write-Host ".vsix uploaded: $($uploadResponse.browser_download_url)"
} catch {
    Write-Host "Error uploading .vsix: $_"
    exit 1
}

Write-Host ""
Write-Host "Release complete!"
Write-Host "Installation command:"
Write-Host "irm https://wasp-code.vercel.app/install.ps1 | iex"
