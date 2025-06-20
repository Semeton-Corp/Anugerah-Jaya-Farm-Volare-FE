import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DetailKandang = () => {
  const data = {
    idBatch: "06112025000001",
    kategoriAyam: "DOC",
    usiaAyam: "1 Minggu",
    jumlahAyam: "11000 Ekor",
    namaKandang: "Sidodadi DOC",
    lokasiKandang: "Sidodadi",
    jenisKandang: "Kandang Anakan",
    kapasitas: "11000 Ekor",
    picAyam: "Siti Rahayu",
    picTelur: "Budi Santoso",
  };

  const location = useLocation();
  const navigate = useNavigate();

  const detailPages = ["edit-pic"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const detailKandangHandle = () => {
    navigate(`${location.pathname}/edit-pic`);
  };

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Informasi Ayam */}
      <div className="border rounded p-4">
        <h2 className="text-lg font-bold mb-4">Informasi ayam dalam kandang</h2>
        <div className="grid grid-cols-2 gap-y-2">
          <div>
            <p className="text-sm text-gray-500">ID Batch</p>
            <p className="font-semibold">{data.idBatch}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Kategori ayam</p>
            <p className="font-bold">{data.kategoriAyam}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Usia ayam (Minggu)</p>
            <p className="font-bold">{data.usiaAyam}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jumlah ayam dalam kandang</p>
            <p className="font-bold">{data.jumlahAyam}</p>
          </div>
        </div>
      </div>

      {/* Detail Kandang */}
      <div className="border rounded p-4">
        <h2 className="text-lg font-bold mb-4">Detail Kandang</h2>
        <div className="grid grid-cols-2 gap-y-2">
          <div>
            <p className="text-sm text-gray-500">Nama Kandang</p>
            <p className="font-bold">{data.namaKandang}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jenis Kandang</p>
            <p className="font-bold">{data.jenisKandang}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lokasi Kandang</p>
            <p className="font-bold">{data.lokasiKandang}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Kapasitas Maksimum</p>
            <p className="font-bold">{data.kapasitas}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button className="bg-green-700 hover:bg-green-900 hover:cursor-pointer text-white px-4 py-2 rounded">
            Edit Kandang
          </button>
          <button className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded">
            Hapus Kandang
          </button>
        </div>
      </div>

      {/* PIC */}
      <div className="border rounded p-4">
        <h2 className="text-lg font-bold mb-4">PIC</h2>
        <div className="grid grid-cols-2 gap-y-2">
          <div>
            <p className="text-sm text-gray-500">PIC Ayam</p>
            <p className="font-bold">{data.picAyam}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">PIC Telur</p>
            <p className="font-bold">{data.picTelur}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={detailKandangHandle}
            className="bg-green-700 hover:bg-green-900 hover:cursor-pointer text-white px-4 py-2 rounded"
          >
            Edit PIC
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailKandang;
