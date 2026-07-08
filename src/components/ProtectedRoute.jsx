import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/authcontext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(authContext);
  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
