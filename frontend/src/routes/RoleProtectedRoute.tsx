import React from "react";
import { Navigate } from "react-router-dom";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // 🔐 Not logged in → redirect to login
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // 🔒 Role not allowed → redirect to 403 page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  // ✅ Authorized → render children
  return <>{children}</>;
};

export default RoleProtectedRoute;
