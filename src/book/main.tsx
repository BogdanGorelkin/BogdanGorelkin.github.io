import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '../styles/tokens.css'
import '../styles/base.css'
import './book.css'
import { BookPage } from './BookPage'

/**
 * Entry for /book — a separate page (book/index.html), so it opens directly
 * from a shared link and the film never loads Cal.com.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookPage />
  </StrictMode>,
)
