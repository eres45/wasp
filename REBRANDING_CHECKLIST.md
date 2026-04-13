# Wasp Code Rebranding Checklist

## Critical Files to Update

### 1. Root Configuration

- [ ] `package.json` - Change name to "wasp-code"
- [ ] `README.md` - Update project description and links
- [ ] `LICENSE` - Update copyright (keep Apache 2.0 or choose your license)

### 2. Core Package

- [ ] `core/package.json` - Change `@continuedev/core` to `@waspcode/core`
- [ ] `core/src/` - Update any hardcoded "continue" strings

### 3. GUI Package

- [ ] `gui/package.json` - Update author and dependencies
- [ ] `gui/src/App.tsx` - Update branding/colors
- [ ] `gui/src/` - Replace Continue logos with Wasp Code logos

### 4. VS Code Extension

- [ ] `extensions/vscode/package.json` - Update all metadata:

  - `name`: "wasp-code"
  - `displayName`: "Wasp Code - AI-powered code agent"
  - `publisher`: "YourPublisher"
  - `author`: "Your Name"
  - `homepage`: "https://waspcode.dev"
  - `bugs.email`: "your-email@example.com"

- [ ] `extensions/vscode/src/` - Update command prefixes:

  - `continue.` → `waspcode.`
  - `continueGUIView` → `waspcodeGUIView`
  - `continueConsoleView` → `waspcodeConsoleView`

- [ ] `extensions/vscode/media/` - Replace icons and logos

### 5. CLI Extension

- [ ] `extensions/cli/package.json` - Update metadata
- [ ] `extensions/cli/README.md` - Update documentation

### 6. Shared Packages

- [ ] `packages/config-types/package.json` - Update name
- [ ] `packages/config-yaml/package.json` - Update name
- [ ] `packages/fetch/package.json` - Update name
- [ ] `packages/llm-info/package.json` - Update name
- [ ] `packages/openai-adapters/package.json` - Update name
- [ ] `packages/terminal-security/package.json` - Update name

### 7. Documentation

- [ ] `docs/` - Update all references to Continue
- [ ] Create `docs/GETTING_STARTED.md` for Wasp Code
- [ ] Update `docs/CONFIGURATION.md` with Wasp Code specifics

### 8. GitHub Configuration

- [ ] `.github/workflows/` - Update CI/CD references
- [ ] `.github/ISSUE_TEMPLATE/` - Update templates
- [ ] `.github/PULL_REQUEST_TEMPLATE.md` - Update template

### 9. Configuration Files

- [ ] `.continueignore` → `.waspcodeignore` (optional)
- [ ] `.eslintrc.shared.json` - Update any Continue-specific rules
- [ ] `tsconfig.json` - Update project references if needed

### 10. Source Code Search & Replace

Run these find-and-replace operations across the codebase:

```
"continue"              → "wasp-code"
'continue'              → 'wasp-code'
continue.               → waspcode.
Continue               → Wasp Code
CONTINUE               → WASPCODE
continueGUIView        → waspcodeGUIView
continueConsoleView    → waspcodeConsoleView
continueSubMenu        → waspcodeSubMenu
continue.dev           → waspcode.dev
continuedev            → waspcode
Continue Dev, Inc      → Wasp Code
@continuedev           → @waspcode
```

## Branding Assets to Create/Update

- [ ] Logo (SVG and PNG)
- [ ] Icon for VS Code extension
- [ ] Sidebar icon
- [ ] Color scheme (update Tailwind config)
- [ ] Favicon
- [ ] Social media assets (if needed)

## Testing Checklist

- [ ] `npm install` completes without errors
- [ ] `npm run tsc:check` passes
- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] VS Code extension loads in debug mode
- [ ] GUI loads and renders correctly
- [ ] Chat functionality works
- [ ] Code editing works
- [ ] Autocomplete works

## Deployment Checklist

- [ ] Update version number in all package.json files
- [ ] Create GitHub repository for Wasp Code
- [ ] Set up CI/CD pipeline
- [ ] Build VS Code extension package
- [ ] Publish to VS Code Marketplace (optional)
- [ ] Create documentation website
- [ ] Set up support channels (Discord, GitHub Discussions, etc.)

## Notes

- Keep the Apache 2.0 license or choose your own
- Update all URLs to point to your domain
- Replace all email addresses with your contact info
- Update social media links if applicable
- Consider creating a CHANGELOG.md for version tracking

---

**Estimated Time:** 2-4 hours for complete rebranding
**Difficulty:** Medium (mostly find-and-replace)
**Priority:** High (do this before first release)
