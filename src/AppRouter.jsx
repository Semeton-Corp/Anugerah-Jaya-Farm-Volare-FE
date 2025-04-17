import { createBrowserRouter, Navigate } from "react-router-dom";
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
import Gudang from "./pages/Gudang";
import Toko from "./pages/Toko";
import OverviewKelolaPegawai from "./pages/OverviewKelolaPegawai";
import DaftarPegawai from "./pages/DaftarPegawai";
import TugasPegawai from "./pages/TugasPegawai";
import DetailPenjualan from "./pages/DetailPenjualan";
import DetailProduksi from "./pages/DetailProduksi";
import DetailAyam from "./pages/DetailAyam";
import DetailKinerjaAyam from "./pages/DetailKinerjaAyam";
import DetailStokGudang from "./pages/DetailStokGudang";
import RiwayatAktivitasToko from "./pages/RiwayatAktivitasToko";
import DetailStokToko from "./pages/DetailStokToko";
import RiwayatAktivitasGudang from "./pages/RiwayatAktivitasGudang";
import ProtectedRoute from "./components/ProtectedRoute";
import Tugas from "./pages/Tugas";
import Presensi from "./pages/Presensi";
import InputAyam from "./pages/InputAyam";
import InputTelur from "./pages/InputTelur";

const AppRouter = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="auth" replace />,
  },
  // OWNER ROUTE
  {
    path: "/owner",
    element: <ProtectedRoute allowedRoles={["Owner"]} />,
    children: [
      {
        path: "",
        element: <MainLayout role="Owner" />,
        children: [
          { path: "", element: <Navigate to="overview" replace /> },
          { path: "overview", element: <OverviewOwner /> },
          {
            path: "penjualan",
            element: <Penjualan />,
            children: [
              { path: "detail-penjualan", element: <DetailPenjualan /> },
            ],
          },
          {
            path: "produksi-telur",
            element: <ProduksiTelur />,
            children: [
              { path: "detail-produksi", element: <DetailProduksi /> },
            ],
          },
          {
            path: "ayam",
            element: <Ayam />,
            children: [{ path: "detail-ayam", element: <DetailAyam /> }],
          },
          {
            path: "kinerja",
            element: <Kinerja />,
            children: [
              { path: "detail-kinerja-ayam", element: <DetailKinerjaAyam /> },
            ],
          },
          {
            path: "gudang",
            element: <Gudang />,
            children: [
              { path: "detail-stok-gudang", element: <DetailStokGudang /> },
              {
                path: "riwayat-aktivitas-gudang",
                element: <RiwayatAktivitasGudang />,
              },
            ],
          },
          {
            path: "toko",
            element: <Toko />,
            children: [
              { path: "detail-stok-toko", element: <DetailStokToko /> },
              {
                path: "riwayat-aktivitas-toko",
                element: <RiwayatAktivitasToko />,
              },
            ],
          },
          {
            path: "kelola-pegawai",
            children: [
              {
                path: "overview",
                element: <OverviewKelolaPegawai />,
              },
              {
                path: "daftar-pegawai",
                element: <DaftarPegawai />,
              },
              {
                path: "tugas-pegawai",
                element: <TugasPegawai />,
              },
            ],
          },
        ],
      },
    ],
  },

  // PEKERJA KANDANG ROUTE
  {
    path: "/pekerja-kandang",
    element: <ProtectedRoute allowedRoles={["Pekerja Kandang"]} />,
    children: [
      {
        path: "",
        element: <MainLayout role="Pekerja Kandang" />,
        children: [
          { path: "", element: <Navigate to="overview" replace /> },
          { path: "overview", element: <Ayam /> },
          {
            path: "ayam",
            element: <DetailAyam />,
            children: [
              {
                path: "input-ayam",
                element: <InputAyam />,
              },
              {
                path: "input-ayam/:id",
                element: <InputAyam />,
              },
            ],
          },
          { path: "tugas", element: <Tugas /> },
          { path: "presensi", element: <Presensi /> },
        ],
      },
    ],
  },

  // PEKERJA TELUR ROUTE
  {
    path: "/pekerja-telur",
    element: <ProtectedRoute allowedRoles={["Pekerja Telur"]} />,
    children: [
      {
        path: "",
        element: <MainLayout role="Pekerja Telur" />,
        children: [
          { path: "", element: <Navigate to="overview" replace /> },
          { path: "overview", element: <ProduksiTelur /> },
          {
            path: "produksi-telur",
            element: <DetailProduksi />,
            children: [
              {
                path: "input-telur",
                element: <InputTelur />,
              },
              {
                path: "input-ayam/:id",
                element: <InputAyam />,
              },
            ],
          },
          { path: "tugas", element: <Tugas /> },
          { path: "presensi", element: <Presensi /> },
        ],
      },
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
      { path: "", element: <Navigate to="login" replace /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verification", element: <Verification /> },
    ],
  },
]);

export default AppRouter;
