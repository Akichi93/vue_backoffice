// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'es' // Use 'es' for ES Modules
      }
    }
  },
  base: './', // Use relative paths
});
