import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TambahToko = () => {
  const navigate = useNavigate();

  const [namaToko, setNamaToko] = useState("");
  const [lokasi, setLokasi] = useState("");

  // Dummy list lokasi
  const lokasiOptions = ["Sidodadi", "Sukamaju", "Sukadana"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      namaToko,
      lokasi,
    };

    console.log("Data disimpan:", payload);

    // TODO: fetch/axios ke backend jika sudah ada API

    // Redirect / feedback
    navigate("/toko");
  };

  return (
    <div className="p-6">
      <div className="border rounded p-6 mx-auto">
        <h1 className="text-xl font-bold mb-6">Tambah Toko</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nama toko */}
          <div>
            <label className="block mb-1 font-medium">Nama Toko</label>
            <input
              type="text"
              value={namaToko}
              onChange={(e) => setNamaToko(e.target.value)}
              placeholder="Tuliskan nama kandang"
              className="w-full p-2 border rounded bg-gray-100"
              required
            />
          </div>

          {/* Lokasi toko */}
          <div>
            <label className="block mb-1 font-medium">Lokasi Toko</label>
            <select
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100"
              required
            >
              <option value="" disabled>
                Pilih site lokasi kandang
              </option>
              {lokasiOptions.map((lokasi, index) => (
                <option key={index} value={lokasi}>
                  {lokasi}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahToko;
