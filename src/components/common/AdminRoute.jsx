import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'ADMIN') {
    toast.error("Access Denied. Admins only.");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;