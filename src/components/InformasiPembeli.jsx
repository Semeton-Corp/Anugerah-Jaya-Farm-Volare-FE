import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const InformasiPembeli = ({ phone, setPhone, name, setName }) => {
  const [mode, setMode] = useState("registered");

  const handleSearch = () => {
    // Simulasi cari pelanggan
    if (phone === "081234567891") {
      setName("Pak Tono");
    } else {
      setName("-");
    }
  };

  return (
    <div className="border p-4 rounded">
      <div className="mb-3">
        <span className="font-semibold ">Informasi Pembeli</span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("registered")}
            className={`px-3 py-1 rounded border text-sm cursor-pointer ${
              mode === "registered"
                ? "bg-green-100 border-green-600"
                : "bg-white border-gray-300"
            }`}
          >
            Pelanggan terdaftar
          </button>
          <button
            onClick={() => {
              setMode("new");
              setPhone("");
              setName("");
            }}
            className={`px-3 py-1 rounded border text-sm cursor-pointer ${
              mode === "new"
                ? "bg-green-100 border-green-600"
                : "bg-white border-gray-300"
            }`}
          >
            Pelanggan baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div>
          <label className="block mb-1 text-sm">Nomor Telepon</label>
          {mode === "registered" ? (
            <div className="flex items-center border border-black rounded overflow-hidden w-full">
              <input
                type="number"
                placeholder="Masukkan nomor telepon"
                className="flex-grow px-3 py-2 outline-none bg-gray-100"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="px-3 h-full bg-gray-100 border-l border-black text-gray-600 hover:text-black"
              >
                <FaSearch />
              </button>
            </div>
          ) : (
            <input
              type="number"
              className="w-full border bg-gray-100 p-2 rounded"
              placeholder="Masukkan nomor telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm">Nama Pelanggan</label>
          {mode === "registered" ? (
            <p className="pt-2 text-black">{name || "-"}</p>
          ) : (
            <input
              type="text"
              className="w-full bg-gray-100 p-2 rounded border"
              placeholder="Masukkan nama pelanggan"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InformasiPembeli;
