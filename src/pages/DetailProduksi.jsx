import React from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getEggMonitoring } from "../services/eggs";
import { PiCalendarBlank } from "react-icons/pi";
import { deleteEggData } from "../services/eggs";

// const produksiDetail = [
//   {
//     kandang: "Kandang A1",
//     qty: 1000,
//     ok: 800,
//     retak: 12,
//     pecah: 100,
//     reject: 40,
//     abnormality: "3%",
//     keterangan: "aman",
//   },
//   {
//     kandang: "Kandang A2",
//     qty: 1000,
//     ok: 800,
//     retak: 12,
//     pecah: 100,
//     reject: 40,
//     abnormality: "12%",
//     keterangan: "kritis",
//   },
// ];

const DetailProduksi = () => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [produksiDetail, setProduksiDetail] = useState([]);

  const isDetailPage = location.pathname.includes("input-telur");

  const inputTelurHandle = () => {
    navigate(`${location.pathname}/input-telur`);
  };

  const fetchDataTelur = async () => {
    try {
      const response = await getEggMonitoring();
      if (response.status === 200) {
        setProduksiDetail(response.data.data);
      }
    } catch (error) {}
  };

  async function deleteDataHandle(dataId) {
    try {
      const response = await deleteEggData(dataId);
      await fetchDataAyam(); // langsung reload data
    } catch (error) {
      console.error("Gagal menghapus data ayam:", error);
    }
  }

  useEffect(() => {
    fetchDataTelur();
  });

  async function editDataHandle(dataId) {
    const currectPath = location.pathname;
    navigate(`${currectPath}/input-telur/${dataId}`);
  }

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Data Produksi Telur</h1>
        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">
            Hari ini (20 Mar 2025)
          </div>
        </div>
      </div>

      {/* detail penjualan */}
      <div className=" flex gap-4">
        <div className=" w-full bg-white px-8 py-6 rounded-lg border border-black-6">
          <div className="flex justify-end items-start mb-4">
            {userRole === "Pekerja Telur" && (
              <div
                onClick={inputTelurHandle}
                className="flex items-center rounded-lg px-4 py-2 bg-green-700 hover:bg-green-900 cursor-pointer"
              >
                <div className="text-base font-medium ms-2 text-white">
                  + Input Data Harian
                </div>
              </div>
            )}
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-700 text-white text-center">
                <th className="py-2 px-4">Kandang</th>
                <th className="py-2 px-4">QTY Total</th>
                <th className="py-2 px-4">OK</th>
                <th className="py-2 px-4">Retak</th>
                <th className="py-2 px-4">Pecah</th>
                <th className="py-2 px-4">Reject</th>
                <th className="py-2 px-4">%Abnormality</th>

                <th className="py-2 px-4">Berat Telur (Kg)</th>
                <th className="py-2 px-4">Gudang Simpan</th>

                <th className="py-2 px-4">Keterangan</th>
                {userRole === "Pekerja Telur" && (
                  <th className="py-2 px-4">Aksi</th>
                )}
                {userRole === "Pekerja Telur" && (
                  <th className="py-2 px-4"></th>
                )}
              </tr>
            </thead>
            <tbody className="text-center">
              {produksiDetail.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 px-4">{item.cage.name}</td>
                  <td className="py-2 px-4">{item.totalAllEgg}</td>
                  <td className="py-2 px-4">{item.totalGoodEgg}</td>
                  <td className="py-2 px-4">{item.totalCrackedEgg}</td>
                  <td className="py-2 px-4">{item.totalBrokeEgg}</td>
                  <td className="py-2 px-4">{item.totalRejectEgg}</td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center">
                      <p>{Number(item.abnormalityRate).toFixed(2)} </p>
                      <p>%</p>
                    </div>
                  </td>
                  <td className="py-2 px-4">{item.weight}</td>
                  <td className="py-2 px-4">{item.warehouse.name}</td>

                  <td className="py-2 px-4 flex justify-center">
                    <span
                      className={`w-24 py-1 flex justify-center rounded text-sm font-semibold ${
                        item.description === "Aman"
                          ? "bg-aman-box-surface-color text-aman-text-color"
                          : "bg-kritis-box-surface-color text-kritis-text-color"
                      }`}
                    >
                      {item.description}
                    </span>
                  </td>
                  {userRole === "Pekerja Telur" && (
                    <td className="py-2 px-4 text-center">
                      <div className="inline-flex gap-4 justify-center items-center">
                        <BiSolidEditAlt
                          onClick={() => editDataHandle(item.id)}
                          size={24}
                          className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                        />
                        <MdDelete
                          onClick={() => {
                            deleteDataHandle(item.id);
                          }}
                          size={24}
                          className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                        />
                      </div>
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

export default DetailProduksi;
