import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon-192.png', 'icon-512.png'],
        manifest: {
          name: 'Habit Tracker',
          short_name: 'HabitTracker',
          description: 'Track your daily habits, expenses, and personal progress',
          theme_color: '#1f2937',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'icon-192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icon-512.png',
              sizes: '512x512', 
              type: 'image/png'
            }
          ]
        }
      })
    ],
    base: isProduction ? '/' : '/',
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8081',
          changeOrigin: true
        }
      }
    }
  }
})
