import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The 3D layer is imported lazily (see src/App.tsx), so three / R3F land in their
// own chunk and the DOM layer paints before WebGL is ready.
export default defineConfig({
  plugins: [react()],
  // three.js alone is ~600 kB minified; the lazy 3D chunk is expected to be large.
  build: { target: 'es2022', chunkSizeWarningLimit: 1100 },
  // `pnpm start` serves dist/ behind the host's proxy, so accept its domain.
  preview: { allowedHosts: true },
})
