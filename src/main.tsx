import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.tsx'
import { TooltipProvider } from '@radix-ui/react-tooltip'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Header />
          <App />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
