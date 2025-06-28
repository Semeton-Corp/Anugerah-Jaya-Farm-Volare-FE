import React, { useState, useEffect } from "react";

const EditKandang = () => {
  // Dummy data
  const dummyData = {
    nama: "Sidodadi DOC",
    lokasi: "Sidodadi",
    jenis: "Kandang DOC",
    kapasitas: 11000,
  };

  const lokasiOptions = ["Sidodadi", "Mojopahit", "Gajah Mada"];
  const jenisOptions = ["Kandang DOC", "Kandang Petelur", "Kandang Pembesaran"];

  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    jenis: "",
    kapasitas: "",
  });

  // Simulasi pengambilan data dari API (sementara pakai dummy)
  useEffect(() => {
    // Replace with fetch API if needed
    setFormData(dummyData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data yang dikirim:", formData);
    // Simpan ke API di sini
  };

  return (
    <div className="p-8 border rounded-lg  mx-auto">
      <h2 className="text-xl font-bold mb-6">Edit Kandang</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama Kandang */}
        <div>
          <label className="block mb-1 font-medium">Nama Kandang</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-black-4 border-black-7"
          />
        </div>

        {/* Lokasi Kandang */}
        <div>
          <label className="block mb-1 font-medium">Lokasi Kandang</label>
          <select
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-black-4 border-black-7"
          >
            {lokasiOptions.map((lok, idx) => (
              <option key={idx} value={lok}>
                {lok}
              </option>
            ))}
          </select>
        </div>

        {/* Jenis Kandang */}
        <div>
          <label className="block mb-1 font-medium">Jenis Kandang</label>
          <select
            name="jenis"
            value={formData.jenis}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-black-4 border-black-7"
          >
            {jenisOptions.map((jenis, idx) => (
              <option key={idx} value={jenis}>
                {jenis}
              </option>
            ))}
          </select>
        </div>

        {/* Kapasitas */}
        <div>
          <label className="block mb-1 font-medium">
            Kapasitas Maksimum Kandang (Ekor)
          </label>
          <input
            type="number"
            name="kapasitas"
            value={formData.kapasitas}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-black-4 border-black-7"
          />
        </div>

        {/* Tombol */}
        <div className="text-right pt-2">
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditKandang;
