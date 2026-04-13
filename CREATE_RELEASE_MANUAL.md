# Create GitHub Release Manually

The API is having issues. Let's create the release manually via GitHub web UI (takes 2 minutes).

## Steps

1. Go to: https://github.com/eres45/wasp/releases

2. Click "Create a new release"

3. Fill in:

   - **Tag**: v1.0.0 (select from dropdown)
   - **Title**: Wasp Code v1.0.0
   - **Description**: Copy below

4. Paste this description:

````
# Wasp Code v1.0.0

AI-powered VS Code extension with 20 models and Cloudflare proxy.

## Installation

Run this in PowerShell:
```powershell
irm https://wasp-code.vercel.app/install.ps1 | iex
````

Or download the .vsix file below and run:

```powershell
code --install-extension wasp-code-1.0.0.vsix
```

## Features

- 20 AI models from top providers
- Zero setup - no API keys needed
- Sidebar chat interface
- Rate limited (10 requests/minute)
- Cloudflare powered globally

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

````

5. Click "Attach binaries by dropping them here or selecting them"

6. Upload: `extensions/vscode/build/wasp-code-1.0.0.vsix`

7. Click "Publish release"

**Done!** Your release is live.

## Next Steps

1. Deploy to Vercel: https://vercel.com/new
2. Share installation command:
   ```powershell
   irm https://wasp-code.vercel.app/install.ps1 | iex
````
