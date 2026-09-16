import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /* MUST be absolute, not './'.
     The site now has real nested routes. With a relative base, the asset tags
     in index.html are emitted as `./assets/index.js`, and a browser landing
     directly on /about resolves that against the current path — requesting
     /about/assets/index.js, which 404s. Every deep link, refresh and shared URL
     would break while the home page kept working, which is the worst possible
     shape for the bug.

     An absolute base means the site must be served from the domain root. It also
     needs an SPA fallback so unknown paths return index.html rather than a 404 —
     see public/_redirects (Netlify), vercel.json (Vercel) and public/404.html
     (GitHub Pages) alongside this file. */
  base: '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Split the two large vendor libraries into long-lived cacheable chunks.
        // Function form — Vite 8 / rolldown does not accept the object shorthand.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
              return 'motion'
            }
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
              return 'react'
            }
          }
          return null
        },
      },
    },
  },
})
