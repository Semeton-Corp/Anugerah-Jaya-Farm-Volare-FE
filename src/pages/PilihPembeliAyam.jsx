import React from "react";

const PilihPembeliAyam = () => {
  const pelangganList = [
    {
      id: 1,
      name: "Pelanggan 01",
      tanggalJual: "10 Mar 2025",
      usiaAyam: 49,
      jumlahAyam: 4000,
      hargaTerakhir: 15000,
    },
    {
      id: 2,
      name: "Pelanggan 02",
      tanggalJual: "10 Mar 2025",
      usiaAyam: 49,
      jumlahAyam: 1200,
      hargaTerakhir: 15000,
    },
    {
      id: 3,
      name: "Pelanggan 03",
      tanggalJual: "10 Mar 2025",
      usiaAyam: 49,
      jumlahAyam: 1200,
      hargaTerakhir: 15000,
    },
  ];

  const handlePilih = (pelanggan) => {
    alert(`Pilih: ${pelanggan.name}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pilih Pembeli Ayam</h2>
      <div className="bg-white rounded border p-4">
        <div className="flex justify-end mb-2">
          <button className="bg-orange-300  px-4 py-2 rounded hover:bg-orange-500 cursor-pointer">
            + Pelanggan Baru
          </button>
        </div>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-700 text-white text-left">
              <th className="px-4 py-2">Nama Pelanggan</th>
              <th className="px-4 py-2">Tanggal Jual</th>
              <th className="px-4 py-2">Usia ayam (minggu)</th>
              <th className="px-4 py-2">Jumlah Ayam</th>
              <th className="px-4 py-2">Harga Ayam Terakhir (Ekor)</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pelangganList.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.tanggalJual}</td>
                <td className="px-4 py-2">{p.usiaAyam}</td>
                <td className="px-4 py-2">{p.jumlahAyam}</td>
                <td className="px-4 py-2">
                  Rp {p.hargaTerakhir.toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handlePilih(p)}
                    className="bg-orange-300 px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
                  >
                    Pilih
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PilihPembeliAyam;
