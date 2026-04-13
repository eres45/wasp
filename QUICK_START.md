# Wasp Code - Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs all dependencies for the monorepo (core, gui, extensions, packages).

### Step 2: Start Development Environment

Open 3 terminal windows and run these commands:

**Terminal 1 - TypeScript Watcher:**

```bash
npm run tsc:watch
```

This watches all TypeScript files and compiles them on changes.

**Terminal 2 - GUI Development Server:**

```bash
cd gui
npm run dev
```

This starts the Vite dev server for the React GUI (usually on http://localhost:5173).

**Terminal 3 - VS Code Extension Watcher:**

```bash
cd extensions/vscode
npm run esbuild-watch
```

This watches and rebuilds the VS Code extension on changes.

### Step 3: Launch VS Code Extension

1. Open VS Code
2. Press `F5` (or go to Run → Start Debugging)
3. A new VS Code window will open with Wasp Code loaded
4. Press `Ctrl+L` (or `Cmd+L` on Mac) to open the Wasp Code chat

## First-Time Configuration

### 1. Set Up Your LLM Provider

Create or edit `~/.continue/config.json`:

**For OpenAI:**

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

**For Claude (Anthropic):**

```json
{
  "models": [
    {
      "title": "Claude 3 Opus",
      "provider": "anthropic",
      "model": "claude-3-opus-20240229",
      "apiKey": "sk-ant-..."
    }
  ]
}
```

**For Ollama (Self-hosted):**

```json
{
  "models": [
    {
      "title": "Llama 2",
      "provider": "ollama",
      "model": "llama2",
      "apiBase": "http://localhost:11434"
    }
  ]
}
```

### 2. Test the Setup

In the VS Code extension:

1. Open a code file
2. Press `Ctrl+L` to open chat
3. Type: "What does this file do?"
4. You should see a response from your LLM

## Common Commands

```bash
# Type checking
npm run tsc:check

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test

# Build everything
npm run build

# Format code
npm run format

# Package VS Code extension
cd extensions/vscode
npm run package
```

## Project Structure Quick Reference

```
wasp-code/
├── core/                    # Shared logic (LLM, indexing, editing)
├── gui/                     # React web interface
├── extensions/
│   ├── vscode/             # VS Code extension (main)
│   ├── cli/                # Command-line tool
│   └── intellij/           # JetBrains plugin
├── packages/               # Shared utilities
├── docs/                   # Documentation
└── scripts/                # Build scripts
```

## Troubleshooting

### "Extension not loading"

```bash
cd extensions/vscode
npm run esbuild
```

### "GUI not updating"

```bash
cd gui
npm run build
```

### "TypeScript errors"

```bash
npm run tsc:check
```

### "Port 5173 already in use"

```bash
cd gui
npm run dev -- --port 5174
```

## Next Steps

1. **Customize branding** - See `REBRANDING_CHECKLIST.md`
2. **Add your LLM provider** - Update config.json
3. **Explore the codebase** - Start with `core/llm/` and `gui/src/`
4. **Read the docs** - Check `docs/` folder
5. **Join the community** - Set up Discord/GitHub Discussions

## Getting Help

- Check `WASP_CODE_SETUP.md` for detailed setup
- Review `REBRANDING_CHECKLIST.md` for customization
- Look at `docs/` for architecture and features
- Check GitHub Issues for common problems

---

**You're all set!** Start with `npm install` and follow the 5-minute setup above.
