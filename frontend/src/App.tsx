import { useLocation } from 'react-router-dom'
import { Router } from '@/routes/routes'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme.provider'
import AuthProvider from './contexts/AuthContext'
import { cn } from './lib/utils'


function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  // const isLoginRoute = true

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <div className="h-full relative">
          {!isLoginRoute &&
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inser-y-0 z-[80] bg-gray-900">
              <Sidebar />
            </div>
          }
          <main className={cn(!isLoginRoute ? 'md:pl-72' : '')}>
            <Router />
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>

  )
}

export default App
