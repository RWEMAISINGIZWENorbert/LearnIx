import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [react()],
  server: {
    host: true, // allows network access
    port: 5173, // optional, matches your dev port
    strictPort: true,
    allowedHosts: [
      'lashawna-additory-judith.ngrok-free.dev', // your ngrok host
    ],
  },
})
