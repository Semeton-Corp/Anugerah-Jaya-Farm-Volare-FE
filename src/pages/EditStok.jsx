import React, { useState } from "react";
import ConfirmUpdateModal from "../components/ConfirmModal";

const EditStok = () => {
  const [jumlah, setJumlah] = useState(50);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    console.log("Jumlah disimpan:", jumlah);
    // Simpan logic di sini
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Stok</h2>
      <div className=" border rounded p-4 space-y-6 w-full ">
        <div>
          <label className="block text-sm mb-1">Nama Barang</label>
          <p className="text-lg font-bold">Telur OK</p>
        </div>

        <div>
          <label className="block text-sm mb-1">Nama Toko</label>
          <p className="text-lg font-bold">Toko A</p>
        </div>

        <div>
          <label className="block text-sm mb-1">Jumlah Barang</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="bg-black-4 border p-2 rounded w-full max-w-[200px]"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />
            <span className="font-semibold">Ikat</span>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={() => {
              setShowConfirm(true);
            }}
            className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Modal */}
      <ConfirmUpdateModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleSubmit}
      />
    </div>
  );
};

export default EditStok;
