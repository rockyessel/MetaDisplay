import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_BACKEND_API_BASE_URL: 'https://metadisplay.up.railway.app/',
      VITE_META_DISPLAY_WALLET: '0xCdF47Dd8eae6A94e28A530aEC738fd881C2D4901',
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

// 0x3bA8eFC3796433064017a6b8c522d81Ce6bcfD58
// 0xc13Ea0C7172C173F682f3cEf312534Ba412C3524
// 0x63733F23ae1B9E6CE0228ad2673ba189F1291C63
// 0xdf3da0653D87439406f238c2908145cFDf3fEa9e
// 0x47E2f074529E040cfAc6A7143fe2cFA0233Ba31c
// 0xe36Bba8315F432122C08605083FA3E1ea8E7E42D
// 0x34Dd7d6F78dE3A454d356a8DC9863c7A2ec09016
// 0x7B7e33D630651766753A46D9303CC847f442a62C
// 0x6694F1250CF8a4375475783085bE98Ce520f0947
// 0xCdF47Dd8eae6A94e28A530aEC738fd881C2D4901