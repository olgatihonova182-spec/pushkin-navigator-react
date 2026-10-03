import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves the site under /<repository>/: the workflow passes BASE_PATH.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  // In development the API is served by `npm run server` (port 8787).
  server: {
    proxy: { '/api': 'http://localhost:8787' },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
