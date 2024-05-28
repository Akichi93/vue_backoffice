import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_API_BASE_URL,
  build: {
    // enable inline env variables
    inlineEnv: true,
  },
  plugins: [vue()],
  
})
