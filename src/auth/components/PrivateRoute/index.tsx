import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}
