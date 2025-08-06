import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
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
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  const detailPages = [
    "riwayat-aktivitas",
    "stok-toko",
    "stok-gudang",
    "total-ayam",
  ];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  if (isDetailPage) {
    <Outlet />;
  }

  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header section */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Ringkasan</h1>

        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">
            Hari ini (20 Mar 2025)
          </div>
        </div>
      </div>

      {/* produksi & penjualan section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* produksi telur */}
        <div className="p-4 w-full rounded-md border-2 border-black-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Produksi Telur OK</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <MdEgg size={24} color="white" />
            </div>
          </div>

          <div className="flex justify-center flex-wrap gap-4">
            {/* item butir */}
            <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
              <p className="text-3xl font-bold text-center">1000</p>
              <p className="text-xl text-center">Butir</p>
            </div>
          </div>
        </div>

        {/* penjualan telur */}
        <div className="p-4 w-full rounded-md border-2 border-black-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Penjualan Telur Ikat</h2>
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
          </div>
        </div>

        <div className="p-4 w-full rounded-md border-2 border-black-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Penjualan Telur Eceran</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <MdEgg size={24} color="white" />
            </div>
          </div>

          <div className="flex justify-center flex-wrap gap-4">
            {/* item butir */}
            <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
              <p className="text-3xl font-bold text-center">50</p>
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
      <div className="flex flex-col lg:flex-row h-120 items-stretch gap-6">
        {/* Chart Section (3/4 width on large screens) */}
        <div className="w-full lg:w-6/8 bg-white rounded-lg p-4 border border-black-6">
          <h2 className="text-xl font-semibold mb-4">Produksi & Penjualan</h2>
          <ResponsiveContainer width="100%" height="90%">
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
        <div className="w-full h-full lg:w-2/8 flex flex-col gap-4">
          {/* Pendapatan */}
          <div className="bg-white  p-[20px] border border-black-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Pendapatan</h2>
              <div className="p-2 rounded-xl bg-green-700">
                <PiMoneyWavyFill size={24} color="white" />
              </div>
            </div>
            <div className="mt-6 mb-2">
              <div className="flex gap-8 ">
                <div>
                  <p className="text-lg">Real:</p>
                  <p className="text-xl font-semibold">Rp 123.500.000</p>
                </div>

                <div>
                  <p className="text-lg">Real + Cicilan:</p>
                  <p className="text-xl font-semibold">Rp 122.500.000</p>
                </div>
              </div>
            </div>

            {/* profit dynamics notification */}
            {/* <div className="flex items-center">
              <FaArrowDownLong color="#F41C1C" />
              <p className="text-[16px] text-[#F41C1C]">
                10% dibanding kemarin
              </p>
            </div> */}
          </div>

          {/* History */}
          <div className="bg-white flex-1 p-4 border border-black-6 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Riwayat aktifitas</h2>
              <div className="p-2 rounded-full hover:bg-black-4 cursor-pointer">
                <FiMaximize2 size={24} color="" />
              </div>
            </div>

            {/* history data */}
            <div className="flex flex-col gap-2">
              {/* item 1 */}
              <div className="flex items-center justify-between">
                <div className="flex">
                  <BsCheckCircleFill
                    size={24}
                    color="#06C000"
                    className="me-6"
                  />
                  <p className="text-base">Pengiriman telur selesai</p>
                </div>
                <div></div>
                <p className="text-[12px] text-[#595959]">2 jam lalu</p>
              </div>

              {/* item 2 */}
              <div className="flex items-center justify-between">
                <div className="flex">
                  <TfiReload size={24} color="#FFD400" className="me-6" />
                  <p className="text-base">Stok dedak masuk</p>
                </div>
                <div></div>
                <p className="text-[12px] text-[#595959]">2 jam lalu</p>
              </div>

              {/* item 3 */}
              <div className="flex items-center justify-between">
                <div className="flex">
                  <FaTriangleExclamation
                    size={24}
                    color="#FF0000"
                    className="me-6"
                  />
                  <p className="text-base">Stok dedak masuk</p>
                </div>
                <div></div>
                <p className="text-[12px] text-[#595959]">2 jam lalu</p>
              </div>
            </div>
          </div>
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

export default OverviewOwner;
