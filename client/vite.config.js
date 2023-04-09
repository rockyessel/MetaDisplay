import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_BACKEND_API_BASE_URL: 'https://metadisplay.up.railway.app/',
      VITE_META_DISPLAY_WALLET: '0x7424f71b6f82d50F070555721f0C8Ed515f5C4D3',
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
// 0x08b84eF132dB542802CE2c80C8051FF7Fdf1B668
// 0x7170549D6b052AA4c9a462bBEeB840afB1cc8986
// 0x1Bd73A96D7832203b610681A41e2FEd7A1c507d5