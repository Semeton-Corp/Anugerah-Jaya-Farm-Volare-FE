import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { MdStore } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuWheat } from "react-icons/lu";
import { FiMaximize2 } from "react-icons/fi";
import { useState } from "react";

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

const produksiDetail = [
  {
    kandang: "Kandang A1",
    qty: 1000,
    ok: 800,
    retak: 12,
    pecah: 100,
    reject: 40,
    abnormality: "3%",
    keterangan: "aman",
  },
  {
    kandang: "Kandang A2",
    qty: 1000,
    ok: 800,
    retak: 12,
    pecah: 100,
    reject: 40,
    abnormality: "12%",
    keterangan: "kritis",
  },
];

const Kinerja = () => {
  const [selectedFilter, setSelectedFilter] = useState("Rentabilitas");

  return (
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

      {/* chart, incomes, and history section */}
      <div className="flex flex-col lg:flex-row h-120 gap-6">
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
                outerRadius={150}
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
              <Legend verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-3/5 bg-white p-4 rounded-lg border border-gray-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">Kinerja perusahaan</h2>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              <option>Rentabilitas</option>
              <option>Produktivitas</option>
              <option>Penjualan</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={kinerjaData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#5898A2"
                barSize={40}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* detail penjualan */}
      <div className="bg-white p-4 rounded-lg border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Detail kinerja ayam</h2>
          <div className="p-2 rounded-full hover:bg-black-4 cursor-pointer">
            <FiMaximize2 size={24} color="" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-700 text-white text-left">
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
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{row.kandang}</td>
                  <td className="py-2 px-4">{row.usia}</td>
                  <td className="py-2 px-4">{row.jumlah}</td>
                  <td className="py-2 px-4">{row.produksi}</td>
                  <td className="py-2 px-4">{row.konsumsi}</td>
                  <td className="py-2 px-4">{row.beratTelur}</td>
                  <td className="py-2 px-4">{row.fcr}</td>
                  <td className="py-2 px-4">{row.hdp}</td>
                  <td className="py-2 px-4">
                    <div
                      className={`w-24 py-1 flex justify-center rounded text-sm font-semibold ${
                        row.produktivitas === "Produktif"
                          ? "bg-aman-box-surface-color text-aman-text-color"
                          : "bg-kritis-box-surface-color text-kritis-text-color"
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
  );
};

export default Kinerja;
