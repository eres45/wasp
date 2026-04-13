# Test Wasp Code Extension

## Installation Steps

1. **Install the Extension**:

   ```bash
   code --install-extension build/wasp-code-1.0.0.vsix
   ```

2. **Restart VS Code** completely (close all windows and reopen)

3. **Test the Extension**:
   - Look for "Wasp Code" in the Activity Bar (left sidebar)
   - Click on it to open the Wasp Code panel
   - Try the keyboard shortcut `Ctrl+L` to focus the chat input
   - Check if the webview loads properly (should show the chat interface)

## Configuration

The extension should automatically use the MiniMax models configured in `~/.continue/config.json`:

- MiniMax-M2.1
- MiniMax-M2.5
- MiniMax-M2.7

## Troubleshooting

If you see errors:

1. Check VS Code Developer Console: `Help > Toggle Developer Tools`
2. Look for any error messages in the Console tab
3. Check if the extension is properly activated in `Extensions` view

## Expected Behavior

- ✅ Extension appears in Activity Bar as "Wasp Code"
- ✅ Sidebar opens when clicked
- ✅ Chat interface loads in the webview
- ✅ Keyboard shortcuts work (`Ctrl+L`, `Ctrl+I`)
- ✅ MiniMax models are available in the model selector

## Fixed Issues

- ✅ Configuration property mismatches (`continue.*` vs `waspcode.*`)
- ✅ View ID mismatches (`continue.continueGUIView` vs `waspcode.waspcodeGUIView`)
- ✅ Context variable mismatches (`continue.jumpDecorationVisible` vs `waspcode.jumpDecorationVisible`)
- ✅ Extension name consistency (`EXTENSION_NAME = "waspcode"`)
