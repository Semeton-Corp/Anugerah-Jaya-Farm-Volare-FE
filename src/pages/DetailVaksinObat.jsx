import { AlertTriangle } from "lucide-react";
import React from "react";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const DetailVaksinObat = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const detailPages = ["input-vaksin-&-obat"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const inputHandle = () => {
    navigate(`${location.pathname}/input-vaksin-&-obat`);
  };

  const fetchDetailVaksinObat = async () => {
    try {
    } catch (error) {
      console.log("error :", error);
    }
  };
  const [data, setData] = useState([
    {
      tanggal: "20 Mar 2025",
      kategori: "DOC",
      usia: 49,
      jenis: "Vaksin Rutin",
      nama: "Vaksin DOC",
      dosis: "5ml",
      penyakit: "-",
    },
    {
      tanggal: "20 Mar 2025",
      kategori: "Grower",
      usia: 49,
      jenis: "Obat",
      nama: "Obat A",
      dosis: "5ml",
      penyakit: "Penyakit B",
    },
    {
      tanggal: "20 Mar 2025",
      kategori: "Pre Layer",
      usia: 49,
      jenis: "Vaksin Kondisional",
      nama: "Vaksin AB",
      dosis: "5ml",
      penyakit: "-",
    },
    {
      tanggal: "20 Mar 2025",
      kategori: "Layer",
      usia: 49,
      jenis: "Vaksin Rutin",
      nama: "Vaksin B",
      dosis: "5ml",
      penyakit: "-",
    },
    {
      tanggal: "20 Mar 2025",
      kategori: "Afkir",
      usia: 49,
      jenis: "Vaksin Rutin",
      nama: "Vaksin C",
      dosis: "5ml",
      penyakit: "-",
    },
  ]);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Informasi Ayam */}
      <div className="border border-black-6 rounded p-4 bg-white">
        <h2 className="text-xl font-bold mb-4">Informasi ayam saat ini</h2>
        <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
          <div>
            <p className="text-gray-600">ID Ayam</p>
            <p className="font-bold">0611202500001</p>
          </div>
          <div>
            <p className="text-gray-600">Usia ayam (Minggu)</p>
            <p className="font-bold">1</p>
          </div>
          <div>
            <p className="text-gray-600">Kategori ayam</p>
            <p className="font-bold">DOC</p>
          </div>
          <div>
            <p className="text-gray-600">Lokasi Kandang</p>
            <p className="font-bold">Sidodadi DOC</p>
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-800 flex items-center rounded">
        <AlertTriangle className="w-5 h-5 mr-2" />
        <span>
          Lakukan vaksin DOC, umur ayam sudah mencapai ketentuan vaksin
        </span>
      </div>

      {/* Riwayat Vaksin & Obat */}
      <div className="bg-white border border-black-6 rounded">
        <div className="flex justify-between items-center px-6 pt-6">
          <h3 className="text-xl font-bold">Riwayat Vaksin & Obat</h3>
          <button
            onClick={inputHandle}
            className="bg-orange-400 hover:bg-orange-500 text-black text-sm font-semibold py-2 px-4 rounded cursor-pointer"
          >
            + Input Data Vaksin/obat
          </button>
        </div>
        <div className="overflow-x-auto px-6 py-4">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="py-2 px-4">Tanggal</th>
                <th className="py-2 px-4">Kategori ayam</th>
                <th className="py-2 px-4">Usia (minggu)</th>
                <th className="py-2 px-4">Jenis</th>
                <th className="py-2 px-4">Nama Vaksin / Obat</th>
                <th className="py-2 px-4">Dosis</th>
                <th className="py-2 px-4">Penyakit</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-black-3 transition-all"
                >
                  <td className="py-2 px-4">{row.tanggal}</td>
                  <td className="py-2 px-4">{row.kategori}</td>
                  <td className="py-2 px-4">{row.usia}</td>
                  <td className="py-2 px-4">{row.jenis}</td>
                  <td className="py-2 px-4">{row.nama}</td>
                  <td className="py-2 px-4">{row.dosis}</td>
                  <td className="py-2 px-4">{row.penyakit}</td>
                  <td className="py-2 px-4 flex items-center space-x-2">
                    <button>
                      <MdEdit
                        size={18}
                        className="text-gray-700 hover:text-black"
                      />
                    </button>
                    <button>
                      <MdDelete
                        size={18}
                        className="text-red-500 hover:text-red-700"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Pagination Dummy */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <p>Menampilkan 1–5 dari 10 riwayat</p>
            <div className="space-x-2">
              <button
                disabled
                className="bg-gray-200 text-gray-400 px-4 py-3 rounded cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <button className="bg-green-700 text-white px-4 py-3 rounded hover:bg-green-900 cursor-pointer">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailVaksinObat;
