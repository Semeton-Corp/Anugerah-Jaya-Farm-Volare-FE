import { useState } from "react";
import ConfirmUpdateModal from "../components/ConfirmModal";

export default function EditStokBarang() {
  const [jumlah, setJumlah] = useState(40);
  const [estimasiHabis, setEstimasiHabis] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    console.log("Jumlah disimpan:", jumlah);
    setShowConfirm(false);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Stok Barang</h1>

      <div className="border rounded p-8">
        {/* Keterangan Stok */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Keterangan Stok
          </label>
          <span className="inline-block px-6 py-2 rounded bg-aman-box-surface-color text-aman-text-color text-sm font-semibold">
            aman
          </span>
        </div>

        {/* Nama Barang */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nama Barang</label>
          <p className="font-bold">Telur OK</p>
        </div>

        {/* Jumlah Barang */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Jumlah Barang
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none"
            />
            <span className="font-semibold">Kg</span>
          </div>
        </div>

        {/* Jumlah Barang */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Estimasi Habis
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={estimasiHabis}
              onChange={(e) => setJumlah(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none"
            />
            <span className="font-semibold">Hari lagi</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setShowConfirm(true);
            }}
            className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
      <ConfirmUpdateModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleSubmit}
      />
    </div>
  );
}
