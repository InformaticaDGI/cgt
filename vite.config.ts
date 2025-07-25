import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'cgt.guarico.gob.ve'
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api-cgt.guarico.gob.ve',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  }
})
