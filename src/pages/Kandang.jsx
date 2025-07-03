import React from "react";
import { FaWarehouse } from "react-icons/fa";

const Kandang = () => {
  const userRole = localStorage.getItem("role");
  const data = [
    {
      kandang: "Sidodadi DOC",
      idAyam: "0611202500001",
      kategori: "DOC",
      usia: 1,
      kapasitas: 11000,
      pic: "Siti Rahayu",
    },
    {
      kandang: "Sidodadi Grower",
      idAyam: "0610202500001",
      kategori: "Grower",
      usia: 10,
      kapasitas: 11000,
      pic: "Siti Rahayu",
    },
    {
      kandang: "Sidodadi 01",
      idAyam: "0609202500001",
      kategori: "Pre Layer",
      usia: 16,
      kapasitas: 4000,
      pic: "Yono",
    },
    {
      kandang: "Sidodadi 02",
      idAyam: "0608202500001",
      kategori: "Layer",
      usia: 19,
      kapasitas: 4000,
      pic: "Yono",
    },
    {
      kandang: "Sidodadi 03",
      idAyam: "0607202500001",
      kategori: "Afkir",
      usia: 30,
      kapasitas: 4000,
      pic: "Abdi",
    },
  ];

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Kandang</h2>
        <button className="flex items-center gap-2 bg-orange-300 text-black text-sm px-4 py-2 rounded hover:bg-orange-500 transition cursor-pointer">
          <FaWarehouse />
          Sidodadi
        </button>
      </div>

      <div className="p-6 border bg-white rounded-[4px]">
        <div className="overflow-x-auto bg-white  rounded">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="py-2 px-4">Kandang</th>
                <th className="py-2 px-4">ID Batch</th>
                {userRole !== "Pekerja Telur" && (
                  <>
                    <th className="py-2 px-4">Kategori</th>
                    <th className="py-2 px-4">Usia (minggu)</th>
                    <th className="py-2 px-4">Kapasitas Maksimum (Ekor)</th>
                  </>
                )}
                <th className="py-2 px-4">PIC</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{row.kandang}</td>
                  <td className="py-2 px-4">{row.idAyam}</td>
                  {userRole !== "Pekerja Telur" && (
                    <>
                      <td className="py-2 px-4">{row.kategori}</td>
                      <td className="py-2 px-4">{row.usia}</td>
                      <td className="py-2 px-4">{row.kapasitas}</td>
                    </>
                  )}
                  <td className="py-2 px-4">{row.pic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Kandang;
