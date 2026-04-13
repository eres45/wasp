# Wasp Code - AI-Powered VS Code Extension

A production-ready VS Code extension with 20 AI models and zero-setup Cloudflare proxy.

## 🚀 Quick Start

### One-Command Installation

```powershell
irm https://raw.githubusercontent.com/eres45/wasp/main/install.ps1 | iex
```

### Manual Installation

1. Download `wasp-code-1.0.0.vsix` from [Releases](https://github.com/eres45/wasp/releases)
2. Run in PowerShell:
   ```powershell
   code --install-extension wasp-code-1.0.0.vsix
   ```
3. Reload VS Code
4. Open the Wasp Code sidebar (icon in activity bar)

## ✨ Features

- **20 AI Models** from top providers
- **Zero Setup** - Cloudflare proxy handles API access
- **Sidebar Chat** - Like GitHub Copilot
- **Rate Limiting** - 100 requests/hour per user
- **No API Keys** - Proxy manages authentication
- **Fast & Reliable** - Cloudflare global network

## 🤖 Available Models

### Meta Llama (4 models)

- llama-4-maverick
- llama-3.1-405b
- llama-3.3-70b
- llama-3.1-70b

### Qwen (4 models)

- qwen3-coder-480b
- qwen3.5-397b
- qwen3.5-122b
- qwen3-max-2026

### Mistral (3 models)

- mistral-large-3-675b
- devstral-2-123b
- mistral-medium-3

### Google Gemini (3 models)

- gemini-3-pro
- gemini-2.5-pro
- gemini-3-flash

### Other Providers (6 models)

- GLM-5, GLM-4.7
- DeepSeek-v3.1-terminus
- OpenAI gpt-5.2-codex
- Kimi-k2.5
- MiniMax-M2.5

## 🔧 Configuration

Models are configured in `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "🦙 Llama 4 Maverick",
      "provider": "frenix",
      "model": "llama-4-maverick",
      "apiBase": "https://wasp-code-proxy.waspproxy.workers.dev"
    }
  ]
}
```

## 📊 Architecture

```
┌─────────────────────────────────────────┐
│     VS Code Extension (Wasp Code)       │
│  - Sidebar chat interface               │
│  - Model selection                      │
│  - Message history                      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   Cloudflare Worker Proxy               │
│  - Rate limiting (100 req/hour)         │
│  - CORS handling                        │
│  - API key management                   │
│  - Usage tracking                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     Frenix API (20 Models)              │
│  - Meta Llama                           │
│  - Qwen                                 │
│  - Mistral                              │
│  - Google Gemini                        │
│  - And more...                          │
└─────────────────────────────────────────┘
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm 9+
- VS Code 1.80+

### Setup

```bash
# Clone repository
git clone https://github.com/eres45/wasp.git
cd wasp

# Install dependencies
npm install
cd core && npm install
cd ../gui && npm install
cd ../extensions/vscode && npm install --legacy-peer-deps

# Build extension
npm run package
```

### Development Mode

```bash
# Terminal 1: TypeScript watcher
npm run watch

# Terminal 2: GUI dev server
cd gui && npm run dev

# Terminal 3: VS Code extension watcher
cd extensions/vscode && npm run watch
```

Then press F5 in VS Code to launch the extension in debug mode.

## 📦 Building

```bash
cd extensions/vscode
npm run package
```

Output: `build/wasp-code-1.0.0.vsix`

## 🚀 Deployment

### GitHub Release

1. Create GitHub Personal Access Token: https://github.com/settings/tokens/new
2. Run:
   ```powershell
   $env:GITHUB_TOKEN = "your_token"
   .\create-release.ps1
   ```

### Manual Release

1. Go to: https://github.com/eres45/wasp/releases
2. Create new release for tag `v1.0.0`
3. Upload `extensions/vscode/build/wasp-code-1.0.0.vsix`
4. Publish

## 🔐 Security

- **No API Keys in Extension** - Proxy handles authentication
- **Rate Limiting** - Prevents abuse (100 req/hour per user)
- **CORS Protected** - Only VS Code can access proxy
- **User Isolation** - Each user tracked separately
- **Cloudflare DDoS Protection** - Built-in security

## 📝 License

MIT - See LICENSE file

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📞 Support

- **Issues**: https://github.com/eres45/wasp/issues
- **Discussions**: https://github.com/eres45/wasp/discussions

## 🎯 Roadmap

- [ ] VS Code Marketplace publication
- [ ] JetBrains IDE support
- [ ] Custom model configuration
- [ ] Code generation features
- [ ] Debugging integration
- [ ] Git integration

## 📊 Stats

- **Models**: 20 from 9 providers
- **Rate Limit**: 100 requests/hour
- **Proxy Cost**: FREE for 3M requests/month
- **Extension Size**: 73.9 MB
- **Build Time**: ~2 minutes

---

**Made with ❤️ by Wasp Code Team**
