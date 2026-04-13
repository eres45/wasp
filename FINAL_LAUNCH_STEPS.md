# 🚀 Final Launch Steps - Do These Now!

The token has permission issues. Let's do this manually - it's super quick!

---

## Step 1: Create New GitHub Token (1 minute)

1. Go to: https://github.com/settings/tokens/new

2. Fill in:

   - **Token name**: `wasp-code-release`
   - **Expiration**: 90 days
   - **Scopes**: Check `repo` (Full control of private repositories)

3. Click "Generate token"

4. **Copy the token** (you won't see it again!)

---

## Step 2: Create Release with New Token (1 minute)

Open PowerShell and run:

```powershell
$env:GH_TOKEN = "paste_your_new_token_here"
cd continue
& "C:\Program Files\GitHub CLI\gh.exe" release create v1.0.0 `
  --title "Wasp Code v1.0.0" `
  --notes "AI-powered VS Code extension with 20 models and Cloudflare proxy. Install: irm https://wasp-code.vercel.app/install.ps1 | iex" `
  --repo eres45/wasp
```

Then upload the .vsix:

```powershell
& "C:\Program Files\GitHub CLI\gh.exe" release upload v1.0.0 `
  extensions/vscode/build/wasp-code-1.0.0.vsix `
  --repo eres45/wasp
```

**Done!** Release is live.

---

## Step 3: Deploy to Vercel (2 minutes)

1. Go to: https://vercel.com/new

2. Click "Deploy"

3. Connect GitHub → Select `eres45/wasp`

4. Configure:

   - **Framework**: Other
   - **Root Directory**: `vercel-download`

5. Click "Deploy"

**Done!** Your site is live at: `https://wasp-code.vercel.app`

---

## Step 4: Share Installation Command

Users install with:

```powershell
irm https://wasp-code.vercel.app/install.ps1 | iex
```

---

## Total Time: 5 minutes

That's it! You're live! 🎉
