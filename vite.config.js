import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: "/HealthyAnimalsSite/",
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    assetsInlineLimit: 0, // Disable inlining assets for larger files such as images and fonts
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]', // Customize the output path of assets
      },
    },
    // Copy the images folder to the dist folder
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: './index.html',
        'manifestLogo-192': './images/manifestLogo-192.png',
        'manifestLogo-512': './images/manifestLogo-512.png',
      },
    },
  },
  optimizeDeps: {
    include: ['leaflet'], // Add Leaflet to the list of dependencies to optimize
  },
  publicDir: 'public', // Specify the location of the public directory containing the manifest file
});