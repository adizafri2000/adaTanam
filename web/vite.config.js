import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const IP = process.env.VITE_VM_IP;
const API_URL = processs.env.VITE_API_URL

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': {
        target: `https://${API_URL}`,
        changeOrigin: true,
      },
    }
  },
})
