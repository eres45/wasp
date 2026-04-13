# 🚀 Wasp Code Proxy - Cloudflare Worker

This is a Cloudflare Worker that acts as a proxy between the Wasp Code VS Code extension and the Frenix API.

## 🎯 What It Does

- Hides your Frenix API key from users
- Provides rate limiting (100 requests/hour per user)
- Tracks usage statistics
- Handles CORS for browser requests
- Supports all 20 Wasp Code models

## 📦 Features

- ✅ **FREE tier:** 100,000 requests/day (3M/month)
- ✅ **Fast:** Runs on Cloudflare's global edge network
- ✅ **Secure:** API key never exposed to users
- ✅ **Rate limiting:** Prevents abuse
- ✅ **Easy to deploy:** One command

## 🚀 Quick Start

### Step 1: Install Wrangler (Cloudflare CLI)

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open your browser to authenticate.

### Step 3: Install Dependencies

```bash
cd wasp-code-proxy
npm install
```

### Step 4: Add Your API Key

```bash
wrangler secret put FRENIX_API_KEY
```

When prompted, paste your Frenix API key:

```
sk-frenix-160cc0c813c7678d814e9feb4a443cbb
```

### Step 5: Deploy

```bash
npm run deploy
```

You'll see output like:

```
✨ Successfully published your Worker!
🌍 https://wasp-code-proxy.YOUR_USERNAME.workers.dev
```

**Copy this URL!** You'll need it for the extension.

### Step 6: Test Your Proxy

Update `test-proxy.js` with your worker URL:

```javascript
const PROXY_URL = "https://wasp-code-proxy.YOUR_USERNAME.workers.dev";
```

Then run:

```bash
npm test
```

You should see:

```
✅ Mistral Large 3 (675B) - WORKING
✅ Qwen3 Coder (480B) - WORKING
✅ Llama 3.1 (405B) - WORKING
✅ Gemini 3 Pro - WORKING
✅ MiniMax M2.5 - WORKING

🎉 All tests passed! Your proxy is working perfectly!
```

## 🔧 Update Extension Config

Now update your Wasp Code extension to use the proxy:

### Option A: Update Default Config (All Users)

Edit `continue/core/config/default.ts`:

```typescript
export const defaultConfig: ConfigYaml = {
  name: "Local Config",
  version: "1.0.0",
  schema: "v1",
  models: [
    {
      title: "🏆 Mistral Large 3 (675B) - BIGGEST MODEL",
      provider: "openai",
      model: "provider-1/mistral-large-3-675b-instruct-2512",
      // No apiKey needed! Proxy handles it
      apiBase: "https://wasp-code-proxy.YOUR_USERNAME.workers.dev",
    },
    // ... rest of models
  ],
};
```

### Option B: Update Your Personal Config

Edit `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "🏆 Mistral Large 3 (675B)",
      "provider": "openai",
      "model": "provider-1/mistral-large-3-675b-instruct-2512",
      "apiBase": "https://wasp-code-proxy.YOUR_USERNAME.workers.dev"
    }
  ]
}
```

**Note:** Remove `apiKey` field - the proxy handles authentication!

## 📊 Usage & Costs

### Free Tier (Cloudflare Workers)

- **100,000 requests/day** (3 million/month)
- **FREE forever**
- Perfect for up to 10,000 users

### Paid Tier ($5/month)

- **10 million requests/month**
- **$0.50 per additional million**
- Scales to 100,000+ users

### Example Costs:

```
1,000 users × 10 req/day = 300K req/month → FREE
10,000 users × 10 req/day = 3M req/month → FREE
50,000 users × 10 req/day = 15M req/month → $7.50/month
100,000 users × 10 req/day = 30M req/month → $15/month
```

## 🔐 Security Features

### Rate Limiting

- 100 requests per hour per user
- Prevents abuse and excessive costs
- Returns 429 status when exceeded

### User Identification

- Uses `X-User-ID` header (optional)
- Falls back to "anonymous" if not provided
- Can be extended for authentication

### CORS Support

- Allows requests from any origin
- Handles preflight OPTIONS requests
- Safe for browser-based extensions

## 🛠️ Development

### Run Locally

```bash
npm run dev
```

Your worker will be available at `http://localhost:8787`

### Test Locally

```bash
# Update test-proxy.js to use localhost
const PROXY_URL = 'http://localhost:8787';

# Run test
npm test
```

### View Logs

```bash
wrangler tail
```

### Update Worker

```bash
npm run deploy
```

## 📈 Monitoring

### View Analytics

1. Go to https://dash.cloudflare.com
2. Select "Workers & Pages"
3. Click "wasp-code-proxy"
4. View requests, errors, CPU time

### Check Usage

```bash
wrangler metrics
```

## 🔄 Updating

### Update API Key

```bash
wrangler secret put FRENIX_API_KEY
```

### Update Code

1. Edit `src/index.js`
2. Run `npm run deploy`
3. Changes are live immediately!

### Update Rate Limits

Edit `src/index.js`:

```javascript
const RATE_LIMIT = 200; // Change from 100 to 200
```

Then deploy:

```bash
npm run deploy
```

## 🎯 Advanced Features

### Add Authentication

```javascript
// In src/index.js, add before rate limiting:

const VALID_API_KEYS = ["user-key-1", "user-key-2"];

const userApiKey = request.headers.get("X-API-Key");
if (!VALID_API_KEYS.includes(userApiKey)) {
  return new Response(
    JSON.stringify({
      error: "Invalid API key",
    }),
    {
      status: 401,
      headers: corsHeaders,
    },
  );
}
```

### Add Usage Quotas

```javascript
// Track usage per user
const userUsage = await env.USAGE_DB.get(userId);
if (userUsage > 1000) {
  return new Response(
    JSON.stringify({
      error: "Monthly quota exceeded",
    }),
    {
      status: 429,
      headers: corsHeaders,
    },
  );
}
```

### Add Analytics

```javascript
// Send to analytics service
await fetch("https://your-analytics.com/track", {
  method: "POST",
  body: JSON.stringify({
    userId,
    model: body.model,
    timestamp: Date.now(),
  }),
});
```

## 🆘 Troubleshooting

### "Worker not found" error

- Make sure you deployed: `npm run deploy`
- Check your worker URL is correct

### "Authentication required" error

- API key not set: `wrangler secret put FRENIX_API_KEY`
- Check key is correct

### "Rate limit exceeded" error

- User has made 100+ requests in last hour
- Wait or increase rate limit in code

### "CORS error" in browser

- Check CORS headers are set correctly
- Make sure OPTIONS requests are handled

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Frenix API Docs](https://api.frenix.sh/docs)

## 🎉 Success!

Your proxy is now live and handling requests for all Wasp Code users!

**Next Steps:**

1. ✅ Deploy worker
2. ✅ Test with `npm test`
3. ✅ Update extension config
4. ✅ Rebuild extension
5. ✅ Publish to VS Code Marketplace

**Users will now have zero-setup AI coding with 20 powerful models!** 🚀
