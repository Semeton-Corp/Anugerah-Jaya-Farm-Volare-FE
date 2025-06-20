import React, { useState } from "react";

const TambahKandang = () => {
  const [form, setForm] = useState({
    namaKandang: "",
    lokasiKandang: "",
    jenisKandang: "",
    kapasitas: "",
  });

  const lokasiOptions = ["Site A", "Site B", "Site C"];
  const jenisOptions = ["DOC", "Grower", "Pre Layer", "Layer", "Afkir"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data disimpan:", form);
    // Submit logic goes here
  };

  return (
    <div className="mx-auto m-8 p-8 border rounded rounderd-[4px] shadow bg-white">
      <h2 className="text-xl font-bold mb-6">Tambah Kandang</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama Kandang</label>
          <input
            type="text"
            name="namaKandang"
            value={form.namaKandang}
            onChange={handleChange}
            placeholder="Tuliskan nama kandang"
            className="w-full border rounded px-4 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Lokasi Kandang</label>
          <select
            name="lokasiKandang"
            value={form.lokasiKandang}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-gray-100"
          >
            <option value="">Pilih site lokasi kandang</option>
            {lokasiOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Jenis Kandang</label>
          <select
            name="jenisKandang"
            value={form.jenisKandang}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-gray-100"
          >
            <option value="">Pilih jenis kandang</option>
            {jenisOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Kapasitas Maksimum Kandang (Ekor)
          </label>
          <input
            type="number"
            name="kapasitas"
            value={form.kapasitas}
            onChange={handleChange}
            placeholder="Masukkan jumlah kapasitas maksimum kandang"
            className="w-full border rounded px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-900 hover:cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahKandang;
