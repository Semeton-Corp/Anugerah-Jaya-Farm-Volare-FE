import React from "react";
import { MdStore } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DaftarKandang = () => {
  const kandangData = [
    {
      kandang: "Sidodadi DOC",
      idBatch: "06112025000001",
      kategori: "DOC",
      usia: "1",
      kapasitas: "11000",
      picAyam: "Siti Rahayu",
      picTelur: "Siti Rahayu",
    },
    {
      kandang: "Sidodadi Grower",
      idBatch: "06102025000001",
      kategori: "Grower",
      usia: "10",
      kapasitas: "11000",
      picAyam: "Siti Rahayu",
      picTelur: "Siti Rahayu",
    },
    {
      kandang: "Sidodadi 01",
      idBatch: "06092025000001",
      kategori: "Pre Layer",
      usia: "16",
      kapasitas: "4000",
      picAyam: "Yono",
      picTelur: "Yono",
    },
    {
      kandang: "Sidodadi 02",
      idBatch: "06082025000001",
      kategori: "Layer",
      usia: "19",
      kapasitas: "4000",
      picAyam: "Yono",
      picTelur: "Yono",
    },
    {
      kandang: "Sidodadi 03",
      idBatch: "06072025000001",
      kategori: "Afkir",
      usia: "30",
      kapasitas: "4000",
      picAyam: "Abdi",
      picTelur: "Abdi",
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const detailPages = ["tambah-kandang", "detail-kandang"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const tambahKandangHandle = () => {
    navigate(`${location.pathname}/tambah-kandang`);
  };

  const detailKandangHandle = () => {
    navigate(`${location.pathname}/detail-kandang`);
  };

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kandang</h1>
        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <MdStore size={18} />
          <div className="text-base font-medium ms-2">Semua Toko</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-end mb-4 space-x-2">
          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <div className="text-base font-medium ms-2">Pindah Ayam</div>
          </div>
          <div
            onClick={tambahKandangHandle}
            className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
          >
            <div className="text-base font-medium ms-2">+ Tambah Kandang</div>
          </div>
        </div>

        <table className="min-w-full table-auto border-gray-200">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Kandang</th>
              <th className="px-4 py-2 text-left">ID Batch</th>
              <th className="px-4 py-2 text-left">Kategori</th>
              <th className="px-4 py-2 text-left">Usia (minggu)</th>
              <th className="px-4 py-2 text-left">Kapasitas Maksimum (Ekor)</th>
              <th className="px-4 py-2 text-left">PIC Ayam</th>
              <th className="px-4 py-2 text-left">PIC Telur</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kandangData.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{row.kandang}</td>
                <td className="px-4 py-2">{row.idBatch}</td>
                <td className="px-4 py-2">{row.kategori}</td>
                <td className="px-4 py-2">{row.usia}</td>
                <td className="px-4 py-2">{row.kapasitas}</td>
                <td className="px-4 py-2">{row.picAyam}</td>
                <td className="px-4 py-2">{row.picTelur}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={detailKandangHandle}
                    className="bg-green-700 hover:bg-green-900 hover:cursor-pointer text-white px-3 py-1 rounded"
                  >
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
};

export default DaftarKandang;
