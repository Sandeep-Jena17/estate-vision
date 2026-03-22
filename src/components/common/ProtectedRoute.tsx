import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children:    React.ReactNode;
  role?:       'agent' | 'admin' | null; // null = any logged-in user
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  role       = null,
  redirectTo = '/auth?mode=login',
}) => {
  const { user, isLoggedIn, isLoading, isAgent, isAdmin } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  /* Save intended URL before redirecting to login */
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      localStorage.setItem('ev_redirect', location.pathname);
      navigate(redirectTo, { replace: true });
    }
  }, [isLoading, isLoggedIn, location.pathname, navigate, redirectTo]);

  /* Loading — show centered spinner */
  if (isLoading) {
    return (
      <div className="route-loading">
        <div className="route-spinner" aria-label="Loading…" />
      </div>
    );
  }

  /* Not logged in — useEffect will redirect, render nothing */
  if (!isLoggedIn) return null;

  /* Check role permissions */
  const hasAccess =
    role === null          ? true        :
    role === 'admin'       ? isAdmin     :
    role === 'agent'       ? isAgent     :
    false;

  if (!hasAccess) {
    const message =
      role === 'admin'
        ? 'This area is for administrators only.'
        : 'This area is for registered agents only.';

    return (
      <div className="access-denied">
        <div className="access-denied-card">
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚫</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8, color: 'var(--text)' }}>
            Access Restricted
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: 28, lineHeight: 1.6 }}>
            {message}
          </p>
          <button
            className="btn btn-gold"
            onClick={() => navigate('/')}
          >
            Go Home
          </button>
          {role === 'agent' && user?.role === 'buyer' && (
            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)' }}>
              Want to list properties?{' '}
              <button
                className="auth-link"
                onClick={() => navigate('/auth?mode=register')}
              >
                Register as an agent
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
