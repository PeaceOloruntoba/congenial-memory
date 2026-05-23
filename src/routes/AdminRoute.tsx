import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const AdminRoute: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
