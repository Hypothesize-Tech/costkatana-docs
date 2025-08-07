import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        // Ensure JS files have proper extensions and MIME types
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Force ES modules format
        format: 'es'
      }
    },
    // Ensure proper module generation
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true
  },
  server: {
    // Configure MIME types for development server
    middlewareMode: false,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8'
    },
    // Add MIME type configuration
    fs: {
      strict: false
    }
  },
  preview: {
    // Configure preview server MIME types
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8'
    }
  },
  // Ensure proper asset handling
  assetsInclude: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.tsx']
})
