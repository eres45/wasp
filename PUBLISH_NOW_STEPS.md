# 🚀 Publish Wasp Code NOW - Step by Step

## ⚠️ IMPORTANT: Do These Steps First

### Step 1: Create Publisher Account (2 minutes)

1. **Open this URL:**

   ```
   https://marketplace.visualstudio.com/manage
   ```

2. **Sign in** with your Microsoft account

   - Email: killshotkiller09@gmail.com
   - Or create new Microsoft account if needed

3. **Create Publisher:**
   - Click "Create Publisher"
   - **Publisher ID:** `WaspCode` (MUST be exactly this!)
   - **Display Name:** Wasp Code
   - **Description:** AI-powered coding assistant
   - Click "Create"

---

### Step 2: Get Personal Access Token (3 minutes)

1. **Open this URL:**

   ```
   https://dev.azure.com
   ```

2. **Sign in** with same Microsoft account

3. **Create Organization** (if you don't have one):

   - Click "New organization"
   - Name: `waspcode` (or anything)
   - Click "Continue"

4. **Create Personal Access Token:**
   - Click your profile icon (top right)
   - Click "Personal access tokens"
   - Click "+ New Token"
   - Fill in:
     - **Name:** Wasp Code Publishing
     - **Organization:** All accessible organizations
     - **Expiration:** 90 days
     - **Scopes:** Click "Show all scopes" → Find and check **"Marketplace (Manage)"**
   - Click "Create"
   - **COPY THE TOKEN!** (You won't see it again)

---

## 🎯 After You Have Publisher & Token

### Step 3: Login to vsce

Run this command and paste your token when prompted:

```bash
vsce login WaspCode
```

Paste your Personal Access Token when asked.

---

### Step 4: Publish!

```bash
cd continue/extensions/vscode
vsce publish
```

---

## ✅ What You'll See

```
Publishing WaspCode.wasp-code@1.0.0...
✓ Successfully published WaspCode.wasp-code@1.0.0!

Your extension will live at:
https://marketplace.visualstudio.com/items?itemName=WaspCode.wasp-code
```

---

## 🎉 Done!

Users can now install Wasp Code from VS Code Marketplace!

---

## 📝 Quick Checklist

- [ ] Created publisher account at marketplace.visualstudio.com
- [ ] Got Personal Access Token from dev.azure.com
- [ ] Ran `vsce login WaspCode`
- [ ] Ran `vsce publish`
- [ ] Extension is live!

---

## 🆘 If You Get Errors

### "Publisher 'WaspCode' not found"

→ Create publisher at https://marketplace.visualstudio.com/manage
→ Make sure ID is exactly "WaspCode"

### "Authentication failed"

→ Get new token at https://dev.azure.com
→ Make sure "Marketplace (Manage)" scope is checked
→ Run `vsce login WaspCode` again

### "Extension already exists"

→ Someone else published with this name
→ Change publisher in package.json to something unique
→ Or contact me to help

---

**Tell me when you've completed Steps 1 & 2, and I'll help you publish!** 🚀
