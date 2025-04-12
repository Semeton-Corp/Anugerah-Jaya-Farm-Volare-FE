import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import MainLayout from "./layouts/MainLayout";
import OverviewOwner from "./pages/OverviewOwner";
import Penjualan from "./pages/Penjualan";
import ProduksiTelur from "./pages/ProduksiTelur";
import Ayam from "./pages/Ayam";
import OverviewKepalaGudang from "./pages/OverviewKepalaGudang";
import Kinerja from "./pages/Kinerja";

const AppRouter = createBrowserRouter([
  {
    path: "/owner",
    element: <MainLayout role="Owner" />,
    children: [
      { path: "overview", element: <OverviewOwner /> },
      { path: "penjualan", element: <Penjualan /> },
      { path: "produksi-telur", element: <ProduksiTelur /> },
      { path: "ayam", element: <Ayam /> },
      { path: "kinerja", element: <Kinerja /> },
    ],
  },
  {
    path: "/pekerja-kandang",
    element: <MainLayout role="Pekerja Kandang" />,
    children: [
      { path: "overview", element: <Ayam /> },
      // Add more specific tab pages here
    ],
  },
  {
    path: "/pekerja-telur",
    element: <MainLayout role="Pekerja Telur" />,
    children: [
      { path: "overview", element: <ProduksiTelur /> },
      // Add more tabs here
    ],
  },
  {
    path: "/kepala-gudang",
    element: <MainLayout role="Kepala Gudang & Admin Rekap" />,
    children: [
      { path: "overview", element: <OverviewKepalaGudang /> },
      // Add more tabs here
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
