import React from "react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import KonfirmasiBarangSampaiModal from "../components/KonfirmasiBarangSampaiModal";
import SortirTelurModal from "../components/SortirTelurModal";
import BatalModal from "../components/BatalModal";

const dummyData = [
  {
    namaBarang: "Telur OK",
    jumlah: 12,
    gudang: "Gudang A1",
    status: "Sedang Dikirim",
  },
  {
    namaBarang: "Telur Retak",
    jumlah: 12,
    gudang: "Gudang A1",
    status: "Pending",
  },
  {
    namaBarang: "Telur OK",
    jumlah: 10,
    gudang: "Gudang A1",
    status: "Ditolak",
  },
  {
    namaBarang: "Telur Retak",
    jumlah: 10,
    gudang: "Gudang A1",
    status: "Sampai - Sesuai",
  },
  {
    namaBarang: "Telur OK",
    jumlah: 10,
    gudang: "Gudang A1",
    status: "Dibatalkan",
  },
  {
    namaBarang: "Telur OK",
    jumlah: 10,
    gudang: "Gudang A1",
    status: "Sampai - Tidak Sesuai",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Sedang Dikirim":
      return "bg-orange-200 text-yellow-800";
    case "Pending":
      return "bg-green-200 text-green-900";
    case "Ditolak":
    case "Dibatalkan":
      return "bg-kritis-box-surface-color text-kritis-text-color";
    case "Sampai - Sesuai":
      return "bg-aman-box-surface-color text-aman-text-color";
    case "Sampai - Tidak Sesuai":
      return "bg-aman-box-surface-color text-aman-text-color";
    default:
      return "bg-gray-100 text-black";
  }
};

const getSecondAction = (status) => {
  switch (status) {
    case "Sedang Dikirim":
      return {
        label: "Barang Sampai",
        color: "bg-orange-300 hover:bg-orange-500 cursor-pointer",
      };
    case "Pending":
      return {
        label: "Batal Pesan",
        color:
          "bg-kritis-box-surface-color text-kritis-text-color hover:bg-red-500 cursor-pointer",
      };
    case "Sampai - Sesuai":
      return {
        label: "Sortir Telur",
        color: "bg-orange-300 hover:bg-orange-500 cursor-pointer",
      };
    default:
      return null;
  }
};

const RequestKeGudang = () => {
  const userRole = localStorage.getItem("role");
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const detailPages = ["pesan-barang"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const pesanBarangHandle = () => {
    const currentPath = location.pathname;
    const inputPath = currentPath + "/pesan-barang";

    navigate(inputPath);
  };

  const [showBarangSampaiModal, setShowBarangSampaiModal] = useState(false);
  const [showSortirModal, setShowSortirModal] = useState(false);
  const [showBatalModal, setShowBatalModal] = useState(false);

  BatalModal;
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call parent function with search input
  };

  const handleBarangSampai = (data) => {
    console.log("Payload dikirim:", data);
    // Kirim ke backend di sini
    // contoh: await api.konfirmasiBarangSampai(data)
  };

  const handleLihatDetail = () => {
    const currentPath = location.pathname;
    const inputPath = currentPath + "/detail-pesan-barang-gudang";

    navigate(inputPath);
  };

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Request ke Gudang</h1>

            <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
              <PiCalendarBlank size={18} />
              <div className="text-base font-medium ms-2">Semua Hari</div>
            </div>
          </div>

          {/* entire box */}
          <div className="p-6 rounded-[4px] border border-black-6">
            <div className="flex justify-end">
              <button
                onClick={pesanBarangHandle}
                className="px-5 py-3 bg-orange-300 rounded-[4px] text-black hover:bg-orange-500 cursor-pointer font-medium mb-3"
              >
                Pesan Barang
              </button>
            </div>
            {/* pegawai table */}
            <div className="p-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-700 text-white">
                    <th className="px-4 py-2">Nama barang</th>
                    <th className="px-4 py-2">Jumlah Pesan (ikat)</th>
                    <th className="px-4 py-2">Gudang Pemesanan</th>
                    <th className="px-4 py-2">Keterangan</th>
                    <th className="px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{item.namaBarang}</td>
                      <td className="px-4 py-2">{item.jumlah}</td>
                      <td className="px-4 py-2">{item.gudang}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={handleLihatDetail}
                          className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 text-sm rounded cursor-pointer"
                        >
                          Lihat detail
                        </button>
                        {getSecondAction(item.status) && (
                          <button
                            onClick={() => {
                              const label = getSecondAction(item.status).label;
                              if (label === "Barang Sampai") {
                                setSelectedItem(item);
                                setShowBarangSampaiModal(true);
                              } else if (label === "Sortir Telur") {
                                setSelectedItem(item);
                                setShowSortirModal(true);
                              } else if (label === "Batal Pesan") {
                                setSelectedItem(item);
                                setShowBatalModal(true);
                              }
                            }}
                            className={`${
                              getSecondAction(item.status).color
                            } px-3 py-1 text-sm rounded`}
                          >
                            {getSecondAction(item.status).label}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showBarangSampaiModal && selectedItem && (
            <KonfirmasiBarangSampaiModal
              isOpen={showBarangSampaiModal}
              onClose={() => setShowBarangSampaiModal(false)}
              namaBarang={selectedItem.namaBarang}
              satuan="Ikat"
              defaultJumlah={selectedItem.jumlah}
              onSubmit={(data) => {
                handleBarangSampai({
                  ...data,
                });
                setShowBarangSampaiModal(false);
              }}
            />
          )}

          {showSortirModal && selectedItem && (
            <SortirTelurModal
              isOpen={showSortirModal}
              onClose={() => setShowSortirModal(false)}
              defaultKarpet={2}
              defaultButirSisa={4}
              defaultTelurBonyok={20}
              onSubmit={(payload) => {
                console.log("Data sortir:", payload);
                setShowSortirModal(false);
              }}
            />
          )}

          {showBatalModal && selectedItem && (
            <BatalModal
              isOpen={showBatalModal}
              onCancel={() => setShowBatalModal(false)}
              onConfirm={() => {
                console.log("Item dibatalkan:", selectedItem);
                setShowBatalModal(false);
              }}
              item={selectedItem} // jika modalmu butuh data barang
            />
          )}
        </div>
      )}
    </>
  );
};

export default RequestKeGudang;
