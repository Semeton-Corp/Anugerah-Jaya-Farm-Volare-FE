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
      <div className="flex flex-col lg:flex-row h-120 gap-6">
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

      {/* total ayam, gudang, toko */}
      <div className="flex gap-4 h-65">
        {/* total ayam */}
        <div className="bg-white flex-1 p-4 border border-black-6 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Total ayam</h2>
            <div className="p-2 rounded-full hover:bg-black-4 cursor-pointer">
              <FiMaximize2 size={24} color="" />
            </div>
          </div>

          {/* items */}
          <div className="h-5/8 flex flex-col justify-between my-8">
            {/* Ayam Hidup */}
            <div className="flex justify-between px-4">
              <div className="flex gap-2">
                <p className="text-xl font-bold">5000</p>
                <p className="text-xl">Ekor</p>
              </div>
              <p className="text-xl font-bold">Ayam Hidup</p>
            </div>

            {/* Ayam Sakit */}
            <div className="flex justify-between px-4">
              <div className="flex gap-2">
                <p className="text-xl font-bold">100</p>
                <p className="text-xl">Ekor</p>
              </div>
              <p className="text-xl font-bold">Ayam Sakit</p>
            </div>

            {/* Ayam Mati */}
            <div className="flex  justify-between px-4">
              <div className="flex gap-2">
                <p className="text-xl font-bold">30</p>
                <p className="text-xl">Ekor</p>
              </div>
              <p className="text-xl font-bold">Ayam Mati</p>
            </div>
          </div>
        </div>

        {/* stok gudang */}
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
          </div>
        </div>

        {/* stok gudang */}
        <div className="bg-white flex-1 p-4 border border-black-6 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Stok toko</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Penjualan;
