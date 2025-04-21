import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getChickenMonitoring } from "../services/chickenMonitorings";
import { deleteChickenData } from "../services/chickenMonitorings";
import { getTodayDateInBahasa } from "../utils/dateFormat";

const data = [
  { date: "29 Mar", produksi: 25, penjualan: 30 },
  { date: "30 Mar", produksi: 14, penjualan: 40 },
  { date: "31 Mar", produksi: 30, penjualan: 33 },
  { date: "01 Apr", produksi: 22, penjualan: 40 },
  { date: "02 Apr", produksi: 16, penjualan: 8 },
  { date: "03 Apr", produksi: 25, penjualan: 20 },
  { date: "04 Apr", produksi: 43, penjualan: 32 },
];

const DetailVaksinObat = () => {
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

  //   const fetchDataAyam = async () => {
  //     try {
  //       const response = await getChickenMonitoring();
  //       if (response.status === 200) {
  //         setDetailAyamState(response.data.data);
  //         // console.log("DetailAyamData: ", response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Gagal memuat data ayam:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchDataAyam();

  //     if (location.state?.refetch) {
  //       fetchDataAyam();
  //       window.history.replaceState({}, document.title);
  //     }
  //   }, [location]);

  //   async function deleteDataHandle(dataId) {
  //     try {
  //       const response = await deleteChickenData(dataId);
  //       await fetchDataAyam(); // langsung reload data
  //     } catch (error) {
  //       console.error("Gagal menghapus data ayam:", error);
  //     }
  //   }

  //   async function editDataHandle(dataId) {
  //     const currectPath = location.pathname;
  //     navigate(`${currectPath}/input-ayam/${dataId}`);
  //   }

  //   // Render detail input page only
  //   if (isDetailPage) {
  //     return <Outlet />;
  //   }
  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Detail Vaksin & Obat</h1>
        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">
            {`Hari ini (${getTodayDateInBahasa()})`}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-5 border rounded-lg w-full border-black-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-center">
                <th className="py-2 px-4">Kandang</th>
                <th className="py-2 px-4">Kategori</th>
                <th className="py-2 px-4">Usia (minggu)</th>
                <th className="py-2 px-4">Vaksin</th>
                <th className="py-2 px-4">Obat</th>
                <th className="py-2 px-4">Penyakit</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {detailAyamData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 text-center"
                >
                  <td className="py-2 px-4">{row.cage.name}</td>
                  <td className="py-2 px-4">{row.chickenCategory}</td>
                  <td className="py-2 px-4">{row.age}</td>
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
                      <BiSolidEditAlt
                        onClick={() => {
                          editDataHandle(row.id);
                        }}
                        size={24}
                        className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                      />
                      <MdDelete
                        onClick={() => {
                          deleteDataHandle(row.id);
                        }}
                        size={24}
                        className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                      />
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

export default DetailVaksinObat;
