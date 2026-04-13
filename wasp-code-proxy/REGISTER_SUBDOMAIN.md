# 🌐 Register Workers.dev Subdomain

## You need to register a workers.dev subdomain before deploying!

### Step 1: Open Cloudflare Dashboard

Click this link or copy to browser:

```
https://dash.cloudflare.com/856494140e80d129b69f9bf3bc1f2c8e/workers/onboarding
```

### Step 2: Register Subdomain

1. You'll see a page asking for a subdomain name
2. Enter a name like: `waspcode` or `yourname` or `anything-you-want`
3. Your worker will be available at: `https://wasp-code-proxy.YOUR-SUBDOMAIN.workers.dev`
4. Click "Register" or "Continue"

### Step 3: Come Back and Deploy

After registering, run:

```bash
npm run deploy
```

---

## Alternative: Use Wrangler to Register

Run this command:

```bash
wrangler subdomain
```

Follow the prompts to register your subdomain.

---

## What Subdomain Should I Choose?

Choose something related to your project:

- `waspcode`
- `yourname`
- `yourcompany`
- `anything-unique`

This will be part of your worker URL:

```
https://wasp-code-proxy.YOUR-SUBDOMAIN.workers.dev
```

---

## After Registration

Once registered, deploy with:

```bash
npm run deploy
```

You should see:

```
✨ Successfully published your Worker!
🌍 https://wasp-code-proxy.YOUR-SUBDOMAIN.workers.dev
```

**Copy that URL!** You'll need it for the extension config.
