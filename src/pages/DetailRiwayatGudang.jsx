import React from "react";

export default function DetailRiwayatGudang() {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detail Riwayat</h1>

      <div className="border rounded p-6 bg-white">
        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <span className="inline-block px-3 py-1 rounded bg-yellow-300 text-yellow-800 text-sm font-semibold">
            Stok diperbaharui
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Waktu :</p>
            <p className="font-bold text-lg">10:30</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tanggal :</p>
            <p className="font-bold text-lg">20 Maret 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Tempat Barang</p>
            <p className="font-bold text-lg">Gudang Pusat</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nama barang</p>
            <p className="font-bold text-lg">Telur OK</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Kategori barang</p>
          <p className="font-bold text-lg">Telur</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Jumlah barang awal</p>
            <p className="font-bold text-lg">2 ikat</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Jumlah barang akhir</p>
            <p className="font-bold text-lg">4 ikat</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">Diperbaharui oleh</p>
          <p className="font-bold text-lg">Agus</p>
        </div>
      </div>
    </div>
  );
}
