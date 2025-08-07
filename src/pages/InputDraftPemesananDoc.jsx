import React, { useState } from "react";
import { getTodayDateInBahasa } from "../utils/dateFormat";

const kandangOptions = [
  { id: 1, name: "Sidodadi DOC", kapasitas: 11000 },
  { id: 2, name: "Kandang B", kapasitas: 9000 },
];

const supplierOptions = [
  { id: 1, name: "Dagang A" },
  { id: 2, name: "Dagang B" },
];

const hargaOptions = [
  { id: 1, label: "Rp 1.000.000" },
  { id: 2, label: "Rp 1.500.000" },
];

const InputDraftPemesananDoc = () => {
  const [selectedKandang, setSelectedKandang] = useState(kandangOptions[0]);
  const [supplier, setSupplier] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [harga, setHarga] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      tanggalInput: "20 Maret 2025",
      kandang: selectedKandang.name,
      kapasitas: selectedKandang.kapasitas,
      supplier,
      jumlah,
      harga,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Input Draft Pemesanan DOC</h2>

      <div className="bg-white p-6 rounded border">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-600">Tanggal Input</label>
            <p className="font-semibold mt-1">{getTodayDateInBahasa()}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block mb-2">Kandang</label>
              <select
                className="w-full border rounded px-4 py-2"
                value={selectedKandang.id}
                onChange={(e) =>
                  setSelectedKandang(
                    kandangOptions.find(
                      (k) => k.id === parseInt(e.target.value)
                    )
                  )
                }
              >
                {kandangOptions.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/2 text-left flex flex-col justify-center">
              <p className=" text-gray-600 mb-2">Kapasitas Maksimum Kandang</p>
              <p className="font-bold">{selectedKandang.kapasitas} ekor</p>
            </div>
          </div>

          <div>
            <label className="block mb-1">Supplier DOC</label>
            <select
              className="w-full border rounded px-4 py-2 bg-gray-100"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            >
              <option value="">Pilih nama suplier</option>
              {supplierOptions.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Jumlah */}
          <div>
            <label className="block mb-1">Jumlah Pemesanan</label>
            <input
              type="number"
              placeholder="Masukkan jumlah barang..."
              className="w-full border rounded px-4 py-2"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />
          </div>

          {/* Harga */}
          <div>
            <label className="block mb-1">Harga</label>
            <select
              className="w-full border rounded px-4 py-2 bg-gray-100"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            >
              <option value="">Pilih barang...</option>
              {hargaOptions.map((h) => (
                <option key={h.id} value={h.label}>
                  {h.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-900 cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputDraftPemesananDoc;
