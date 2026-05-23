import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const PrivateRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => !!state.user);
  const userRole = useAuthStore((state) => state.user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (userRole === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
