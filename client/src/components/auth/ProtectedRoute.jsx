import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("You must sign in to access this page.", {
        style: {
          background: '#1A1714',
          color: '#F5C26B',
          border: '1px solid rgba(245,194,107,0.3)',
        },
      });
    }
  }, [user, loading]);

  if (loading) {
    return null; 
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;