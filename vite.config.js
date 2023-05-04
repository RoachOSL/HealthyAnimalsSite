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
  publicDir: 'E:/PSM + Vue Routing/healthyAnimal', // Specify the location of the public directory containing the manifest file
});