# 🚀 Deploy Your Proxy NOW - Step by Step

## ⚡ Quick Deploy (10 minutes)

### Step 1: Install Wrangler (2 minutes)

```bash
npm install -g wrangler
```

Wait for installation to complete.

### Step 2: Login to Cloudflare (1 minute)

```bash
wrangler login
```

- Browser will open
- Login with your Cloudflare account (or create free account)
- Click "Allow" to authorize Wrangler
- Return to terminal

**Don't have Cloudflare account?**

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up (FREE, no credit card needed)
3. Verify email
4. Run `wrangler login` again

### Step 3: Navigate to Proxy Folder (10 seconds)

```bash
cd continue/wasp-code-proxy
```

### Step 4: Install Dependencies (1 minute)

```bash
npm install
```

### Step 5: Add Your Frenix API Key (30 seconds)

```bash
wrangler secret put FRENIX_API_KEY
```

When prompted, paste:

```
sk-frenix-160cc0c813c7678d814e9feb4a443cbb
```

Press Enter.

You should see:

```
✨ Success! Uploaded secret FRENIX_API_KEY
```

### Step 6: Deploy! (1 minute)

```bash
npm run deploy
```

You'll see:

```
⛅️ wrangler 3.x.x
------------------
Total Upload: XX.XX KiB / gzip: XX.XX KiB
Uploaded wasp-code-proxy (X.XX sec)
Published wasp-code-proxy (X.XX sec)
  https://wasp-code-proxy.YOUR_USERNAME.workers.dev
Current Deployment ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**🎉 COPY THIS URL!** You'll need it next.

### Step 7: Test Your Proxy (2 minutes)

Edit `test-proxy.js` and replace the URL:

```javascript
// Change this line:
const PROXY_URL = "https://wasp-code-proxy.YOUR_USERNAME.workers.dev";

// To your actual URL from step 6:
const PROXY_URL = "https://wasp-code-proxy.ACTUAL_USERNAME.workers.dev";
```

Then test:

```bash
npm test
```

You should see:

```
🧪 Testing Wasp Code Proxy...

Testing Mistral Large 3 (675B)...
✅ Mistral Large 3 (675B) - WORKING
   Response: Hello from Wasp Code!

Testing Qwen3 Coder (480B)...
✅ Qwen3 Coder (480B) - WORKING
   Response: Hello from Wasp Code!

...

🎉 All tests passed! Your proxy is working perfectly!
```

### Step 8: Update Extension Config (2 minutes)

Now update your extension to use the proxy instead of direct API calls.

**Option A: For All Users (Recommended)**

Edit `continue/core/config/default.ts`:

Find this section:

```typescript
models: [
  {
    title: "🏆 Mistral Large 3 (675B) - BIGGEST MODEL",
    provider: "openai",
    model: "provider-1/mistral-large-3-675b-instruct-2512",
    apiKey: "YOUR_FRENIX_API_KEY_HERE",  // ← Remove this line
    apiBase: "https://api.frenix.sh/v1"  // ← Change this line
  },
```

Change to:

```typescript
models: [
  {
    title: "🏆 Mistral Large 3 (675B) - BIGGEST MODEL",
    provider: "openai",
    model: "provider-1/mistral-large-3-675b-instruct-2512",
    // No apiKey needed - proxy handles it!
    apiBase: "https://wasp-code-proxy.YOUR_USERNAME.workers.dev"
  },
```

**Do this for ALL 20 models in the file!**

### Step 9: Rebuild Extension (2 minutes)

```bash
cd ../extensions/vscode
npm run package
```

This creates a new `.vsix` file with the proxy configuration.

### Step 10: Test Extension (2 minutes)

```bash
code --install-extension wasp-code-*.vsix
```

- Open VS Code
- Click Wasp Code icon
- Try asking a question
- Should work WITHOUT needing API key!

---

## ✅ Success Checklist

- [ ] Wrangler installed
- [ ] Logged into Cloudflare
- [ ] Dependencies installed
- [ ] API key added to worker
- [ ] Worker deployed successfully
- [ ] Got worker URL
- [ ] Tested proxy (all 5 tests passed)
- [ ] Updated extension config
- [ ] Rebuilt extension
- [ ] Tested extension

---

## 🎯 What You Just Accomplished

### Before (User Setup):

1. Install extension
2. Get Frenix API key
3. Configure API key in settings
4. Start using

### After (With Proxy):

1. Install extension
2. Start using immediately! ✨

**Users now have ZERO setup!** Just install and go!

---

## 💰 Cost Analysis

### Your Costs:

- **Cloudflare Worker:** FREE (up to 3M requests/month)
- **Frenix API:** Pay per use (~$0.001-0.01 per request)

### Example Monthly Costs:

```
100 users × 100 requests = 10,000 requests
Cloudflare: $0 (FREE tier)
Frenix API: ~$10-100
Total: $10-100/month

1,000 users × 100 requests = 100,000 requests
Cloudflare: $0 (FREE tier)
Frenix API: ~$100-1,000
Total: $100-1,000/month

10,000 users × 100 requests = 1,000,000 requests
Cloudflare: $0 (FREE tier)
Frenix API: ~$1,000-10,000
Total: $1,000-10,000/month
```

### Monetization Strategy:

Charge users $9.99/month → Break even at ~100-1,000 users!

---

## 🔄 Next Steps

### Option 1: Keep It Free

- Let users use it for free
- You pay API costs
- Build user base first
- Monetize later

### Option 2: Add Subscription

- Free tier: 10 requests/day
- Pro tier: $9.99/month for unlimited
- Update worker to check subscription status

### Option 3: Freemium

- Free: Users provide own API key (original setup)
- Premium: Use your proxy (zero setup)
- Best of both worlds!

---

## 🆘 Troubleshooting

### "wrangler: command not found"

```bash
npm install -g wrangler
```

### "Not logged in"

```bash
wrangler login
```

### "Failed to publish"

- Check internet connection
- Make sure you're logged in
- Try `wrangler whoami` to verify

### "Secret not found"

```bash
wrangler secret put FRENIX_API_KEY
```

### Tests fail

- Check worker URL in test-proxy.js
- Make sure worker is deployed
- Verify API key is set

---

## 📊 Monitor Your Proxy

### View Dashboard

1. Go to https://dash.cloudflare.com
2. Click "Workers & Pages"
3. Click "wasp-code-proxy"
4. See real-time analytics!

### View Logs

```bash
wrangler tail
```

This shows live requests as they happen!

### Check Metrics

```bash
wrangler metrics
```

Shows:

- Total requests
- Success rate
- Error rate
- CPU time

---

## 🎉 You're Done!

Your proxy is live and handling requests!

**What users see now:**

1. Install Wasp Code
2. Open sidebar
3. Start chatting with AI
4. No API key needed! ✨

**What you control:**

- All API costs
- Rate limiting
- Usage tracking
- Can monetize later

**Your proxy URL:**

```
https://wasp-code-proxy.YOUR_USERNAME.workers.dev
```

**Save this URL!** You'll need it for:

- Extension config
- Documentation
- Support

---

## 🚀 Ready to Publish Extension?

Now that your proxy is live:

1. **Update extension config** with proxy URL
2. **Rebuild extension:** `npm run package`
3. **Test locally:** Install and verify
4. **Publish to marketplace:** `vsce publish`
5. **Users install:** Zero setup required!

**Your extension now has the BEST user experience!** 🎊

---

**Questions? Issues? Let me know!**
