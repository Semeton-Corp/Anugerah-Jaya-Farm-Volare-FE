import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { MdStore } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuWheat } from "react-icons/lu";
import { FiMaximize2 } from "react-icons/fi";
import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import {
  GiBirdCage,
  GiHealthDecrease,
  GiChicken,
  GiDeathSkull,
} from "react-icons/gi";
import { FaPercentage } from "react-icons/fa";

const COLORS = ["#06b6d4", "#facc15", "#f97316", "#10b981", "#ef4444"];

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const kinerjaData = [
  { day: "Minggu", value: 44 },
  { day: "Senin", value: 52 },
  { day: "Selasa", value: 30 },
  { day: "Rabu", value: 48 },
  { day: "Kamis", value: 52 },
  { day: "Jumat", value: 39 },
  { day: "Sabtu", value: 52 },
];

const kinerjaAyamData = [
  {
    kandang: "Kandang A1",
    usia: 49,
    jumlah: 4000,
    produksi: 50,
    konsumsi: 50,
    beratTelur: 10,
    fcr: 10,
    hdp: "10%",
    produktivitas: "Produktif",
  },
  {
    kandang: "Kandang A2",
    usia: 49,
    jumlah: 1200,
    produksi: 20,
    konsumsi: 20,
    beratTelur: 12,
    fcr: 10,
    hdp: "10%",
    produktivitas: "Periksa",
  },
];

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
    vaksin: "Vaksin A (5 ml)",
    obat: "Obat B (4ml)",
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
    vaksin: "-",
    obat: "-",
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
    vaksin: "-",
    obat: "-",
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
    vaksin: "-",
    obat: "-",
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
    vaksin: "-",
    obat: "-",
  },
];

const usiaAyamData = [
  { name: "DOC", value: 200 },
  { name: "Grower", value: 300 },
  { name: "Pre Layer", value: 150 },
  { name: "Layer", value: 500 },
  { name: "Afkir", value: 100 },
];

const DetailKinerjaAyam = () => {
  const location = useLocation();
  const detailPages = ["pindah-ayam"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );
  const navigate = useNavigate();

  const handlePindahAyam = () => {
    navigate(`${location.pathname}/pindah-ayam`);
  };

  const handlePengadaanDoc = () => {
    const newUrl = location.pathname.replace(
      "detail-kinerja-ayam",
      "pengadaan-doc"
    );
    navigate(newUrl);
  };

  const handleJualAyamAfkir = () => {
    const newUrl = location.pathname.replace(
      "detail-kinerja-ayam",
      "jual-ayam-afkir"
    );
    navigate(newUrl);
  };

  const [selectedFilter, setSelectedFilter] = useState("Rentabilitas");

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Detail Kinerja Ayam</h1>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-300">
            <div className="flex justify-end items-center mb-4">
              <div className="flex gap-3">
                <div
                  onClick={handlePindahAyam}
                  className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
                >
                  <div className="text-base font-medium ">Pindah Ayam</div>
                </div>
                <div
                  onClick={handlePengadaanDoc}
                  className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
                >
                  <div className="text-base font-medium ">Pengadaan DOC</div>
                </div>
                <div
                  onClick={handleJualAyamAfkir}
                  className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
                >
                  <div className="text-base font-medium ">Jual Ayam Afkir</div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-700 text-white text-center">
                    <th className="py-2 px-4">Kandang</th>
                    <th className="py-2 px-4">Usia</th>
                    <th className="py-2 px-4">Jumlah</th>
                    <th className="py-2 px-4">Produksi (Butir)</th>
                    <th className="py-2 px-4">Konsumsi (Kg)</th>
                    <th className="py-2 px-4">Berat telur (gr)</th>
                    <th className="py-2 px-4">FCR</th>
                    <th className="py-2 px-4">%HDP</th>
                    <th className="py-2 px-4">Produktivitas</th>
                  </tr>
                </thead>
                <tbody>
                  {kinerjaAyamData.map((row, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="py-2 px-4">{row.kandang}</td>
                      <td className="py-2 px-4">{row.usia}</td>
                      <td className="py-2 px-4">{row.jumlah}</td>
                      <td className="py-2 px-4">{row.produksi}</td>
                      <td className="py-2 px-4">{row.konsumsi}</td>
                      <td className="py-2 px-4">{row.beratTelur}</td>
                      <td className="py-2 px-4">{row.fcr}</td>
                      <td className="py-2 px-4">{row.hdp}</td>
                      <td className="py-2 px-4 flex justify-center">
                        <div
                          className={`w-24 py-1 flex justify-center rounded text-sm font-semibold ${
                            row.produktivitas === "Produktif"
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-orange-200 text-orange-900"
                          }`}
                        >
                          {row.produktivitas}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailKinerjaAyam;
