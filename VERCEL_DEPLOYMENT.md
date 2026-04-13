# 🚀 Deploy to Vercel - Professional Download Page

Your professional download page is ready. Deploy it in 2 minutes.

---

## Step 1: Create Vercel Account (1 minute)

1. Go to: https://vercel.com/signup
2. Sign up with GitHub (easiest)
3. Authorize Vercel to access your GitHub account

---

## Step 2: Deploy the Download Site (1 minute)

### Option A: Deploy from Vercel Dashboard (Easiest)

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `eres45/wasp`
4. Under "Root Directory", select: `vercel-download`
5. Click "Deploy"

**Done!** Your site is live at: `https://wasp-code.vercel.app`

### Option B: Deploy from CLI

```bash
npm install -g vercel
cd continue/vercel-download
vercel
```

Follow the prompts and it will deploy automatically.

---

## Step 3: Create GitHub Release

Now create the release so the download link works:

```powershell
$env:GITHUB_TOKEN = "your_token_from_github.com/settings/tokens/new"
cd continue
.\create-release.ps1
```

This will:

- Create release v1.0.0
- Upload the .vsix file
- Make the download link work

---

## Step 4: Test Installation

Once deployed, users can install with:

```powershell
irm https://wasp-code.vercel.app/install.ps1 | iex
```

Or visit the download page:

```
https://wasp-code.vercel.app
```

---

## What You Get

✅ **Professional landing page** - Beautiful, branded
✅ **One-command install** - Like Claude Code
✅ **Fast downloads** - Vercel's global CDN
✅ **Mobile responsive** - Works on all devices
✅ **Copy button** - Easy command copying
✅ **Direct download** - .vsix file link

---

## Customize Your Page

Edit `vercel-download/pages/index.js` to:

- Change colors (line 20-21: gradient colors)
- Add your logo
- Update features list
- Add screenshots
- Change branding

Then push to GitHub and Vercel auto-deploys!

---

## Your Installation Command

Share this everywhere:

```powershell
irm https://wasp-code.vercel.app/install.ps1 | iex
```

---

## Troubleshooting

**Deploy failed?**

- Make sure `vercel-download` folder exists
- Check GitHub token has `repo` permission
- Try deploying from Vercel dashboard instead

**Download link broken?**

- Create GitHub release first (Step 3)
- Verify release v1.0.0 exists
- Check .vsix file is attached

**Installation script not working?**

- Make sure VS Code is installed
- Run PowerShell as Administrator
- Check internet connection

---

## Next Steps

1. ✅ Deploy to Vercel (this page)
2. ✅ Create GitHub Release
3. ✅ Share installation command
4. ✅ Monitor for issues

---

**Status**: Ready to deploy! 🎉
