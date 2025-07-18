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
import DaftarSuplier from "./pages/DaftarSuplier";
import PesananToko from "./pages/PesananToko";
import DaftarBarang from "./pages/DaftarBarang";
import TambahTugasTambahan from "./pages/TambahTugasTambahan";
import TambahTugasRutin from "./pages/TambahTugasRutin";
import PengadaanBarang from "./pages/PengadaanBarang";
import TambahBarangBaru from "./pages/TambahBarangBaru";
import InputPengadaanBarang from "./pages/InputPengadaanBarang";
import TambahSupplier from "./pages/TambahSupplier";
import DataTelurKeGudang from "./pages/DataTelurGudang";
import RequestKeGudang from "./pages/RequestKeGudang";
import TambahPegawai from "./pages/TambahPegawai";
import Profile from "./pages/Profile";
import DetailAbsensi from "./pages/DetailAbsensi";
import DetailPenyelesaianPekerjaan from "./pages/DetailPenyelesaianPekerjaan";
import VaksinObat from "./pages/VaksinObat";
import DetailVaksinObat from "./pages/DetailVaksinObat";
import InputVaksinObat from "./pages/InputVaksinObat";
import Kandang from "./pages/Kandang";
import DaftarKandang from "./pages/DaftarKandang";
import DaftarToko from "./pages/DaftarToko";
import DaftarGudang from "./pages/DaftarGudang";
import TambahKandang from "./pages/TambahKandang";
import DetailKandang from "./pages/DetailKandang";
import EditPic from "./pages/EditPic";
import PindahAyam from "./pages/PindahAyam";
import EditStok from "./pages/EditStok";
import PesanBarang from "./pages/PesanBarang";
import DetailPesanBarangGudang from "./pages/DetailPesanBarangGudang";
import EditKandang from "./pages/EditKandang";
import TambahToko from "./pages/TambahToko";
import EditStokTelur from "./pages/EditStokTelur";
import EditStokBarang from "./pages/EditStokBarang";
import DetailRiwayatGudang from "./pages/DetailRiwayatGudang";
import DaftarVaksinObat from "./pages/DaftarVaksinObat";
import DetailSupplier from "./pages/DetailSuplier";
import DaftarHargaTelur from "./pages/DaftarHargaTelur";
import TambahHargaTelur from "./pages/TambahHargaTelur";
import TambahDiskon from "./pages/TambahDiskon";
import TambahVaksinObat from "./pages/TambahVaksinObat";
import DetailVaksinObatItem from "./pages/DetailVaksinObatItem";
import TambahGudang from "./pages/TambahGudang";
import DetailGudang from "./pages/DetailGudang";
import DetailToko from "./pages/DetailToko";
import DetailTugasTambahan from "./pages/DetailTugasTambahan";

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
          {
            path: "profile",
            element: <Profile />,
          },
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
            children: [
              { path: "overview-produksi", element: <ProduksiTelur /> },
              {
                path: "data-produksi-telur",
                element: <DetailProduksi />,
                children: [
                  { path: "input-telur", element: <InputTelur /> },
                  {
                    path: "input-telur/:id",
                    element: <InputTelur />,
                  },
                ],
              },
              {
                path: "kandang",
                element: <Kandang />,
              },
            ],
          },
          {
            path: "ayam",
            children: [
              { path: "ringkasan-ayam", element: <Ayam /> },
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
              {
                path: "vaksin-&-obat",
                element: <VaksinObat />,
                children: [
                  {
                    path: "detail-vaksin-&-obat/:id",
                    element: <DetailVaksinObat />,
                    children: [
                      {
                        path: "input-vaksin-&-obat",
                        element: <InputVaksinObat />,
                      },
                    ],
                  },
                ],
              },
              { path: "kandang", element: <Kandang /> },
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
                element: <VaksinObat />,
                children: [
                  {
                    path: "input-ayam/:id",
                    element: <InputAyam />,
                  },
                ],
              },
              {
                path: "vaksin-&-obat",
                element: <VaksinObat />,
                children: [
                  {
                    path: "detail-vaksin-&-obat/:id",
                    element: <DetailVaksinObat />,
                    children: [
                      {
                        path: "input-vaksin-&-obat",
                        element: <InputVaksinObat />,
                      },
                    ],
                  },
                  {
                    path: "input-vaksin-&-obat/:id",
                    element: <InputVaksinObat />,
                  },
                  {
                    path: "input-vaksin-&-obat/:id/:monitoringId",
                    element: <InputVaksinObat />,
                  },
                ],
              },
            ],
          },
          {
            path: "kinerja",
            children: [
              { path: "overview-kinerja", element: <Kinerja /> },
              { path: "detail-kinerja-ayam", element: <DetailKinerjaAyam /> },
            ],
          },
          {
            path: "gudang",
            children: [
              {
                path: "stok-gudang",
                element: <Gudang />,
              },
              {
                path: "pengadaan-barang",
                element: <PengadaanBarang />,
                children: [
                  {
                    path: "input-pengadaan-barang",
                    element: <InputPengadaanBarang />,
                  },
                ],
              },
              {
                path: "daftar-barang",
                element: <DaftarBarang />,
                children: [
                  {
                    path: "tambah-barang-baru",
                    element: <TambahBarangBaru />,
                  },
                  {
                    path: "tambah-barang-baru/:id",
                    element: <TambahBarangBaru />,
                  },
                ],
              },
              {
                path: "daftar-suplier",
                element: <DaftarSuplier />,
                children: [
                  {
                    path: "tambah-supplier",
                    element: <TambahSupplier />,
                  },
                  {
                    path: "tambah-supplier/:id",
                    element: <TambahSupplier />,
                  },
                  {
                    path: "detail-supplier/:id",
                    element: <DetailSupplier />,
                  },
                ],
              },
              {
                path: "pesanan-toko",
                element: <PesananToko />,
              },
              {
                path: "riwayat-gudang",
                element: <RiwayatGudang />,
                children: [
                  {
                    path: "detail-riwayat-gudang/:id",
                    element: <DetailRiwayatGudang />,
                  },
                ],
              },
              {
                path: "daftar-vaksin-&-obat",
                element: <DaftarVaksinObat />,
                children: [
                  {
                    path: "tambah-vaksin",
                    element: <TambahVaksinObat />,
                  },
                  {
                    path: "tambah-vaksin/:id",
                    element: <TambahVaksinObat />,
                  },
                  {
                    path: "detail-vaksin-obat/:id",
                    element: <DetailVaksinObatItem />,
                  },
                ],
              },
            ],
          },
          {
            path: "toko",
            children: [
              {
                path: "overview-toko",
                element: <Toko />,
              },
              {
                path: "stok-toko",
                element: <OverviewStok />,
              },
              {
                path: "request-ke-gudang",
                element: <RequestKeGudang />,
              },
              {
                path: "riwayat-stok",
                element: <RiwayatStok />,
              },
            ],
          },
          {
            path: "fasilitas",
            children: [
              {
                path: "daftar-kandang",
                element: <DaftarKandang />,
                children: [
                  { path: "pindah-ayam", element: <PindahAyam /> },
                  { path: "tambah-kandang", element: <TambahKandang /> },
                  {
                    path: "edit-kandang/:id/:cageId",
                    element: <EditKandang />,
                  },
                  {
                    path: "edit-pic/:id/:locationId/:cageId",
                    element: <EditPic />,
                  },
                  {
                    path: "detail-kandang/:id",
                    element: <DetailKandang />,
                    children: [
                      { path: "edit-pic/:id", element: <EditPic /> },
                      { path: "edit-kandang/:id", element: <EditKandang /> },
                    ],
                  },
                ],
              },
              {
                path: "daftar-toko",
                element: <DaftarToko />,
                children: [
                  { path: "tambah-toko", element: <TambahToko /> },
                  {
                    path: "tambah-toko/:id/:locationId",
                    element: <TambahToko />,
                  },
                  {
                    path: "detail-toko/:id/:locationId",
                    element: <DetailToko />,
                  },
                ],
              },
              {
                path: "daftar-gudang",
                element: <DaftarGudang />,
                children: [
                  { path: "tambah-gudang", element: <TambahGudang /> },
                  {
                    path: "tambah-gudang/:id/:locationId",
                    element: <TambahGudang />,
                  },
                  {
                    path: "detail-gudang/:id/:locationId",
                    element: <DetailGudang />,
                  },
                ],
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
                children: [
                  { path: "tambah-pegawai", element: <TambahPegawai /> },
                ],
              },
              {
                path: "tugas-pegawai",
                element: <TugasPegawai />,
                children: [
                  {
                    path: "tambah-tugas-tambahan",
                    element: <TambahTugasTambahan />,
                  },
                  {
                    path: "tambah-tugas-tambahan/:id",
                    element: <TambahTugasTambahan />,
                  },
                  {
                    path: "detail-tugas-tambahan/:id",
                    element: <DetailTugasTambahan />,
                  },
                  {
                    path: "tambah-tugas-rutin",
                    element: <TambahTugasRutin />,
                  },
                  {
                    path: "tambah-tugas-rutin/:id",
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
          { path: "", element: <Navigate to="ringkasan" replace /> },
          {
            path: "profile",
            element: <Profile />,
            children: [
              { path: "detail-absensi", element: <DetailAbsensi /> },
              {
                path: "detail-penyelesaian-pekerjaan",
                element: <DetailPenyelesaianPekerjaan />,
              },
            ],
          },
          { path: "ringkasan", element: <Ayam /> },
          {
            path: "ayam",
            children: [
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
              {
                path: "vaksin-&-obat",
                element: <VaksinObat />,
                children: [
                  {
                    path: "detail-vaksin-&-obat/:id",
                    element: <DetailVaksinObat />,
                    children: [
                      {
                        path: "input-vaksin-&-obat",
                        element: <InputVaksinObat />,
                      },
                    ],
                  },
                  {
                    path: "input-vaksin-&-obat/:id",
                    element: <InputVaksinObat />,
                  },
                  {
                    path: "input-vaksin-&-obat/:id/:monitoringId",
                    element: <InputVaksinObat />,
                  },
                ],
              },
              { path: "kandang", element: <Kandang /> },

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
                element: <VaksinObat />,
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
          {
            path: "profile",
            element: <Profile />,
            children: [
              { path: "detail-absensi", element: <DetailAbsensi /> },
              {
                path: "detail-penyelesaian-pekerjaan",
                element: <DetailPenyelesaianPekerjaan />,
              },
            ],
          },
          { path: "overview", element: <ProduksiTelur /> },
          {
            path: "produksi-telur",
            children: [
              {
                path: "data-produksi-telur",
                element: <DetailProduksi />,
                children: [
                  { path: "input-telur", element: <InputTelur /> },
                  {
                    path: "input-telur/:id",
                    element: <InputTelur />,
                  },
                ],
              },
              {
                path: "kandang",
                element: <Kandang />,
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
          { path: "", element: <Navigate to="ringkasan" replace /> },
          {
            path: "profile",
            element: <Profile />,
            children: [
              { path: "detail-absensi", element: <DetailAbsensi /> },
              {
                path: "detail-penyelesaian-pekerjaan",
                element: <DetailPenyelesaianPekerjaan />,
              },
            ],
          },
          { path: "ringkasan", element: <Toko /> },
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
                    path: "input-data-pesanan",
                    element: <InputDataPesanan />,
                  },
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
                children: [
                  {
                    path: "edit-stok",
                    element: <EditStok />,
                  },
                ],
              },
              {
                path: "pesan-ke-gudang",
                element: <RequestKeGudang />,
                children: [
                  {
                    path: "pesan-barang",
                    element: <PesanBarang />,
                  },
                  {
                    path: "detail-pesan-barang-gudang",
                    element: <DetailPesanBarangGudang />,
                  },
                ],
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
          {
            path: "profile",
            element: <Profile />,
            children: [
              { path: "detail-absensi", element: <DetailAbsensi /> },
              {
                path: "detail-penyelesaian-pekerjaan",
                element: <DetailPenyelesaianPekerjaan />,
              },
            ],
          },
          { path: "overview", element: <OverviewKepalaKandang /> },
          {
            path: "produksi-telur",
            children: [
              {
                path: "ringkasan-produksi-telur",
                element: <ProduksiTelur />,
              },
              {
                path: "data-produksi-telur",
                element: <DetailProduksi />,
                children: [
                  { path: "input-telur", element: <InputTelur /> },
                  {
                    path: "input-telur/:id",
                    element: <InputTelur />,
                  },
                ],
              },
            ],
          },
          {
            path: "ayam",
            children: [
              {
                path: "ringkasan-ayam",
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
              {
                path: "vaksin-&-obat",
                element: <VaksinObat />,
                children: [
                  {
                    path: "detail-vaksin-&-obat/:id",
                    element: <DetailVaksinObat />,
                    children: [
                      {
                        path: "input-vaksin-&-obat",
                        element: <InputVaksinObat />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "gudang",
            children: [
              {
                path: "stok-gudang",
                element: <Gudang />,
                children: [
                  {
                    path: "edit-stok-telur",
                    element: <EditStokTelur />,
                  },
                  {
                    path: "edit-stok-barang",
                    element: <EditStokBarang />,
                  },
                ],
              },
              {
                path: "pengadaan-barang",
                element: <PengadaanBarang />,
                children: [
                  {
                    path: "input-pengadaan-barang",
                    element: <InputPengadaanBarang />,
                  },
                ],
              },
              {
                path: "pesanan-toko",
                element: <PesananToko />,
              },
              {
                path: "daftar-barang",
                element: <DaftarBarang />,
                children: [
                  {
                    path: "tambah-barang-baru",
                    element: <TambahBarangBaru />,
                  },
                  {
                    path: "tambah-barang-baru/:id",
                    element: <TambahBarangBaru />,
                  },
                ],
              },
              {
                path: "daftar-vaksin-&-obat",
                element: <DaftarVaksinObat />,
                children: [
                  {
                    path: "tambah-vaksin",
                    element: <TambahVaksinObat />,
                  },
                  {
                    path: "tambah-vaksin/:id",
                    element: <TambahVaksinObat />,
                  },
                  {
                    path: "detail-vaksin-obat/:id",
                    element: <DetailVaksinObatItem />,
                  },
                ],
              },
              {
                path: "riwayat-gudang",
                element: <RiwayatGudang />,
                children: [
                  {
                    path: "detail-riwayat-gudang",
                    element: <DetailRiwayatGudang />,
                  },
                  {
                    path: "detail-riwayat-gudang/:id",
                    element: <DetailRiwayatGudang />,
                  },
                ],
              },
              {
                path: "daftar-suplier",
                element: <DaftarSuplier />,
                children: [
                  {
                    path: "tambah-supplier",
                    element: <TambahSupplier />,
                  },
                  {
                    path: "tambah-supplier/:id",
                    element: <TambahSupplier />,
                  },
                  {
                    path: "detail-supplier/:id",
                    element: <DetailSupplier />,
                  },
                ],
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
                path: "daftar-harga-telur",
                element: <DaftarHargaTelur />,
                children: [
                  {
                    path: "tambah-kategori-harga",
                    element: <TambahHargaTelur />,
                  },
                  {
                    path: "tambah-kategori-harga/:id",
                    element: <TambahHargaTelur />,
                  },
                  {
                    path: "tambah-diskon",
                    element: <TambahDiskon />,
                  },
                  {
                    path: "tambah-diskon/:id",
                    element: <TambahDiskon />,
                  },
                ],
              },
            ],
          },
          {
            path: "fasilitas",
            children: [
              {
                path: "daftar-kandang",
                element: <DaftarKandang />,
                children: [
                  { path: "pindah-ayam", element: <PindahAyam /> },
                  { path: "tambah-kandang", element: <TambahKandang /> },
                  {
                    path: "edit-kandang/:id/:cageId",
                    element: <EditKandang />,
                  },
                  {
                    path: "edit-pic/:id/:locationId/:cageId",
                    element: <EditPic />,
                  },
                  {
                    path: "detail-kandang/:id",
                    element: <DetailKandang />,
                    children: [
                      { path: "edit-pic/:id", element: <EditPic /> },
                      { path: "edit-kandang/:id", element: <EditKandang /> },
                    ],
                  },
                ],
              },
              {
                path: "daftar-gudang",
                element: <DaftarGudang />,
                children: [
                  { path: "tambah-gudang", element: <TambahGudang /> },
                  { path: "tambah-gudang/:id", element: <TambahGudang /> },
                  { path: "detail-gudang/:id", element: <DetailGudang /> },
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

  // PEKERJA GUDANG
  {
    path: "/pekerja-gudang",
    element: <ProtectedRoute allowedRoles={["Pekerja Gudang"]} />,
    children: [
      {
        path: "",
        element: <MainLayout role="Pekerja Gudang" />,
        children: [
          { path: "", element: <Navigate to="produksi-telur" replace /> },
          {
            path: "profile",
            element: <Profile />,
            children: [
              { path: "detail-absensi", element: <DetailAbsensi /> },
              {
                path: "detail-penyelesaian-pekerjaan",
                element: <DetailPenyelesaianPekerjaan />,
              },
            ],
          },
          {
            path: "produksi-telur",
            element: <DetailProduksi />,
          },
          {
            path: "gudang",
            children: [
              {
                path: "stok-gudang",
                element: <Gudang />,
              },
              {
                path: "pengadaan-barang",
                element: <PengadaanBarang />,
                children: [
                  {
                    path: "input-pengadaan-barang",
                    element: <InputPengadaanBarang />,
                  },
                ],
              },
              {
                path: "daftar-barang",
                element: <DaftarBarang />,
                children: [
                  {
                    path: "tambah-barang-baru",
                    element: <TambahBarangBaru />,
                  },
                  {
                    path: "tambah-barang-baru/:id",
                    element: <TambahBarangBaru />,
                  },
                ],
              },
              {
                path: "pesanan-toko",
                element: <PesananToko />,
              },
              {
                path: "riwayat-gudang",
                element: <RiwayatGudang />,
                children: [
                  {
                    path: "detail-riwayat-gudang",
                    element: <DetailRiwayatGudang />,
                  },
                  {
                    path: "detail-riwayat-gudang/:id",
                    element: <DetailRiwayatGudang />,
                  },
                ],
              },
              {
                path: "daftar-suplier",
                element: <DaftarSuplier />,
                children: [
                  {
                    path: "tambah-supplier",
                    element: <TambahSupplier />,
                  },
                  {
                    path: "tambah-supplier/:id",
                    element: <TambahSupplier />,
                  },
                ],
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
