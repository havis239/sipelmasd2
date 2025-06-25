import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false }) => {
  const { currentUser, adminUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika memerlukan admin
  if (requireAdmin && !adminUser) {
    return <Navigate to="/login" replace />;
  }

  // Jika memerlukan user biasa (masyarakat)
  if (requireUser && !currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
