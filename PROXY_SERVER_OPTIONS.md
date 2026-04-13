# 🔄 Proxy Server Options for Wasp Code

## 🎯 What is a Proxy Server?

A proxy server sits between your VS Code extension and the Frenix API:

```
User's VS Code Extension → Your Proxy Server → Frenix API
                          (hides your API key)
```

**Benefits:**

- ✅ Users don't need API keys (zero setup!)
- ✅ You control usage and costs
- ✅ Can add authentication, rate limiting, analytics
- ✅ Can monetize (charge users subscription)
- ✅ Better user experience

**Drawbacks:**

- ❌ You pay for ALL API usage
- ❌ Need to build and maintain server
- ❌ Need to prevent abuse
- ❌ Scaling costs money

---

## 🚀 Option 1: Cloudflare Workers (BEST FOR YOU!)

### What is it?

Serverless edge computing platform. Your code runs on Cloudflare's global network.

### Why Cloudflare Workers?

- ✅ **FREE tier:** 100,000 requests/day
- ✅ **Cheap:** $5/month for 10 million requests
- ✅ **Fast:** Runs on edge (close to users)
- ✅ **Simple:** Just JavaScript
- ✅ **No servers:** Fully managed
- ✅ **Global:** Auto-scales worldwide
- ✅ **Built-in security:** DDoS protection

### Cost Breakdown:

```
FREE TIER:
- 100,000 requests/day
- 3 million requests/month
- Perfect for starting out!

PAID ($5/month):
- 10 million requests/month
- $0.50 per additional million
- Still very cheap!
```

### Example Cost Scenarios:

```
1,000 users × 10 requests/day = 10,000 requests/day
→ 300,000 requests/month
→ FREE (under 3M limit)

10,000 users × 10 requests/day = 100,000 requests/day
→ 3 million requests/month
→ FREE (exactly at limit)

50,000 users × 10 requests/day = 500,000 requests/day
→ 15 million requests/month
→ $5/month (10M included) + $2.50 (5M extra) = $7.50/month
```

### Code Example:

```javascript
// Cloudflare Worker (super simple!)
export default {
  async fetch(request) {
    // Get request from VS Code extension
    const body = await request.json();

    // Forward to Frenix API with YOUR key
    const response = await fetch("https://api.frenix.sh/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer sk-frenix-YOUR_KEY",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Return response to extension
    return new Response(await response.text(), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
```

### Deployment:

```bash
# Install Wrangler (Cloudflare CLI)
npm install -g wrangler

# Login
wrangler login

# Create worker
wrangler init wasp-code-proxy

# Deploy
wrangler deploy
```

**Result:** Your proxy is live at `https://wasp-code-proxy.YOUR_USERNAME.workers.dev`

---

## 🌐 Option 2: Vercel Edge Functions

### What is it?

Serverless functions that run on Vercel's edge network.

### Pros:

- ✅ **FREE tier:** 100GB bandwidth/month
- ✅ **Fast:** Edge network
- ✅ **Easy:** Deploy with Git push
- ✅ **TypeScript support:** Built-in

### Cons:

- ⚠️ More expensive than Cloudflare after free tier
- ⚠️ 10-second timeout limit

### Cost:

```
FREE (Hobby):
- 100GB bandwidth/month
- 100,000 requests/month
- Good for starting

PRO ($20/month):
- 1TB bandwidth
- Unlimited requests
- Better for growth
```

### Code Example:

```typescript
// api/proxy.ts
export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  const body = await req.json();

  const response = await fetch("https://api.frenix.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FRENIX_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return new Response(await response.text());
}
```

### Deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 🔥 Option 3: AWS Lambda (Scalable but Complex)

### What is it?

Amazon's serverless compute service.

### Pros:

- ✅ **Massive scale:** Handles millions of requests
- ✅ **Pay per use:** Only pay for what you use
- ✅ **AWS ecosystem:** Integrates with other AWS services

### Cons:

- ❌ **Complex:** Harder to set up
- ❌ **Cold starts:** Can be slow
- ❌ **More expensive:** Than Cloudflare/Vercel

### Cost:

```
FREE TIER (12 months):
- 1 million requests/month
- 400,000 GB-seconds compute

AFTER FREE TIER:
- $0.20 per 1 million requests
- $0.0000166667 per GB-second
- API Gateway: $3.50 per million requests
```

### Example:

```javascript
// lambda/proxy.js
exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const response = await fetch("https://api.frenix.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FRENIX_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return {
    statusCode: 200,
    body: await response.text(),
  };
};
```

---

## 🐳 Option 4: Traditional Server (Node.js + Express)

### What is it?

Your own server running 24/7 on a VPS or cloud provider.

### Pros:

- ✅ **Full control:** Do whatever you want
- ✅ **No cold starts:** Always running
- ✅ **Predictable costs:** Fixed monthly price

### Cons:

- ❌ **Maintenance:** You manage everything
- ❌ **Scaling:** Manual work
- ❌ **Always running:** Pay even when idle

### Cost:

```
DigitalOcean Droplet:
- $6/month: 1GB RAM, 1 CPU
- $12/month: 2GB RAM, 1 CPU
- $24/month: 4GB RAM, 2 CPU

AWS EC2:
- $8/month: t3.micro
- $16/month: t3.small
- $32/month: t3.medium
```

### Code Example:

```javascript
// server.js
const express = require("express");
const app = express();

app.post("/api/chat", async (req, res) => {
  const response = await fetch("https://api.frenix.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FRENIX_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  res.json(await response.json());
});

app.listen(3000);
```

---

## 📊 COMPARISON TABLE

| Feature                  | Cloudflare Workers | Vercel Edge    | AWS Lambda   | Traditional Server |
| ------------------------ | ------------------ | -------------- | ------------ | ------------------ |
| **Free Tier**            | 100K req/day       | 100K req/month | 1M req/month | None               |
| **Cost (10M req/month)** | $5                 | $20            | ~$25         | $6-24              |
| **Setup Difficulty**     | ⭐ Easy            | ⭐ Easy        | ⭐⭐⭐ Hard  | ⭐⭐ Medium        |
| **Cold Starts**          | ✅ None            | ✅ None        | ❌ Yes       | ✅ None            |
| **Global Edge**          | ✅ Yes             | ✅ Yes         | ❌ No        | ❌ No              |
| **Maintenance**          | ✅ Zero            | ✅ Zero        | ⚠️ Low       | ❌ High            |
| **Scaling**              | ✅ Auto            | ✅ Auto        | ✅ Auto      | ❌ Manual          |
| **Best For**             | 🏆 Most users      | Vercel users   | Enterprise   | Full control       |

---

## 🎯 MY RECOMMENDATION: Cloudflare Workers

### Why?

1. **Cheapest:** $5/month for 10M requests (vs $20+ elsewhere)
2. **Easiest:** Deploy in 5 minutes
3. **Fastest:** Global edge network
4. **Most generous free tier:** 100K requests/day
5. **No maintenance:** Fully managed
6. **Perfect for your use case:** Simple proxy, no complex logic

### Cost Projection:

```
Month 1 (100 users):
- ~30,000 requests
- Cost: $0 (FREE tier)

Month 3 (1,000 users):
- ~300,000 requests
- Cost: $0 (FREE tier)

Month 6 (10,000 users):
- ~3,000,000 requests
- Cost: $0 (FREE tier!)

Month 12 (50,000 users):
- ~15,000,000 requests
- Cost: $7.50/month

Year 2 (100,000 users):
- ~30,000,000 requests
- Cost: $15/month
```

**Even with 100,000 users, you'd only pay $15/month for the proxy!**

---

## 🔐 Security Features to Add

### 1. Rate Limiting

```javascript
// Limit users to 100 requests/hour
const rateLimiter = new Map();

function checkRateLimit(userId) {
  const now = Date.now();
  const userRequests = rateLimiter.get(userId) || [];

  // Remove old requests (older than 1 hour)
  const recentRequests = userRequests.filter((time) => now - time < 3600000);

  if (recentRequests.length >= 100) {
    return false; // Rate limit exceeded
  }

  recentRequests.push(now);
  rateLimiter.set(userId, recentRequests);
  return true;
}
```

### 2. Authentication

```javascript
// Simple API key authentication
const VALID_KEYS = new Set(["user-key-1", "user-key-2"]);

function authenticate(request) {
  const apiKey = request.headers.get("X-API-Key");
  return VALID_KEYS.has(apiKey);
}
```

### 3. Usage Tracking

```javascript
// Track usage per user
const usage = new Map();

function trackUsage(userId, tokens) {
  const current = usage.get(userId) || 0;
  usage.set(userId, current + tokens);
}
```

---

## 💰 Monetization Strategy with Proxy

### Free Tier:

- 10 requests/day per user
- Access to 5 models
- Community support

### Pro Tier ($9.99/month):

- 1,000 requests/day
- Access to all 20 models
- Priority support
- No rate limits

### Enterprise Tier ($49.99/month):

- Unlimited requests
- Dedicated support
- Custom models
- SLA guarantee

### Revenue Projection:

```
Month 6:
- 10,000 free users (cost: $0)
- 100 pro users ($999/month revenue)
- Proxy cost: $0 (free tier)
- Frenix API cost: ~$200
- Profit: $799/month

Month 12:
- 50,000 free users (cost: $7.50)
- 500 pro users ($4,995/month revenue)
- Proxy cost: $7.50
- Frenix API cost: ~$1,000
- Profit: $3,987/month

Year 2:
- 100,000 free users (cost: $15)
- 2,000 pro users ($19,980/month revenue)
- Proxy cost: $15
- Frenix API cost: ~$4,000
- Profit: $15,965/month
```

---

## 🚀 Quick Start: Cloudflare Workers Setup

### Step 1: Create Worker (5 minutes)

```bash
npm install -g wrangler
wrangler login
wrangler init wasp-code-proxy
cd wasp-code-proxy
```

### Step 2: Write Code (2 minutes)

```javascript
// src/index.js
export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle OPTIONS (preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Get request body
    const body = await request.json();

    // Forward to Frenix
    const response = await fetch("https://api.frenix.sh/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.FRENIX_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Return response
    const data = await response.text();
    return new Response(data, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  },
};
```

### Step 3: Add API Key (1 minute)

```bash
wrangler secret put FRENIX_API_KEY
# Paste: sk-frenix-160cc0c813c7678d814e9feb4a443cbb
```

### Step 4: Deploy (1 minute)

```bash
wrangler deploy
```

**Done! Your proxy is live at:**
`https://wasp-code-proxy.YOUR_USERNAME.workers.dev`

### Step 5: Update Extension Config

```typescript
// In continue/core/config/default.ts
apiBase: "https://wasp-code-proxy.YOUR_USERNAME.workers.dev";
// Remove apiKey (not needed anymore!)
```

---

## 🎯 Final Recommendation

**Use Cloudflare Workers because:**

1. ✅ **FREE for first 3M requests/month** (enough for 10,000 users!)
2. ✅ **$5/month for 10M requests** (super cheap)
3. ✅ **Deploy in 10 minutes** (easiest option)
4. ✅ **Zero maintenance** (fully managed)
5. ✅ **Global edge network** (fast everywhere)
6. ✅ **Built-in DDoS protection** (secure)
7. ✅ **Easy to monetize** (add auth, rate limiting)

**Start with Cloudflare Workers, then:**

- If you need more features → Add authentication, rate limiting
- If you outgrow it → Migrate to AWS Lambda (unlikely!)
- If you want to monetize → Add subscription tiers

---

**Want me to create the complete Cloudflare Worker code for you?** 🚀
