import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';

/**
 * ProtectedRoute — Blocks unauthenticated users from accessing protected pages.
 *
 * If not logged in → redirects to /login (preserving the original destination).
 * If loading → shows a centered spinner.
 * If authenticated → renders children normally.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth state is resolving
  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Not authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check → if allowedRoles is provided, check if user has one of them
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/marketplace" replace />;
  }

  return children;
};

export default ProtectedRoute;
