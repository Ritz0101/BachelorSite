// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/isotron/', // Riktig format for GitHub Pages (reponavnet med skråstreker)
})