import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { IoMdDownload } from "react-icons/io";
import { MdStore } from "react-icons/md";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const dataUntung = [
  { date: "29 Mar", untung: 25000000 },
  { date: "30 Mar", untung: 14000000 },
  { date: "31 Mar", untung: 30000000 },
  { date: "01 Apr", untung: 22000000 },
  { date: "02 Apr", untung: 16000000 },
  { date: "03 Apr", untung: 25000000 },
  { date: "04 Apr", untung: 43000000 },
];

const dataJual = [
  { date: "29 Mar", penjualan: 30 },
  { date: "30 Mar", penjualan: 40 },
  { date: "31 Mar", penjualan: 33 },
  { date: "01 Apr", penjualan: 40 },
  { date: "02 Apr", penjualan: 8 },
  { date: "03 Apr", penjualan: 20 },
  { date: "04 Apr", penjualan: 32 },
];

const salesData = [
  {
    tanggal: "20 Maret 2025",
    namaBarang: "Telur OK",
    kuantitas: "12 Ikat",
    customer: "Pak Tono",
    status: "Selesai",
  },
  {
    tanggal: "22 Maret 2025",
    namaBarang: "Telur retak",
    kuantitas: "12 Karpet",
    customer: "Pak Adi",
    status: "Belum Terkirim",
  },
  {
    tanggal: "22 Maret 2025",
    namaBarang: "Telur pecah",
    kuantitas: "10 Karpet",
    customer: "Pak Yono",
    status: "Belum Terkirim",
  },
];

const pieData = [
  { name: "Gudang", value: 30 },
  { name: "Toko", value: 70 },
];

const COLORS = ["#0f766e", "#f59e0b"];

const Penjualan = () => {
  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header section */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Penjualan</h1>
        <div className="flex gap-2">
          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <MdStore size={18} />
            <div className="text-base font-medium ms-2">Semua Toko</div>
          </div>
          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <PiCalendarBlank size={18} />
            <div className="text-base font-medium ms-2">
              Hari ini (20 Mar 2025)
            </div>
          </div>
          <div className="flex items-center rounded-lg px-4 py-2 bg-green-700 hover:bg-green-900 cursor-pointer">
            <IoMdDownload size={18} color="White" />
            <div className="text-base font-medium pl-2 text-white">
              Simpan Laporan
            </div>
          </div>
        </div>
      </div>

      {/* penjualan, pendapatan, keuntungan*/}
      <div className="flex justify-between gap-4 h-45">
        {/* produksi telur */}
        <div className="flex w-1/2 justify-center p-4 rounded-md border-2 border-black-6">
          <div className="w-120">
            <div className="flex justify-center flex-wrap gap-4">
              {/* item ikat */}
              <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                <p className="text-3xl font-bold text-center">50</p>
                <p className="text-xl text-center">Ikat</p>
              </div>
              {/* item karpet */}
              <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                <p className="text-3xl font-bold text-center">100</p>
                <p className="text-xl text-center">Karpet</p>
              </div>
              {/* item butir */}
              <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                <p className="text-3xl font-bold text-center">1000</p>
                <p className="text-xl text-center">Butir</p>
              </div>
            </div>
            <div>
              <div className="flex items-center px-6 py-2">
                <FaArrowDownLong color="#F41C1C" />
                <p className="text-[16px] text-[#F41C1C]">
                  10% dibanding kemarin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* pendapatan */}
        <div className="w-1/4 h-full">
          {/* Pendapatan */}
          <div className="bg-white w-full h-full p-4 flex flex-col justify-center border border-black-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Pendapatan</h2>
              <div className="p-2 rounded-xl bg-green-700">
                <PiMoneyWavyFill size={24} color="white" />
              </div>
            </div>
            <p className="text-[36px] font-semibold mb-2">Rp 12.500.000</p>
            {/* profit dynamics notification */}
            <div className="flex items-center">
              <FaArrowDownLong color="#F41C1C" />
              <p className="text-[16px] text-[#F41C1C]">
                10% dibanding kemarin
              </p>
            </div>
          </div>
        </div>

        {/* keuntungan */}
        <div className="w-1/4">
          {/* Pendapatan */}
          <div className="bg-white  p-[20px] border border-black-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Pendapatan</h2>
              <div className="p-2 rounded-xl bg-green-700">
                <PiMoneyWavyFill size={24} color="white" />
              </div>
            </div>
            <p className="text-[36px] font-semibold mb-2">Rp 12.500.000</p>
            {/* profit dynamics notification */}
            <div className="flex items-center">
              <FaArrowDownLong color="#F41C1C" />
              <p className="text-[16px] text-[#F41C1C]">
                10% dibanding kemarin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* keuntungan & penjualan*/}
      <div className="flex flex-col lg:flex-row h-105 gap-6">
        {/* Chart Section (1/2 width on large screens) */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg p-4 border border-black-6">
          <h2 className="text-xl font-semibold mb-4">Keuntungan</h2>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={dataUntung}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 50]} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" />

              <Line
                type="monotone"
                dataKey="untung"
                stroke="#ef4444"
                name="Keuntungan"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Section (1/2 width on large screens) */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg p-4 border border-black-6">
          <h2 className="text-xl font-semibold mb-4">Penjualan Telur</h2>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={dataJual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 50]} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" />

              <Line
                type="monotone"
                dataKey="penjualan"
                stroke="#ef4444"
                name="Penjualan Telur"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* detail penjualan, presentase penjualan*/}
      <div className="flex w-full gap-6">
        {/* Left: Tabel Penjualan */}
        <div className="w-2/3 bg-white p-4 rounded-lg border">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">Detail Penjualan</h2>
            <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
              <FiMaximize2 size={18} />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="py-2 px-4">Tanggal Kirim</th>
                <th className="py-2 px-4">Nama barang</th>
                <th className="py-2 px-4">Kuantitas</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 px-4">{item.tanggal}</td>
                  <td className="py-2 px-4">{item.namaBarang}</td>
                  <td className="py-2 px-4">{item.kuantitas}</td>
                  <td className="py-2 px-4">{item.customer}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        item.status === "Selesai"
                          ? "bg-green-400 text-white"
                          : "bg-red-400 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Pie Chart */}
        <div className="w-1/3 bg-white p-4 rounded-lg border">
          <h2 className="text-xl font-bold mb-4">Presentase Penjualan</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                labelLine={false}
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Penjualan;
