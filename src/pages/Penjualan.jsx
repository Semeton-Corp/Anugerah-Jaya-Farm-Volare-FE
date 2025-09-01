import React, { useEffect, useState } from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { IoMdDownload } from "react-icons/io";
import { MdStore } from "react-icons/md";
import { FaArrowDownLong } from "react-icons/fa6";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

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
import MonthYearSelector from "../components/MonthYearSelector";
import { getLocations } from "../services/location";
import { getItems } from "../services/item";
import { getCashflowSaleOverview } from "../services/cashflow";
import { formatRupiah } from "../utils/moneyFormat";

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

const COLORS = ["#2E7E8B", "#E8AD34"];

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const Penjualan = () => {
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const location = useLocation();
  const detailPages = ["detail-penjualan"];

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [monthName, setMonthName] = useState(MONTHS_ID[now.getMonth()]);

  const [cashflowSaleSummary, setCashflowSaleSummary] = useState([]);

  const [siteOptions, setSiteOptions] = useState([]);
  const [selectedSite, setSelectedSite] = useState(
    userRole === "Owner" ? 0 : localStorage.getItem("locationId")
  );

  const [itemOptions, setItemOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(
    userRole === "Owner" ? 0 : localStorage.getItem("locationId")
  );

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );
  const navigate = useNavigate();

  const detailPenjualanHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/detail-penjualan";

    navigate(detailPath);
  };

  const fetchSites = async () => {
    try {
      const res = await getLocations();
      if (res.status === 200) {
        setSiteOptions(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch sites", err);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await getItems("Telur");
      if (res.status === 200) {
        console.log("res: ", res);
        setItemOptions(res.data.data);
        setSelectedItem(res.data.data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch sites", err);
    }
  };

  const fetchSaleOverview = async () => {
    try {
      const saleResponse = await getCashflowSaleOverview(
        selectedSite,
        monthName,
        year,
        selectedItem
      );
      console.log("saleResponse: ", saleResponse);
      if (saleResponse.status === 200) {
        const data = saleResponse.data.data;
        setCashflowSaleSummary(data.cashflowSaleSummary);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchSites();
    fetchItems();
  }, [location]);

  useEffect(() => {
    if (
      selectedSite !== null &&
      selectedItem !== 0 &&
      month !== null &&
      year !== null
    ) {
      fetchSaleOverview();
    }
  }, [selectedSite, month, year, selectedItem]);

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Penjualan</h1>
            <div className="flex gap-2">
              {userRole == "Owner" && (
                <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                  <MdStore size={18} />
                  <select
                    value={selectedSite}
                    onChange={(e) => setSelectedSite(e.target.value)}
                    className="ml-2 bg-transparent text-base font-medium outline-none"
                  >
                    <option value="">Semua Site</option>
                    {siteOptions.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <MonthYearSelector
                month={month}
                year={year}
                setMonth={setMonth}
                setMonthName={setMonthName}
                setYear={setYear}
              />
              <div className="flex items-center rounded-lg px-4 py-2 bg-green-700 hover:bg-green-900 cursor-pointer">
                <IoMdDownload size={18} color="White" />
                <div className="text-base font-medium pl-2 text-white">
                  Simpan Laporan
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            <div className="bg-white w-full p-4 border border-black-6 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Pendapatan</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <PiMoneyWavyFill size={24} color="white" />
                </div>
              </div>
              <p className="text-[36px] font-semibold mb-2">
                {formatRupiah(cashflowSaleSummary.income)}
              </p>
              <div className="flex items-center">
                <FaArrowDownLong color="#F41C1C" />
                <p className="text-[16px] text-[#F41C1C]">
                  10% dibanding kemarin
                </p>
              </div>
            </div>

            <div className="bg-white w-full p-4 border border-black-6 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Keuntungan</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <PiMoneyWavyFill size={24} color="white" />
                </div>
              </div>
              <p className="text-[36px] font-semibold mb-2">
                {" "}
                Rp {formatRupiah(cashflowSaleSummary.profit)}
              </p>
              <div className="flex items-center">
                <FaArrowDownLong color="#F41C1C" />
                <p className="text-[16px] text-[#F41C1C]">
                  10% dibanding kemarin
                </p>
              </div>
            </div>
            <div className="bg-white w-full p-4 border border-black-6 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Pengeluaran</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <PiMoneyWavyFill size={24} color="white" />
                </div>
              </div>
              <p className="text-[36px] font-semibold mb-2">
                Rp {formatRupiah(cashflowSaleSummary.expense)}
              </p>
              <div className="flex items-center">
                <FaArrowDownLong color="#F41C1C" />
                <p className="text-[16px] text-[#F41C1C]">
                  10% dibanding kemarin
                </p>
              </div>
            </div>
            <div className="p-4 rounded-md border-2 border-black-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Penjualan Telur Ikat</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <MdEgg size={24} color="white" />
                </div>
              </div>
              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">50</p>
                  <p className="text-xl text-center">Ikat</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md border-2 border-black-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur OK Eceran</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <MdEgg size={24} color="white" />
                </div>
              </div>
              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">100</p>
                  <p className="text-xl text-center">Karpet</p>
                </div>
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">1000</p>
                  <p className="text-xl text-center">Butir</p>
                </div>
              </div>
            </div>
          </div>

          {/* keuntungan & penjualan*/}
          <div className="flex flex-col lg:flex-row h-105 gap-6">
            {/* Chart Section (1/2 width on large screens) */}
            <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 border border-black-6">
              <h2 className="text-xl font-semibold mb-4">Keuntungan</h2>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={dataUntung}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={(value) => `${value / 1000000} juta`}
                  />
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
            <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 border border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold mb-4">Penjualan Telur</h2>

                {userRole == "Owner" && (
                  <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                    <select
                      value={selectedItem}
                      onChange={(e) => setSelectedItem(e.target.value)}
                      className=" bg-transparent text-base font-medium outline-none"
                    >
                      {itemOptions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
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
            <div className="w-2/3 bg-white px-8 py-6 rounded-lg border border-black-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">Detail Penjualan</h2>
                <div
                  onClick={detailPenjualanHandle}
                  className="p-2 rounded-full hover:bg-black-4 cursor-pointer"
                >
                  <FiMaximize2 size={24} color="" />
                </div>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-700 text-white text-center">
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
                      <td className="py-2 px-4 text-center">{item.tanggal}</td>
                      <td className="py-2 px-4 text-center">
                        {item.namaBarang}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {item.kuantitas}
                      </td>
                      <td className="py-2 px-4 text-center">{item.customer}</td>
                      <td className="py-2 px-4 text-center flex justify-center">
                        <span
                          className={`w-28 flex justify-center text-xs font-medium px-2 py-1 rounded ${
                            item.status === "Selesai"
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-kritis-box-surface-color text-kritis-text-color"
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
            <div className="w-1/3 bg-white p-4 rounded-lg border border-black-6">
              <h2 className="text-lg font-semibold mb-4">
                Presentase Penjualan
              </h2>
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
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Outlet />
        </div>
      )}
    </>
  );
};

export default Penjualan;
