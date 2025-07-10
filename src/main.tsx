// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SWRConfig } from 'swr'


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <SWRConfig value={{
    provider: () => new Map(),
    isVisible: () => true, // forces SWR to behave like tab is always visible
  }}>
    <App />
  </SWRConfig>
    
  // </StrictMode>,
)
