import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/metal-mania/400.css'
import '@fontsource/oswald/400.css'
import '@fontsource/oswald/600.css'
import '@fontsource/oswald/700.css'
import './styles/global.scss'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
