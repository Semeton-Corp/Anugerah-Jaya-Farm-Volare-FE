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
import OverviewKepalaKandang from "./pages/OverviewKepalaKandang";
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
import AntrianPesanan from "./pages/AntrianPesanan";
import DaftarPesanan from "./pages/DaftarPesanan";
import PembayaranCicilan from "./pages/PembayaranCicilan";
import OverviewStok from "./pages/OverviewStok";
import DalamPesanan from "./pages/DalamPesanan";
import RiwayatStok from "./pages/RiwayatStok";
import RiwayatGudang from "./pages/RiwayatGudang";
import InputDataPesanan from "./pages/InputDataPesanan";
import DetailVaksinObat from "./pages/DetailVaksinObat";
import DaftarSuplier from "./pages/DaftarSuplier";
import PesananToko from "./pages/PesananToko";
import DaftarBarang from "./pages/DaftarBarang";
import TambahTugasRutin from "./pages/TambahTugasRutin";

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
                children: [
                  {
                    path: "tambah-tugas-rutin",
                    element: <TambahTugasRutin />,
                  },
                ],
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
              {
                path: "detail-vaksin-obat",
                element: <DetailVaksinObat />,
                children: [
                  {
                    path: "input-ayam/:id",
                    element: <InputAyam />,
                  },
                ],
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
                path: "input-telur/:id",
                element: <InputTelur />,
              },
            ],
          },
          { path: "tugas", element: <Tugas /> },
          { path: "presensi", element: <Presensi /> },
        ],
      },
    ],
  },

  // PEKERJA TOKO ROUTE
  {
    path: "/pekerja-toko",
    element: <ProtectedRoute allowedRoles={["Pekerja Toko"]} />,
    children: [
      {
        path: "",
        element: <MainLayout role="Pekerja Toko" />,
        children: [
          { path: "", element: <Navigate to="overview" replace /> },
          { path: "overview", element: <Toko /> },
          {
            path: "kasir",
            children: [
              {
                path: "antrian-pesanan",
                element: <AntrianPesanan />,
                children: [
                  {
                    path: "input-data-pesanan",
                    element: <InputDataPesanan />,
                  },
                  {
                    path: "input-data-pesanan/:id",
                    element: <InputDataPesanan />,
                  },
                ],
              },
              {
                path: "daftar-pesanan",
                element: <DaftarPesanan />,
                children: [
                  {
                    path: "input-data-pesanan/:id",
                    element: <InputDataPesanan />,
                  },
                ],
              },
            ],
          },
          {
            path: "stok-toko",
            children: [
              {
                path: "overview-stok",
                element: <OverviewStok />,
              },
              {
                path: "dalam-pesanan",
                element: <DalamPesanan />,
              },
              {
                path: "riwayat-stok",
                element: <RiwayatStok />,
              },
            ],
          },
          { path: "tugas", element: <Tugas /> },
          { path: "presensi", element: <Presensi /> },
        ],
      },
    ],
  },
  // KEPALA KANDANG ROUTE
  {
    path: "/kepala-kandang",
    element: <ProtectedRoute allowedRoles={["Kepala Kandang"]} />,
    children: [
      {
        path: "",
        element: <MainLayout role="Kepala Kandang" />,
        children: [
          { path: "", element: <Navigate to="overview" replace /> },
          { path: "overview", element: <OverviewKepalaKandang /> },
          {
            path: "produksi-telur",
            element: <ProduksiTelur />,
          },
          {
            path: "ayam",
            children: [
              {
                path: "overview-ayam",
                element: <Ayam />,
              },
              {
                path: "data-ayam",
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
            ],
          },
          {
            path: "gudang",
            children: [
              {
                path: "overview-gudang",
                element: <Gudang />,
              },
              {
                path: "daftar-barang",
                element: <DaftarBarang />,
              },
              {
                path: "pesanan-toko",
                element: <PesananToko />,
              },
              {
                path: "riwayat-gudang",
                element: <RiwayatGudang />,
              },
              {
                path: "daftar-suplier",
                element: <DaftarSuplier />,
              },
            ],
          },
          {
            path: "kasir",
            children: [
              {
                path: "antrian-pesanan",
                element: <AntrianPesanan />,
                children: [
                  {
                    path: "input-data-pesanan",
                    element: <InputDataPesanan />,
                  },
                  {
                    path: "input-data-pesanan/:id",
                    element: <InputDataPesanan />,
                  },
                ],
              },
              {
                path: "daftar-pesanan",
                element: <DaftarPesanan />,
                children: [
                  {
                    path: "input-data-pesanan/:id",
                    element: <InputDataPesanan />,
                  },
                ],
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
