import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import {
  FaArrowUpLong,
  FaArrowDownLong,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { FiMaximize2 } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const detailAyamData = [
  {
    kandang: "Kandang A1",
    kategori: "DOC",
    usiaMinggu: 49,
    hidup: 4000,
    sakit: 50,
    mati: 10,
    pakanKg: 20,
    mortalitas: "3%",
  },
  {
    kandang: "Kandang A2",
    kategori: "Grower",
    usiaMinggu: 49,
    hidup: 1200,
    sakit: 20,
    mati: 12,
    pakanKg: 40,
    mortalitas: "0.8%",
  },
  {
    kandang: "Kandang A3",
    kategori: "Pre Layer",
    usiaMinggu: 49,
    hidup: 1200,
    sakit: 20,
    mati: 12,
    pakanKg: 40,
    mortalitas: "0.8%",
  },
  {
    kandang: "Kandang A4",
    kategori: "Layer",
    usiaMinggu: 49,
    hidup: 1200,
    sakit: 20,
    mati: 12,
    pakanKg: 40,
    mortalitas: "0.8%",
  },
  {
    kandang: "Kandang A5",
    kategori: "Afkir",
    usiaMinggu: 49,
    hidup: 1200,
    sakit: 20,
    mati: 12,
    pakanKg: 40,
    mortalitas: "0.8%",
  },
];

const data = [
  { date: "29 Mar", produksi: 25, penjualan: 30 },
  { date: "30 Mar", produksi: 14, penjualan: 40 },
  { date: "31 Mar", produksi: 30, penjualan: 33 },
  { date: "01 Apr", produksi: 22, penjualan: 40 },
  { date: "02 Apr", produksi: 16, penjualan: 8 },
  { date: "03 Apr", produksi: 25, penjualan: 20 },
  { date: "04 Apr", produksi: 43, penjualan: 32 },
];

const DetailAyam = () => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const isDetailPage = location.pathname.includes("input-ayam");

  const inputAyamHandle = () => {
    navigate(`${location.pathname}/input-ayam`);
  };

  // Render detail input page only
  if (isDetailPage) {
    return <Outlet />;
  }

  // Render main table page
  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">
          {userRole === "Pekerja Kandang" ? "Data Ayam" : "Detail Ayam"}
        </h1>
        {userRole === "Pekerja Kandang" && (
          <div
            onClick={inputAyamHandle}
            className="flex items-center rounded-lg px-4 py-2 bg-green-700 hover:bg-green-900 cursor-pointer"
          >
            <div className="text-base font-medium ms-2 text-white">
              + Input Data Harian
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 border rounded-lg w-full border-black-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {userRole === "Pekerja Kandang" ? "Data harian ayam" : ""}
          </h2>

          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <PiCalendarBlank size={18} />
            <div className="text-base font-medium ms-2">
              Hari ini (20 Mar 2025)
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-center">
                <th className="py-2 px-4">Kandang</th>
                <th className="py-2 px-4">Kategori</th>
                <th className="py-2 px-4">Usia (minggu)</th>
                <th className="py-2 px-4">Hidup</th>
                <th className="py-2 px-4">Sakit</th>
                <th className="py-2 px-4">Mati</th>
                <th className="py-2 px-4">Pakan (Kg)</th>
                <th className="py-2 px-4">Mortalitas</th>
                {userRole === "Pekerja Kandang" && (
                  <th className="py-2 px-4">Aksi</th>
                )}
              </tr>
            </thead>
            <tbody>
              {detailAyamData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 text-center"
                >
                  <td className="py-2 px-4">{row.kandang}</td>
                  <td className="py-2 px-4">{row.kategori}</td>
                  <td className="py-2 px-4">{row.usiaMinggu}</td>
                  <td className="py-2 px-4">{row.hidup}</td>
                  <td className="py-2 px-4">{row.sakit}</td>
                  <td className="py-2 px-4">{row.mati}</td>
                  <td className="py-2 px-4">{row.pakanKg}</td>
                  <td className="py-2 px-4">{row.mortalitas}</td>
                  {userRole === "Pekerja Kandang" && (
                    <td className="py-2 px-4 flex justify-center gap-4">
                      <BiSolidEditAlt
                        size={24}
                        className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                      />
                      <MdDelete
                        size={24}
                        className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailAyam;
