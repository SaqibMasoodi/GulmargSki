# Dual Deployment Setup Guide

## Your Setup

You have **TWO SEPARATE** deployments with **NO CONNECTION** between them:

1. **Production (Hostinger)**: wolfadventureskashmir.com
2. **Testing/Workflow (GitHub Pages)**: saqibmasoodi.github.io/GulmargSki/

## GitHub Pages Configuration

### ❌ DO NOT Add Custom Domain

In GitHub Settings → Pages:
- ✅ **Source**: GitHub Actions
- ❌ **Custom domain**: **LEAVE EMPTY**

**Why?** Adding `wolfadventureskashmir.com` here will:
- Point DNS to GitHub instead of Hostinger
- Break your Hostinger site
- Create conflicts

### ✅ Correct URLs

- **GitHub Pages**: https://saqibmasoodi.github.io/GulmargSki/
- **Hostinger**: https://wolfadventureskashmir.com/

## Deployment Workflows

### For GitHub Pages (Automatic)

```bash
# Just push to main
git push origin main
```

GitHub Actions will:
1. Build with `base: '/GulmargSki/'`
2. Deploy to GitHub Pages
3. Available at: saqibmasoodi.github.io/GulmargSki/

### For Hostinger (Manual)

When you want to update production:

```bash
# 1. Temporarily change vite.config.js
# Change: base: '/GulmargSki/'
# To:     base: '/'

# 2. Build for production
npm run build

# 3. Upload dist/ folder to Hostinger via:
#    - FTP/SFTP
#    - Hostinger File Manager
#    - cPanel

# 4. Change vite.config.js back to base: '/GulmargSki/'
# (for next GitHub Pages deployment)
```

## Better Approach: Environment-Based Build

To avoid manually changing config, you can use environment variables:

### Option 1: Create Build Scripts

Update `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:github": "vite build --base=/GulmargSki/",
    "build:hostinger": "vite build --base=/",
    "preview": "vite preview"
  }
}
```

Then:
- For GitHub Pages: `npm run build:github` (or just `npm run build`)
- For Hostinger: `npm run build:hostinger`

### Option 2: Use Environment Variable

Update `vite.config.js`:

```js
export default defineConfig({
    base: process.env.DEPLOY_TARGET === 'hostinger' ? '/' : '/GulmargSki/',
    // ... rest of config
});
```

Then:
- For GitHub Pages: `npm run build`
- For Hostinger: `DEPLOY_TARGET=hostinger npm run build`

## Current Configuration

Right now, your `vite.config.js` is set to:
```js
base: '/GulmargSki/'  // For GitHub Pages
```

This means:
- ✅ GitHub Pages will work automatically
- ⚠️ For Hostinger, you need to build with `base: '/'`

## Recommended Workflow

1. **Daily Development**: Push to GitHub
   - GitHub Pages auto-deploys for testing
   - View at: saqibmasoodi.github.io/GulmargSki/

2. **Production Updates**: Manual to Hostinger
   - Build with `base: '/'`
   - Upload `dist/` to Hostinger
   - Production site at: wolfadventureskashmir.com

## Summary

| Aspect | GitHub Pages | Hostinger |
|--------|--------------|-----------|
| URL | saqibmasoodi.github.io/GulmargSki/ | wolfadventureskashmir.com |
| Deployment | Automatic (on push) | Manual (FTP/File Manager) |
| Base Path | `/GulmargSki/` | `/` |
| Purpose | Testing/Workflow tracking | Production |
| Custom Domain | **NO - Leave empty** | Yes (configured in Hostinger) |

## Important Notes

- ✅ GitHub Pages and Hostinger are **completely separate**
- ✅ No pipeline or connection between them
- ✅ Changes to one don't affect the other
- ❌ **Never** add custom domain in GitHub Pages settings
- ✅ Keep them independent for your workflow
