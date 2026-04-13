# ⚠️ ACTION REQUIRED: Register Workers.dev Subdomain

## 🎯 You Need to Do This Once

Before we can deploy, you need to register a workers.dev subdomain.

---

## 📝 Step-by-Step Instructions

### Option 1: Use Cloudflare Dashboard (EASIEST)

1. **Open this URL in your browser:**

   ```
   https://dash.cloudflare.com/856494140e80d129b69f9bf3bc1f2c8e/workers
   ```

2. **Look for "Workers & Pages" in the left sidebar**

3. **Click "Get Started" or "Create Application"**

4. **You'll be asked to choose a subdomain**

   - Enter something like: `waspcode` or `killshot` or `yourname`
   - This becomes: `https://wasp-code-proxy.YOUR-SUBDOMAIN.workers.dev`

5. **Click "Set up" or "Continue"**

6. **Come back here and run:**
   ```bash
   npm run deploy
   ```

---

### Option 2: Quick Link (FASTEST)

**Click or open this link:**

```
https://dash.cloudflare.com/856494140e80d129b69f9bf3bc1f2c8e/workers/onboarding
```

This takes you directly to the subdomain registration page!

---

## 🤔 What Subdomain Should I Choose?

Choose any name you like:

- `waspcode` → `https://wasp-code-proxy.waspcode.workers.dev`
- `killshot` → `https://wasp-code-proxy.killshot.workers.dev`
- `myname` → `https://wasp-code-proxy.myname.workers.dev`

**It doesn't matter!** Pick anything unique.

---

## ✅ After Registration

Once you've registered your subdomain, come back and run:

```bash
npm run deploy
```

You should see:

```
✨ Successfully published your Worker!
🌍 https://wasp-code-proxy.YOUR-SUBDOMAIN.workers.dev
```

**That's your proxy URL!** Copy it - you'll need it for the extension.

---

## 🆘 Having Trouble?

If the dashboard doesn't show the subdomain option:

1. Go to: https://dash.cloudflare.com
2. Click "Workers & Pages" in left sidebar
3. Look for any "Get Started" or "Setup" buttons
4. Follow the prompts

Or just try deploying again - sometimes it works on the second try!

---

## 🚀 Quick Summary

1. Open: https://dash.cloudflare.com/856494140e80d129b69f9bf3bc1f2c8e/workers
2. Register a subdomain (any name)
3. Run: `npm run deploy`
4. Copy your worker URL
5. Done!

---

**Let me know once you've registered the subdomain and I'll help you deploy!**
