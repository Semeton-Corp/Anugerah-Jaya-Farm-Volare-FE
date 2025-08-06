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

const performanceData = [
  { day: "Minggu", value: 36 },
  { day: "Senin", value: 42 },
  { day: "Selasa", value: 25 },
  { day: "Rabu", value: 40 },
  { day: "Kamis", value: 43 },
  { day: "Jumat", value: 33 },
  { day: "Sabtu", value: 41 },
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

const ageDistributionData = [
  { stage: "DOC", value: 40 },
  { stage: "Grower", value: 47 },
  { stage: "Prelayer", value: 28 },
  { stage: "Layer", value: 45 },
  { stage: "Afkir", value: 48 },
];

const getBarColor = (day) => {
  if (day === "Selasa") return "#FF5E5E";
  if (day === "Jumat") return "#F2D08A";
  else return "#87FF8B";
};

const Kinerja = () => {
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
                  <p className="text-3xl font-semibold me-3">25.000</p>
                  <p className="text-xl font-semibold">Ton</p>
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
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-bold mb-4">Distribusi Usia Ayam</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#5A9EA7" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col lg:flex-row h-120 gap-6">
            <div className="w-full p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Kinerja perusahaan</h2>
                <div className="flex gap-2">
                  <select className="border text-sm rounded px-2 py-1 text-gray-700">
                    <option>Rentabilitas</option>
                    <option>Produktivitas</option>
                  </select>
                  <button className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                    📅 Minggu ini
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={370}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {performanceData.map((entry, index) => (
                      <Cell key={index} fill={getBarColor(entry.day)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Kinerja;
