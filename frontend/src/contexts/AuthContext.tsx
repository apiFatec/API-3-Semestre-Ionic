import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";

interface Login {
  access_token: string;
  name: string;
  role: string;
  id: string;
  email: string;
  team: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: ({ access_token, name, role, team, id }: Login) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setId } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem('token');
    return !!storedUser;
  });
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem('role');
    return storedRole;
  })
  const navigate = useNavigate();

  const login = useCallback(({ access_token, name, role, id, team }: Login) => {
    localStorage.setItem('token', access_token);
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    // localStorage.setItem('email', email);
    localStorage.setItem('id', id);
    localStorage.setItem('team', team);
    console.log(team)
    setId(id);
    setIsAuthenticated(true);
    setRole(role);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
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