import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/bruno/",
  build: {
    outDir: 'docs',
  },
  server: {
    host: true
  },
  preview: {
    host: true
  }
})