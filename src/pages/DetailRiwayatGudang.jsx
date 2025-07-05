import React from "react";

export default function DetailRiwayatGudang() {
  const [status, setStatus] = React.useState("Stok Masuk");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detail Riwayat</h1>

      <div className="border rounded p-6 bg-white">
        <div className="mb-6">
          <label className="block font-medium mb-1">Status</label>
          <span
            className={`inline-block px-3 py-1 rounded  font-semibold ${
              status === "Stok Masuk"
                ? "bg-aman-box-surface-color text-aman-text-color"
                : "bg-yellow-300 text-yellow-800"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className=" text-gray-600">Waktu :</p>
            <p className="font-bold text-lg">10:30</p>
          </div>
          <div>
            <p className=" text-gray-600">Tanggal :</p>
            <p className="font-bold text-lg">20 Maret 2025</p>
          </div>
        </div>
        {status === "Stok diperbaharui" ? (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className=" text-gray-600">Tempat Barang</p>
              <p className="font-bold text-lg">Gudang Pusat</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className=" text-gray-600">Asal Barang</p>
              <p className="font-bold text-lg">2 ikat</p>
            </div>
            <div>
              <p className=" text-gray-600">Tujuan Barang</p>
              <p className="font-bold text-lg">4 ikat</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className=" text-gray-600">Nama barang</p>
          <p className="font-bold text-lg">Telur OK</p>
        </div>
        <div className="mb-6">
          <p className=" text-gray-600">Kategori barang</p>
          <p className="font-bold text-lg">Telur</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className=" text-gray-600">Jumlah barang awal</p>
            <p className="font-bold text-lg">2 ikat</p>
          </div>
          <div>
            <p className=" text-gray-600">Jumlah barang akhir</p>
            <p className="font-bold text-lg">4 ikat</p>
          </div>
        </div>

        <div>
          <p className=" text-gray-600">Diperbaharui oleh</p>
          <p className="font-bold text-lg">Agus</p>
        </div>
      </div>
    </div>
  );
}
