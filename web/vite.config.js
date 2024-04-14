import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const IP = process.env.VM_IP;
const API_URL = process.env.API_URL

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': {
        target: `${API_URL}`,
        changeOrigin: true,
      },
    }
  },
})
