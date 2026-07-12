import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Basic loading state while checking session
    return (
      <div className="flex h-screen w-full items-center justify-center bg-brand-surface/20">
        <div className="text-sm font-sans font-medium text-brand-neutral-dark/60">
          Loading TransitOps...
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes (Outlet)
  return <Outlet />;
}
