import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_BACKEND_API_BASE_URL: 'http://localhost:4000',
    },
  },
  output: {
    // ...
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  server: {
    middleware: (req, res, next) => {
      if (req.url === '/dashboard/upload-asset') {
        // Respond with the desired content for this URL
        res.end('This is the upload asset page.');
      } else {
        // Continue to the next middleware
        next();
      }
    },
  },
});
