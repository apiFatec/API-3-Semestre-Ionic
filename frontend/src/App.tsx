import { useLocation } from 'react-router-dom'
import { Router } from '@/routes/routes'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme.provider'
import AuthProvider from './contexts/AuthContext'
import { cn } from './lib/utils'
import { NavBar } from './components/navBar'
import { TitleProvider } from './contexts/TitleContext'

function App() {
  const location = useLocation();
  const isRouteSidebar = location.pathname === '/login' || location.pathname === '/admin-register';

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <TitleProvider>
          <div className="h-full relative">
            {!isRouteSidebar &&
              <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inser-y-0 z-[80] bg-gray-900">
                <Sidebar />
              </div>
            }
            <main className={cn(!isRouteSidebar ? 'md:pl-72' : '')}>
              {!isRouteSidebar &&
                <NavBar />
              }
              <Router />
            </main>
          </div>
        </TitleProvider>
      </AuthProvider>
    </ThemeProvider>

  )
}

export default App
