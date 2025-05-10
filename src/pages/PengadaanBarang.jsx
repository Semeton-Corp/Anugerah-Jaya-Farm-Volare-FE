import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getChickenMonitoring } from "../services/chickenMonitorings";
import { deleteChickenData } from "../services/chickenMonitorings";
import { getTodayDateInBahasa } from "../utils/dateFormat";

const daftarBarangData = [
  {
    namaBarang: "Jagung",
    satuan: "Ikat",
    kuantitas: 12,
    suplier: "Super Jagung",
    keterangan: "Sedang Dikirim",
    aksi: "Barang Sampai",
  },
  {
    namaBarang: "Telur retak",
    satuan: "Karpet",
    kuantitas: 12,
    suplier: "Dagang Dedak",
    keterangan: "Sedang Dikirim",
    aksi: "Barang Sampai",
  },
  {
    namaBarang: "Telur pecah",
    satuan: "Karpet",
    kuantitas: 10,
    suplier: "Pelet990",
    keterangan: "Selesai",
    aksi: "", // no action button
  },
];

const PengadaanBarang = () => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [detailAyamData, setDetailAyamState] = useState([]);

  const detailPages = ["input-pengadaan-barang"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const tambahBarangHandle = () => {
    navigate(`${location.pathname}/input-pengadaan-barang`);
  };

  const detailVaksinObatHandle = () => {
    navigate(`${location.pathname}/detail-vaksin-obat`);
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

  // Render detail input page only
  if (isDetailPage) {
    return <Outlet />;
  }

  // Render main table page
  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Pengadaan Barang</h1>

        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">
            Hari ini ({getTodayDateInBahasa()})
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 border rounded-lg w-full border-black-6">
        <div className="flex justify-end items-center mb-4">
          <div
            onClick={tambahBarangHandle}
            className="flex items-center rounded-lg px-4 py-2 bg-green-700 hover:bg-green-900 cursor-pointer"
          >
            <div className="text-base font-medium ms-2 text-white">
              + Tambah Data Pesan Barang
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-center">
                <th className="py-2 px-4">Nama Barang</th>
                <th className="py-2 px-4">Satuan</th>
                <th className="py-2 px-4">Kuantitas</th>
                <th className="py-2 px-4">Suplier</th>
                <th className="py-2 px-4">Keterangan</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftarBarangData.map((data, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 text-center"
                >
                  <td className="py-2 px-4">{data.namaBarang}</td>
                  <td className="py-2 px-4">{data.satuan}</td>
                  <td className="py-2 px-4">{data.kuantitas}</td>
                  <td className="py-2 px-4">{data.suplier}</td>
                  <td>
                    <div className="flex justify-center">
                      <span
                        className={`w-38 py-1 flex justify-center rounded text-sm font-semibold ${
                          data.keterangan === "Selesai"
                            ? "bg-aman-box-surface-color text-aman-text-color"
                            : "bg-orange-200 text-orange-900"
                        }`}
                      >
                        {data.keterangan}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <th className="py-2 px-4 ">
                        <span className="px-4 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer">
                          Barang Sampai
                        </span>
                      </th>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PengadaanBarang;
