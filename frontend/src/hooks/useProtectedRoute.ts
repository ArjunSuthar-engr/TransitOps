import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export function useProtectedRoute(redirectTo: string = '/login') {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate(redirectTo, { replace: true });
    }
  }, [session, loading, navigate, redirectTo]);

  return { isAuthenticated: !!session, loading };
}
