import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";
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

const Ayam = () => {
  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header section */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Ayam</h1>
        <div className="flex gap-2">
          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <MdStore size={18} />
            <div className="text-base font-medium ms-2">Semua Toko</div>
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
            <h2 className="text-lg font-semibold">Total Populasi</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <GiChicken size={24} color="white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              {/* popuasl */}
              <p className="text-3xl font-semibold">25.000</p>
            </div>
          </div>
        </div>

        {/* ayam sakit */}
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Ayam Sakit</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <GiHealthDecrease size={24} color="white" />
            </div>
          </div>

          <div className="flex  flex-wrap gap-4">
            <div className="flex flex-wrap gap-4">
              <div>
                {/* popuasl */}
                <p className="text-3xl font-semibold">100</p>
              </div>
            </div>
          </div>
        </div>
        {/* penjualan telur */}
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Ayam Mati</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <GiDeathSkull size={24} color="white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* item butir */}
            <div className="flex flex-wrap gap-4">
              <div>
                {/* popuasl */}
                <p className="text-3xl font-semibold">250</p>
              </div>
            </div>
          </div>
        </div>
        {/* penjualan telur */}
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">KPI Ayam</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <FaPercentage size={24} color="white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* item butir */}
            <div className="flex flex-wrap gap-4">
              <div className="flex">
                {/* popuasl */}
                <p className="text-3xl font-semibold pe-2">80</p>
                <p className="text-3xl font-semibold">%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chart, incomes, and history section */}
      <div className="flex flex-col lg:flex-row h-120 gap-6">
        {/* Chart Section (3/4 width on large screens) */}
        <div className="w-full lg:w-5/8 bg-white rounded-lg p-4 border border-black-6">
          <h2 className="text-xl font-semibold mb-4">Ayam Mati & Ayam Sakit</h2>
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

        <div className="w-3/8 bg-white rounded-lg p-4 border  border-black-6">
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
      </div>

      {/* detail penjualan */}
      <div className="bg-white p-4 border rounded-lg w-full border-black-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Detail ayam</h2>
          <div className="p-2 rounded-full hover:bg-black-4 cursor-pointer">
            <FiMaximize2 size={24} color="" />
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
                <th className="py-2 px-4">Vaksin</th>
                <th className="py-2 px-4">Obat</th>
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
                  <td className="py-2 px-4">{row.vaksin}</td>
                  <td className="py-2 px-4">{row.obat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ayam;
