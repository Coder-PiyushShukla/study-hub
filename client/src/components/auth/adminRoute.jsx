import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      toast.error("Only admins can access this page!");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;