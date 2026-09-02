import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Force Vite to recognize and compile BOTH HTML documents side-by-side
        main: resolve(__dirname, 'index.html'),
        watchlist: resolve(__dirname, 'watchlist.html'),
      },
    },
  },
})
