import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const NonProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default NonProtectedRoute;
