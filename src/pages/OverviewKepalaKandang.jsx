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

const ayamChartData = [
  {
    date: "29 Mar",
    ayamMati: 12,
    ayamSakit: 3,
  },
  {
    date: "30 Mar",
    ayamMati: 7,
    ayamSakit: 5,
  },
  {
    date: "31 Mar",
    ayamMati: 18,
    ayamSakit: 4,
  },
  {
    date: "01 Apr",
    ayamMati: 14,
    ayamSakit: 2,
  },
  {
    date: "02 Apr",
    ayamMati: 9,
    ayamSakit: 1,
  },
  {
    date: "03 Apr",
    ayamMati: 15,
    ayamSakit: 2,
  },
  {
    date: "04 Apr",
    ayamMati: 25,
    ayamSakit: 3,
  },
];
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

const OverviewKepalaKandang = () => {
  const location = useLocation();
  const detailPages = ["detail-kinerja-ayam"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );
  const navigate = useNavigate();

  const detailKinerjaAyamHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/detail-kinerja-ayam";

    navigate(detailPath);
  };

  const [selectedFilter, setSelectedFilter] = useState("Rentabilitas");

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Kinerja</h1>
            <div className="flex gap-2">
              <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                <FaLocationDot size={18} />
                <div className="text-base font-medium ms-2">Semua Site</div>
              </div>
              <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                <GiBirdCage size={18} />
                <div className="text-base font-medium ms-2">Semua kandang</div>
              </div>

              <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                <PiCalendarBlank size={18} />
                <div className="text-base font-medium ms-2">
                  Hari ini (20 Mar 2025)
                </div>
              </div>
            </div>
          </div>

          {/* Telur  ok, retak, pecah, reject*/}
          <div className="flex md:grid-cols-2 gap-4 justify-between">
            {/* telur OK */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Konsumsi pakan</h2>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <div className="p-2 rounded-xl bg-green-700">
                  <LuWheat size={24} color="white" />
                </div>
                <div className="flex items-center">
                  {/* popuasl */}
                  <p className="text-3xl font-semibold me-3">15</p>
                  <p className="text-xl font-semibold">Kg</p>
                </div>
              </div>
            </div>

            {/* ayam sakit */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">HDP rata-rata</h2>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="p-2 rounded-xl bg-green-700">
                    <MdEgg size={24} color="white" />
                  </div>
                  <div className="flex items-center">
                    <p className="text-3xl font-semibold pe-2">80</p>
                    <p className="text-xl font-semibold">%</p>
                  </div>
                </div>
              </div>
            </div>
            {/* penjualan telur */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Berat telur rata-rata</h2>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* item butir */}
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="p-2 rounded-xl bg-green-700">
                    <MdEgg size={24} color="white" />
                  </div>
                  <div className="flex items-center">
                    <p className="text-3xl font-semibold pe-2">14</p>
                    <p className="text-xl font-semibold">gr</p>
                  </div>
                </div>
              </div>
            </div>
            {/* penjualan telur */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">FCR rata-rata</h2>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* item butir */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="p-2 rounded-xl bg-green-700">
                      <GiChicken size={24} color="white" />
                    </div>
                    {/* popuasl */}
                    <div className="flex">
                      <p className="text-3xl font-semibold pe-2">2.1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* telur OK */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Mortalitas rata-rata</h2>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <div className="p-2 rounded-xl bg-green-700">
                  <GiChicken size={24} color="white" />
                </div>
                <div>
                  {/* popuasl */}
                  <p className="text-3xl font-semibold">0.02</p>
                </div>
              </div>
            </div>
          </div>

          {/* chart, incomes, and history section */}
          <div className="flex flex-col lg:flex-row h-80 gap-6">
            <div className="w-3/5 bg-white rounded-lg p-4 border border-black-6">
              <h2 className="text-xl font-semibold mb-4">
                Ayam Mati & Ayam Sakit
              </h2>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={ayamChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="right" />
                  <Line
                    type="monotone"
                    dataKey="ayamMati"
                    stroke="#ef4444"
                    name="Ayam Mati"
                  />
                  <Line
                    type="monotone"
                    dataKey="ayamSakit"
                    stroke="#facc15"
                    name="Ayam Sakit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* stok gudang */}

            <div className="w-2/5 bg-white rounded-lg p-4 border border-gray-300">
              <h2 className="text-lg font-semibold ">Distribusi Usia Ayam</h2>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usiaAyamData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    label
                  >
                    {usiaAyamData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white flex-1 p-4 border border-black-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Kinerja Ayam</h2>
                <div className="p-2 rounded-full hover:bg-black-4 cursor-pointer">
                  <FiMaximize2 size={24} color="" />
                </div>
              </div>

              {/* the items */}
              <div className="flex w-full gap-4 px-4 justify-center">
                {/* item 1 */}
                <div className="border border-black-6 rounded-[4px] bg-white shadow-lg px-[32px] py-[18px]">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-col items-center">
                      <p className="text-[40px] font-bold">20</p>
                      <p className="text-xl">Kandang</p>
                    </div>
                    <div className="rounded-[4px] bg-[#87FF8B] flex items-center">
                      <p className="w-full text-center">Produktif</p>
                    </div>
                  </div>
                </div>
                {/* item 2 */}
                <div className="border border-black-6 rounded-[4px] bg-white shadow-lg px-[32px] py-[18px]">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-col items-center">
                      <p className="text-[40px] font-bold">5</p>
                      <p className="text-xl">Kandang</p>
                    </div>
                    <div className="rounded-[4px] bg-orange-200 flex items-center">
                      <p className="w-full text-center">Periksa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white flex-1 p-4 border border-black-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Stok gudang</h2>
                <div className="p-2 rounded-full hover:bg-black-4 cursor-pointer">
                  <FiMaximize2 size={24} color="" />
                </div>
              </div>

              {/* the items */}
              <div className="flex w-full gap-4 px-4 justify-center">
                {/* item 1 */}
                <div className="border border-black-6 rounded-[4px] bg-white shadow-lg px-[32px] py-[18px]">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-col items-center">
                      <p className="text-[40px] font-bold">20</p>
                      <p className="text-xl">Barang</p>
                    </div>
                    <div className="rounded-[4px] bg-[#87FF8B] flex items-center">
                      <p className="w-full text-center">aman</p>
                    </div>
                  </div>
                </div>
                {/* item 2 */}
                <div className="border border-black-6 rounded-[4px] bg-white shadow-lg px-[32px] py-[18px]">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-col items-center">
                      <p className="text-[40px] font-bold">5</p>
                      <p className="text-xl">Barang</p>
                    </div>
                    <div className="rounded-[4px] bg-[#FF5E5E] flex items-center">
                      <p className="w-full text-center">kritis</p>
                    </div>
                  </div>
                </div>

                {/* item 3 */}
                <div className="border border-black-6 rounded-[4px] bg-white shadow-lg px-[32px] py-[18px]">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-col items-center">
                      <p className="text-[40px] font-bold">5</p>
                      <p className="text-xl">Kandang</p>
                    </div>
                    <div className="rounded-[4px] bg-orange-200 flex items-center">
                      <p className="w-full text-center">Periksa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewKepalaKandang;
