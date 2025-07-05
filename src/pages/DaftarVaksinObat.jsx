import React from "react";

const vaksinData = [
  { nama: "Vaksin DOC", usia: "1 Minggu", kategori: "DOC" },
  { nama: "Vaksin Grower", usia: "4 Minggu", kategori: "Grower" },
  { nama: "Vaksin Layer", usia: "12 Minggu", kategori: "Layer" },
];

export default function DaftarVaksinObat() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Daftar Vaksin & Obat</h2>

      <div className="border rounded-lg p-6">
        <div className="flex justify-end mb-6">
          <button className="bg-orange-300 hover:bg-orange-500  px-5 py-2 rounded text-black cursor-pointer">
            + Tambah Vaksin
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-6 py-2">Nama Vaksin</th>
              <th className="px-6 py-2">Usia Ayam</th>
              <th className="px-6 py-2">Kategori Ayam</th>
              <th className="px-6 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {vaksinData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                <td className="px-4 py-2">{item.nama}</td>
                <td className="px-4 py-2">{item.usia}</td>
                <td className="px-4 py-2">{item.kategori}</td>
                <td className="px-4 py-2">
                  <button className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded text-sm cursor-pointer">
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
