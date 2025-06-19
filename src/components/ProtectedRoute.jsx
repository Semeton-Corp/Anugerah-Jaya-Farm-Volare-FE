import { Navigate, Outlet } from "react-router-dom";

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (e) {
    return true;
  }
};

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  console.log("isTokenExpired(token): ", isTokenExpired(token));

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const rolePath = userRole.toLowerCase().replace(/\s+/g, "-");
    return <Navigate to={`/${rolePath}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
