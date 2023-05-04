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
  },
  optimizeDeps: {
    include: ['leaflet'], // Add Leaflet to the list of dependencies to optimize
  },
  publicDir: 'public', // Specify the location of the public directory containing the manifest file
  manifest: {
    name: 'Healthy Animals',
    short_name: 'HealAnima',
    description: 'My First PWA',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/images/manifestLogo-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/images/manifestLogo-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    start_url: '/HealthyAnimalsSite/',
    display: 'standalone'
  }
});