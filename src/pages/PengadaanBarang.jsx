import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getChickenMonitoring } from "../services/chickenMonitorings";
import { deleteChickenData } from "../services/chickenMonitorings";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import {
  getWarehouseOrderItems,
  takeWarehouseOrderItem,
} from "../services/warehouses";
import KonfirmasiBarangSampaiGudangModal from "../components/KonfirmasiBarangSampaiGudangModal";
import BatalPengadaanBarangModal from "../components/BatalPengadaanBarangModal";

export const pesananDummy = [
  {
    tanggal: "20 Mar 2025",
    namaBarang: "Jagung",
    jumlah: 12,
    satuan: "Karung",
    supplier: "Super Jagung",
    keterangan: "Belum Konfirmasi",
  },
  {
    tanggal: "20 Mar 2025",
    namaBarang: "Telur retak",
    jumlah: 12,
    satuan: "Karpet",
    supplier: "Dagang Dedak",
    keterangan: "Belum Konfirmasi",
  },
];

const PengadaanBarang = () => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [daftarBarangData, setDaftarBarangData] = useState([]);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowBatalModal, setIsShowBatalModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const detailPages = ["draft-pengadaan-barang"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const fetchBarangData = async () => {
    try {
      const dataResponse = await getWarehouseOrderItems();
      console.log("dataResponse: ", dataResponse);
      if (dataResponse.status == 200) {
        setDaftarBarangData(dataResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchBarangData();

    if (location.state?.refetch) {
      fetchBarangData();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const confirmBatalHandle = () => {
    console.log("test:");
    setIsShowBatalModal(false);
  };

  const confirmBarangSampaiHandle = () => {
    console.log("test:");
    setIsShowConfirmModal(false);
  };

  const handleDraftPengadaanBarang = () => {
    navigate(`${location.pathname}/draft-pengadaan-barang`);
  };

  if (isDetailPage) {
    return <Outlet />;
  }

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
        {userRole === "Pekerja Gudang" ||
          (userRole === "Kepala Kandang" && (
            <div className="flex justify-end items-center mb-4">
              <div
                onClick={handleDraftPengadaanBarang}
                className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
              >
                <div className="text-base font-medium ms-2 text-black">
                  Draft Pengadaan Barang
                </div>
              </div>
            </div>
          ))}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white ">
                <th className="py-2 px-4">Tanggal Pemesanan</th>
                <th className="py-2 px-4">Nama Barang</th>
                <th className="py-2 px-4">Satuan</th>
                <th className="py-2 px-4">Kuantitas</th>
                <th className="py-2 px-4">Suplier</th>
                <th className="py-2 px-4">Keterangan</th>
                {userRole === "Pekerja Gudang" ||
                  (userRole === "Kepala Kandang" && (
                    <th className="py-2 px-4">Aksi</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {pesananDummy.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.tanggal}</td>
                  <td className="px-4 py-2">{item.namaBarang}</td>
                  <td className="px-4 py-2">{item.jumlah}</td>
                  <td className="px-4 py-2">{item.satuan}</td>
                  <td className="px-4 py-2">{item.supplier}</td>
                  <td className="px-4 py-2">
                    <span className="bg-orange-200 px-2 py-1 rounded">
                      {item.keterangan}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsShowConfirmModal(true);
                        console.log("item: ", item);
                      }}
                      className="bg-green-700 hover:bg-green-900 text-white px-2 py-1 rounded text-sm cursor-pointer"
                    >
                      Konfirmasi
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsShowBatalModal(true);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded text-sm cursor-pointer"
                    >
                      Batalkan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* <tbody>
              {daftarBarangData.map((data, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 text-center"
                >
                  <td className="py-2 px-4">{data.warehouseItem.name}</td>
                  <td className="py-2 px-4">{data.warehouseItem.unit}</td>
                  <td className="py-2 px-4">{data.quantity}</td>
                  <td className="py-2 px-4">{data.supplier.name}</td>
                  <td>
                    <div className="flex justify-center">
                      <span
                        className={`w-38 py-1 flex justify-center rounded text-sm font-semibold ${
                          data.isTaken
                            ? "bg-aman-box-surface-color text-aman-text-color"
                            : "bg-orange-200 text-orange-900"
                        }`}
                      >
                        {data.isTaken ? "Selesai" : "Sedang Dikirim"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      {!data.isTaken ? (
                        <div
                          onClick={() => {
                            takeOrderHandle(data.id);
                          }}
                          className="py-2 px-4 "
                        >
                          <span className="px-4 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer">
                            Barang Sampai
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>
      {isShowConfirmModal && selectedItem && (
        <KonfirmasiBarangSampaiGudangModal
          isOpen={isShowConfirmModal}
          onClose={() => setIsShowConfirmModal(false)}
          onConfirm={confirmBarangSampaiHandle}
          data={selectedItem}
        />
      )}

      {isShowBatalModal && selectedItem && (
        <BatalPengadaanBarangModal
          isOpen={isShowBatalModal}
          onCancel={() => setIsShowBatalModal(false)}
          onConfirm={confirmBatalHandle}
        />
      )}
    </div>
  );
};

export default PengadaanBarang;
