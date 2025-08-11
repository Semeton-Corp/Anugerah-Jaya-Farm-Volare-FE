import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAfkirCustomers } from "../services/chickenMonitorings";
import { useEffect } from "react";
import { useState } from "react";

const PilihPembeliAyam = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [customerList, setCustomerList] = useState([]);

  const detailPages = ["tambah-pelanggan-ayam", "detail-pelanggan-afkir"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const fetchCustomerData = async () => {
    try {
      const customerResponse = await getAfkirCustomers();
      console.log("customerResponse: ", customerResponse);
      if (customerResponse.status == 200) {
        setCustomerList(customerResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleTambahPelanggan = () => {
    navigate(`${location.pathname}/tambah-pelanggan-ayam`);
  };

  const handleDetailPelanggan = (id) => {
    navigate(`${location.pathname}/detail-pelanggan-afkir/${id}`);
  };

  const handlePilih = (pelanggan) => {
    alert(`Pilih: ${pelanggan.name}`);
  };

  useEffect(() => {
    fetchCustomerData();
    if (location?.state?.refetch) {
      fetchCustomerData();
      window.history.replace({}, document.title);
    }
  }, [location]);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pilih Pembeli Ayam</h2>
      <div className="bg-white rounded border p-4">
        <div className="flex justify-end mb-2">
          <button
            onClick={handleTambahPelanggan}
            className="bg-orange-300  px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
          >
            + Pelanggan Baru
          </button>
        </div>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-700 text-white text-left">
              <th className="px-4 py-2">Nama Pelanggan</th>
              <th className="px-4 py-2">Nomor Telepon</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2">Harga Ayam Terakhir (Ekor)</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p?.name}</td>
                <td className="px-4 py-2">{p?.phoneNumber}</td>
                <td className="px-4 py-2">{p?.address}</td>
                <td className="px-4 py-2">{p?.latestPrice}</td>

                <td className="px-4 py-2">
                  {mode === "pilih" && (
                    <button
                      onClick={() => handlePilih(p)}
                      className="bg-orange-300 px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
                    >
                      Pilih
                    </button>
                  )}
                  {mode === "detail" && (
                    <button
                      onClick={() => {
                        handleDetailPelanggan(p?.id);
                      }}
                      className="bg-green-700 px-4 py-2 text-white rounded hover:bg-green-900 cursor-pointer"
                    >
                      Detail
                    </button>
                  )}
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
