import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/',

  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      '/api': 'http://localhost:9000', // backend URL
    },
  },

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@sections': path.resolve(__dirname, 'src/sections'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
});
