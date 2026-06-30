import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      // Automatic JSX runtime — no `import React` needed
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
    // Gzip compression — produces .gz alongside every JS/CSS asset.
    // Servers that support pre-compressed files (Vercel, Nginx w/ gzip_static)
    // will serve these directly, saving CPU on every request.
    compression({
      algorithm: 'gzip',
      ext:       '.gz',
      threshold: 1024,       // only compress assets > 1 KB
      deleteOriginFile: false,
    }),
    // Brotli — better ratio than gzip, supported by all modern browsers.
    compression({
      algorithm: 'brotliCompress',
      ext:       '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    // Modern browsers only — smaller output, no legacy polyfills
    target: ['es2020', 'chrome90', 'firefox88', 'safari14'],
    // Raise warning threshold for individual chunks
    chunkSizeWarningLimit: 600,
    // Inline assets < 4 KB as base64 to save round trips
    assetsInlineLimit: 4096,
    // CSS per-chunk — each route gets only its CSS
    cssCodeSplit: true,
    // Vite 8 uses Rolldown/Oxc natively — 'oxc' is the built-in minifier (faster, no extra dep)
    minify: 'oxc',
    // No source maps in production
    sourcemap: false,
    rollupOptions: {
      output: {
        // Granular vendor splitting for maximum cache longevity
        manualChunks(id) {
          // React core — almost never changes
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor'
          }
          // scheduler is a React runtime dependency
          if (id.includes('node_modules/scheduler')) {
            return 'react-vendor'
          }
          // Framer Motion — large, isolated
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion'
          }
          // React Router — rarely changes
          if (id.includes('node_modules/react-router')) {
            return 'router'
          }
          // react-icons split by family — tree-shaking works per-family
          // (named imports are already tree-shaken per-symbol; splitting by
          //  family ensures each route chunk only references its own icon set)
          if (id.includes('node_modules/react-icons/si')) return 'icons-si'
          if (id.includes('node_modules/react-icons/tb')) return 'icons-tb'
          if (id.includes('node_modules/react-icons'))    return 'icons-misc'
        },
        // Content-hash filenames for long-term caching (immutable assets)
        entryFileNames:  'assets/[name]-[hash].js',
        chunkFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
      // Aggressive tree-shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    // Show real gzip sizes so we measure actual transfer cost
    reportCompressedSize: true,
  },
})
