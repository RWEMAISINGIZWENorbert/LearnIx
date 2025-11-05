import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  efine: {
    'import.meta.env.API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL)
  }
  // server: {
  //   host: true, // allows network access
  //   port: 5174, // optional, matches your dev port
  //   strictPort: true,
  //   allowedHosts: [
  //     'lashawna-additory-judith.ngrok-free.dev', // your ngrok host
  //   ],
  // },
})
