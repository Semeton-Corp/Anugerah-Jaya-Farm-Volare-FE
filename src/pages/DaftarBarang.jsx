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
import { deleteItem, getItems } from "../services/item";

const DaftarBarang = () => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

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

  async function deleteDataHandle(dataId) {
    try {
      const deleteResponse = await deleteItem(dataId);
      // console.log("deleteResponse: ", deleteResponse);
      // console.log("response.status", response.status);

      if (deleteResponse.status === 204) {
        alert("✅ Data berhasil dihapus!");
        fetchWarehouseItems();
      } else {
        alert("⚠️ Gagal menghapus data. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Gagal menghapus data ayam:", error);
      alert("❌ Terjadi kesalahan saat menghapus data.");
    }
  }

  useEffect(() => {
    fetchWarehouseItems();

    if (location.state?.refetch) {
      fetchWarehouseItems();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const editDataHandle = async (id) => {
    console.log("id: ", id);
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

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-center">
                <th className="py-2 px-4">Nama Barang</th>
                <th className="py-2 px-4">Jenis Barang</th>
                <th className="py-2 px-4">Satuan</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftarBarangData.map(
                (data, index) =>
                  data.category !== "Telur" && (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-50 text-center"
                    >
                      <td className="py-2 px-4">{data.name}</td>
                      <td className="py-2 px-4">{data.category}</td>
                      <td className="py-2 px-4">{data.unit}</td>

                      <td className="py-2 px-4 flex justify-center gap-4">
                        <span
                          onClick={() => {
                            editDataHandle(data.id);
                          }}
                          className="px-4 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer"
                        >
                          Edit
                        </span>
                        {data.category !== "Telur" && (
                          <span
                            onClick={() => {
                              setSelectedDeleteId(data.id);
                              setShowDeleteModal(true);
                            }}
                            className="px-4 py-1 bg-kritis-box-surface-color rounded-[4px] text-white hover:bg-kritis-text-color cursor-pointer"
                          >
                            Hapus
                          </span>
                        )}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/15 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi</h2>
            <p className="mb-6">Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={async () => {
                  await deleteDataHandle(selectedDeleteId);
                  setShowDeleteModal(false);
                  setSelectedDeleteId(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarBarang;
