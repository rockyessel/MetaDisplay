import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_BACKEND_API_BASE_URL: 'http://localhost:4000',
    },
  },
  root: './',
  build: {
    outDir: 'dist',
  },
  publicDir: 'assets',
});
