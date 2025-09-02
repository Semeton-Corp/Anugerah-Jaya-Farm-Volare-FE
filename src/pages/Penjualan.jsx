import React, { useEffect, useState } from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { IoMdDownload } from "react-icons/io";
import { MdStore } from "react-icons/md";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
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
import { downloadReport, getCashflowSaleOverview } from "../services/cashflow";
import { formatRupiah } from "../utils/moneyFormat";
import { useMemo } from "react";

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
  const [eggSaleSummary, setEggSaleSummary] = useState([]);
  const [eggSaleGraphs, setEggSaleGraphs] = useState([]);
  const [cashflowSaleGraph, setCashflowSaleGraph] = useState([]);
  const [locationSaleSummaries, setLocationSaleSummaries] = useState([]);
  const [locationPieChart, setLocationPieChart] = useState([]);

  const pieData = useMemo(() => {
    if (!locationPieChart) return [];
    return [
      { name: "Toko", value: locationPieChart?.storePercentage || 0 },
      { name: "Gudang", value: locationPieChart?.warehosuePercentage || 0 },
    ];
  }, [locationPieChart]);

  console.log("pieData: ", pieData);
  console.log("locationPieChart: ", locationPieChart);

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
      // console.log("saleResponse: ", saleResponse);
      if (saleResponse.status === 200) {
        const data = saleResponse.data.data;
        setCashflowSaleSummary(data.cashflowSaleSummary);
        setEggSaleSummary(data.eggSaleSummary);
        setEggSaleGraphs(data.eggSaleGraphs);
        setCashflowSaleGraph(data.cashflowSaleGraphs);
        setLocationSaleSummaries(data.locationSaleSummaries);
        setLocationPieChart(data.locationPieChart);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const downloadResponse = await downloadReport(monthName, year, {
        responseType: "blob",
      });

      const blob = new Blob([downloadResponse.data], {
        type: downloadResponse.data.type,
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Report-${monthName}-${year}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("Download started!");
    } catch (error) {
      console.log("Download failed:", error);
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
              <div
                onClick={handleDownloadReport}
                className="flex items-center rounded-lg px-4 py-2 bg-green-700 hover:bg-green-900 cursor-pointer"
              >
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
                {cashflowSaleSummary.isIncomeIncrease ? (
                  <>
                    <FaArrowUpLong color="#00A651" />
                    <p className="text-[16px] text-[#00A651] ml-1">
                      {`${cashflowSaleSummary.incomeDiffPercentage}`}% dibanding
                      kemarin
                    </p>
                  </>
                ) : (
                  <>
                    <FaArrowDownLong color="#F41C1C" />
                    <p className="text-[16px] text-[#F41C1C] ml-1">
                      {`${cashflowSaleSummary.incomeDiffPercentage}`}% dibanding
                      kemarin
                    </p>
                  </>
                )}
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
                {cashflowSaleSummary.isProfitIncrease ? (
                  <>
                    <FaArrowUpLong color="#00A651" />
                    <p className="text-[16px] text-[#00A651] ml-1">
                      {`${cashflowSaleSummary.profitDiffPercentage}`}% dibanding
                      kemarin
                    </p>
                  </>
                ) : (
                  <>
                    <FaArrowDownLong color="#F41C1C" />
                    <p className="text-[16px] text-[#F41C1C] ml-1">
                      {`${cashflowSaleSummary.incomeDiffPercentage}`}% dibanding
                      kemarin
                    </p>
                  </>
                )}
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
                {cashflowSaleSummary.isExpenseIncrease ? (
                  <>
                    <FaArrowUpLong color="#00A651" />
                    <p className="text-[16px] text-[#00A651] ml-1">
                      {`${cashflowSaleSummary.expenseDiffPercentage}`}%
                      dibanding kemarin
                    </p>
                  </>
                ) : (
                  <>
                    <FaArrowDownLong color="#F41C1C" />
                    <p className="text-[16px] text-[#F41C1C] ml-1">
                      {`${cashflowSaleSummary.expenseDiffPercentage}`}%
                      dibanding kemarin
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="p-4 rounded-md border-2 border-black-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Penjualan Telur OK</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <MdEgg size={24} color="white" />
                </div>
              </div>
              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {eggSaleSummary.totalGoodEggInIkat}
                  </p>
                  <p className="text-xl text-center">Ikat</p>
                </div>
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {" "}
                    {eggSaleSummary.totalGoodEggInKg}
                  </p>
                  <p className="text-xl text-center">Kg</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md border-2 border-black-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Penjualan Telur Retak</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <MdEgg size={24} color="white" />
                </div>
              </div>
              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {eggSaleSummary.totalCrackedEggInIkat}
                  </p>
                  <p className="text-xl text-center">Ikat</p>
                </div>
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {eggSaleSummary.totalCrackedEggInKg}
                  </p>
                  <p className="text-xl text-center">Kg</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md border-2 border-black-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Penjualan Telur Bonyok
                </h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <MdEgg size={24} color="white" />
                </div>
              </div>
              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {eggSaleSummary.totalBrokenEggInPlastik}
                  </p>
                  <p className="text-xl text-center">Plastik</p>
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
                <LineChart data={cashflowSaleGraph}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="key" />
                  <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={(value) => `${value / 1000000} juta`}
                  />
                  <Tooltip />
                  <Legend verticalAlign="top" align="right" />

                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#22c55e"
                    name="Pendapatan"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#ef4444"
                    name="Pengeluaran"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#E8AD34"
                    name="Laba"
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
                <LineChart data={eggSaleGraphs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="key" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="right" />

                  <Line
                    type="monotone"
                    dataKey="value"
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
                <h2 className="text-lg font-semibold">
                  Pendapatan Tiap Lokasi
                </h2>
                {/* <div
                  onClick={detailPenjualanHandle}
                  className="p-2 rounded-full hover:bg-black-4 cursor-pointer"
                >
                  <FiMaximize2 size={24} color="" />
                </div> */}
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-700 text-white text-center">
                    <th className="py-2 px-4">Lokasi Penjualan</th>
                    <th className="py-2 px-4">Pendapatan</th>
                    <th className="py-2 px-4">Piutang</th>
                  </tr>
                </thead>
                <tbody>
                  {locationSaleSummaries.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-4 text-center">
                        {item.placeName}
                      </td>
                      <td className="py-2 px-4 text-center">
                        Rp {formatRupiah(item.income)}
                      </td>
                      <td className="py-2 px-4 text-center">
                        Rp {formatRupiah(item.receieveables)}
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

          <button
            onClick={() => {
              console.log("eggSaleGraph: ", eggSaleGraphs);
            }}
          >
            CHECK
          </button>
          {/* <Outlet /> */}
        </div>
      )}
    </>
  );
};

export default Penjualan;
