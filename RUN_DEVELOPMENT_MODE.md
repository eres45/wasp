# 🔧 Run Extension in Development Mode

Since the packaged extension is still having webview issues, let's run it in development mode which often bypasses these problems.

## Steps to Run in Development Mode

### 1. Open the Extension Source

1. Open VS Code
2. Go to `File > Open Folder`
3. Navigate to: `C:\Users\ronit\Downloads\IDE\continue\extensions\vscode`
4. Open this folder in VS Code

### 2. Start Development Mode

1. Press `F5` (or go to `Run > Start Debugging`)
2. This will open a new VS Code window titled "Extension Development Host"
3. In this new window, look for the Wasp Code icon in the Activity Bar

### 3. Test in Development Mode

- The development mode uses a local server (localhost:5173) for the GUI
- This bypasses many webview security restrictions
- The extension should work properly in this mode

## Why Development Mode Works Better

- Uses live development server instead of packaged files
- Bypasses some webview security restrictions
- Easier to debug issues
- Hot reload for changes

## If Development Mode Works

If the extension works in development mode but not when packaged, the issue is likely:

1. Missing GUI build files in the package
2. Webview security policy issues
3. File path problems in the packaged version

Let me know if development mode works and we can then fix the packaging issue!
