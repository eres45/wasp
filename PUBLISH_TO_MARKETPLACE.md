# 🚀 Publish Wasp Code to VS Code Marketplace

## 📋 Prerequisites

Before publishing, you need:

1. Microsoft account
2. Azure DevOps account
3. Personal Access Token (PAT)
4. Publisher account

---

## Step 1: Create Publisher Account (5 minutes)

### 1.1 Go to VS Code Marketplace

```
https://marketplace.visualstudio.com/manage
```

### 1.2 Sign in with Microsoft Account

- Use your Microsoft account
- Or create one if you don't have it

### 1.3 Create Publisher

- Click "Create Publisher"
- **Publisher ID:** `WaspCode` (must match package.json)
- **Display Name:** Wasp Code
- **Description:** AI-powered coding assistant
- Click "Create"

---

## Step 2: Get Personal Access Token (3 minutes)

### 2.1 Go to Azure DevOps

```
https://dev.azure.com
```

### 2.2 Create Organization (if needed)

- Click "New organization"
- Name it anything (e.g., "waspcode")
- Click "Continue"

### 2.3 Create Personal Access Token

1. Click your profile icon (top right)
2. Click "Personal access tokens"
3. Click "+ New Token"
4. Fill in:
   - **Name:** Wasp Code Publishing
   - **Organization:** All accessible organizations
   - **Expiration:** 90 days (or custom)
   - **Scopes:** Click "Show all scopes"
   - Find and check: **Marketplace (Manage)**
5. Click "Create"
6. **COPY THE TOKEN!** You won't see it again

---

## Step 3: Install vsce (1 minute)

```bash
npm install -g @vscode/vsce
```

---

## Step 4: Login to Publisher (1 minute)

```bash
vsce login WaspCode
```

When prompted, paste your Personal Access Token.

You should see:

```
✓ Successfully logged in as WaspCode
```

---

## Step 5: Publish Extension (2 minutes)

```bash
cd continue/extensions/vscode
vsce publish
```

You'll see:

```
Publishing WaspCode.wasp-code@1.0.0...
✓ Successfully published WaspCode.wasp-code@1.0.0!
Your extension will live at https://marketplace.visualstudio.com/items?itemName=WaspCode.wasp-code
```

---

## 🎉 Done!

Your extension is now live on the VS Code Marketplace!

### View Your Extension:

```
https://marketplace.visualstudio.com/items?itemName=WaspCode.wasp-code
```

### Users Can Install:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "Wasp Code"
4. Click Install

---

## 📊 After Publishing

### View Analytics:

```
https://marketplace.visualstudio.com/manage/publishers/WaspCode
```

You can see:

- Total installs
- Daily installs
- Ratings & reviews
- Q&A

### Update Extension:

1. Update version in `package.json`
2. Rebuild: `npm run package`
3. Publish: `vsce publish`

---

## 🆘 Troubleshooting

### "Publisher not found"

- Make sure publisher ID in package.json matches: `"publisher": "WaspCode"`
- Create publisher at https://marketplace.visualstudio.com/manage

### "Authentication failed"

- Get new Personal Access Token
- Make sure "Marketplace (Manage)" scope is checked
- Run `vsce login WaspCode` again

### "Extension already exists"

- If you need to update, increment version in package.json
- Or unpublish old version first: `vsce unpublish WaspCode.wasp-code`

### "Missing README"

- Make sure you have a README.md in extensions/vscode folder
- Or create one with extension description

---

## 📝 Quick Commands Reference

```bash
# Login
vsce login WaspCode

# Publish
cd continue/extensions/vscode
vsce publish

# Publish specific version
vsce publish 1.0.1

# Unpublish (if needed)
vsce unpublish WaspCode.wasp-code

# Show extension info
vsce show WaspCode.wasp-code

# Package without publishing
vsce package
```

---

## 🎯 Next Steps After Publishing

1. **Share on Social Media:**

   - Twitter/X
   - Reddit (r/vscode, r/programming)
   - Product Hunt
   - Hacker News

2. **Create Demo Video:**

   - Show installation
   - Show features
   - Upload to YouTube

3. **Write Blog Post:**

   - Announce launch
   - Explain features
   - Share on dev.to, Medium

4. **Monitor Feedback:**
   - Check reviews
   - Answer Q&A
   - Fix reported issues

---

## 🌟 Marketing Your Extension

### VS Code Marketplace Description:

```
Wasp Code - AI-Powered Coding Assistant

Fast, intelligent AI code agent that helps you write better code faster.

Features:
✨ AI-powered code completion
🤖 Intelligent code suggestions
💬 Chat with AI about your code
🔧 Refactoring assistance
📝 Documentation generation
🐛 Bug detection and fixes

Get started in seconds - no configuration needed!
```

### Keywords to Add:

- AI assistant
- Code completion
- ChatGPT
- Claude
- Copilot alternative
- Code agent
- Programming helper

---

**Ready to publish? Follow the steps above!** 🚀
