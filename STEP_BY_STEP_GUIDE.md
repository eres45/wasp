# Wasp Code - Complete Step-by-Step Usage Guide

## 🎯 Step 1: Restart VS Code

**Why?** VS Code needs to restart to load the newly installed extension.

**How:**

1. Close ALL VS Code windows completely
2. Wait 3 seconds
3. Open VS Code again

**Verify:** After VS Code opens, you should see a new icon in the left sidebar (Activity Bar)

---

## 🎯 Step 2: Open Wasp Code Sidebar

**Method 1 - Using Keyboard Shortcut (Recommended):**

1. Press `Ctrl + L` on your keyboard
2. The Wasp Code chat panel should open on the right side

**Method 2 - Using Mouse:**

1. Look at the left sidebar (Activity Bar) in VS Code
2. Find the Wasp Code icon (it might look like the Continue icon for now)
3. Click on it
4. The chat panel will open on the right side

**What you should see:**

- A chat interface on the right side of VS Code
- An input box at the bottom where you can type
- Possibly a welcome message or empty chat area

---

## 🎯 Step 3: Test Your First Chat

**Let's send a simple test message:**

1. Click in the chat input box at the bottom
2. Type: `Hello! Can you help me?`
3. Press `Enter` or click the Send button

**What should happen:**

- Your message appears in the chat
- After a few seconds, the AI responds using your MiniMax model
- You'll see the response streaming in (appearing word by word)

**If it works:** Congratulations! Your Wasp Code is working! 🎉

**If you see an error:** Go to Step 7 (Troubleshooting) below

---

## 🎯 Step 4: Try a Code-Related Question

**Now let's test with actual coding:**

1. In the chat input, type:

```
Write a Python function that calculates the fibonacci sequence
```

2. Press Enter

**What should happen:**

- The AI will write Python code for you
- The code will appear in a code block
- You can copy it or use it directly

---

## 🎯 Step 5: Use Wasp Code with Your Files

**Let's make it work with your actual code:**

1. **Open a code file** in VS Code (any .js, .py, .ts, etc. file)
2. **Select some code** by highlighting it with your mouse
3. **Press `Ctrl + L`** to open Wasp Code
4. **Type a question** about the selected code, like:
   - `Explain this code`
   - `Add comments to this code`
   - `Find bugs in this code`
   - `Refactor this code`

**What should happen:**

- Wasp Code will analyze your selected code
- It will provide explanations, suggestions, or improvements
- You can apply the changes directly to your file

---

## 🎯 Step 6: Switch Between MiniMax Models

**You have 3 MiniMax models configured. Here's how to switch:**

1. Look at the top of the Wasp Code chat panel
2. You should see a dropdown or model selector
3. Click it to see your models:

   - MiniMax-M2.1
   - MiniMax-M2.5
   - MiniMax-M2.7

4. Select the model you want to use
5. Your next messages will use that model

**Tip:** Different models may have different capabilities or speeds. Try them all!

---

## 🎯 Step 7: Troubleshooting

### Problem: Can't find Wasp Code icon in sidebar

**Solution:**

1. Press `Ctrl + Shift + X` to open Extensions panel
2. Search for "Wasp Code" or "wasp-code"
3. Check if it's installed and enabled
4. If disabled, click "Enable"
5. Restart VS Code

**Alternative check:**

1. Open PowerShell
2. Run: `code --list-extensions | Select-String wasp`
3. You should see: `WaspCode.wasp-code`

---

### Problem: Extension installed but not showing

**Solution:**

1. Press `F1` to open Command Palette
2. Type: `Developer: Reload Window`
3. Press Enter
4. VS Code will reload with the extension

---

### Problem: Chat opens but shows error

**Check your API keys:**

1. Open File Explorer
2. Navigate to: `C:\Users\ronit\.continue\`
3. Open `config.json` in a text editor
4. Verify your MiniMax API keys are correct
5. Make sure the format looks like this:

```json
{
  "models": [
    {
      "title": "MiniMax-M2.1",
      "provider": "openai",
      "model": "MiniMax-M2.1",
      "apiKey": "sk-cp-YOUR_KEY_HERE",
      "apiBase": "https://api.minimax.io/v1"
    }
  ]
}
```

6. Save the file
7. Restart VS Code

---

### Problem: Chat not responding

**Check Developer Console:**

1. In VS Code, go to: `Help > Toggle Developer Tools`
2. Click the "Console" tab
3. Look for any red error messages
4. Common errors:
   - **401 Unauthorized**: Your API key is invalid
   - **Network error**: Check your internet connection
   - **Timeout**: The API might be slow, try again

**Take a screenshot of any errors and we can fix them!**

---

### Problem: `Ctrl + L` doesn't work

**Alternative ways to open Wasp Code:**

1. **Command Palette:**

   - Press `F1`
   - Type: `Wasp Code: Open Chat`
   - Press Enter

2. **View Menu:**

   - Click `View` in the top menu
   - Look for Wasp Code options

3. **Activity Bar:**
   - Click the Wasp Code icon directly in the left sidebar

---

## 🎯 Step 8: Advanced Features

### Feature 1: Context Menu Integration

1. Right-click on any code in your editor
2. Look for Wasp Code options in the context menu
3. You might see options like:
   - "Explain with Wasp Code"
   - "Refactor with Wasp Code"
   - "Add comments"

### Feature 2: Inline Editing

1. Select code in your editor
2. Press `Ctrl + I` (if configured)
3. Type what you want to change
4. The AI will edit the code directly

### Feature 3: Terminal Integration

1. Open the integrated terminal in VS Code
2. Run a command that produces an error
3. Wasp Code might offer to help fix the error

---

## 🎯 Step 9: Verify Everything is Working

**Complete this checklist:**

- [ ] VS Code is restarted
- [ ] Wasp Code icon appears in left sidebar
- [ ] `Ctrl + L` opens the chat panel
- [ ] Typing a message and pressing Enter sends it
- [ ] AI responds to your message
- [ ] You can select code and ask questions about it
- [ ] You can switch between different MiniMax models

**If all checked:** You're all set! 🚀

**If any unchecked:** Go back to the relevant step or troubleshooting section

---

## 🎯 Step 10: What to Do Next

### Learn More Features:

- Try asking: "What can you do?"
- Experiment with different types of questions
- Test it on your real projects

### Customize Settings:

1. Press `F1`
2. Type: `Preferences: Open Settings (UI)`
3. Search for "Wasp Code"
4. Customize keyboard shortcuts, themes, etc.

### Get Help:

- Check the Developer Console for errors
- Review the configuration file: `~/.continue/config.json`
- Look at the documentation files in the `continue/` folder

---

## 📝 Quick Reference Card

| Action                 | Shortcut                        |
| ---------------------- | ------------------------------- |
| Open Chat              | `Ctrl + L`                      |
| Open Command Palette   | `F1`                            |
| Open Extensions        | `Ctrl + Shift + X`              |
| Toggle Developer Tools | `Ctrl + Shift + I`              |
| Reload Window          | `Ctrl + R` (in Command Palette) |

---

## 🆘 Still Having Issues?

**Do this:**

1. Open PowerShell
2. Run these commands to check everything:

```powershell
# Check if extension is installed
code --list-extensions | Select-String wasp

# Check if config file exists
Test-Path "C:\Users\ronit\.continue\config.json"

# View the config file
Get-Content "C:\Users\ronit\.continue\config.json"
```

3. Take screenshots of:

   - Your VS Code window
   - Any error messages
   - The Developer Console (Help > Toggle Developer Tools)

4. Share those screenshots and we'll fix it together!

---

## ✅ Success Indicators

**You'll know it's working when:**

- ✅ Chat panel opens smoothly
- ✅ AI responds within 5-10 seconds
- ✅ Code suggestions are relevant and helpful
- ✅ You can have a back-and-forth conversation
- ✅ Selected code is understood by the AI

---

## 🎉 You're Ready!

Start using Wasp Code for:

- Writing new code
- Debugging existing code
- Learning new concepts
- Refactoring and improving code
- Getting explanations
- Generating tests
- And much more!

**Happy coding with Wasp Code! 🚀**
