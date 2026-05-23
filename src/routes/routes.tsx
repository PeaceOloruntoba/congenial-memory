import { useRoutes, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import HomePage from "../pages/user/HomePage";
import TasksPage from "../pages/user/TasksPage";
import RewardPage from "../pages/user/RewardPage";
import WalletPage from "../pages/user/WalletPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import TaskControls from "../pages/admin/TaskControls";
import AuditLog from "../pages/admin/AuditLog";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";

export const AppRoutes = () => {
  const routes = useRoutes([
    // Public Facing Main Landing Page
    { path: "/", element: <LandingPage /> },

    // User Protected Sub-Routes Layout Tree (/app/*)
    {
      path: "app",
      element: <PrivateRoute />,
      children: [
        {
          element: <AppLayout />,
          children: [
            { index: true, element: <Navigate to="home" replace /> },
            { path: "home", element: <HomePage /> },
            { path: "tasks", element: <TasksPage /> },
            { path: "reward", element: <RewardPage /> },
            { path: "wallet", element: <WalletPage /> },
          ],
        },
      ],
    },

    // Public Facing Context / Auth Screens Layout Tree
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Navigate to="login" replace /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "forgot", element: <ForgotPasswordPage /> },
      ],
    },

    // Administration Control Platform Layout Tree
    {
      path: "admin",
      element: <AdminRoute />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "users", element: <UserManagement /> },
            { path: "tasks", element: <TaskControls /> },
            { path: "audit", element: <AuditLog /> },
          ],
        },
      ],
    },

    // Fallback Redirection System 404 Routing Endpoint
    { path: "404", element: <NotFoundPage /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);

  return routes;
};

export default AppRoutes;
