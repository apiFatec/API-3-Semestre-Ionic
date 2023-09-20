import { Dashboard } from "@/pages/dashboard/dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
// import PrivateRoutes from "./PrivateRoutes";
import { Login } from "@/pages/login/login";
import { Register } from "@/pages/register/register";

const isUserAuthenticated = () => {
  // Implemente sua lógica de verificação de autenticação aqui
  // Por exemplo, verifique se o usuário possui um token JWT válido ou se está logado em algum sistema de autenticação
  return false; // Retorne true se o usuário estiver autenticado, caso contrário, retorne false
};

// Componente de rota privada
function PrivateRoute({ element }: { element: React.ReactNode }) {
  return isUserAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace={true} state={{ from: window.location.pathname }} />
  );
}

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin-register" element={<Register />} />
      <Route element={<LoginRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}