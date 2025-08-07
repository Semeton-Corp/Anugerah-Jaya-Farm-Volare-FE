import React, { useState, useEffect } from "react";

const kandangList = [
  { id: 1, name: "Sidodadi 04", jumlah: 4000, umur: 30 },
  { id: 2, name: "Sidodadi 05", jumlah: 3200, umur: 28 },
];

const InputDraftPenjualanAyam = () => {
  const [selectedKandang, setSelectedKandang] = useState(null);
  const [jumlahTerjual, setJumlahTerjual] = useState("");
  const [hargaPerEkor, setHargaPerEkor] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const total = parseInt(jumlahTerjual || 0) * parseInt(hargaPerEkor || 0);
    setTotalHarga(total);
  }, [jumlahTerjual, hargaPerEkor]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tambah Draft Penjualan Ayam</h2>

      <div className="bg-white border rounded p-6 space-y-6">
        {/* Tanggal */}
        <div>
          <p className="text-sm text-gray-600">Tanggal Input</p>
          <p className="font-semibold">20 Maret 2025</p>
        </div>

        {/* Kandang */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Kandang</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={selectedKandang?.id || ""}
              onChange={(e) => {
                const kandang = kandangList.find(
                  (k) => k.id === parseInt(e.target.value)
                );
                setSelectedKandang(kandang);
              }}
            >
              <option value="" disabled>
                Pilih Kandang
              </option>
              {kandangList.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Total Jumlah Ayam di Kandang
            </label>
            <p className="font-bold">
              {selectedKandang ? selectedKandang.jumlah : "-"} Ekor
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Umur Ayam
            </label>
            <p className="font-bold">
              {selectedKandang ? selectedKandang.umur : "-"} Minggu
            </p>
          </div>
        </div>

        {/* Pelanggan */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Pelanggan</label>
          <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded text-black font-semibold">
            Pilih Pelanggan
          </button>
          {/* Nanti tambahkan modal pilih pelanggan */}
        </div>

        {/* Jumlah dan Harga */}
        <div className="grid grid-cols-2 gap-6 items-end">
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Jumlah Ayam Terjual
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={jumlahTerjual}
                onChange={(e) => setJumlahTerjual(e.target.value)}
                placeholder="Masukkan jumlah ayam yang akan dijual"
                className="w-full border px-3 py-2 rounded bg-gray-100"
              />
              <span className="ml-2">Ekor</span>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Harga Jual / Ekor
            </label>
            <div className="flex items-center">
              <span className="mr-2">Rp</span>
              <input
                type="number"
                value={hargaPerEkor}
                onChange={(e) => setHargaPerEkor(e.target.value)}
                className="w-full border px-3 py-2 rounded bg-gray-100"
              />
              <span className="ml-2">/ Ekor</span>
            </div>
          </div>
        </div>

        {/* Total Harga */}
        <div className="flex items-center">
          <label className="text-sm text-gray-600 block mb-1 w-1/3">
            Harga Jual Total
          </label>
          <p className="font-bold">
            Rp {totalHarga.toLocaleString("id-ID") || "-"}
          </p>
        </div>

        {/* Tombol Simpan */}
        <div className="flex justify-end">
          <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-900">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputDraftPenjualanAyam;
