import React, { useState } from "react";
import { Home, Settings, Menu } from "lucide-react"; // You can use other icons too
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import overview from "../assets/icon_nav/icon_nav_overview.svg";
import penjualan from "../assets/icon_nav/icon_nav_penjualan.svg";
import produksiTelur from "../assets/icon_nav/icon_nav_produksi_telur.svg";
import ayam from "../assets/icon_nav/icon_nav_ayam.svg";
import kinerja from "../assets/icon_nav/icon_nav_kinerja.svg";
import gudang from "../assets/icon_nav/icon_nav_gudang.svg";
import toko from "../assets/icon_nav/icon_nav_toko.svg";
import kelolaPegawai from "../assets/icon_nav/icon_nav_kelola_pegawai.svg";
import cashflow from "../assets/icon_nav/icon_nav_cashflow.svg";

const sidebarMenus = {
  Owner: [
    {
      icon: <img src={overview} alt="Overview Icon" className="h-4 w-4" />,
      text: "Overview",
    },
    {
      icon: <img src={penjualan} alt="Overview Icon" className="h-4 w-4" />,
      text: "Penjualan",
    },
    {
      icon: <img src={produksiTelur} alt="Overview Icon" className="h-4 w-4" />,
      text: "Produksi Telur",
    },
    {
      icon: <img src={ayam} alt="Overview Icon" className="h-4 w-4" />,
      text: "Ayam",
    },
    {
      icon: <img src={kinerja} alt="Overview Icon" className="h-4 w-4" />,
      text: "Kinerja",
    },
    {
      icon: <img src={gudang} alt="Overview Icon" className="h-4 w-4" />,
      text: "Gudang",
    },
    {
      icon: <img src={toko} alt="Overview Icon" className="h-4 w-4" />,
      text: "Toko",
    },
    {
      icon: <img src={kelolaPegawai} alt="Overview Icon" className="h-4 w-4" />,
      text: "Kelola Pegawai",
    },
    {
      icon: <img src={cashflow} alt="Overview Icon" className="h-4 w-4" />,
      text: "Cashflow",
    },
  ],
  "Pekerja Kandang": [
    { icon: <Home />, text: "Kandang" },
    // add more items
  ],
  "Pekerja Telur": [
    { icon: <Home />, text: "Telur Harian" },
    // add more items
  ],
  "Kepala Gudang & Admin Rekap": [
    { icon: <Home />, text: "Gudang" },
    { icon: <Settings />, text: "Rekap" },
    // add more items
  ],
};

const SideNavbar = ({ role }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const menuItems = sidebarMenus[role] || [];

  return (
    <div
      className={`bg-green-700 text-shadow-black-13 h-screen transition-all flex flex-col duration-100 justify-between ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="mt-32 space-y-2">
        {menuItems.map((item, idx) => (
          <SidebarItem
            key={idx}
            icon={item.icon}
            text={item.text}
            isExpanded={isExpanded}
          />
        ))}
      </nav>
      <div className="flex items-center justify-center p-4">
        <button
          onClick={toggleSidebar}
          className={`${isExpanded ? "ml-auto" : ""}`}
        >
          {isExpanded ? (
            <MdKeyboardDoubleArrowLeft className="text-black-1 w-8 h-8 hover:text-black-7 cursor-pointer" />
          ) : (
            <MdKeyboardDoubleArrowRight className="text-black-1 w-8 h-8 hover:text-black-7 cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isExpanded }) => {
  return (
    <div
      className={`flex items-center mx-4 py-4 bg-orange-50 rounded-[6px] hover:bg-green-800 cursor-pointer transition ${
        isExpanded ? "justify-start px-6" : "justify-center"
      }`}
    >
      <div className="">{icon}</div>
      {isExpanded && <span className="text-shadow-black-13 mx-4">{text}</span>}
    </div>
  );
};

export default SideNavbar;
