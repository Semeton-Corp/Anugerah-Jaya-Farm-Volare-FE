import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getChickenMonitoring } from "../services/chickenMonitorings";
import { deleteChickenData } from "../services/chickenMonitorings";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { getWarehouseItems } from "../services/warehouses";
import { getItems } from "../services/item";

// const daftarBarangData = [
//   {
//     namaBarang: "Jagung",
//     jenisBarang: "Pakan",
//     satuan: "Kg",
//   },
//   {
//     namaBarang: "Dedak",
//     jenisBarang: "Pakan",
//     satuan: "Kg",
//   },
//   {
//     namaBarang: "Telur OK",
//     jenisBarang: "Telur",
//     satuan: "Liter",
//   },
// ];

const DaftarBarang = () => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [detailAyamData, setDetailAyamState] = useState([]);

  const [daftarBarangData, setDaftarBarangData] = useState([]);

  const detailPages = ["tambah-barang-baru"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const tambahBarangHandle = () => {
    navigate(`${location.pathname}/tambah-barang-baru`);
  };

  const detailVaksinObatHandle = () => {
    navigate(`${location.pathname}/detail-vaksin-obat`);
  };

  const fetchWarehouseItems = async () => {
    try {
      const warehouseItemResponse = await getItems();
      console.log("warehouseItemResponse: ", warehouseItemResponse);
      if (warehouseItemResponse.status == 200) {
        setDaftarBarangData(warehouseItemResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchDataAyam = async () => {
    try {
      const response = await getChickenMonitoring();
      if (response.status === 200) {
        setDetailAyamState(response.data.data);
        // console.log("response.data.data: ", response.data.data);

        // console.log("DetailAyamData: ", response.data.data);
      }
    } catch (error) {
      console.error("Gagal memuat data ayam:", error);
    }
  };

  useEffect(() => {
    fetchWarehouseItems();

    if (location.state?.refetch) {
      fetchWarehouseItems();
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

  const editDataHandle = async (id) => {
    navigate(`${location.pathname}/tambah-barang-baru/${id}`);
  };

  // Render detail input page only
  if (isDetailPage) {
    return <Outlet />;
  }

  // Render main table page
  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Daftar Barang Gudang</h1>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 border rounded-lg w-full border-black-6">
        {userRole === "Pekerja Gudang" ||
          (userRole === "Kepala Kandang" && (
            <div className="flex justify-end items-center mb-4">
              <div
                onClick={tambahBarangHandle}
                className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
              >
                <div className="text-base font-medium ms-2 ">
                  + Tambah Barang Baru
                </div>
              </div>
            </div>
          ))}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-center">
                <th className="py-2 px-4">Nama Barang</th>
                <th className="py-2 px-4">Jenis Barang</th>
                <th className="py-2 px-4">Satuan</th>
                {userRole === "Pekerja Gudang" ||
                  (userRole === "Kepala Kandang" && (
                    <th className="py-2 px-4">Aksi</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {daftarBarangData.map((data, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 text-center"
                >
                  <td className="py-2 px-4">{data.name}</td>
                  <td className="py-2 px-4">{data.category}</td>
                  <td className="py-2 px-4">{data.unit}</td>
                  {userRole === "Pekerja Gudang" ||
                    (userRole === "Kepala Kandang" && (
                      <td className="py-2 px-4 flex justify-center gap-4">
                        <span className="px-4 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer">
                          Edit Stok
                        </span>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DaftarBarang;
