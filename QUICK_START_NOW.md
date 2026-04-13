# 🚀 START USING WASP CODE RIGHT NOW!

## ✅ Extension Status: INSTALLED

Your extension `waspcode.wasp-code` is successfully installed!

---

## 📋 DO THESE 3 STEPS NOW:

### 1️⃣ RESTART VS CODE (IMPORTANT!)

```
Close ALL VS Code windows → Wait 3 seconds → Open VS Code again
```

**Why?** VS Code needs to restart to load the new extension.

---

### 2️⃣ OPEN WASP CODE CHAT

**Press this keyboard shortcut:**

```
Ctrl + L
```

**OR click the Wasp Code icon in the left sidebar**

**What you'll see:**

- A chat panel opens on the right side of VS Code
- An input box at the bottom
- Ready to chat!

---

### 3️⃣ SEND YOUR FIRST MESSAGE

**Type this in the chat:**

```
Hello! Can you help me write a Python function?
```

**Press Enter**

**Expected result:**

- Your message appears
- AI responds in 5-10 seconds
- You see the response streaming in

---

## 🎉 IF IT WORKS:

Congratulations! You're ready to code with AI! Try these next:

- `Write a function to sort an array`
- `Explain how async/await works`
- `Create a REST API endpoint`

---

## ❌ IF IT DOESN'T WORK:

### Problem: Can't find Wasp Code icon

**Do this:**

1. Press `F1` (opens Command Palette)
2. Type: `Developer: Reload Window`
3. Press Enter
4. Try `Ctrl + L` again

---

### Problem: Chat opens but shows error

**Check your config file:**

1. Press `Windows + R`
2. Type: `%USERPROFILE%\.continue`
3. Press Enter
4. Open `config.json`
5. Make sure it looks like this:

```json
{
  "models": [
    {
      "title": "MiniMax-M2.1",
      "provider": "openai",
      "model": "MiniMax-M2.1",
      "apiKey": "sk-cp-QSosnmZwolJUFe...",
      "apiBase": "https://api.minimax.io/v1"
    }
  ]
}
```

---

### Problem: Nothing happens when I press Ctrl+L

**Alternative method:**

1. Press `F1`
2. Type: `View: Show Wasp Code`
3. Press Enter

**OR**

1. Click `View` in the top menu
2. Look for Wasp Code or Continue options
3. Click to open

---

## 🔍 VERIFY INSTALLATION

**Run this in PowerShell to double-check:**

```powershell
code --list-extensions | Select-String wasp
```

**Expected output:**

```
waspcode.wasp-code
```

**If you see this:** ✅ Extension is installed correctly!

---

## 📸 WHAT IT SHOULD LOOK LIKE

**VS Code Layout with Wasp Code:**

```
┌─────────────────────────────────────────────────────────┐
│  File  Edit  View  ...                                  │
├───┬─────────────────────────────────────┬───────────────┤
│   │                                     │               │
│ W │                                     │  Wasp Code    │
│ A │     Your Code Editor                │  Chat Panel   │
│ S │                                     │               │
│ P │                                     │  ┌─────────┐  │
│   │                                     │  │ Message │  │
│ C │                                     │  │ Input   │  │
│ O │                                     │  └─────────┘  │
│ D │                                     │               │
│ E │                                     │               │
│   │                                     │               │
│ ← │                                     │               │
└───┴─────────────────────────────────────┴───────────────┘
```

---

## 🎯 YOUR CHECKLIST

Complete these in order:

- [ ] **Step 1:** Close and restart VS Code
- [ ] **Step 2:** Press `Ctrl + L` to open chat
- [ ] **Step 3:** Type "Hello" and press Enter
- [ ] **Step 4:** See AI response
- [ ] **Step 5:** Try asking a coding question

**All done?** 🎉 You're ready to code with AI!

---

## 🆘 STILL STUCK?

**Open Developer Console to see errors:**

1. In VS Code: `Help` → `Toggle Developer Tools`
2. Click `Console` tab
3. Look for red error messages
4. Take a screenshot

**Check these files exist:**

```powershell
# Config file
Test-Path "C:\Users\ronit\.continue\config.json"

# Extension file
Test-Path "C:\Users\ronit\Downloads\IDE\continue\extensions\vscode\build\wasp-code-1.0.0.vsix"
```

Both should return `True`

---

## 💡 QUICK TIPS

**Keyboard Shortcuts:**

- `Ctrl + L` - Open/focus chat
- `Ctrl + Shift + X` - Open Extensions panel
- `F1` - Open Command Palette
- `Ctrl + Shift + I` - Open Developer Tools

**First Questions to Try:**

1. "What can you help me with?"
2. "Write a hello world program in Python"
3. "Explain what a REST API is"
4. "Create a function to validate email addresses"

---

## ✅ SUCCESS!

**You'll know it's working when:**

- Chat panel opens smoothly
- You can type messages
- AI responds within seconds
- Responses are helpful and relevant

**Now go build something amazing! 🚀**

---

## 📚 MORE HELP

- Full guide: `STEP_BY_STEP_GUIDE.md`
- Troubleshooting: `WASP_CODE_SUCCESS.md`
- Configuration: `~/.continue/config.json`

**Ready? Let's go! Press Ctrl+L and start chatting! 💬**
