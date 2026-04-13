# 🚀 Final Setup - After Visual Studio Installation

## ✅ When Visual Studio Finishes

Visual Studio will ask you to **restart your computer**.

**DO THIS:**

1. Click "Restart" when prompted
2. Wait for computer to restart
3. Come back here

---

## 📋 After Restart - Run These Commands

Open **PowerShell** or **Command Prompt** and run:

### Command 1: Install Dependencies

```bash
cd continue
npm install
```

This will take 5-10 minutes. You should see:

```
added XXX packages
```

### Command 2: Verify Installation

```bash
npm run tsc:check
```

This should complete without major errors.

---

## 🎯 Then Open 3 Terminal Windows

After `npm install` completes, open **3 separate terminal windows** in the `continue` folder:

### Terminal 1: TypeScript Watcher

```bash
npm run tsc:watch
```

You'll see: `[gui] Watching for file changes...`

### Terminal 2: GUI Dev Server

```bash
cd gui
npm run dev
```

You'll see: `VITE v... ready in XXX ms`

### Terminal 3: VS Code Extension

```bash
cd extensions/vscode
npm run esbuild-watch
```

You'll see: `✓ built in XXXms`

---

## 🎮 Launch the Extension

Once all 3 terminals are running:

1. **Open VS Code**
2. **Press F5** (or Run → Start Debugging)
3. A **new VS Code window** opens with Wasp Code
4. **Press Ctrl+L** to open the chat

---

## ⚙️ Configure Your LLM

Create this file: `~/.continue/config.json`

**For OpenAI (Recommended):**

```json
{
  "models": [
    {
      "title": "GPT-4",
      "provider": "openai",
      "model": "gpt-4",
      "apiKey": "sk-your-api-key-here"
    }
  ]
}
```

Get your API key: https://platform.openai.com/api-keys

**For Claude (Anthropic):**

```json
{
  "models": [
    {
      "title": "Claude 3 Opus",
      "provider": "anthropic",
      "model": "claude-3-opus-20240229",
      "apiKey": "sk-ant-your-api-key-here"
    }
  ]
}
```

Get your API key: https://console.anthropic.com/

---

## 🧪 Test It

1. In the VS Code extension, press **Ctrl+L**
2. Type: **"What does this file do?"** (with a file open)
3. You should see a response from your LLM

---

## ✅ Checklist

- [ ] Visual Studio installed
- [ ] Computer restarted
- [ ] `npm install` completed
- [ ] 3 terminals running
- [ ] VS Code extension launched (F5)
- [ ] LLM configured
- [ ] Chat tested

---

## 🆘 Troubleshooting

### "npm install still fails"

```bash
npm install --ignore-scripts
npm rebuild
```

### "Extension not loading"

```bash
cd extensions/vscode
npm run esbuild
# Then press F5 again
```

### "Port 5173 already in use"

```bash
cd gui
npm run dev -- --port 5174
```

### "Cannot find module errors"

```bash
npm run build
```

---

## 🎉 You're Done!

Once you see the chat working, you have a fully functional **Wasp Code** AI agent!

Next steps:

1. Follow `REBRANDING_CHECKLIST.md` to customize
2. Add custom features
3. Deploy!

---

**Come back here after Visual Studio finishes and restart!** 🚀
