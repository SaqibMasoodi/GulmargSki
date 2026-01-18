import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // GitHub Pages: /GulmargSki/ (for saqibmasoodi.github.io/GulmargSki/)
    // For Hostinger deployment, you'll build with base: '/' separately
    base: '/GulmargSki/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                stays: resolve(__dirname, 'stays.html'),
                packages: resolve(__dirname, 'packages.html'),
                gallery: resolve(__dirname, 'gallery.html'),
                booking: resolve(__dirname, 'booking.html'),
                policies: resolve(__dirname, 'policies.html'),
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
