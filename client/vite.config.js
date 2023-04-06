import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_BACKEND_API_BASE_URL:
        'https://metadisplay-production.up.railway.app/',
      VITE_META_DISPLAY_WALLET: '0xA73E601F85d697F88fB0AC4135d1132053904344',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
});
