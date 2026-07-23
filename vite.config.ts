/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Falla si el puerto está ocupado en vez de saltar a otro en silencio:
    // localStorage (favoritos, artistas seguidos) es por origen, y un puerto
    // distinto en cada arranque hace que parezca que los datos "desaparecen".
    strictPort: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'src/styles')],
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    env: {
      VITE_TICKETMASTER_API_KEY: 'test-key',
    },
  },
})
