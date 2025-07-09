import { AuthContext } from "@/context/auth-context";

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
