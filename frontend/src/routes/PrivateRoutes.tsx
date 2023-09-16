import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

function PrivateRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoutes;