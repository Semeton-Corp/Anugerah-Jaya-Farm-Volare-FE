import React from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getStores } from "../services/stores";
import { useEffect } from "react";

const DaftarToko = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dummyToko = [
    { id: 1, nama: "Toko A", lokasi: "Sidodadi", jumlahPekerja: 4 },
    { id: 2, nama: "Toko B", lokasi: "Sukamaju", jumlahPekerja: 6 },
  ];

  const [stores, setStores] = useState([]);

  const detailPages = ["tambah-toko", "detail-toko"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const handleLihatDetail = (id, locationId) => {
    navigate(`${location.pathname}/detail-toko/${id}/${locationId}`);
  };

  const handleTambahToko = (id) => {
    navigate(`${location.pathname}/tambah-toko`);
  };

  const fetchStores = async () => {
    try {
      const storeResponse = await getStores();
      // console.log("storeResponse: ", storeResponse);
      if (storeResponse.status === 200) {
        setStores(storeResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchStores();

    if (location?.state?.refetch) {
      fetchStores();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Toko</h1>

      <div className="border rounded p-4">
        <div className="flex justify-end mb-3">
          <button
            onClick={handleTambahToko}
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer  px-4 py-2 rounded font-medium"
          >
            + Tambah Toko
          </button>
        </div>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-4 py-2">Nama Toko</th>
              <th className="px-4 py-2">Lokasi</th>
              <th className="px-4 py-2">Jumlah Pekerja</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {stores?.map((toko) => (
              <tr key={toko.id} className="border-t">
                <td className="px-4 py-2">{toko?.name}</td>
                <td className="px-4 py-2">{toko?.location?.name}</td>
                <td className="px-4 py-2">{toko?.totalEmployee}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleLihatDetail(toko.id, toko.location.id)}
                    className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-3 py-1 rounded"
                  >
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          console.log("stores: ", stores);
        }}
      >
        CHECK
      </button>
    </div>
  );
};

export default DaftarToko;
