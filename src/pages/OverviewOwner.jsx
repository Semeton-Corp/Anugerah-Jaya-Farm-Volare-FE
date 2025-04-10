import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg } from "react-icons/md";
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

const data = [
  { date: "29 Mar", produksi: 25, penjualan: 30 },
  { date: "30 Mar", produksi: 14, penjualan: 40 },
  { date: "31 Mar", produksi: 30, penjualan: 33 },
  { date: "01 Apr", produksi: 22, penjualan: 40 },
  { date: "02 Apr", produksi: 16, penjualan: 8 },
  { date: "03 Apr", produksi: 25, penjualan: 20 },
  { date: "04 Apr", produksi: 43, penjualan: 32 },
];

const OverviewOwner = () => {
  return (
    <div className="flex flex-col p-4 gap-4">
      {/* header section */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Overview</h1>

        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">
            Hari ini (20 Mar 2025)
          </div>
        </div>
      </div>

      {/* produksi & penjualan section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* produksi telur */}
        <div className="p-4 w-full rounded-md border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Produksi telur</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <MdEgg size={24} color="white" />
            </div>
          </div>

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
        </div>

        {/* penjualan telur */}
        <div className="p-4 w-full rounded-md border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Penjualan telur</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <MdEgg size={24} color="white" />
            </div>
          </div>

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
        </div>
      </div>

      {/* chart, incomes, and history section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chart Section (3/4 width on large screens) */}
        <div className="w-full lg:w-5/8 bg-white rounded-lg p-4 border border-gray-300">
          <h2 className="text-xl font-semibold mb-4">Produksi & Penjualan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 50]} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="produksi"
                stroke="#ef4444"
                name="Produksi Telur"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="penjualan"
                stroke="#f59e0b"
                name="Penjualan Telur"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Side Card Section (1/4 width on large screens) */}
        <div className="w-full h-full lg:w-3/8 flex flex-col gap-4">
          <div className="bg-white h-1/2 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold mb-1">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">Rp 12.500.000</p>
          </div>
          <div className="bg-white h-1/2 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold mb-1">Transaksi Hari Ini</h3>
            <p className="text-2xl font-bold text-blue-600">38</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewOwner;
