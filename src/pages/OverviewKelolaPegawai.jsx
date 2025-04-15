import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { MdStore } from "react-icons/md";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { BiTask } from "react-icons/bi";

import profileAvatar from "../assets/profile_avatar.svg";
import { FiMaximize2 } from "react-icons/fi";
import { useState } from "react";
import { BsPersonVcardFill } from "react-icons/bs";

import {
  GiBirdCage,
  GiHealthDecrease,
  GiChicken,
  GiDeathSkull,
} from "react-icons/gi";
import { FaPercentage } from "react-icons/fa";
import { MdTask } from "react-icons/md";

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

const kpiData = [
  { date: "29 Mar", kpi: 40 },
  { date: "30 Mar", kpi: 25 },
  { date: "31 Mar", kpi: 50 },
  { date: "01 Apr", kpi: 35 },
  { date: "02 Apr", kpi: 25 },
  { date: "03 Apr", kpi: 40 },
  { date: "04 Apr", kpi: 65 },
];

const pegawaiHariIni = [
  {
    pegawai: {
      nama: "Budi Santoso",
      email: "budi.s@company.com",
    },
    jabatan: "Kepala Kandang",
    status: "Hadir",
    jamMasuk: "09.00",
    jamPulang: "-",
    jumlahLembur: "-",
  },
  {
    pegawai: {
      nama: "Gede Indra",
      email: "Indra@company.com",
    },
    jabatan: "Pegawai Gudang",
    status: "Hadir",
    jamMasuk: "08.45",
    jamPulang: "18.00",
    jumlahLembur: "2 jam",
  },
  {
    pegawai: {
      nama: "Siti Rahayu",
      email: "siti@company.com",
    },
    jabatan: "Pekerja Kandang",
    status: "Hadir",
    jamMasuk: "08.30",
    jamPulang: "17.40",
    jumlahLembur: "-",
  },
];

const OverviewKelolaPegawai = () => {
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
            <h2 className="text-lg font-semibold">Pegawai Aktif</h2>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="p-2 rounded-xl bg-green-700">
              <BsPersonVcardFill size={24} color="white" />
            </div>
            <div className="flex items-center">
              {/* popuasl */}
              <p className="text-3xl font-semibold me-3">33</p>
            </div>
          </div>
        </div>

        {/* ayam sakit */}
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tingkat Kehadiran</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="p-2 rounded-xl bg-green-700">
                <FaClock size={24} color="white" />
              </div>
              <div className="flex items-center">
                <p className="text-3xl font-semibold pe-2">80.4</p>
                <p className="text-xl font-semibold">%</p>
              </div>
            </div>
          </div>
        </div>
        {/* penjualan telur */}
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Penyelesaian Tugas</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* item butir */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="p-2 rounded-xl bg-green-700">
                <MdTask size={24} color="white" />
              </div>
              <div className="flex items-center">
                <p className="text-3xl font-semibold pe-2">80.4</p>
                <p className="text-xl font-semibold">%</p>
              </div>
            </div>
          </div>
        </div>
        {/* penjualan telur */}
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">KPI All</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* item butir */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="p-2 rounded-xl bg-green-700">
                  <FaPercentage size={24} color="white" />
                </div>
                {/* popuasl */}
                <div className="flex items-center">
                  <p className="text-3xl font-semibold pe-2">80.4</p>
                  <p className="text-xl font-semibold">%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chart, incomes, and history section */}
      <div className="flex flex-col lg:flex-row h-120 gap-6">
        <div className="w-2/5 bg-white rounded-lg py-6 ps-6 pe-9 border border-gray-300">
          <h2 className="text-lg font-semibold mb-4 ">Statistik KPI Pegawai</h2>
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="kpi"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
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
              <tr className="bg-green-700 text-white text-center">
                <th className="py-2 px-4">Pegawai</th>
                <th className="py-2 px-4">Jabatan</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Jam masuk</th>
                <th className="py-2 px-4">Jam pulang</th>
                <th className="py-2 px-4">Jumlah Lembur</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {pegawaiHariIni.map((item, index) => (
                <tr key={index} className="border-b ">
                  <td className="py-2 px-4 flex justify-center">
                    <div className="flex w-72 justify-between items-center gap-6">
                      {/* profile picture */}
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img src={profileAvatar} alt="Profile Avatar" />
                      </div>

                      {/* user name + role */}
                      <div className="w-52">
                        <p className="text-base font-me leading-tight">
                          {item.pegawai.nama}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.pegawai.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className=" items-center px-4">{item.jabatan}</td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center items-center h-full">
                      <div
                        className={`min-w-[80px] py-1 px-2 rounded text-sm font-semibold text-center ${
                          item.status === "Hadir"
                            ? "bg-aman-box-surface-color text-aman-text-color"
                            : "bg-kritis-box-surface-color text-kritis-text-color"
                        }`}
                      >
                        {item.status}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center items-center h-full">
                      <p className="pe-2">{item.jamMasuk}</p>
                      <p className="">WIB</p>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center items-center h-full">
                      <p className="pe-2">{item.jamPulang}</p>
                      <p className="">WIB</p>
                    </div>
                  </td>
                  <td className="py-2 px-4 h-full">{item.jumlahLembur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewKelolaPegawai;
