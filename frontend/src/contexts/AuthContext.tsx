import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: ({ access_token, name, role }: { access_token: string, name: string, role: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem('token');
    return !!storedUser;
  });
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem('role');
    return storedRole;
  })
  const navigate = useNavigate();

  const login = useCallback(({ access_token, name, role }: { access_token: string, name: string, role: string }) => {
    localStorage.setItem('token', access_token);
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    setRole(role);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      role,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}