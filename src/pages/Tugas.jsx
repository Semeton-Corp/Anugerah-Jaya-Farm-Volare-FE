import React from "react";
import { FiCheck } from "react-icons/fi";

const tugasTambahanData = [
  {
    tanggal: "27 Maret 2025",
    tugas: "Dekorasi kandang untuk 17 Agustus",
    lokasi: "Kandang",
    slotPekerja: 3,
    status: "Belum diproses",
  },
  {
    tanggal: "25 Maret 2025",
    tugas: "Dekorasi toko untuk 17 Agustus",
    lokasi: "Toko",
    slotPekerja: 0,
    status: "Dalam Proses",
  },
  {
    tanggal: "19 Maret 2025",
    tugas: "Perbaikan pintu gudang",
    lokasi: "Gudang",
    slotPekerja: 0,
    status: "Selesai",
  },
];

const Tugas = () => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Belum diproses":
        return "bg-[#FF5E5E] text-[#640404]";
      case "Dalam Proses":
        return "bg-orange-200 text-krisis-text-color";
      case "Selesai":
        return "bg-[#87FF8B] text-[#066000]";
      default:
        return "";
    }
  };
  const tugasHariIni = {
    tambahan: {
      tugas: "Dekorasi toko untuk 17 Agustus",
      selesai: true,
    },
    rutin: [
      {
        tugas: "Bersihkan tempat pakan & minum – Beri makan 1",
        waktu: "07:00 - 10:00",
        selesai: true,
      },
      {
        tugas: "Pengadukan pakan untuk konsumsi esok hari",
        waktu: "10:00 - 11:30",
        selesai: true,
      },
      {
        tugas: "Pengedropan pakan ke tiap kandang",
        waktu: "11:30 - 12:00",
        selesai: false,
      },
      {
        tugas: "Bersihkan tempat pakan & minum – Beri makan 2",
        waktu: "13:30 - 15:00",
        selesai: false,
      },
      {
        tugas: "Selesaikan pencatatan performa ayam harian",
        waktu: "15:00 - 15:30",
        selesai: false,
      },
    ],
  };

  return (
    <div className="p-4">
      {/* header */}
      <div className="text-3xl font-bold mb-4">Tugas</div>

      {/* tugas tambahan  */}
      <div className="border p-4 border-black-6 rounded-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Tugas Tambahan</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white text-left">
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Tugas Tambahan</th>
              <th className="py-2 px-4">Lokasi</th>
              <th className="py-2 px-4">Slot Pekerja</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {tugasTambahanData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.tanggal}</td>
                <td className="py-2 px-4">{item.tugas}</td>
                <td className="py-2 px-4">{item.lokasi}</td>
                <td className="py-2 px-4">{item.slotPekerja}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="cursor-pointer bg-green-900 text-white text-sm font-semibold px-4 py-1 rounded hover:bg-green-700">
                    Ambil
                  </button>
                </td>
                <td>
                  <button className=" text-black text-sm underline font-medium cursor-pointer">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tugas hari ini */}
      <div className="border p-4 rounded-lg bg-white border-black-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Tugas hari ini</h2>

        {/* Tugas Tambahan */}
        <div className="pb-2 mb-4">
          <h3 className="text-md font-semibold mb-2">Tugas Tambahan</h3>
          <div className="bg-gray-100 px-4 py-3 border-1 rounded-md flex justify-between items-center">
            <p className="font-medium">{tugasHariIni.tambahan.tugas}</p>
            <button
              className={`w-8 h-8 rounded-md flex justify-center items-center cursor-pointer ${
                tugasHariIni.tambahan.selesai
                  ? "bg-[#87FF8B] text-black hover:bg-[#4d8e4f]"
                  : "bg-gray-200 hover:bg-gray-400"
              }`}
            >
              {tugasHariIni.tambahan.selesai && <FiCheck />}
            </button>
          </div>
        </div>

        {/* Tugas Rutin */}
        <div>
          <h3 className="text-md font-semibold mb-2">Tugas Rutin</h3>
          <div className="space-y-2">
            {tugasHariIni.rutin.map((item, i) => (
              <div
                key={i}
                className="border-1 bg-gray-100 px-4 py-3 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.tugas}</p>
                  <p className="text-sm text-gray-600">{item.waktu}</p>
                </div>
                <button
                  className={`w-8 h-8 rounded-md flex justify-center items-center cursor-pointer  ${
                    item.selesai
                      ? "bg-[#87FF8B] text-black hover:bg-[#4d8e4f]"
                      : "bg-gray-200 hover:bg-gray-400"
                  }`}
                >
                  {item.selesai && <FiCheck />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tugas;
