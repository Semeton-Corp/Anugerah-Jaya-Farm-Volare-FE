import { Navigate, Outlet } from "react-router-dom";

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (e) {
    return true; // Treat invalid token as expired
  }
};

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const rolePath = userRole.toLowerCase().replace(/\s+/g, "-");
    return <Navigate to={`/${rolePath}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
