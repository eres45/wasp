# GitHub Release Setup for Wasp Code

## Step 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens/new
2. Click "Generate new token (classic)"
3. Set these permissions:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
4. Click "Generate token"
5. **Copy the token** (you won't see it again!)

## Step 2: Create Release with .vsix

Run this PowerShell command:

```powershell
$env:GITHUB_TOKEN = "your_token_here"
cd continue
.\create-release.ps1
```

Replace `your_token_here` with the token from Step 1.

## Step 3: Verify Release

Check: https://github.com/eres45/wasp/releases

You should see:

- Release v1.0.0
- .vsix file attached (73.9 MB)
- Installation instructions

## Installation Command for Users

Once released, users can install with:

```powershell
irm https://raw.githubusercontent.com/eres45/wasp/main/install.ps1 | iex
```

## Alternative: Manual Release via GitHub Web UI

If you prefer not to use the script:

1. Go to: https://github.com/eres45/wasp/releases
2. Click "Create a new release"
3. Select tag: `v1.0.0`
4. Title: "Wasp Code v1.0.0"
5. Description: Copy from `DISTRIBUTION_ALTERNATIVES.md`
6. Upload: `extensions/vscode/build/wasp-code-1.0.0.vsix`
7. Click "Publish release"

## Troubleshooting

**Token not working?**

- Make sure you copied the full token
- Check it has `repo` permission
- Token must be created after the tag was pushed

**Upload fails?**

- Verify .vsix file exists: `ls extensions/vscode/build/wasp-code-1.0.0.vsix`
- Check file size is ~73.9 MB
- Try manual upload via GitHub web UI

**Installation script not working?**

- Verify `install.ps1` is in the main branch
- Check PowerShell execution policy: `Get-ExecutionPolicy`
- If restricted, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
