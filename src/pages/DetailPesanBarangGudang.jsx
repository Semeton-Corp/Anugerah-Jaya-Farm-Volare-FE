import React, { useState } from "react";
import BatalModal from "../components/BatalModal";

const DetailPesanBarangGudang = () => {
  const [showBatalModal, setShowBatalModal] = useState(false);

  const dummyData = {
    status: "Sampai - Tidak Sesuai",
    waktuPesan: "16:00, 20 Mar 2025",
    waktuKirim: "18:00, 20 Mar 2025",
    gudang: "Gudang Pusat",
    namaBarang: "Telur OK",
    jumlahDipesan: "50 Ikat",
    jumlahDiterima: "-",
    catatan:
      "Beberapa telur dalam karpet penuh, tidak ada mungkin jatuh saat perjalanan",
  };

  const info = dummyData;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-green-200 text-gray-800";
      case "Sedang Dikirim":
        return "bg-orange-200 text-yellow-800";
      case "Dibatalkan":
        return "bg-red-300 text-red-900";
      case "Sampai - Sesuai":
      case "Sampai - Tidak Sesuai":
        return "bg-blue-200 text-blue-900";
      default:
        return "bg-gray-100 text-black";
    }
  };

  const handleBatalPesanan = () => {
    setShowBatalModal(false);
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-6">Detail pesan barang ke gudang</h2>

      <div className="flex flex-col gap-6 text-sm font-medium border rounded-md p-6">
        <div className="mb-2">
          <p className="text-gray-600 mb-3 text-lg font-bold">
            Status pemesanan
          </p>
          <span
            className={`inline-block px-3 py-1 rounded ${getStatusStyle(
              info.status
            )}`}
          >
            {info.status}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="mb-2">
            <p className="text-gray-600 ">Waktu pemesanan</p>
            <p className="text-black text-lg font-bold">{info.waktuPesan}</p>
          </div>
          <div className="mb-2">
            <p className="text-gray-600">Waktu pengiriman</p>
            <p className="text-black text-lg font-bold">{info.waktuKirim}</p>
          </div>

          <div></div>
        </div>

        <div className="mb-2">
          <p className="text-gray-600">Gudang pemesanan</p>
          <p className="text-black text-lg font-bold">{info.gudang}</p>
        </div>
        <div className="mb-2">
          <p className="text-gray-600">Nama barang</p>
          <p className="text-black text-lg font-bold">{info.namaBarang}</p>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="mb-2">
              <p className="text-gray-600">Jumlah barang dipesan</p>
              <p className="text-black text-lg font-bold">
                {info.jumlahDipesan}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-gray-600">Jumlah barang diterima</p>
              <p className="text-black text-lg font-bold">
                {info.jumlahDiterima}
              </p>
            </div>
            <div></div>
          </div>
          {/* Tombol batalkan */}
        </div>
        {info.status == "Sampai - Tidak Sesuai" && (
          <div className="mb-2">
            <p className="text-gray-600 mb-3">Catatan ketidaksesuaian</p>
            <div className="p-3 border border-black-7 rounded-lg">
              <p className="text-black">{info.catatan}</p>
            </div>
          </div>
        )}

        {info.status === "Pending" && (
          <div className="text-right mt-6">
            <button
              onClick={() => {
                setShowBatalModal(true);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer"
            >
              Batalkan pesanan
            </button>
          </div>
        )}
      </div>

      {showBatalModal && (
        <BatalModal
          isOpen={showBatalModal}
          onCancel={() => {
            setShowBatalModal(false);
          }}
          onConfirm={handleBatalPesanan}
        />
      )}
    </div>
  );
};

export default DetailPesanBarangGudang;
