import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',  // Explicitly set base path
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    {
      name: 'copy-service-worker',
      closeBundle() {
        // Copy service worker to dist folder
        try {
          copyFileSync(
            join(__dirname, 'public/sw.js'),
            join(__dirname, 'dist/sw.js')
          )
        } catch (error) {
          console.warn('Failed to copy service worker:', error)
        }
      }
    }
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    target: 'es2020',
    sourcemap: false
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: {
      port: 3000,
      clientPort: 3000,
    },
    watch: {
      usePolling: false
    }
  },
  preview: {
    port: 5173,
    host: true
  }
})
