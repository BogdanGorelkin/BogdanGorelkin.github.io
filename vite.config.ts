import { readdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Only the web-optimized videos in public/videos/optimized/ ship. Source
 * recordings don't belong in the repo; if one is dropped under videos/ while
 * preparing an encode, it's removed from the build output rather than deployed.
 */
function shipOptimizedVideosOnly(): Plugin {
  let videosOut = ''
  return {
    name: 'ship-optimized-videos-only',
    apply: 'build',
    configResolved(config) {
      videosOut = resolve(config.root, config.build.outDir, 'videos')
    },
    async closeBundle() {
      const entries = await readdir(videosOut).catch(() => [] as string[])
      await Promise.all(entries.filter((e) => e !== 'optimized').map((e) => rm(resolve(videosOut, e), { recursive: true, force: true })))
    },
  }
}

// The 3D layer is imported lazily (see src/App.tsx), so three / R3F land in their
// own chunk and the DOM layer paints before WebGL is ready.
export default defineConfig({
  plugins: [react(), shipOptimizedVideosOnly()],
  // three.js alone is ~600 kB minified; the lazy 3D chunk is expected to be large.
  build: { target: 'es2022', chunkSizeWarningLimit: 1100 },
  // `pnpm start` serves dist/ behind the host's proxy, so accept its domain.
  preview: { allowedHosts: true },
})
