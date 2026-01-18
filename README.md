# Gulmarg Ski Resort - Alpine & Vite Project

A modern, multi-page website for Wolf Adventures, a premier ski school and guiding service in Gulmarg, Kashmir.

[**Github Pages Preview**](https://saqibmasoodi.github.io/GulmargSki/)

[**Live Website Preview**](https://wolfadventureskashmir.com/)

## Collaboration & Setup

This project uses **Vite** as its build engine. To ensure consistent performance and styling across contributors, please follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS)

### Getting Started
1. **Clone the repository**:
   ```bash
   git clone https://github.com/saqibmasoodi/GulmargSki.git
   cd GulmargSki
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```

### Project Scripts
- `npm run dev`: Starts the local development server with hot-reloading.
- `npm run build`: Bundles the site into the `dist/` folder for production.
- `npm run preview`: Locally previews the production build.

## Architecture
- **Multi-Page App (MPA)**: Each `.html` file at the root is a standalone page.
- **Tailwind CSS**: Managed via PostCSS for optimized, treeshaken styles.
- **Alpine.js**: Handles lightweight reactivity and calculators.

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Source", select **GitHub Actions**

2. **Configure Base Path** (if needed):
   - If deploying to `username.github.io/repo-name/`, edit `vite.config.js`:
     ```js
     base: '/repo-name/',  // Change to your repository name
     ```
   - If using a custom domain, keep `base: '/'`

3. **Push to Main Branch**:
   ```bash
   git push origin main
   ```

4. **Automatic Build & Deploy**:
   - GitHub Actions will automatically:
     - Install dependencies
     - Run `npm run build`
     - Deploy the `dist/` folder to GitHub Pages
   - Check the "Actions" tab to monitor deployment

5. **Access Your Site**:
   - Custom domain: `https://yourdomain.com`
   - GitHub Pages: `https://username.github.io/repo-name/`

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run build
# Then manually upload the dist/ folder to your hosting
```

## Project Structure
- **Data-Driven**: Constants like hotel pricing and instructor lists are decoupled into `/assets/js/data/`.

---
