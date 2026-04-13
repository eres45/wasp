# ⚡ Quick Launch Guide - Wasp Code

## 🎯 You're Here

Everything is built and ready. Just 2 steps to launch:

---

## Step 1️⃣: Create GitHub Release (5 min)

### Option A: Automated (Recommended)

```powershell
# 1. Get token from: https://github.com/settings/tokens/new
#    - Click "Generate new token (classic)"
#    - Check: repo, workflow
#    - Copy token

# 2. Run this:
$env:GITHUB_TOKEN = "paste_your_token_here"
cd continue
.\create-release.ps1
```

### Option B: Manual

1. Go to: https://github.com/eres45/wasp/releases
2. Click "Create a new release"
3. Tag: `v1.0.0`
4. Upload: `extensions/vscode/build/wasp-code-1.0.0.vsix`
5. Publish

---

## Step 2️⃣: Share Installation Command

Once released, share this everywhere:

```powershell
irm https://raw.githubusercontent.com/eres45/wasp/main/install.ps1 | iex
```

### Where to Share

- **Reddit**: r/vscode, r/programming
- **Twitter/X**: #vscode #ai #coding
- **Product Hunt**: https://www.producthunt.com
- **Dev.to**: https://dev.to
- **Hacker News**: https://news.ycombinator.com

---

## 📦 What Users Get

```
Wasp Code v1.0.0
├── 20 AI Models
│   ├── Meta Llama (4)
│   ├── Qwen (4)
│   ├── Mistral (3)
│   ├── Google Gemini (3)
│   ├── GLM (2)
│   ├── DeepSeek (1)
│   ├── OpenAI (1)
│   ├── Kimi (1)
│   └── MiniMax (1)
├── Zero Setup (no API keys)
├── Sidebar Chat
├── Rate Limited (10 req/minute)
└── Cloudflare Powered
```

---

## ✅ Verification

After creating release, verify:

```powershell
# Check release exists
Invoke-WebRequest https://api.github.com/repos/eres45/wasp/releases/latest | ConvertFrom-Json | Select tag_name, name

# Should show:
# tag_name: v1.0.0
# name: Wasp Code v1.0.0
```

---

## 🚀 Installation Test

Test the installation script:

```powershell
# In a new PowerShell window:
irm https://raw.githubusercontent.com/eres45/wasp/main/install.ps1 | iex
```

Should:

1. Check for VS Code ✅
2. Download .vsix ✅
3. Install extension ✅
4. Show success message ✅

---

## 📊 Quick Stats

| What         | Value              |
| ------------ | ------------------ |
| Extension    | 73.9 MB            |
| Models       | 20                 |
| Setup Time   | 0 min (zero setup) |
| Install Time | ~30 sec            |
| Cost         | FREE               |
| Rate Limit   | 10 req/minute      |

---

## 🎉 You're Done!

That's it. Two steps and you're live:

1. ✅ Create release
2. ✅ Share command

Users can then install with one command. Done!

---

## 📞 Need Help?

- **Release issues?** → See `GITHUB_RELEASE_SETUP.md`
- **Installation issues?** → See `README_WASP_CODE.md`
- **Deployment issues?** → See `DEPLOYMENT_READY.md`
- **Full checklist?** → See `LAUNCH_CHECKLIST.md`

---

**Ready? Let's go! 🚀**
