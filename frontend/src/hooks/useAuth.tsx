import { useContext } from 'react';
import { AuthContext } from "@/contexts/AuthContext";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: ({ access_token, name, role }: { access_token: string, name: string, role: string }) => void;
  logout: () => void;
}

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}