import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete, MdStore } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getChickenMonitoring } from "../services/chickenMonitorings";
import { deleteChickenData } from "../services/chickenMonitorings";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { AlertTriangle } from "lucide-react";

// const detailAyamData = [
//   {
//     kandang: "Kandang A1",
//     kategori: "DOC",
//     usiaMinggu: 49,
//     hidup: 4000,
//     sakit: 50,
//     mati: 10,
//     pakanKg: 20,
//     mortalitas: "3%",
//   },
//   {
//     kandang: "Kandang A2",
//     kategori: "Grower",
//     usiaMinggu: 49,
//     hidup: 1200,
//     sakit: 20,
//     mati: 12,
//     pakanKg: 40,
//     mortalitas: "0.8%",
//   },
//   {
//     kandang: "Kandang A3",
//     kategori: "Pre Layer",
//     usiaMinggu: 49,
//     hidup: 1200,
//     sakit: 20,
//     mati: 12,
//     pakanKg: 40,
//     mortalitas: "0.8%",
//   },
//   {
//     kandang: "Kandang A4",
//     kategori: "Layer",
//     usiaMinggu: 49,
//     hidup: 1200,
//     sakit: 20,
//     mati: 12,
//     pakanKg: 40,
//     mortalitas: "0.8%",
//   },
//   {
//     kandang: "Kandang A5",
//     kategori: "Afkir",
//     usiaMinggu: 49,
//     hidup: 1200,
//     sakit: 20,
//     mati: 12,
//     pakanKg: 40,
//     mortalitas: "0.8%",
//   },
// ];

const data = [
  { date: "29 Mar", produksi: 25, penjualan: 30 },
  { date: "30 Mar", produksi: 14, penjualan: 40 },
  { date: "31 Mar", produksi: 30, penjualan: 33 },
  { date: "01 Apr", produksi: 22, penjualan: 40 },
  { date: "02 Apr", produksi: 16, penjualan: 8 },
  { date: "03 Apr", produksi: 25, penjualan: 20 },
  { date: "04 Apr", produksi: 43, penjualan: 32 },
];

const DetailAyam = () => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [detailAyamData, setDetailAyamState] = useState([]);

  const detailPages = ["input-ayam", "detail-vaksin-obat"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const inputAyamHandle = () => {
    navigate(`${location.pathname}/input-ayam`);
  };

  const detailVaksinObatHandle = () => {
    navigate(`${location.pathname}/detail-vaksin-obat`);
  };

  const fetchDataAyam = async () => {
    try {
      const response = await getChickenMonitoring();
      if (response.status === 200) {
        setDetailAyamState(response.data.data);
        console.log("response.data.data: ", response.data.data);

        // console.log("DetailAyamData: ", response.data.data);
      }
    } catch (error) {
      console.error("Gagal memuat data ayam:", error);
    }
  };

  useEffect(() => {
    fetchDataAyam();

    if (location.state?.refetch) {
      fetchDataAyam();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  async function deleteDataHandle(dataId) {
    try {
      const response = await deleteChickenData(dataId);
      console.log("response.status", response.status);

      if (response.status === 204) {
        alert("✅ Data berhasil dihapus!");
        await fetchDataAyam();
      } else {
        alert("⚠️ Gagal menghapus data. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Gagal menghapus data ayam:", error);
      alert("❌ Terjadi kesalahan saat menghapus data.");
    }
  }

  async function editDataHandle(dataId) {
    const currectPath = location.pathname;
    navigate(`${currectPath}/input-ayam/${dataId}`);
  }

  // Render detail input page only
  if (isDetailPage) {
    return <Outlet />;
  }

  // Render main table page
  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-6">
        <h1 className="text-3xl font-bold">
          {userRole === "Pekerja Kandang" ? "Data Ayam" : "Detail Ayam"}
        </h1>

        <div className="flex gap-4">
          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <MdStore size={18} />
            <div className="text-base font-medium ms-2">Semua site</div>
          </div>
          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <PiCalendarBlank size={18} />
            <div className="text-base font-medium ms-2">
              Hari ini (20 Mar 2025)
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-yellow-50 text-yellow-800 p-4 rounded-md border-l-4 border-yellow-400">
        <AlertTriangle className="w-5 h-5 mr-3 text-yellow-600" />
        <span className="font-medium">
          Periksa kandang A1 nilai mortalitas 5%
        </span>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 border rounded-lg w-full border-black-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {userRole === "Pekerja Kandang" || "Kepala Kandang"
              ? "Data harian ayam"
              : ""}
          </h2>

          <div
            onClick={inputAyamHandle}
            className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
          >
            <div className="text-base font-medium ms-2 text-black">
              + Input Data Harian
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-center">
                <th className="py-2 px-4">Kandang</th>
                <th className="py-2 px-4">ID Ayam</th>
                <th className="py-2 px-4">Kategori</th>
                <th className="py-2 px-4">Usia (minggu)</th>
                <th className="py-2 px-4">Hidup</th>
                <th className="py-2 px-4">Sakit</th>
                <th className="py-2 px-4">Mati</th>
                <th className="py-2 px-4">Pakan (Kg)</th>
                <th className="py-2 px-4">Mortalitas</th>
                {(userRole === "Pekerja Kandang" ||
                  userRole === "Kepala Kandang") && (
                  <th className="py-2 px-4">Aksi</th>
                )}
              </tr>
            </thead>
            <tbody>
              {detailAyamData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 text-center"
                >
                  <td className="py-2 px-4">{row.chickenCage.cage.name}</td>
                  <td className="py-2 px-4">{row.chickenCage.batchId}</td>
                  <td className="py-2 px-4">
                    {row.chickenCage.cage.chickenCategory}
                  </td>
                  <td className="py-2 px-4">{row.chickenCage.chickenAge}</td>
                  <td className="py-2 px-4">{row.totalLiveChicken}</td>
                  <td className="py-2 px-4">{row.totalSickChicken}</td>
                  <td className="py-2 px-4">{row.totalDeathChicken}</td>
                  <td className="py-2 px-4">{row.totalFeed}</td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      <p>{row.mortalityRate}</p>
                      <p>%</p>
                    </div>
                  </td>
                  {(userRole === "Pekerja Kandang" ||
                    userRole === "Kepala Kandang") && (
                    <td className="py-2 px-4 flex justify-center gap-4">
                      <span
                        onClick={() => {
                          editDataHandle(row.id);
                        }}
                        className="py-1 px-4 rounded bg-green-700 hover:bg-green-900  text-white cursor-pointer"
                      >
                        Lihat Detail
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailAyam;
