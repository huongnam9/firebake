import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      copy({
        targets: [
          { src: 'public/_redirects', dest: 'dist' }, // Copy _redirects to dist
          { src: 'public/_headers', dest: 'dist' },   // Copy _headers to dist (optional)
        ],
        verbose: true,
    }),
  ],
  base: './',  // Ensure this is correct
  build: {
    outDir: 'dist'
  }
})
