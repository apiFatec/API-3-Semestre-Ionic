import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

function PrivateRoutes() {
  const { isAuthenticated, role } = useAuth();

  return isAuthenticated && role === 'Lider' || role === 'Gestor' ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoutes;
