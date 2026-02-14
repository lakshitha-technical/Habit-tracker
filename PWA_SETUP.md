# PWA Setup Guide for Habit Tracker

## Step 1: Create App Icons

### Create Simple Icons (192x192 and 512x512)
You can use any image editor or online tool:
- **Recommended**: Simple habit/tracking icon (checkmark, calendar, etc.)
- **Background**: Transparent or solid color
- **Save as**: PNG format

### Quick Icon Creation:
1. Go to https://favicon.io/
2. Upload any image
3. Download 192x192 and 512x512 sizes
4. Save as `icon-192.png` and `icon-512.png` in `frontend/public/`

### Alternative: Use Default Icons
For now, create simple placeholder icons:
```bash
# Create placeholder icons (you can replace these later)
# Just save any PNG images with these names in frontend/public/
# - icon-192.png (192x192 pixels)
# - icon-512.png (512x512 pixels)
```

## Step 2: Update Vite Config

### Install Vite PWA Plugin
```bash
cd c:\Users\laksh\tracker-api\frontend
npm install -D vite-plugin-pwa
```

### Update vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      includeAssets: [
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
      ],
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
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
})
```

## Step 3: Build and Test

### Build for Production
```bash
cd c:\Users\laksh\tracker-api\frontend
npm run build
```

### Test PWA Features
1. **Start local server**:
   ```bash
   cd frontend/dist
   python -m http.server 8080  # Or use any static server
   ```

2. **Test on mobile**:
   - Open phone browser
   - Go to `http://YOUR_IP:8080`
   - Look for "Add to Home Screen" prompt
   - Install and test offline functionality

## Step 4: Deploy PWA

### Option A: Vercel (Easiest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel --prod

# Your PWA will be live at: https://your-app.vercel.app
# Works immediately on mobile with "Add to Home Screen"
```

### Option B: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd frontend/dist
netlify deploy --prod --dir .
```

### Option C: GitHub Pages (Free)
```bash
# 1. Push to GitHub
git add .
git commit -m "Add PWA"
git push origin main

# 2. Enable GitHub Pages in repo settings
# 3. Access at: https://username.github.io/repo-name
```

## Step 5: PWA Features Working

### What You'll Get:
✅ **Install Prompt**: "Add to Home Screen" on iOS/Android
✅ **Offline Mode**: Works without internet connection
✅ **App Icon**: Appears on phone like native app
✅ **Full Screen**: No browser UI elements
✅ **Fast Loading**: Cached resources for speed
✅ **Background Sync**: When online, syncs data

### Testing Checklist:
- [ ] Icons display correctly on home screen
- [ ] App launches in standalone mode
- [ ] Basic features work offline
- [ ] Data syncs when back online
- [ ] Push notifications (future enhancement)

## Quick Start Commands

```bash
# 1. Install PWA plugin
npm install -D vite-plugin-pwa

# 2. Add icons to frontend/public/
# (Add icon-192.png and icon-512.png)

# 3. Update vite.config.js (copy from above)

# 4. Build and deploy
npm run build
vercel --prod

# 5. Test on phone
# Visit your URL, tap "Add to Home Screen"
```

Your habit tracker will work like a native mobile app!
