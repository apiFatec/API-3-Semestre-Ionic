import { BrowserRouter } from 'react-router-dom'
import { Router } from '@/routes/routes'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme.provider'


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="h-full relative">
          <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inser-y-0 z-[80] bg-gray-900">
            <Sidebar />
          </div>
          <main className="md:pl-72">
            <Router />
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
