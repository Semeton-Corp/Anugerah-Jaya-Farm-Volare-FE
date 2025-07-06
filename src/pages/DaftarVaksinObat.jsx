import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getChickenHealthItems } from "../services/chickenMonitorings";

export default function DaftarVaksinObat() {
  const location = useLocation();
  const navigate = useNavigate();

  const detailPage = ["tambah-vaksin", "detail-vaksin-obat"];

  const isDetailPage = detailPage.some((segment) =>
    location.pathname.includes(segment)
  );

  const [vaksinData, setVaksinData] = useState([]);

  const tambahVaksinHandle = () => {
    navigate(`${location.pathname}/tambah-vaksin`);
  };

  const detailVaksinHandle = (id) => {
    navigate(`${location.pathname}/detail-vaksin-obat/${id}`);
  };

  const fetchVaksinData = async () => {
    try {
      const vaksinResponse = await getChickenHealthItems();
      console.log("vaksinResponse: ", vaksinResponse);
      if (vaksinResponse.status === 200) {
        setVaksinData(vaksinResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchVaksinData();

    if (location.state?.refetch) {
      fetchVaksinData();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Daftar Vaksin & Obat</h2>

      <div className="border rounded-lg p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={tambahVaksinHandle}
            className="bg-orange-300 hover:bg-orange-500  px-5 py-2 rounded text-black cursor-pointer"
          >
            + Tambah Vaksin
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-6 py-2">Nama Vaksin</th>
              <th className="px-6 py-2">Kategori Vaksin/Obat</th>
              <th className="px-6 py-2">Usia Ayam</th>
              <th className="px-6 py-2">Kategori Ayam</th>
              <th className="px-6 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {vaksinData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2">{item.chickenAge}</td>
                <td className="px-4 py-2">{item.chickenCategory}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      detailVaksinHandle(item.id);
                    }}
                    className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded text-sm cursor-pointer"
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
}
