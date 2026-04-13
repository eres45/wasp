# 📦 Wasp Code - Distribution Guide

## 🎯 How to Distribute Your Extension

You have **3 options** for distributing Wasp Code with the 20 pre-configured models:

---

## ✅ Option 1: Users Provide Their Own API Keys (RECOMMENDED)

### How It Works:

1. Extension ships with 20 models pre-configured
2. All models have placeholder: `YOUR_FRENIX_API_KEY_HERE`
3. Users install extension
4. Users get their own FREE Frenix API key
5. Users replace placeholder with their key
6. Users start using all 20 models

### Pros:

- ✅ **FREE for you** - No API costs
- ✅ **Scalable** - Unlimited users
- ✅ **Standard practice** - How most AI extensions work
- ✅ **No liability** - Users manage their own usage
- ✅ **Simple** - Already implemented!

### Cons:

- ⚠️ Users need to sign up for Frenix API
- ⚠️ Extra setup step for users

### Implementation Status:

**✅ DONE!** Already implemented in `continue/core/config/default.ts`

### User Experience:

1. Install Wasp Code from VS Code Marketplace
2. Open Wasp Code sidebar
3. See message: "API Key Required"
4. Click "Get API Key" → Opens https://api.frenix.sh
5. Copy API key
6. Paste into config
7. Start using all 20 models!

---

## 💰 Option 2: You Provide API Access (Requires Backend)

### How It Works:

1. You build a proxy server (Node.js/Python)
2. Your server has YOUR Frenix API key
3. Extension connects to YOUR server (not Frenix directly)
4. Your server forwards requests to Frenix
5. You pay for all API usage

### Pros:

- ✅ **Zero setup for users** - Just install and use
- ✅ **Better UX** - No API key needed
- ✅ **Control** - You manage all API calls
- ✅ **Monetization** - Can charge users subscription

### Cons:

- ❌ **Costs money** - You pay for ALL user API calls
- ❌ **Complex** - Need to build/maintain backend server
- ❌ **Scaling issues** - More users = more costs
- ❌ **Rate limiting** - Need to manage user quotas
- ❌ **Security** - Need to prevent abuse

### Cost Estimate:

- Frenix API: ~$0.001 - $0.01 per request (varies by model)
- 1,000 users × 100 requests/day = 100,000 requests/day
- Cost: $100 - $1,000 per day
- Monthly: $3,000 - $30,000

### Implementation Required:

```javascript
// Example proxy server (Node.js + Express)
const express = require("express");
const app = express();

app.post("/api/chat", async (req, res) => {
  // Forward to Frenix with YOUR API key
  const response = await fetch("https://api.frenix.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FRENIX_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000);
```

Then update extension to use: `apiBase: "https://your-server.com/api"`

---

## 🎁 Option 3: Hybrid Approach (Best of Both)

### How It Works:

1. Extension ships with placeholder API keys (Option 1)
2. You also offer a "Premium" tier with your proxy (Option 2)
3. Free users: Bring their own API key
4. Premium users: Use your proxy (you pay, they pay you)

### Pros:

- ✅ **Free tier** - Users can try for free
- ✅ **Premium tier** - Monetize power users
- ✅ **Flexible** - Users choose what works for them
- ✅ **Scalable** - Free users don't cost you money

### Cons:

- ⚠️ More complex to implement
- ⚠️ Need to build backend for premium tier

### Pricing Example:

- **Free Tier:** Users provide own Frenix API key
- **Premium Tier:** $9.99/month - Unlimited API access (you provide)
- **Enterprise Tier:** $49.99/month - Priority access + support

---

## 🎯 My Recommendation: Option 1 (Users Provide Keys)

### Why?

1. **Already implemented** - No extra work needed
2. **Zero cost** - You don't pay for API usage
3. **Standard practice** - GitHub Copilot, Cursor, Continue all work this way
4. **Scalable** - Can have millions of users
5. **Simple** - No backend to maintain

### How to Make It User-Friendly:

#### 1. Add "Get API Key" Button

When users first open Wasp Code, show:

```
┌─────────────────────────────────────┐
│  Welcome to Wasp Code! 🚀           │
│                                     │
│  To get started, you need a FREE    │
│  API key from Frenix.               │
│                                     │
│  [Get Free API Key] [Learn More]    │
└─────────────────────────────────────┘
```

#### 2. In-App Configuration

Add a settings panel in the extension:

```
┌─────────────────────────────────────┐
│  Wasp Code Settings                 │
│                                     │
│  API Key: [________________]        │
│           [Save]                    │
│                                     │
│  Don't have a key?                  │
│  [Get Free API Key →]               │
└─────────────────────────────────────┘
```

#### 3. Clear Documentation

Include `WASP_CODE_USER_GUIDE.md` in the extension package.

---

## 📊 Current Implementation Status

### ✅ What's Done:

- [x] 20 models pre-configured in `default.ts`
- [x] All models use placeholder API key
- [x] User guide created (`WASP_CODE_USER_GUIDE.md`)
- [x] Models tested and confirmed working
- [x] Config structure ready

### 🔄 What's Next (Optional Improvements):

- [ ] Add "Get API Key" button in extension UI
- [ ] Add in-app settings panel for API key
- [ ] Add welcome screen with setup instructions
- [ ] Add API key validation
- [ ] Add model selection UI improvements

---

## 🚀 How to Publish

### Step 1: Build Extension

```bash
cd continue/extensions/vscode
npm run package
```

This creates `wasp-code-X.X.X.vsix`

### Step 2: Test Locally

```bash
code --install-extension wasp-code-X.X.X.vsix
```

### Step 3: Publish to VS Code Marketplace

#### A. Create Publisher Account

1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft account
3. Create publisher ID (e.g., "waspcode")

#### B. Get Personal Access Token

1. Go to https://dev.azure.com
2. Create new organization
3. User Settings → Personal Access Tokens
4. Create token with "Marketplace (Manage)" scope

#### C. Publish

```bash
# Install vsce (VS Code Extension Manager)
npm install -g @vscode/vsce

# Login
vsce login waspcode

# Publish
vsce publish
```

### Step 4: Users Install

```
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "Wasp Code"
4. Click Install
5. Follow setup guide to add API key
6. Start coding!
```

---

## 💡 Marketing Your Extension

### Extension Description (for VS Code Marketplace):

```
🚀 Wasp Code - AI Coding Assistant with 20 Powerful Models

Access the world's most powerful AI models for coding:
• 🏆 Mistral Large 3 (675B) - Biggest model available
• 💻 Qwen3 Coder (480B) - Best for coding
• 🦙 Llama 3.1 (405B) - Meta's largest
• 🔷 Gemini 3 Pro - Google's best
• ⭐ MiniMax M2.5 - Latest MiniMax
• And 15 more powerful models!

Features:
✅ 20 pre-configured AI models
✅ Code generation & completion
✅ Bug fixing & debugging
✅ Code explanation & documentation
✅ Refactoring suggestions
✅ Multi-language support

Get started in 2 minutes:
1. Install extension
2. Get free API key from Frenix
3. Start coding with AI!

Free to use with your own API key.
```

---

## 🎉 Summary

**Current Status:** ✅ Ready to distribute with Option 1

**What Users Need:**

1. Install Wasp Code extension
2. Get free Frenix API key (https://api.frenix.sh)
3. Add API key to config
4. Use all 20 models!

**What You Need:**

1. Build extension: `npm run package`
2. Test locally
3. Publish to VS Code Marketplace
4. Share with users!

**Cost to You:** $0 (users provide their own API keys)

**Cost to Users:** Free tier available on Frenix, or pay-as-you-go

---

**Ready to publish? Let me know if you need help with any step!** 🚀
