import { createContext, useCallback, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: ({ access_token, name }: { access_token: string; name: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem('token');

    return !!storedUser;
  });

  const login = useCallback(({ access_token, name }: { access_token: string, name: string }) => {
    localStorage.setItem('token', access_token);
    localStorage.setItem('name', name);
    console.log(access_token, name);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');

    setIsAuthenticated(false);
  }, []);



  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}