# Debug Webview Loading Issue

## Current Problem

The Wasp Code extension is installed but shows: "An error occurred while loading view: waspcode.waspcodeGUIView"

## Debug Steps

### 1. Check Developer Console

1. Open VS Code
2. Press `F12` or go to `Help > Toggle Developer Tools`
3. Look at the **Console** tab for errors
4. Look for any red error messages related to:
   - Failed to load resources
   - Content Security Policy violations
   - JavaScript errors
   - Network errors

### 2. Check Network Tab

1. In Developer Tools, go to **Network** tab
2. Refresh the webview (close and reopen Wasp Code sidebar)
3. Look for failed requests (red entries)
4. Check if `index.js` and `index.css` are loading

### 3. Common Issues to Look For

**Resource Loading Errors**:

- `Failed to load resource: net::ERR_FILE_NOT_FOUND`
- `Refused to load the script because it violates CSP`

**Path Issues**:

- Incorrect file paths to GUI assets
- Missing GUI build files

**Permission Issues**:

- Webview security restrictions
- Local resource access denied

## Quick Fix Attempt

Let me try to fix the most likely issue - the webview HTML template might need a Content Security Policy header.
