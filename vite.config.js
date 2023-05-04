import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: "/HealthyAnimalsSite/",
  plugins: [
    vue()
  ],
  optimizeDeps: {
    include: ['leaflet'], // Add Leaflet to the list of dependencies to optimize
  },
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: undefined
      }
    }
  },
  manifest: {
    src: './public/manifest.json'
  },
  serviceWorker: {
    src: './src/sw.js',
    scope: '/'
  }
});