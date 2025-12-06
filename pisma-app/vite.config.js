import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'pdf-vendor': ['pdf-lib', 'html2canvas', 'docx', 'file-saver'],
          'ai-vendor': ['@google/generative-ai'],
          'markdown-vendor': ['react-markdown', 'react-helmet-async']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
