import { Home, Settings, Menu } from "lucide-react";
import overview from "../assets/icon_nav/icon_nav_overview.svg";
import penjualan from "../assets/icon_nav/icon_nav_penjualan.svg";
import produksiTelur from "../assets/icon_nav/icon_nav_produksi_telur.svg";
import ayam from "../assets/icon_nav/icon_nav_ayam.svg";
import kinerja from "../assets/icon_nav/icon_nav_kinerja.svg";
import gudang from "../assets/icon_nav/icon_nav_gudang.svg";
import toko from "../assets/icon_nav/icon_nav_toko.svg";
import kelolaPegawai from "../assets/icon_nav/icon_nav_kelola_pegawai.svg";
import cashflow from "../assets/icon_nav/icon_nav_cashflow.svg";
import { GrNotes } from "react-icons/gr";
import OverviewOwner from "../pages/OverviewOwner";
import Penjualan from "../pages/Penjualan";
import ProduksiTelur from "../pages/ProduksiTelur";
import { BsPersonSquare } from "react-icons/bs";

export const sidebarMenus = {
  Owner: [
    {
      icon: <img src={overview} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Overview",
      element: <OverviewOwner />,
    },
    {
      icon: <img src={penjualan} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Penjualan",
      element: <Penjualan />,
    },
    {
      icon: <img src={produksiTelur} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Produksi Telur",
      element: <ProduksiTelur />,
    },
    {
      icon: <img src={ayam} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Ayam",
      element: <OverviewOwner />,
    },
    {
      icon: <img src={kinerja} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Kinerja",
      element: <OverviewOwner />,
    },
    {
      icon: <img src={gudang} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Gudang",
      element: <OverviewOwner />,
    },
    {
      icon: <img src={toko} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Toko",
      element: <OverviewOwner />,
    },
    {
      icon: <img src={kelolaPegawai} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Kelola Pegawai",
      element: <OverviewOwner />,
      subTabs: [
        { tabName: "Overview", path: "overview" },
        { tabName: "Daftar Pegawai", path: "daftar-pegawai" },
        { tabName: "Tugas Pegawai", path: "tugas-pegawai" },
      ],
    },
    {
      icon: <img src={cashflow} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Cashflow",
      element: <OverviewOwner />,
    },
  ],
  "Pekerja Kandang": [
    {
      icon: <img src={overview} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Overview",
      element: <OverviewOwner />,
    },
    {
      icon: <img src={ayam} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Ayam",
      element: <OverviewOwner />,
    },
    {
      icon: <GrNotes size={20} />,
      tabName: "Tugas",
      element: <OverviewOwner />,
    },
    {
      icon: <BsPersonSquare size={20} />,
      tabName: "Presensi",
      element: <OverviewOwner />,
    },
  ],
  "Pekerja Telur": [
    {
      icon: <img src={overview} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Overview",
      element: <OverviewOwner />,
    },
    {
      icon: <img src={produksiTelur} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Produksi Telur",
      element: <ProduksiTelur />,
    },
    {
      icon: <GrNotes size={20} />,
      tabName: "Tugas",
      element: <OverviewOwner />,
    },
    {
      icon: <BsPersonSquare size={20} />,
      tabName: "Presensi",
      element: <OverviewOwner />,
    },
  ],
  "Pekerja Toko": [
    {
      icon: <img src={overview} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Overview",
      element: <OverviewOwner />,
    },
    {
      icon: <img src={toko} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Kasir",
      element: <OverviewOwner />,
      subTabs: [
        { tabName: "Antrian Pesanan", path: "antrian-pesanan" },
        { tabName: "Daftar Pesanan", path: "daftar-pesanan" },
        { tabName: "Pembayaran Cicilan", path: "pembayaran-cicilan" },
      ],
    },
    {
      icon: <img src={toko} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Stok Toko",
      element: <OverviewOwner />,
      subTabs: [
        { tabName: "Overview Stok", path: "overview-stok" },
        { tabName: "Dalam Pesanan", path: "dalam-pesanan" },
        { tabName: "Riwayat Stok", path: "riwayat-stok" },
      ],
    },
    {
      icon: <GrNotes size={20} />,
      tabName: "Tugas",
      element: <OverviewOwner />,
    },
    {
      icon: <BsPersonSquare size={20} />,
      tabName: "Presensi",
      element: <OverviewOwner />,
    },
  ],
  "Kepala Kandang": [
    {
      icon: <img src={overview} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Overview",
      element: <OverviewOwner />,
    },
    {
      icon: <img src={produksiTelur} alt="Overview Icon" className="h-4 w-4" />,
      tabName: "Produksi Telur",
      element: <ProduksiTelur />,
    },
    {
      icon: <img src={ayam} alt="ayam Icon" className="h-4 w-4" />,
      tabName: "Ayam",
      element: <OverviewOwner />,
      subTabs: [
        { tabName: "Overview Ayam", path: "overview-ayam" },
        { tabName: "Data Ayam", path: "data-ayam" },
      ],
    },
    {
      icon: <img src={gudang} alt="ayam Icon" className="h-4 w-4" />,
      tabName: "Gudang",
      element: <OverviewOwner />,
      subTabs: [
        { tabName: "Overview Gudang", path: "overview-gudang" },
        { tabName: "Riwayat Gudang", path: "riwayat-gudang" },
      ],
    },
    {
      icon: <GrNotes size={20} />,
      tabName: "Tugas",
      element: <OverviewOwner />,
    },
    {
      icon: <BsPersonSquare size={20} />,
      tabName: "Presensi",
      element: <OverviewOwner />,
    },
    // add more items
  ],
};
