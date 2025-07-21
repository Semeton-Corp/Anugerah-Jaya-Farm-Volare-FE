import React, { useState } from "react";

const KonfirmasiPemenuhanPesananTokoTelurRetak = ({
  item,
  stores,
  onSubmit,
  onCancel,
}) => {
  const [selectedStore, setSelectedStore] = useState("");

  const handleSubmit = () => {
    if (!selectedStore) {
      alert("Silakan pilih toko tujuan terlebih dahulu.");
      return;
    }

    const payload = {
      storeId: parseInt(selectedStore),
      //   itemId: item.id,
      quantity: parseInt(item.quantity),
    };

    onSubmit(payload);
  };

  return (
    <div className="flex flex-col gap-6 bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Konfirmasi Pemenuhan Pesanan Toko</h2>

      {/* Info Barang */}
      <div>
        <p>Nama Barang</p>
        <p className="font-bold">{item.item.name}</p>
      </div>

      {/* Jumlah */}
      <div>
        <p>Jumlah Barang</p>
        <p className="font-bold">{item.quantity} Ikat</p>
      </div>

      {/* Toko Tujuan */}
      <div>
        <p>Toko Tujuan</p>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="border rounded w-full px-2 py-1"
        >
          <option value="">Pilih toko tujuan pengiriman telur</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

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

export default KonfirmasiPemenuhanPesananTokoTelurRetak;
