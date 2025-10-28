import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Interactivestudytracker/', // must match your repo name, with leading + trailing slash
})
