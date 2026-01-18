# GitHub Pages Deployment Guide 🚀

## How It Works

GitHub Pages **DOES** support building Vite projects! Here's how:

### The Solution: GitHub Actions

Instead of pushing the `dist/` folder manually, we use **GitHub Actions** to:
1. Automatically run `npm run build` on GitHub's servers
2. Deploy the generated `dist/` folder to GitHub Pages

## What I've Set Up For You

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

This file tells GitHub to:
- ✅ Install Node.js and dependencies
- ✅ Run `npm run build` automatically
- ✅ Deploy the `dist/` folder to GitHub Pages
- ✅ Trigger on every push to `main` branch

### 2. Vite Configuration (`vite.config.js`)

Added `base: '/'` configuration:
- Use `base: '/'` for custom domains (like wolfadventureskashmir.com)
- Use `base: '/GulmargSki/'` for GitHub Pages URL (username.github.io/GulmargSki/)

### 3. Updated README

Added complete deployment instructions for future reference.

## How to Deploy

### First Time Setup (One-time only)

1. **Go to your GitHub repository**
2. **Click Settings → Pages**
3. **Under "Source", select "GitHub Actions"** (not "Deploy from branch")
4. **That's it!** ✅

### Every Time You Push

```bash
git add .
git commit -m "your changes"
git push origin main
```

GitHub Actions will automatically:
1. Detect the push
2. Run `npm install`
3. Run `npm run build`
4. Deploy to GitHub Pages

### Monitor Deployment

- Go to the **Actions** tab in your repository
- You'll see the workflow running
- Wait 1-2 minutes for deployment to complete
- Your site will be live!

## Your URLs

Based on your README:
- **GitHub Pages**: https://saqibmasoodi.github.io/GulmargSki/
- **Custom Domain**: https://wolfadventureskashmir.com/

## Important Notes

### ✅ What Gets Deployed
- Only the **built files** from `dist/` folder
- Optimized, minified, production-ready code

### ❌ What Doesn't Get Deployed
- `node_modules/` (excluded by .gitignore)
- Source files (they stay in the repo but aren't served)
- Development files

### 🔧 If Using GitHub Pages URL

If you're deploying to `username.github.io/repo-name/`, you need to update `vite.config.js`:

```js
export default defineConfig({
    base: '/GulmargSki/',  // Change to your repo name
    // ... rest of config
});
```

### 🌐 If Using Custom Domain

Keep it as is:
```js
base: '/',  // Already set correctly
```

## Workflow File Explained

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']  # Triggers on push to main
  workflow_dispatch:     # Allows manual trigger

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies (npm ci)
      - Build project (npm run build)
      - Upload dist/ folder

  deploy:
    needs: build
    steps:
      - Deploy to GitHub Pages
```

## Testing Before Push

Always test your build locally first:

```bash
npm run build
npm run preview
```

This ensures everything works before deploying!

## Troubleshooting

### Build Fails on GitHub
- Check the Actions tab for error messages
- Usually it's a missing dependency or build error
- Fix locally, test with `npm run build`, then push again

### Site Not Updating
- Clear browser cache (Ctrl+Shift+R)
- Wait 1-2 minutes for deployment to complete
- Check Actions tab to ensure deployment succeeded

### 404 Errors
- If using GitHub Pages URL, make sure `base` in vite.config.js matches your repo name
- If using custom domain, make sure `base: '/'`

## Summary

✅ **GitHub Actions workflow created**
✅ **Vite configured for deployment**
✅ **README updated with instructions**
✅ **Ready to push and deploy!**

Just push to main, and GitHub will handle the rest! 🎉
