# 🧪 Frenix API - Model Test Results

**Test Date:** April 12, 2026  
**API Key:** `sk-frenix-160cc0c813c7678d814e9feb4a443cbb`  
**Base URL:** `https://api.frenix.sh/v1`  
**Rate Limit:** 10 RPM (6 second delays)

---

## ✅ WORKING MODELS (19+ confirmed)

### 🥇 OpenAI (1/4 working)

- ✅ **provider-1/gpt-5.2-codex** - Code specialist
- ❌ gpt-5.4 - Failed
- ❌ provider-1/gpt-5.3-codex - Failed
- ❌ provider-1/gpt-4o - Failed

### 🥇 Anthropic/Claude (0/4 working)

- ❌ provider-1/claude-opus-4-6 - Failed
- ❌ provider-1/claude-opus-4-5 - Failed
- ❌ provider-1/claude-sonnet-4-6 - Failed
- ❌ provider-4/claude-haiku-4-5 - Auth error

### 🥇 Google/Gemini (3/4 working) ⭐

- ✅ **provider-1/gemini-3-pro** - Gemini 3 Pro
- ✅ **provider-1/gemini-2.5-pro** - Stable Pro
- ✅ **provider-1/gemini-3-flash** - Fast
- ❌ provider-1/gemini-3.1-pro - Failed

### 🥇 Meta/Llama (4/4 working) 🏆 PERFECT!

- ✅ **provider-1/llama-4-maverick-17b-128e-instruct** - Newest Llama 4
- ✅ **provider-1/llama-3.1-405b-instruct** - Largest (405B)
- ✅ **provider-1/llama-3.3-70b-instruct** - Latest 70B
- ✅ **provider-1/llama-3.1-70b-instruct** - Stable 70B

### 🥇 Mistral (3/4 working) ⭐

- ✅ **provider-1/mistral-large-3-675b-instruct-2512** - HUGE (675B!)
- ✅ **provider-1/devstral-2-123b-instruct-2512** - For coding
- ✅ **provider-1/mistral-medium-3-instruct** - Balanced
- ❌ provider-1/mistral-large-2-instruct - Failed

### 🥇 DeepSeek (1/4 working)

- ✅ **provider-1/deepseek-v3.1-terminus** - Specialized
- ❌ deepseek-v3.2 - Failed
- ❌ deepseek-v3.1 - Failed
- ❌ provider-1/deepseek-r1-distill-qwen-32b - Failed

### 🥇 Qwen (4/4 working) 🏆 PERFECT!

- ✅ **provider-1/qwen3-coder-480b-a35b-instruct** - MASSIVE coding (480B!)
- ✅ **provider-1/qwen3.5-397b-a17b** - Huge (397B)
- ✅ **provider-1/qwen3.5-122b-a10b** - Large (122B)
- ✅ **provider-1/qwen3-max-2026-01-23** - Latest Max

### 🥇 MiniMax (1/3 working)

- ✅ **MiniMax-M2.5** - Latest (WORKING!)
- ❌ minimax-m2.5 - Failed (lowercase doesn't work)
- ❌ minimax-m2.1 - Failed

### 🥇 GLM/ChatGLM (2/4 working)

- ✅ **provider-1/glm-5** - Latest GLM
- ✅ **glm-4.7** - GLM 4.7
- ❌ glm4.7 - Failed
- ❌ glm-4 - Failed

### 🥇 Kimi (1+ working, test in progress)

- ✅ **kimi-k2.5** - Latest
- ⏳ provider-1/kimi-k2-thinking - Testing...
- ⏳ provider-1/kimi-k2-instruct - Pending
- ⏳ provider-1/kimi-k2-instruct-0905 - Pending

### 🥇 Microsoft Phi (Testing in progress)

- ⏳ provider-1/phi-4-multimodal-instruct - Pending
- ⏳ provider-1/phi-4-mini-instruct - Pending
- ⏳ provider-1/phi-4-mini-flash-reasoning - Pending
- ⏳ provider-1/phi-3.5-moe-instruct - Pending

### 🥇 Nvidia Nemotron (Testing in progress)

- ⏳ provider-1/llama-3.1-nemotron-ultra-253b-v1 - Pending
- ⏳ provider-1/nemotron-4-340b-instruct - Pending
- ⏳ llama-3.3-nemotron-super-49b-v1.5 - Pending
- ⏳ provider-1/llama-3.1-nemotron-70b-instruct - Pending

### 🥇 Granite (IBM) (Testing in progress)

- ⏳ provider-1/granite-3.3-8b-instruct - Pending
- ⏳ provider-1/granite-34b-code-instruct - Pending
- ⏳ provider-1/granite-3.0-8b-instruct - Pending
- ⏳ provider-1/granite-guardian-3.0-8b - Pending

### 🥇 Gemma (Google) (Testing in progress)

- ⏳ provider-1/gemma-3-27b-it - Pending
- ⏳ provider-1/gemma-3-12b-it - Pending
- ⏳ provider-1/gemma-2-27b-it - Pending
- ⏳ provider-1/gemma-3-4b-it - Pending

### 🥇 Jamba (AI21) (Testing in progress)

- ⏳ provider-1/jamba-1.5-large-instruct - Pending
- ⏳ provider-1/jamba-1.5-mini-instruct - Pending

### 🥇 Palmyra (Writer) (Testing in progress)

- ⏳ provider-1/palmyra-creative-122b - Pending
- ⏳ provider-1/palmyra-fin-70b-32k - Pending
- ⏳ provider-1/palmyra-med-70b-32k - Pending
- ⏳ provider-1/palmyra-med-70b - Pending

### 🥇 Frenix Custom (Testing in progress)

- ⏳ frenix-axion-pro - Pending
- ⏳ axion-pro - Pending
- ⏳ axion-1.5-pro - Pending

---

## 🏆 TOP RECOMMENDATIONS FOR WASP CODE

Based on confirmed working models:

### Option 1: Maximum Power (Largest Models)

```json
{
  "models": [
    {
      "title": "Mistral Large 3 (675B) - MASSIVE",
      "provider": "openai",
      "model": "provider-1/mistral-large-3-675b-instruct-2512",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Qwen3 Coder (480B) - CODING BEAST",
      "provider": "openai",
      "model": "provider-1/qwen3-coder-480b-a35b-instruct",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Llama 3.1 (405B) - META'S LARGEST",
      "provider": "openai",
      "model": "provider-1/llama-3.1-405b-instruct",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    }
  ]
}
```

### Option 2: Best for Coding

```json
{
  "models": [
    {
      "title": "Qwen3 Coder 480B - Best Coding Model",
      "provider": "openai",
      "model": "provider-1/qwen3-coder-480b-a35b-instruct",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "GPT-5.2 Codex - OpenAI Coding",
      "provider": "openai",
      "model": "provider-1/gpt-5.2-codex",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Devstral 2 123B - Mistral Coding",
      "provider": "openai",
      "model": "provider-1/devstral-2-123b-instruct-2512",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    }
  ]
}
```

### Option 3: Balanced Performance

```json
{
  "models": [
    {
      "title": "Llama 3.3 70B - Latest Llama",
      "provider": "openai",
      "model": "provider-1/llama-3.3-70b-instruct",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Gemini 3 Pro - Google's Best",
      "provider": "openai",
      "model": "provider-1/gemini-3-pro",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Qwen 3.5 122B - Powerful Qwen",
      "provider": "openai",
      "model": "provider-1/qwen3.5-122b-a10b",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    }
  ]
}
```

### Option 4: Include MiniMax (Your Original Choice)

```json
{
  "models": [
    {
      "title": "MiniMax M2.5 - Latest MiniMax",
      "provider": "openai",
      "model": "MiniMax-M2.5",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Qwen3 Coder 480B - Best Coding",
      "provider": "openai",
      "model": "provider-1/qwen3-coder-480b-a35b-instruct",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Llama 3.3 70B - Balanced",
      "provider": "openai",
      "model": "provider-1/llama-3.3-70b-instruct",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    }
  ]
}
```

---

## 📊 STATISTICS (So Far)

- **Total Tested:** 36/64 models
- **Working:** 19 models (53% success rate)
- **Failed:** 17 models
- **Pending:** 28 models

### Best Performing Providers:

1. 🥇 **Meta/Llama:** 4/4 (100%)
2. 🥇 **Qwen:** 4/4 (100%)
3. 🥈 **Mistral:** 3/4 (75%)
4. 🥈 **Google/Gemini:** 3/4 (75%)
5. 🥉 **GLM:** 2/4 (50%)

### Worst Performing Providers:

- ❌ **Anthropic/Claude:** 0/4 (0%) - All failed
- ⚠️ **DeepSeek:** 1/4 (25%)
- ⚠️ **OpenAI:** 1/4 (25%)

---

## 🎯 MY RECOMMENDATION

Use **Option 1: Maximum Power** with these 3 models:

1. **Mistral Large 3 (675B)** - The BIGGEST model available
2. **Qwen3 Coder (480B)** - Best for coding tasks
3. **Llama 3.1 (405B)** - Meta's most capable model

All three are confirmed working and represent the absolute best in terms of size and capability!

---

**Note:** Test still running in background. Will update with remaining results.
