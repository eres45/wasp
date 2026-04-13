# Wasp Code - AI-Powered Code Agent

**Fast. Intelligent. Yours.**

Wasp Code is an open-source AI code agent that integrates with VS Code, JetBrains IDEs, and the command line. Write code faster with AI-powered chat, autocomplete, and intelligent code editing.

## Features

✨ **AI Chat** - Ask questions about your code, get explanations, and get suggestions  
⚡ **Tab Autocomplete** - Context-aware code completion as you type  
✏️ **Code Editing** - Edit code with natural language instructions  
🔍 **Codebase Indexing** - Intelligent indexing for fast code retrieval  
🧠 **Multiple LLM Support** - Use OpenAI, Claude, Ollama, or any LLM provider  
🔌 **Extensible** - Build custom tools and integrations  
🚀 **Fast & Lightweight** - Optimized for performance

## Quick Start

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/wasp-code.git
cd wasp-code
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start development:**

```bash
npm run tsc:watch
cd gui && npm run dev
cd extensions/vscode && npm run esbuild-watch
```

4. **Open VS Code and press F5** to launch the extension

### Configuration

Create `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "GPT-4",
      "provider": "openai",
      "model": "gpt-4",
      "apiKey": "sk-..."
    }
  ]
}
```

## Documentation

- **[Quick Start](./QUICK_START.md)** - Get up and running in 5 minutes
- **[Setup Guide](./WASP_CODE_SETUP.md)** - Detailed development setup
- **[Rebranding Checklist](./REBRANDING_CHECKLIST.md)** - Customize for your brand
- **[Architecture](./docs/ARCHITECTURE.md)** - How Wasp Code works
- **[Contributing](./CONTRIBUTING.md)** - How to contribute

## Supported LLM Providers

- **OpenAI** - GPT-4, GPT-3.5-turbo
- **Anthropic** - Claude 3 (Opus, Sonnet, Haiku)
- **Ollama** - Self-hosted open source models
- **Together** - Open source model inference
- **Replicate** - Model inference API
- **AWS Bedrock** - Enterprise LLM access
- **Google Generative AI** - Gemini models
- **And more...**

## Project Structure

```
wasp-code/
├── core/                    # Shared business logic
│   ├── llm/                # LLM provider integration
│   ├── indexing/           # Codebase indexing
│   ├── autocomplete/       # Tab completion
│   ├── edit/               # Code editing
│   ├── config/             # Configuration management
│   └── context/            # Context providers
├── gui/                     # React web interface
├── extensions/
│   ├── vscode/             # VS Code extension
│   ├── cli/                # Command-line tool
│   └── intellij/           # JetBrains plugin
├── packages/               # Shared libraries
├── docs/                   # Documentation
└── scripts/                # Build scripts
```

## Development

### Commands

```bash
# Type checking
npm run tsc:check

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test

# Build
npm run build

# Format code
npm run format
```

### Requirements

- Node.js 20.20.1+
- npm or yarn
- Git

### Optional

- Rust (for sync module)
- Python (for some build tools)

## Architecture

Wasp Code follows a modular architecture:

1. **Core** - Shared business logic (LLM integration, indexing, editing)
2. **GUI** - React-based web interface
3. **Extensions** - IDE-specific implementations (VS Code, JetBrains, CLI)
4. **Packages** - Shared utilities and libraries

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

Apache License 2.0 - See [LICENSE](./LICENSE) for details.

## Support

- 📖 [Documentation](./docs)
- 💬 [GitHub Discussions](https://github.com/yourusername/wasp-code/discussions)
- 🐛 [Issue Tracker](https://github.com/yourusername/wasp-code/issues)
- 📧 Email: support@waspcode.dev

## Roadmap

- [ ] JetBrains IDE support
- [ ] CLI improvements
- [ ] Custom model fine-tuning
- [ ] Team collaboration features
- [ ] Enterprise deployment options
- [ ] More LLM provider integrations

## Acknowledgments

Wasp Code is built on the foundation of the Continue project, adapted and extended for our vision of an open-source AI code agent.

---

**Ready to code faster?** [Get started now](./QUICK_START.md)

Made with ❤️ by the Wasp Code team
