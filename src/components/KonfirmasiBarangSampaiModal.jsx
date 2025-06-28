import React, { useState } from "react";

const KonfirmasiBarangSampaiModal = ({
  isOpen,
  onClose,
  namaBarang = "Telur OK",
  satuan = "Ikat",
  defaultJumlah = 0,
  onSubmit,
}) => {
  const [mode, setMode] = useState("Sesuai");
  const [jumlah, setJumlah] = useState(defaultJumlah);
  const [catatan, setCatatan] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit?.({
      status: mode,
      jumlah,
      catatan: mode === "Tidak Sesuai" ? catatan : "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/15 bg-opacity-60 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Konfirmasi barang sampai</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["Sesuai", "Tidak Sesuai"].map((label) => (
            <button
              key={label}
              onClick={() => setMode(label)}
              className={`flex-1 border px-4 py-2 rounded text-sm font-medium cursor-pointer ${
                mode === label
                  ? "bg-green-100 border-green-500"
                  : "bg-white border-green-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Nama Barang */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            {namaBarang}
          </label>
        </div>

        {/* Jumlah */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Jumlah Barang</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              placeholder="Masukkan jumlah barang yang datang"
              className="w-full bg-gray-100 p-2 rounded border"
            />
            <span className="font-semibold">{satuan}</span>
          </div>
        </div>

        {/* Catatan jika Tidak Sesuai */}
        {mode === "Tidak Sesuai" && (
          <div className="mb-6">
            <label className="block text-sm mb-1">
              Catatan ketidaksesuaian
            </label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Masukkan catatan ketidaksesuaian barang yang sampai"
              className="w-full bg-gray-100 p-2 rounded resize-none border"
              rows={3}
            />
          </div>
        )}

        <div className="text-right mt-12 ">
          <button
            onClick={onClose}
            className="bg-green-200 hover:bg-green-500 text-black px-4 py-2 rounded cursor-pointer me-4"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded cursor-pointer"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiBarangSampaiModal;
