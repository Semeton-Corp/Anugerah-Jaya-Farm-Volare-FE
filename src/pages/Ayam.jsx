import React, { useEffect, useState } from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import {
  GiBirdCage,
  GiHealthDecrease,
  GiChicken,
  GiDeathSkull,
} from "react-icons/gi";
import { FaCalendarAlt, FaPercentage } from "react-icons/fa";

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
  BarChart,
  Bar,
} from "recharts";
import { getLocations } from "../services/location";
import { getChickenCage } from "../services/cages";
import { getChickenOverview } from "../services/chickenMonitorings";

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

const chickenAgeData = [
  { age: "DOC", value: 40 },
  { age: "Grower", value: 48 },
  { age: "Prelayer", value: 27 },
  { age: "Layer", value: 44 },
  { age: "Afkir", value: 45 },
];

const Ayam = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("role");

  const [siteOptions, setSiteOptions] = useState([]);
  const [selectedSite, setSelectedSite] = useState(
    userRole === "Owner" ? 0 : localStorage.getItem("locationId")
  );

  const [chickenCageOptions, setChickenCageOptions] = useState([]);
  const [selectedChickenCage, setSelectedChickenCage] = useState(0);

  const [graphFilterOptions, setGraphFilterOptions] = useState([
    "Minggu Ini",
    "Bulan Ini",
    "Tahun Ini",
  ]);
  const [graphFilter, setGraphFilter] = useState("Minggu Ini");

  const [chickenDetail, setChickenDetail] = useState([]);
  const [ayamChartData, setAyamChartData] = useState([]);
  const [chickenAgeData, setChickenAgeData] = useState([]);

  const detailPages = ["detail-ayam"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );
  const navigate = useNavigate();

  const detailAyamHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/detail-ayam";

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

  const fetchChickenCages = async () => {
    try {
      const cageResponse = await getChickenCage(selectedSite);
      if (cageResponse.status === 200) {
        setChickenCageOptions(cageResponse.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch sites", err);
    }
  };

  const fetchOverviewData = async () => {
    try {
      const overviewResponse = await getChickenOverview(
        selectedSite,
        selectedChickenCage,
        graphFilter
      );
      console.log("overviewResponse: ", overviewResponse);
      if (overviewResponse.status == 200) {
        const data = overviewResponse.data.data;
        setChickenDetail(data.chickenDetail);

        const transformedChartData = data.chickenGraphs.map((item) => ({
          date: item.key,
          ayamMati: item.deathChicken,
          ayamSakit: item.sickChicken,
        }));
        setAyamChartData(transformedChartData);

        const pie = data.chickenPie;

        const ageData = [
          { age: "DOC", value: pie.chickenDOC },
          { age: "Grower", value: pie.chickenGrower },
          { age: "Prelayer", value: pie.chickenPrelayer },
          { age: "Layer", value: pie.chickenLayer },
          { age: "Afkir", value: pie.chickenAfkir },
        ];
        setChickenAgeData(ageData);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchChickenCages();
    fetchSites();
  }, []);

  useEffect(() => {
    fetchOverviewData();
  }, [selectedChickenCage, selectedSite, graphFilter]);

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">
              {userRole == "Owner" ? "Ringkasan Ayam" : "Ringkasan"}
            </h1>
            <div className="flex gap-4">
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
              <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                <GiBirdCage size={18} />
                <select
                  value={selectedChickenCage}
                  onChange={(e) => setSelectedChickenCage(e.target.value)}
                  className="ml-2 bg-transparent text-base font-medium outline-none"
                >
                  <option value="">Semua Kandang</option>
                  {chickenCageOptions.map((chickenCage) => (
                    <option key={chickenCage.id} value={chickenCage.cage.id}>
                      {chickenCage.cage.name}
                    </option>
                  ))}
                </select>
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
                  <p className="text-3xl font-semibold">
                    {chickenDetail?.totalLiveChicken ?? "-"}
                  </p>
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
                    <p className="text-3xl font-semibold">
                      {chickenDetail?.totalSickChicken ?? "-"}
                    </p>
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
                    <p className="text-3xl font-semibold">
                      {chickenDetail?.totalDeathChicken ?? "-"}
                    </p>
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
                <div className="flex flex-wrap gap-4">
                  <div className="flex">
                    <p className="text-3xl font-semibold pe-2">
                      {chickenDetail?.totalKPIPerformance != null
                        ? new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(Number(chickenDetail.totalKPIPerformance))
                        : "-"}
                    </p>
                    <p className="text-3xl font-semibold">%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* chart, incomes, and history section */}
          <div className="flex flex-col lg:flex-row h-90 gap-6">
            {/* Chart Section (3/4 width on large screens) */}
            <div className="w-full bg-white rounded-lg p-6 border border-black-6 mb-2">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">
                  Ayam Mati & Ayam Sakit
                </h2>
                <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                  <FaCalendarAlt size={18} />
                  <select
                    value={graphFilter}
                    onChange={(e) => setGraphFilter(e.target.value)}
                    className="ml-2 bg-transparent text-base font-medium outline-none"
                  >
                    {graphFilterOptions.map((choice, index) => (
                      <option key={index} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={ayamChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="center" />
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
          </div>

          <div className="bg-white border rounded shadow p-4 border-black-6">
            <h2 className="text-lg font-semibold mb-4">Distribusi Usia Ayam</h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chickenAgeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4b9ea5" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <button
            onClick={() => {
              console.log("selectedSite: ", selectedSite);
              console.log("selectedChickenCage: ", selectedChickenCage);
              console.log("graphFilter: ", graphFilter);
            }}
          >
            CHECK
          </button>
        </div>
      )}
    </>
  );
};

export default Ayam;
