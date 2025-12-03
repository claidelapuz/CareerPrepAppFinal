// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),

    // PWA plugin: generates manifest + service worker (workbox)
    VitePWA({
      registerType: 'autoUpdate', // auto-update SW when new build deployed
      includeAssets: [
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-512x512.png',
        'favicon.ico',
        'logo.jpg'
      ],
      manifest: {
        name: 'SPC Campus Connect',
        short_name: 'SPC Connect',
        description: 'A campus communication platform for SPC departments, events, and announcements.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#800000',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },

      // Workbox runtime caching + precache options
      workbox: {
        // Keep a reasonable precache size
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB

        runtimeCaching: [
          {
            // Cache images: cache-first for performance
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Cache Google Fonts & other font files: stale-while-revalidate
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            // API calls: network-first (fresh data but fallback to cache when offline)
            urlPattern: /^https?:\/\/(api|your-api-domain)\.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Static JS/CSS: Stale-While-Revalidate for fast loads and background update
            urlPattern: /\.(?:js|css|json)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },

      // devOptions: enable only for local testing; keep disabled for normal dev
      devOptions: {
        enabled: false // set true temporarily if you want SW in Vite dev server
      }
    })
  ],

  // build options tuned for production
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
});
