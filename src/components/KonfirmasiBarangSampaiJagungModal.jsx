import React, { useEffect, useState } from "react";

const KonfirmasiBarangSampaiJagungModal = ({
  isOpen,
  onClose,
  onConfirm,
  data = {},
}) => {
  const unit = data?.item?.unit || "Kg";
  const plannedQty = Number(data?.quantity || 0);

  const [mode, setMode] = useState("Sesuai");
  const [jumlah, setJumlah] = useState(plannedQty);
  const [catatan, setCatatan] = useState("");

  // reset setiap kali modal dibuka
  useEffect(() => {
    if (!isOpen) return;
    setMode("Sesuai");
    setJumlah(plannedQty);
    setCatatan("");
  }, [isOpen, plannedQty]);

  if (!isOpen) return null;

  const isSesuai = mode === "Sesuai";
  const jumlahDisabled = isSesuai;

  const handleSubmit = () => {
    // Validasi ringan saat "Tidak Sesuai"
    if (!isSesuai) {
      if (!jumlah || Number(jumlah) <= 0) {
        alert("Masukkan jumlah barang yang datang.");
        return;
      }
      if (!catatan.trim()) {
        alert("Catatan ketidaksesuaian wajib diisi.");
        return;
      }
    }

    onConfirm({
      quantity: Number(jumlah || 0),
      note: isSesuai ? "" : catatan.trim(),
      status: mode,
    });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/15 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-5">Konfirmasi barang sampai</h2>

        {/* Toggle Sesuai / Tidak Sesuai */}
        <div className="flex mb-5 gap-3">
          <button
            className={`flex-1 py-2 rounded border transition
              ${
                isSesuai
                  ? "bg-green-100 border-green-500"
                  : "border-gray-300 hover:bg-green-50 cursor-pointer"
              }`}
            onClick={() => {
              setMode("Sesuai");
              setJumlah(plannedQty); // kunci ke rencana awal
              setCatatan("");
            }}
          >
            Sesuai
          </button>
          <button
            className={`flex-1 py-2 rounded border transition
              ${
                !isSesuai
                  ? "bg-green-100 border-green-500"
                  : "border-gray-300 hover:bg-green-50 cursor-pointer"
              }`}
            onClick={() => setMode("Tidak Sesuai")}
          >
            Tidak Sesuai
          </button>
        </div>

        {/* Ringkasan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
          <div>
            <p className="text-sm text-gray-600">Nama Barang</p>
            <p className="font-extrabold">
              {data?.item?.name ? `${data.item.name}` : ""}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Supplier</p>
            <p className="font-extrabold">{data?.supplier?.name || "-"}</p>
          </div>
        </div>

        {/* Jumlah datang */}
        <div className="mb-5">
          <p className="text-sm text-gray-600">Jumlah barang yang datang</p>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              placeholder="Masukkan jumlah barang yang datang"
              disabled={jumlahDisabled}
              className={`w-full border rounded px-3 py-2 transition
                ${
                  jumlahDisabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white"
                }`}
            />
            <span className="font-bold">{unit}</span>
          </div>
        </div>

        {/* Catatan hanya jika Tidak Sesuai */}
        {!isSesuai && (
          <div className="mb-5">
            <p className="text-sm text-gray-600">Catatan ketidaksesuaian</p>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Masukkan catatan ketidaksesuaian barang yang sampai"
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}

        {/* Actions */}
        <div className="text-right">
          <button
            onClick={onClose}
            className="text-green-900 border border-green-200 px-4 py-2 rounded me-3 hover:bg-green-100 cursor-pointer"
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

export default KonfirmasiBarangSampaiJagungModal;
