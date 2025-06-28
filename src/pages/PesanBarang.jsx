import React, { useState } from "react";
import { MdEgg } from "react-icons/md";

const PesanBarang = () => {
  const [warehouse, setWarehouse] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tanggal] = useState("20 Maret 2025");

  const barang = {
    nama: "Telur OK",
    satuan: "Ikat",
    stok: "-",
  };

  const handlePesan = () => {
    if (!warehouse || !jumlah) {
      alert("Harap lengkapi form pemesanan.");
      return;
    }

    console.log("Pemesanan dikirim:", {
      warehouse,
      namaBarang: barang.nama,
      jumlah,
      satuan: barang.satuan,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pesan Barang</h1>

      <p className="text-lg font-semibold">
        Stok Tersedia di{" "}
        <span className="text-red-600 font-semibold">
          (Pilih Gudang terlebih dahulu)
        </span>
        :
      </p>

      {/* Kartu Barang */}
      <div className="p-4 max-w-sm rounded-md border-2 border-black-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Telur OK Ikat</h2>
          <div className="p-2 rounded-xl bg-green-700">
            <MdEgg size={24} color="white" />
          </div>
        </div>

        <div className=" justify-center gap-4">
          <div className="flex justify-center flex-wrap gap-4">
            <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
              <p className="text-3xl font-bold text-center">50</p>
              <p className="text-xl text-center">Ikat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Input Pemesanan */}
      <div className="border rounded p-4 w-full space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Input Pemesanan Barang</h2>
          <p className="text-sm">{tanggal}</p>
        </div>

        {/* Gudang Pemesanan */}
        <div>
          <label className="block text-sm mb-1">Gudang Pemesanan</label>
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="w-full border bg-gray-100 p-2 rounded"
          >
            <option value="">Pilih gudang tempat pemesanan</option>
            <option value="Gudang A">Gudang A</option>
            <option value="Gudang B">Gudang B</option>
          </select>
        </div>

        {/* Nama Barang */}
        <div>
          <label className="block text-sm mb-1">Nama Barang</label>
          <input
            type="text"
            disabled
            value={barang.nama}
            className="w-full border bg-gray-100 p-2 rounded"
          />
        </div>

        {/* Jumlah */}
        <div>
          <label className="block text-sm mb-1">Jumlah Pemesanan</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Masukkan jumlah barang..."
              className="w-full max-w-sm border bg-gray-100 p-2 rounded"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />
            <span className="font-semibold">{barang.satuan}</span>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={handlePesan}
            className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded cursor-pointer"
          >
            Pesan Barang
          </button>
        </div>
      </div>
    </div>
  );
};

export default PesanBarang;
