# 🚀 Wasp Code - User Guide

Welcome to **Wasp Code**, your AI-powered coding assistant!

---

## 🎯 Quick Start

### Step 1: Install Wasp Code

Install the extension from VS Code Marketplace (or install the .vsix file manually).

### Step 2: Get Your API Key

Wasp Code comes pre-configured with **20 powerful AI models** from Frenix API, including:

- 🏆 **Mistral Large 3 (675B)** - The biggest model available
- 💻 **Qwen3 Coder (480B)** - Best for coding
- 🦙 **Llama 3.1 (405B)** - Meta's largest
- 🔷 **Gemini 3 Pro** - Google's best
- ⭐ **MiniMax M2.5** - Latest MiniMax
- And 15 more powerful models!

**To get your FREE API key:**

1. Visit: **https://api.frenix.sh** (or your API provider)
2. Sign up for a free account
3. Copy your API key (starts with `sk-frenix-...`)

### Step 3: Configure Your API Key

1. Open VS Code
2. Click the **Wasp Code** icon in the sidebar (Activity Bar)
3. Click the gear icon ⚙️ to open settings
4. Find your `config.yaml` or `config.json` file
5. Replace `YOUR_FRENIX_API_KEY_HERE` with your actual API key

**Example:**

```yaml
models:
  - title: "🏆 Mistral Large 3 (675B) - BIGGEST MODEL"
    provider: openai
    model: provider-1/mistral-large-3-675b-instruct-2512
    apiKey: sk-frenix-YOUR_ACTUAL_KEY_HERE # ← Replace this
    apiBase: https://api.frenix.sh/v1
```

### Step 4: Start Coding!

1. Open any code file
2. Select some code
3. Press `Ctrl+L` (or `Cmd+L` on Mac) to chat with AI
4. Ask questions, get code suggestions, debug issues, and more!

---

## 🎨 Available Models

Wasp Code includes **20 pre-configured models** across multiple providers:

### 🏆 Largest Models (Maximum Power)

- **Mistral Large 3 (675B)** - The absolute biggest
- **Qwen3 Coder (480B)** - Best for coding tasks
- **Llama 3.1 (405B)** - Meta's most capable
- **Qwen 3.5 (397B)** - Huge general model

### 💻 Best for Coding

- **Qwen3 Coder (480B)** - Specialized for code
- **Devstral 2 (123B)** - Mistral's coding model
- **GPT-5.2 Codex** - OpenAI's coding specialist

### ⚡ Fast & Efficient

- **Gemini 3 Flash** - Quick responses
- **Llama 4 Maverick (17B)** - Newest Llama 4
- **Mistral Medium 3** - Balanced performance

### 🌟 Latest & Greatest

- **Llama 3.3 (70B)** - Latest Llama
- **Gemini 3 Pro** - Google's best
- **Qwen3 Max (2026)** - Latest Qwen
- **GLM-5** - Latest ChatGLM
- **Kimi K2.5** - Latest Kimi
- **MiniMax M2.5** - Latest MiniMax

---

## 💡 Features

- ✅ **20 Powerful AI Models** - Choose the best model for your task
- ✅ **Code Generation** - Write code faster with AI assistance
- ✅ **Code Explanation** - Understand complex code instantly
- ✅ **Bug Fixing** - Debug issues with AI help
- ✅ **Refactoring** - Improve code quality
- ✅ **Documentation** - Generate docs automatically
- ✅ **Multi-Language** - Supports all programming languages
- ✅ **Context-Aware** - Understands your entire codebase

---

## 🔧 Configuration Options

### Using Different Models

You can switch between models anytime:

1. Open Wasp Code sidebar
2. Click the model dropdown at the top
3. Select any of the 20 available models

### Adding Custom Models

Want to use your own API? Edit your config file:

```yaml
models:
  - title: "My Custom Model"
    provider: openai
    model: gpt-4
    apiKey: YOUR_OPENAI_KEY
    apiBase: https://api.openai.com/v1
```

### Removing Models

Don't need all 20 models? Simply delete the ones you don't want from your config file.

---

## 🆘 Troubleshooting

### "API Key Required" Error

- Make sure you replaced `YOUR_FRENIX_API_KEY_HERE` with your actual API key
- Check that your API key starts with `sk-frenix-`
- Verify your API key is valid at https://api.frenix.sh

### Models Not Loading

- Restart VS Code after changing config
- Check your internet connection
- Verify the API base URL is correct: `https://api.frenix.sh/v1`

### Slow Responses

- Try using a smaller/faster model like Gemini 3 Flash or Llama 4 Maverick
- Check your internet speed
- Some large models (675B, 480B, 405B) may take longer to respond

---

## 📚 Learn More

- **Documentation:** [Coming Soon]
- **GitHub:** [Your GitHub Repo]
- **Support:** [Your Support Email]
- **API Provider:** https://api.frenix.sh

---

## 🎉 Tips & Tricks

1. **Use the Right Model:**

   - Coding tasks → Qwen3 Coder or Devstral
   - Complex problems → Mistral Large 3 or Llama 3.1 405B
   - Quick questions → Gemini Flash or Llama 4 Maverick

2. **Keyboard Shortcuts:**

   - `Ctrl+L` / `Cmd+L` - Open chat
   - `Ctrl+I` / `Cmd+I` - Inline edit
   - `Ctrl+Shift+R` / `Cmd+Shift+R` - Refactor

3. **Context Selection:**
   - Select code before asking questions for better context
   - Use `@file` to reference specific files
   - Use `@folder` to reference entire folders

---

## 🌟 Why Wasp Code?

- **20 Models in One Extension** - No need to install multiple extensions
- **Largest Models Available** - Access to 675B, 480B, 405B parameter models
- **Best Coding Models** - Specialized models for programming
- **Free to Start** - Get started with Frenix API free tier
- **Privacy Focused** - Your code stays secure
- **Regular Updates** - New models added frequently

---

**Happy Coding! 🚀**

Made with ❤️ by the Wasp Code Team
