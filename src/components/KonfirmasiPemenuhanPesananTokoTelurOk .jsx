import React, { useState } from "react";

const KonfirmasiPemenuhanPesananTokoTelurOk = ({
  item,
  onSubmit,
  onCancel,
}) => {
  const [status, setStatus] = useState("Sesuai");
  const [jumlah, setJumlah] = useState(item.quantity || "");
  const [catatan, setCatatan] = useState("");

  const handleSubmit = () => {
    const payload = {
      storeId: item.store.id,
      quantity: Number(jumlah),
      warehouseNote: status === "Tidak Sesuai" ? catatan : null,
    };
    onSubmit(payload);
  };

  return (
    <div className="flex flex-col gap-6 bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Konfirmasi Pemenuhan Pesanan Toko</h2>

      {/* Status */}
      <div className="flex gap-4">
        <button
          onClick={() => setStatus("Sesuai")}
          className={`flex-1 border rounded py-2 hover:bg-green-100 cursor-pointer ${
            status === "Sesuai" ? "bg-green-100" : "bg-white"
          }`}
        >
          Sesuai
        </button>
        <button
          onClick={() => setStatus("Tidak Sesuai")}
          className={`flex-1 border rounded py-2 hover:bg-green-100 cursor-pointer ${
            status === "Tidak Sesuai" ? "bg-green-100" : "bg-white"
          }`}
        >
          Tidak Sesuai
        </button>
      </div>

      {/* Info Barang */}
      <div>
        <p>Nama Barang</p>
        <p className="font-bold">{item.item.name}</p>
      </div>

      {/* Jumlah */}
      <div>
        <p>Jumlah Barang</p>
        {status === "Tidak Sesuai" ? (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              className="border rounded px-2 py-1 w-20"
            />
            <span>Ikat</span>
          </div>
        ) : (
          <p className="font-bold">{item.quantity} Ikat</p>
        )}
      </div>

      {/* Catatan */}
      {status === "Tidak Sesuai" && (
        <div>
          <p>Catatan Ketidaksesuaian</p>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="border rounded w-full px-2 py-1"
            placeholder="Tulis catatan di sini"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
        >
          Batal
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900 cursor-pointer"
        >
          Kirim Barang
        </button>
      </div>
    </div>
  );
};

export default KonfirmasiPemenuhanPesananTokoTelurOk;
