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
    refreshInterval: 0,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 0,
    errorRetryCount: 3,
    errorRetryInterval: 1000
  }}>
    <App />
  </SWRConfig>
    
  // </StrictMode>,
)
