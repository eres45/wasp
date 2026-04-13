# 🔍 Debug Webview in Development Mode

Even in development mode, the webview is showing an error. Let's debug this:

## 1. Check Developer Console in Extension Development Host

In the **Extension Development Host** window (where you see the error):

1. Press `F12` or go to `Help > Toggle Developer Tools`
2. Look at the **Console** tab for errors
3. Look for errors like:
   - `Failed to load resource: http://localhost:5173/`
   - `net::ERR_CONNECTION_REFUSED`
   - `Refused to connect to 'http://localhost:5173'`
   - Any JavaScript errors

## 2. Check Network Tab

1. In Developer Tools, go to **Network** tab
2. Clear the network log
3. Close and reopen the Wasp Code sidebar
4. Look for failed requests (red entries)
5. Check if requests to localhost:5173 are failing

## 3. Test GUI Server Directly

Open a web browser and go to: `http://localhost:5173/`

- Does it load the GUI interface?
- Or does it show an error?

## 4. Possible Issues

**Connection Issues:**

- Webview security policy blocking localhost
- Port 5173 not accessible from webview
- CORS issues

**Path Issues:**

- Wrong script/CSS paths in development mode
- Missing development server files

## What to Report:

Please tell me:

1. **Console errors** from F12 in Extension Development Host
2. **Network failures** from Network tab
3. **Browser test** - does http://localhost:5173/ work in your browser?

This will help identify if it's a webview security issue or a server connectivity problem.
