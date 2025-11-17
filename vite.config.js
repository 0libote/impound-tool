import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/impound-tool/',
  plugins: [react()],
  build: {
    outDir: 'docs'
  }
})
