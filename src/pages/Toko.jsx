import { PiCalendarBlank } from "react-icons/pi";
import { MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { MdStore } from "react-icons/md";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { FaWarehouse, FaTruck } from "react-icons/fa";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { date: "29 Mar", ok: 24, retak: 4, pecah: 2 },
  { date: "30 Mar", ok: 13, retak: 5, pecah: 2 },
  { date: "31 Mar", ok: 30, retak: 6, pecah: 3 },
  { date: "01 Apr", ok: 20, retak: 7, pecah: 4 },
  { date: "02 Apr", ok: 14, retak: 9, pecah: 2 },
  { date: "03 Apr", ok: 25, retak: 7, pecah: 3 },
  { date: "04 Apr", ok: 44, retak: 5, pecah: 1 },
];

const stokTokoData = [
  {
    namaBarang: "Telur OK",
    idBarang: "ID1234",
    satuan: "Ikat",
    kuantitas: 4000,
    tempat: "Gudang A1",
    keterangan: "kritis",
  },
  {
    namaBarang: "Telur Retak",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "kritis",
  },
  {
    namaBarang: "Telur Pecah",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "aman",
  },
  {
    namaBarang: "Telur Retak",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "aman",
  },
];

const aktivitasTokoData = [
  {
    tanggal: "20 Maret 2025",
    namaBarang: "Telur OK",
    idBarang: "ID1234",
    satuan: "Ikat",
    kuantitas: 4000,
    tempat: "Gudang A1",
    keterangan: "Barang Keluar",
  },
  {
    tanggal: "21 Maret 2025",
    namaBarang: "Telur Retak",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "Barang Keluar",
  },
  {
    tanggal: "22 Maret 2025",
    namaBarang: "Telur Pecah",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "Barang Masuk",
  },
  {
    tanggal: "23 Maret 2025",
    namaBarang: "Telur Retak",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "Barang Masuk",
  },
];

const Toko = () => {
  const location = useLocation();
  const detailPages = ["detail-stok-toko", "riwayat-aktivitas-toko"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );
  const navigate = useNavigate();

  const detailStokTokoHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/detail-stok-toko";

    navigate(detailPath);
  };

  const riwayatAktivitasTokoHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/riwayat-aktivitas-toko";

    navigate(detailPath);
  };

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Overview Toko</h1>
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
            </div>
          </div>
          {/* Telur  ok, retak, pecah, reject*/}
          <div className="flex md:grid-cols-2 gap-4 justify-between">
            {/* telur OK */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Pendapatan</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <PiMoneyWavyFill size={24} color="white" />
                </div>
              </div>

              <div>
                <p className="text-lg ">Real: </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <p className="text-3xl font-semibold me-3">Rp</p>
                    <p className="text-3xl font-semibold">25.000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Pendapatan</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <PiMoneyWavyFill size={24} color="white" />
                </div>
              </div>

              <div>
                <p className="text-lg ">Real + Cicilan: </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <p className="text-3xl font-semibold me-3">Rp</p>
                    <p className="text-3xl font-semibold">25.000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ayam sakit */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Terjual di toko</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <MdShoppingCart size={24} color="white" />
                </div>
              </div>

              <div className="flex mt-10">
                <div className="flex items-center">
                  <p className="text-3xl font-semibold me-3">150</p>
                  <p className="text-lg">Butir</p>
                </div>
              </div>
              <div className="flex  flex-wrap gap-4">
                <div className="flex flex-wrap gap-4"></div>
              </div>
            </div>
            {/* penjualan telur */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Stok gudang</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <FaWarehouse size={24} color="white" />
                </div>
              </div>

              <div>
                <p className="text-lg ">Telur OK: </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold me-3">200</p>
                    <p className="text-xl ">Ikat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg border border-black-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">
              Rekapitulasi Penjualan
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="top"
                  align="center"
                  formatter={(value) => {
                    if (value === "ok") return "Telur OK";
                    if (value === "retak") return "Telur Retak";
                    if (value === "pecah") return "Telur Pecah";
                    return value;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ok"
                  stroke="#00c853"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="retak"
                  stroke="#ffd600"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="pecah"
                  stroke="#ff9100"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default Toko;
