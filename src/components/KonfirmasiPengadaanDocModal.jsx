import React, { useState } from "react";

const KonfirmasiPengadaanDocModal = ({ onClose, data, onConfirm }) => {
  const [isSesuai, setIsSesuai] = useState(true);
  const [catatan, setCatatan] = useState("");
  const [jumlah, setJumlah] = useState(data.jumlah);

  const handleConfirm = () => {
    onConfirm({
      status: isSesuai ? "Sesuai" : "Tidak Sesuai",
      catatan: catatan,
    });
  };

  const handleJumlahChange = (val) => {
    setJumlah(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 bg-opacity-40">
      <div className="bg-white w-[90%] max-w-md p-6 rounded shadow-md border-2">
        <h2 className="text-xl font-bold mb-4">
          Konfirmasi pengadaan DOC sampai
        </h2>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setIsSesuai(true)}
            className={`w-1/2 py-2 rounded border hover:bg-green-100 cursor-pointer ${
              isSesuai === true ? "bg-green-100 border-green-400" : ""
            }`}
          >
            Sesuai
          </button>
          <button
            onClick={() => setIsSesuai(false)}
            className={`w-1/2 py-2 rounded border hover:bg-green-100 cursor-pointer ${
              isSesuai === false ? "bg-green-200 border-green-500" : ""
            }`}
          >
            Tidak Sesuai
          </button>
        </div>

        <div className="mb-2">
          <p className="text-sm text-gray-600">Kandang</p>
          <p className="font-bold">{data.kandang}</p>
        </div>

        <div className="flex gap-7 mb-2">
          <div>
            <p className="text-sm text-gray-600">Nama Barang</p>
            <p className="font-bold">{data.namaBarang}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Supplier</p>
            <p className="font-bold">{data.supplier}</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-full">
            <p className="text-sm text-gray-600">Jumlah Barang</p>
            <input
              type="number"
              value={jumlah}
              onChange={(e) => handleJumlahChange(e.target.value)}
              readOnly={isSesuai === true}
              className={`w-full border px-4 py-2 rounded ${
                isSesuai === true
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              }`}
            />
          </div>
          <span className="ml-2 mt-4 font-semibold">Ekor</span>
        </div>

        {!isSesuai && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">Catatan ketidaksesuaian</p>
            <textarea
              className="w-full border px-4 py-2 rounded"
              placeholder="Masukkan catatan ketidaksesuaian barang yang sampai"
              rows={3}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              disabled={isSesuai === true}
            ></textarea>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 rounded"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSesuai === null}
            className={`px-4 py-2 rounded text-white ${
              isSesuai === null
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-900 cursor-pointer"
            }`}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiPengadaanDocModal;
