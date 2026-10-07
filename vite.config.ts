import { readdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Connect, type Plugin } from 'vite'
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

/**
 * `/book` → `/book/`, the way GitHub Pages and nginx treat a directory with an
 * index.html. Only for `vite dev` / `vite preview` (`pnpm start`); production
 * static hosts already do this, so nothing is added to the build.
 */
function directoryRedirects(): Plugin {
  const redirect: Connect.NextHandleFunction = (req, res, next) => {
    const [path, query = ''] = (req.url ?? '').split('?')
    if (path !== '/book') return next()
    res.statusCode = 301
    res.setHeader('Location', `${path}/${query && `?${query}`}`)
    res.end()
  }
  return {
    name: 'directory-redirects',
    configureServer: (server) => void server.middlewares.use(redirect),
    configurePreviewServer: (server) => void server.middlewares.use(redirect),
  }
}

// The 3D layer is imported lazily (see src/App.tsx), so three / R3F land in their
// own chunk and the DOM layer paints before WebGL is ready.
export default defineConfig({
  // GitHub Pages user site (bogdangorelkin.github.io) is served from the root, so
  // root-relative paths like /videos/… and /cv/… resolve as written.
  base: '/',
  // Two real pages (/ and /book/), no client-side routes: dev and `vite preview`
  // resolve /book to book/index.html instead of falling back to the film.
  appType: 'mpa',
  plugins: [react(), shipOptimizedVideosOnly(), directoryRedirects()],
  build: {
    target: 'es2022',
    // three.js alone is ~600 kB minified; the lazy 3D chunk is expected to be large.
    chunkSizeWarningLimit: 1100,
    // Two pages: the film (/) and the booking page (/book/ → dist/book/index.html).
    // A real file per page means /book opens directly on any static host (GitHub
    // Pages, a VPS) with no SPA fallback, and Cal.com only ever loads on /book.
    rolldownOptions: {
      input: { main: resolve(import.meta.dirname, 'index.html'), book: resolve(import.meta.dirname, 'book/index.html') },
    },
  },
  // `pnpm start` serves dist/ behind the host's proxy, so accept its domain.
  preview: { allowedHosts: true },
})
