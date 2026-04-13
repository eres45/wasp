# Wasp Code - Setup & Development Guide

Welcome to **Wasp Code** - Your AI-powered code agent!

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development

**Terminal 1 - Watch TypeScript compilation:**

```bash
npm run tsc:watch
```

**Terminal 2 - Start GUI dev server:**

```bash
cd gui
npm run dev
```

**Terminal 3 - Watch VS Code extension:**

```bash
cd extensions/vscode
npm run esbuild-watch
```

### 3. Test the Extension

- Open VS Code
- Press `F5` to launch the extension in debug mode
- The extension will open in a new VS Code window
- Use `Ctrl+L` to open Wasp Code chat

## Project Structure

```
wasp-code/
├── core/                 # Shared business logic
│   ├── llm/             # LLM provider integration
│   ├── indexing/        # Codebase indexing
│   ├── autocomplete/    # Tab completion
│   ├── edit/            # Code editing
│   └── config/          # Configuration
├── gui/                  # React web interface
├── extensions/
│   ├── vscode/          # VS Code extension
│   ├── intellij/        # JetBrains plugin
│   └── cli/             # Command-line tool
└── packages/            # Shared libraries
```

## Key Configuration Files

### 1. Update Package Names

Replace `@continuedev` with `@waspcode` in:

- `core/package.json`
- `gui/package.json`
- `extensions/vscode/package.json`
- `extensions/cli/package.json`

### 2. Update VS Code Extension Metadata

File: `extensions/vscode/package.json`

```json
{
  "name": "wasp-code",
  "displayName": "Wasp Code - AI-powered code agent",
  "publisher": "YourPublisher",
  "description": "Fast, intelligent AI code agent for developers"
}
```

### 3. Configure LLM Provider

File: `core/llm/providers/`

Choose your LLM provider:

- **OpenAI** (GPT-4, GPT-3.5)
- **Anthropic** (Claude)
- **Ollama** (Self-hosted)
- **Together** (Open source models)

### 4. Update Branding

- Replace logo in `extensions/vscode/media/icon.png`
- Update colors in `gui/src/` (Tailwind config)
- Update README.md with your vision

## Development Commands

```bash
# Type checking
npm run tsc:check

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test

# Build for production
npm run build

# Package VS Code extension
cd extensions/vscode
npm run package
```

## Environment Setup

### Required

- Node.js 20.20.1+
- npm or yarn
- Git

### Optional

- Rust (for sync module)
- Python (for some build tools)

## Next Steps

1. **Set up your LLM provider** - Add API keys for your chosen LLM
2. **Customize the UI** - Update colors, logos, and branding
3. **Add custom features** - Extend with your own tools and commands
4. **Test locally** - Run the extension in VS Code debug mode
5. **Build & package** - Create a distributable extension

## Troubleshooting

### Extension not loading?

- Check `extensions/vscode/out/extension.js` exists
- Run `npm run esbuild` to rebuild
- Check VS Code output panel for errors

### GUI not updating?

- Clear browser cache
- Restart the dev server
- Check `gui/dist/` is being generated

### LLM not responding?

- Verify API keys are set correctly
- Check network connectivity
- Review LLM provider configuration

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Continue Documentation](https://docs.continue.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Ready to build?** Start with `npm install` and follow the Quick Start above!
