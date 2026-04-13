# 🚀 Install Wasp Code - Quick Guide

## 3 Steps to Launch

### Step 1: Deploy to Vercel (2 minutes)

1. Go to: https://vercel.com/new
2. Import: `eres45/wasp`
3. Root Directory: `vercel-download`
4. Click "Deploy"

**Your site**: `https://wasp-code.vercel.app`

---

### Step 2: Create GitHub Release (5 minutes)

```powershell
# Get token: https://github.com/settings/tokens/new
# Permissions: repo, workflow

$env:GITHUB_TOKEN = "your_token"
cd continue
.\create-release.ps1
```

---

### Step 3: Share Installation Command

Users install with:

```powershell
irm https://wasp-code.vercel.app/install.ps1 | iex
```

---

## What Users Get

✅ Professional download page
✅ One-command installation
✅ 20 AI models
✅ Zero setup
✅ Sidebar chat
✅ Rate limited (10 req/min)

---

## Timeline

- **Step 1**: 2 minutes
- **Step 2**: 5 minutes
- **Total**: 7 minutes to launch

---

## Installation Flow

```
User runs command
    ↓
Downloads install.ps1 from Vercel
    ↓
Script downloads .vsix from GitHub
    ↓
Installs extension
    ↓
Done! ✅
```

---

## Ready?

1. Deploy to Vercel
2. Create GitHub Release
3. Share the command

That's it! 🎉
