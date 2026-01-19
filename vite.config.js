import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
