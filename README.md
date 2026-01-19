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
- **Data-Driven**: Constants like hotel pricing and instructor lists are decoupled into `/assets/js/data/`.

---
