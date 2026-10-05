import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/chapters.css'
import './styles/index-section.css'
import './lib/gsap'
import { App } from './App'
import { REDUCED_MOTION_QUERY } from './hooks/useReducedMotion'

// Decide the layout mode before first paint so triggers measure the right page.
document.documentElement.classList.toggle('is-cinematic', !window.matchMedia(REDUCED_MOTION_QUERY).matches)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
