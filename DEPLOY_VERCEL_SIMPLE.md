# 🚀 Deploy to Vercel - Simple Steps

Your download page is ready. Deploy it in 2 minutes.

---

## Step 1: Go to Vercel

1. Open: https://vercel.com/new
2. Click "Deploy"

---

## Step 2: Connect GitHub

1. Click "Continue with GitHub"
2. Authorize Vercel
3. Select repository: `eres45/wasp`

---

## Step 3: Configure

1. **Framework**: Select "Other"
2. **Root Directory**: Select `vercel-download`
3. Click "Deploy"

**Done!** Your site is live at: `https://wasp-code.vercel.app`

---

## Step 4: Create GitHub Release

Once deployed, create the release:

```powershell
$env:GITHUB_TOKEN = "your_token_from_github.com/settings/tokens/new"
cd continue
.\create-release.ps1
```

---

## Step 5: Share Installation Command

Users install with:

```powershell
irm https://wasp-code.vercel.app/install.ps1 | iex
```

---

## What You Get

✅ Professional download page
✅ One-command installation
✅ Beautiful design
✅ Mobile responsive
✅ Fast CDN

---

**That's it! You're live! 🎉**
