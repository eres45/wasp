# Wasp Code Download Site

Professional download page for Wasp Code VS Code extension, hosted on Vercel.

## Features

- Beautiful landing page
- One-command installation
- Direct download link
- Mobile responsive
- Fast CDN delivery

## Deploy to Vercel

### Option 1: Deploy from GitHub (Easiest)

1. Go to: https://vercel.com/new
2. Import this repository
3. Select the `vercel-download` folder as root
4. Click Deploy

Your site will be live at: `https://wasp-code.vercel.app`

### Option 2: Deploy from CLI

```bash
npm install -g vercel
cd vercel-download
vercel
```

## Update Installation Script

After deployment, update the install script URL in:

- `pages/index.js` - Change `https://wasp-code.vercel.app/install.ps1`
- `pages/install.ps1` - Update download URL if needed

## Files

- `pages/index.js` - Beautiful landing page
- `pages/install.ps1` - PowerShell installation script
- `vercel.json` - Vercel configuration
- `package.json` - Dependencies

## Installation Command

Users run:

```powershell
irm https://wasp-code.vercel.app/install.ps1 | iex
```

## Customization

Edit `pages/index.js` to:

- Change colors (gradient colors)
- Add more features
- Update links
- Add screenshots
- Change branding

## Support

For issues, visit: https://github.com/eres45/wasp
