import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getItemPrices, getItemPricesDiscount } from "../services/item";

const DaftarHargaTelur = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [hargaList, setHargaList] = useState([]);
  const [diskonList, setDiskonList] = useState([]);

  const detailPages = ["tambah-kategori-harga", "tambah-diskon"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const tambahKategoriHargaHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/tambah-kategori-harga";

    navigate(detailPath);
  };

  const editKategoriHargaHandle = (id) => {
    const currentPath = location.pathname;
    const detailPath = currentPath + `/tambah-kategori-harga/${id}`;

    navigate(detailPath);
  };

  const tambahDiskonHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/tambah-diskon";

    navigate(detailPath);
  };

  const editDiskonHandle = (id) => {
    const currentPath = location.pathname;
    const detailPath = currentPath + `/tambah-diskon/${id}`;

    navigate(detailPath);
  };

  const fetchHargaTelur = async () => {
    try {
      const hargaResponse = await getItemPrices();
      console.log("hargaResponse: ", hargaResponse);

      if (hargaResponse.status == 200) {
        setHargaList(hargaResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
    // TODO: send payload to API
  };

  const fetchDiskon = async () => {
    try {
      const discountResponse = await getItemPricesDiscount();
      console.log("discountResponse: ", discountResponse);

      if (discountResponse.status == 200) {
        setDiskonList(discountResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchHargaTelur();
    fetchDiskon();

    if (location.state?.refetch) {
      fetchHargaTelur();
      fetchDiskon();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold">Daftar Harga Telur</h1>

      {/* Harga Telur */}
      <div className="bg-white border shadow rounded p-6">
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold text-lg">Harga Telur</h2>
          <button
            onClick={tambahKategoriHargaHandle}
            className="bg-orange-300 px-4 py-1 rounded hover:bg-orange-500 cursor-pointer "
          >
            + Tambah Kategori Harga
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-700 text-white rounded">
              <th className="px-3 py-2">Kategori Harga</th>
              <th className="px-3 py-2">Barang</th>
              <th className="px-3 py-2">Satuan</th>
              <th className="px-3 py-2">Harga</th>
              <th className="px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {hargaList.map((row, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-3 py-2">{row.category}</td>
                <td className="px-3 py-2">{row.item.name}</td>
                <td className="px-3 py-2">{row.saleUnit}</td>
                <td className="px-3 py-2">{`Rp ${row.price}`}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => {
                      editKategoriHargaHandle(row.id);
                    }}
                    className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  >
                    Edit Harga
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Diskon */}
      <div className="bg-white border shadow rounded p-6">
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold text-lg">Diskon</h2>
          <button
            onClick={tambahDiskonHandle}
            className="bg-orange-300  px-4 py-1 rounded hover:bg-orange-500 cursor-pointer"
          >
            + Tambah Diskon
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-3 py-2">Nama Diskon</th>
              <th className="px-3 py-2">Minimum Transaksi User</th>
              <th className="px-3 py-2">Besar Diskon</th>
              <th className="px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {diskonList.map((row, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-3 py-2">{row.name}</td>
                <td className="px-3 py-2">{`${row.minimumTransactionUser} Kali`}</td>
                <td className="px-3 py-2">{`${row.totalDiscount} %`}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => {
                      editDiskonHandle(row.id);
                    }}
                    className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit Diskon
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

export default DaftarHargaTelur;
