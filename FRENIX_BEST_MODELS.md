# 🏆 Frenix API - Best & Latest Models by Provider

## 📊 Top Tier Models (Recommended for Wasp Code)

### 🥇 **OpenAI Models**

#### Latest & Best:

1. **provider-1/gpt-5.4** ⭐ NEWEST

   - Latest GPT-5 series model
   - Best for complex reasoning and coding

2. **provider-1/gpt-5.3-codex** 💻 CODING

   - Specialized for code generation
   - Best for programming tasks

3. **provider-1/gpt-5.2-codex** 💻 CODING

   - Code-focused model
   - Alternative to 5.3

4. **provider-1/gpt-4o** 🔥 POPULAR

   - GPT-4 Optimized
   - Fast and capable

5. **provider-1/gpt-4o-mini** ⚡ FAST
   - Lightweight version
   - Quick responses

---

### 🥇 **Anthropic (Claude) Models**

#### Latest & Best:

1. **provider-1/claude-opus-4-6** ⭐ NEWEST

   - Latest Claude Opus (most capable)
   - Best for complex tasks

2. **provider-1/claude-sonnet-4-6** 🎯 BALANCED

   - Latest Sonnet (balanced performance)
   - Good speed/quality ratio

3. **provider-4/claude-haiku-4-5** ⚡ FAST
   - Latest Haiku (fastest)
   - Quick responses

---

### 🥇 **Google (Gemini) Models**

#### Latest & Best:

1. **provider-1/gemini-3.1-pro** ⭐ NEWEST

   - Latest Gemini Pro
   - Most capable Gemini

2. **provider-1/gemini-3-pro** 🎯 POWERFUL

   - Gemini 3 Pro
   - Strong performance

3. **provider-1/gemini-2.5-pro** 💪 STABLE

   - Gemini 2.5 Pro
   - Proven reliability

4. **provider-1/gemini-3-flash** ⚡ FAST
   - Latest Flash model
   - Quick responses

---

### 🥇 **Meta (Llama) Models**

#### Latest & Best:

1. **provider-1/llama-4-maverick-17b-128e-instruct** ⭐ NEWEST

   - Latest Llama 4 series
   - Cutting edge

2. **provider-1/llama-4-scout-17b-16e-instruct** 🆕 NEW

   - Llama 4 Scout variant
   - Latest generation

3. **provider-1/llama-3.3-70b-instruct** 💪 POWERFUL

   - Llama 3.3 70B
   - Strong performance

4. **provider-1/llama-3.1-405b-instruct** 🏆 LARGEST

   - Massive 405B model
   - Most capable Llama

5. **provider-1/llama-3.1-70b-instruct** 🎯 BALANCED
   - 70B model
   - Good balance

---

### 🥇 **Mistral Models**

#### Latest & Best:

1. **provider-1/mistral-large-3-675b-instruct-2512** ⭐ NEWEST

   - Latest Mistral Large (675B!)
   - Most powerful

2. **provider-1/mistral-small-3.1-24b-instruct-2503** 🆕 NEW

   - Latest Small model
   - Efficient

3. **provider-1/mistral-medium-3-instruct** 🎯 BALANCED

   - Medium tier
   - Good performance

4. **provider-1/devstral-2-123b-instruct-2512** 💻 CODING
   - Code-specialized
   - For development

---

### 🥇 **DeepSeek Models**

#### Latest & Best:

1. **provider-1/deepseek-v3.2** ⭐ NEWEST

   - Latest version
   - Most advanced

2. **provider-1/deepseek-v3.1** 💪 POWERFUL

   - V3.1 series
   - Strong reasoning

3. **provider-1/deepseek-v3.1-terminus** 🎯 SPECIALIZED

   - Terminus variant
   - Specialized tasks

4. **provider-1/deepseek-r1-distill-qwen-32b** 🧠 REASONING
   - R1 reasoning model
   - 32B parameters

---

### 🥇 **Qwen Models**

#### Latest & Best:

1. **provider-1/qwen3.5-397b-a17b** ⭐ LARGEST

   - Massive 397B model
   - Most capable

2. **provider-1/qwen3.5-122b-a10b** 💪 POWERFUL

   - 122B model
   - Strong performance

3. **provider-1/qwen3.5-plus** 🎯 OPTIMIZED

   - Plus variant
   - Enhanced version

4. **provider-1/qwen3-max-2026-01-23** 🆕 LATEST

   - Max model (2026)
   - Very recent

5. **provider-1/qwen3-coder-480b-a35b-instruct** 💻 CODING
   - Massive code model (480B!)
   - Best for coding

---

### 🥇 **Other Notable Models**

#### GLM (ChatGLM):

- **provider-1/glm-5** ⭐ NEWEST
- **provider-1/glm-4.7** 💪 POWERFUL

#### Kimi:

- **provider-1/kimi-k2.5** ⭐ NEWEST (appears twice, likely latest)
- **provider-1/kimi-k2-thinking** 🧠 REASONING

#### Phi (Microsoft):

- **provider-1/phi-4-multimodal-instruct** ⭐ NEWEST
- **provider-1/phi-4-mini-instruct** ⚡ FAST

---

## 🎯 **RECOMMENDED CONFIGURATION FOR WASP CODE**

### Option 1: Best Overall (Mixed Providers)

```json
{
  "models": [
    {
      "title": "GPT-5.4 (Best Overall)",
      "provider": "openai",
      "model": "provider-1/gpt-5.4",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Claude Opus 4.6 (Most Capable)",
      "provider": "openai",
      "model": "provider-1/claude-opus-4-6",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Gemini 3.1 Pro (Google's Best)",
      "provider": "openai",
      "model": "provider-1/gemini-3.1-pro",
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
      "title": "GPT-5.3 Codex (OpenAI Coding)",
      "provider": "openai",
      "model": "provider-1/gpt-5.3-codex",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Qwen3 Coder 480B (Massive Code Model)",
      "provider": "openai",
      "model": "provider-1/qwen3-coder-480b-a35b-instruct",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "DeepSeek V3.2 (Latest DeepSeek)",
      "provider": "openai",
      "model": "provider-1/deepseek-v3.2",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    }
  ]
}
```

### Option 3: Speed & Efficiency

```json
{
  "models": [
    {
      "title": "GPT-4o Mini (Fast OpenAI)",
      "provider": "openai",
      "model": "provider-1/gpt-4o-mini",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Claude Haiku 4.5 (Fast Claude)",
      "provider": "openai",
      "model": "provider-4/claude-haiku-4-5",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Gemini 3 Flash (Fast Google)",
      "provider": "openai",
      "model": "provider-1/gemini-3-flash",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    }
  ]
}
```

### Option 4: Maximum Power (Largest Models)

```json
{
  "models": [
    {
      "title": "Mistral Large 3 (675B!)",
      "provider": "openai",
      "model": "provider-1/mistral-large-3-675b-instruct-2512",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Qwen 3.5 (397B)",
      "provider": "openai",
      "model": "provider-1/qwen3.5-397b-a17b",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    },
    {
      "title": "Llama 3.1 (405B)",
      "provider": "openai",
      "model": "provider-1/llama-3.1-405b-instruct",
      "apiKey": "sk-frenix-160cc0c813c7678d814e9feb4a443cbb",
      "apiBase": "https://api.frenix.sh/v1"
    }
  ]
}
```

---

## 🎯 **MY TOP RECOMMENDATION**

For Wasp Code extension, I recommend **Option 1: Best Overall** because:

- ✅ **GPT-5.4**: Latest OpenAI model, excellent for general tasks
- ✅ **Claude Opus 4.6**: Best reasoning and complex tasks
- ✅ **Gemini 3.1 Pro**: Strong alternative with different strengths

This gives you the best of all three major providers with their latest flagship models!
