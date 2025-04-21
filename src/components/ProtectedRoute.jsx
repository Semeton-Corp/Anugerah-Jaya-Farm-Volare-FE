import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  } else if (allowedRoles != userRole) {
    const rolePath = userRole.toLowerCase().replace(/\s+/g, "-");
    return <Navigate to={`/${rolePath}`} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
