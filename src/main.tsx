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
    dedupingInterval: 0,
    // Revalidate on focus (helps with tab switching)
    revalidateOnFocus: true,
    // Revalidate on reconnect
    revalidateOnReconnect: true,
    // Disable background refresh
    refreshInterval: 0,
    // Faster error retry
    errorRetryInterval: 1000,
    errorRetryCount: 3,
    // Better handling of network errors
    shouldRetryOnError: (error) => {
      // Don't retry on 4xx errors
      return error.status >= 500;
    }
  }}>
    <App />
  </SWRConfig>
    
  // </StrictMode>,
)
