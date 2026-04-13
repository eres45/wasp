# Windows Setup Guide for Wasp Code

## Current Status

The development environment has been partially set up, but there are some Windows-specific issues with native module compilation (sqlite3).

## What's Working

✅ Root dependencies installed  
✅ GUI dependencies installed  
✅ Core dependencies installed  
✅ Shared packages installed  
✅ TypeScript configured  
✅ Build scripts ready

## What Needs Fixing

The VS Code extension needs additional setup due to Windows build tools requirements.

## Solution: Use Pre-built Binaries

Instead of compiling native modules, we'll use pre-built binaries. Here's what to do:

### Option 1: Install Visual Studio Build Tools (Recommended)

1. Download: https://visualstudio.microsoft.com/downloads/
2. Select "Visual Studio Community"
3. During installation, check "Desktop development with C++"
4. After installation, run:
   ```bash
   npm install
   ```

### Option 2: Use Pre-built Binaries (Faster)

1. Delete node_modules:

   ```bash
   rmdir /s /q node_modules
   ```

2. Install with pre-built binaries:
   ```bash
   npm install --ignore-scripts
   npm rebuild --build-from-source=false
   ```

### Option 3: Skip Native Modules (Development Only)

For development, you can skip sqlite3 compilation:

```bash
npm install --ignore-scripts
```

This works fine for development. The prebuilt binaries will be used at runtime.

## Quick Start After Setup

Once dependencies are installed, open 3 terminals:

**Terminal 1:**

```bash
npm run tsc:watch
```

**Terminal 2:**

```bash
cd gui && npm run dev
```

**Terminal 3:**

```bash
cd extensions/vscode && npm run esbuild-watch
```

Then press F5 in VS Code to launch the extension.

## Troubleshooting

### "Cannot find module '@continuedev/...'"

This means the shared packages need to be built. Run:

```bash
npm run build
```

### "esbuild failed"

The VS Code extension build failed. Try:

```bash
cd extensions/vscode
npm run esbuild
```

### "Port 5173 already in use"

```bash
cd gui
npm run dev -- --port 5174
```

## Alternative: Use Docker

If you want to avoid Windows build tool issues entirely, use Docker:

```bash
docker run -it -v %cd%:/workspace node:20 bash
cd /workspace
npm install
npm run tsc:watch
```

## Next Steps

1. Choose one of the options above
2. Run the 3 terminals
3. Press F5 in VS Code
4. Configure your LLM provider
5. Test the extension

## Support

If you continue to have issues:

1. Check the error messages carefully
2. Try Option 1 (Visual Studio Build Tools)
3. Or use Docker (Option 3)
4. Or reach out for help

---

**Recommended:** Install Visual Studio Build Tools (Option 1) for full compatibility.
