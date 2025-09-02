import React, { useRef } from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { MdStore } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuWheat } from "react-icons/lu";
import { FiMaximize2 } from "react-icons/fi";
import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getChickenPerformances } from "../services/chickenMonitorings";
import { useEffect } from "react";
import { formatDate, formatDateToDDMMYYYY } from "../utils/dateFormat";

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

const DetailKinerjaAyam = () => {
  const location = useLocation();
  const detailPages = ["pindah-ayam"];

  const [performacesData, setPerformacesData] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("Rentabilitas");

  const dateInputRef = useRef(null);
  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker() || dateInputRef.current.click();
    }
  };

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );
  const navigate = useNavigate();

  const handlePindahAyam = () => {
    navigate(`${location.pathname}/pindah-ayam`);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handlePengadaanDoc = () => {
    const newUrl = location.pathname.replace(
      "detail-kinerja-ayam",
      "pengadaan-doc"
    );
    navigate(newUrl);
  };

  const handleJualAyamAfkir = () => {
    const newUrl = location.pathname.replace(
      "detail-kinerja-ayam",
      "jual-ayam-afkir"
    );
    navigate(newUrl);
  };

  const fetchChickenPerformances = async () => {
    try {
      const date = formatDateToDDMMYYYY(selectedDate);
      const performancesResponse = await getChickenPerformances(date);
      console.log("performancesResponse: ", performancesResponse);

      if (performancesResponse.status === 200) {
        setPerformacesData(performancesResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchChickenPerformances();
  }, [selectedDate]);

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Detail Kinerja Ayam</h1>

            <div
              className="flex items-center rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer gap-2"
              onClick={openDatePicker}
            >
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer gap-2"
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-300">
            <div className="flex justify-end items-center mb-4">
              <div className="flex gap-3">
                <div
                  onClick={handlePindahAyam}
                  className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
                >
                  <div className="text-base font-medium ">Pindah Ayam</div>
                </div>
                <div
                  onClick={handlePengadaanDoc}
                  className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
                >
                  <div className="text-base font-medium ">Pengadaan DOC</div>
                </div>
                <div
                  onClick={handleJualAyamAfkir}
                  className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
                >
                  <div className="text-base font-medium ">Jual Ayam Afkir</div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-700 text-white text-center">
                    <th className="py-2 px-4">Kandang</th>
                    <th className="py-2 px-4">Kategori</th>
                    <th className="py-2 px-4">Usia (Minggu)</th>
                    <th className="py-2 px-4">Jumlah Ayam</th>
                    <th className="py-2 px-4">Produksi (Butir)</th>
                    <th className="py-2 px-4">Konsumsi (Gr/Ekor)</th>
                    <th className="py-2 px-4">Berat telur (Gr/Butir)</th>
                    <th className="py-2 px-4">FCR</th>
                    <th className="py-2 px-4">%HDP</th>
                    <th className="py-2 px-4">Produktivitas</th>
                  </tr>
                </thead>
                <tbody>
                  {performacesData.map((row, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="py-2 px-4">{row.cageName}</td>
                      <td className="py-2 px-4">{row.chickenCategory}</td>
                      <td className="py-2 px-4">{row.chickenAge}</td>
                      <td className="py-2 px-4">{row.totalChicken}</td>
                      <td className="py-2 px-4">{row.totalGoodEgg}</td>
                      <td className="py-2 px-4">
                        {Number(row.averageConsumptionPerChicken).toFixed(2)}
                      </td>

                      <td className="py-2 px-4">
                        {Number(row.averageWeightPerEgg).toFixed(2)}
                      </td>
                      <td className="py-2 px-4">
                        {Number(row.fcr).toFixed(2)}
                      </td>
                      <td className="py-2 px-4">
                        {Number(row.hdp).toFixed(2)}
                      </td>
                      <td className="py-2 px-4 flex justify-center">
                        <div
                          className={`w-24 py-1 flex justify-center rounded text-sm font-semibold ${
                            row.productivity === "Produktif"
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-kritis-box-surface-color text-kritis-text-color"
                          }`}
                        >
                          {row.productivity}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailKinerjaAyam;
