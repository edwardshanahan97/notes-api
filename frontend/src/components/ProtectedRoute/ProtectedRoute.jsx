import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        setAuthStatus(response.ok ? "authenticated" : "unauthenticated");
      } catch (error) {
        console.error("Session check failed:", error);
        setAuthStatus("unauthenticated");
      }
    };

    checkAuth();
  }, []);

  if (authStatus === "checking") {
    return <p>Checking session...</p>;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
