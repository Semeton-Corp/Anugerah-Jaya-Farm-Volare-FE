import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // other protected routes
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verification", element: <Verification /> },
    ],
  },
]);

export default AppRouter;
