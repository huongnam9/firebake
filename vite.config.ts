import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: './',  // Use './' to ensure relative asset paths
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Ensure file names don't include hashes for easier debugging
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
