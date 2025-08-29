// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Agar token nahi hai, login page pe redirect kar do
    return <Navigate to="/" replace />;
  }

  // Agar token hai to children render karo (jaise AdminDashboard)
  return children;
}
