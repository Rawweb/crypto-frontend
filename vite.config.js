import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      '/api': 'http://localhost:9000',
    },
  },

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@sections': path.resolve(__dirname, 'src/sections'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
});
