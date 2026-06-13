import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function RequireAuth() {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export function RequireRole({ allowedRoles }: { allowedRoles: string[] }) {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  
  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'CUSTOMER') return <Navigate to="/marketplace" replace />;
    if (user.role === 'DEVELOPER_PARTNER') return <Navigate to="/" replace />;
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}

export function GuestRoute() {
  const { isAuthenticated, user } = useAuthStore();
  
  if (isAuthenticated && user) {
    if (user.role === 'CUSTOMER') return <Navigate to="/marketplace" replace />;
    if (user.role === 'DEVELOPER_PARTNER') return <Navigate to="/" replace />;
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}
