import React, { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";
import { getAfkirChickenSales } from "../services/chickenMonitorings";
import { useEffect } from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "Belum Lunas":
      return "bg-orange-200 text-orange-900";
    case "Belum Dibayar":
      return "bg-[#FF5E5E] text-[#640404]";
    case "Lunas":
      return "bg-[#87FF8B] text-[#066000]";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

const JualAyamAfkir = () => {
  const navigate = useNavigate();

  const [salesData, setSalesData] = useState([]);
  const [status, setStatus] = useState("Semua Status Pembayaran");
  const options = [
    "Semua Status Pembayaran",
    "Belum Dibayar",
    "Dibayar Setengah",
    "Lunas",
  ];

  const detailPages = [
    "draft-penjualan-ayam",
    "daftar-pelanggan-ayam",
    "detail-penjualan-ayam",
  ];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );
  const [showBarangsampaiModal, setShowBarangSampaiModal] = useState(false);

  const draftPenjualanAyamHandle = () => {
    navigate(`${location.pathname}/draft-penjualan-ayam`);
  };

  const draftPelangganAyamHandle = () => {
    navigate(`${location.pathname}/daftar-pelanggan-ayam`);
  };

  const fetchSalesData = async () => {
    try {
      const saleResponse = await getAfkirChickenSales();
      console.log("saleResponse: ", saleResponse);
      if (saleResponse.status == 200) {
        setSalesData(saleResponse.data.data.afkirChickenSales);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-bold mb-6">Jual Ayam Afkir</h2>
        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <FaMoneyBillWave size={18} />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="ml-2 bg-transparent text-base font-medium outline-none"
          >
            {options.map((opt) => (
              <option key={opt} value={opt} className="text-black">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow border">
        <div className="flex justify-end items-center mb-3">
          <div className="flex gap-2">
            <button
              onClick={draftPelangganAyamHandle}
              className="bg-orange-300 hover:bg-orange-500 cursor-pointer px-3 py-2 rounded text-sm font-medium"
            >
              Daftar Pelanggan Ayam
            </button>
            <button
              onClick={draftPenjualanAyamHandle}
              className="bg-orange-300 hover:bg-orange-500 cursor-pointer px-3 py-2 rounded text-sm font-medium"
            >
              Draft Penjualan Ayam
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3">Tanggal Jual</th>
                <th className="p-3">Pelanggan</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Status Pembayaran</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{item.sellDate}</td>
                  <td className="p-3">{item.afkirChickenCustomer.name}</td>
                  <td className="p-3">{`${item.totalSellChicken} Ekor`}</td>
                  <td className="p-3">
                    <span
                      className={`text-sm px-3 py-1 rounded font-medium ${getStatusColor(
                        item.paymentStatus
                      )}`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        navigate(`detail-penjualan-ayam/${item.id}`)
                      }
                      className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-3 py-1 rounded text-sm"
                    >
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <p>Menampilkan 1–10 dari 1000 riwayat</p>
          <div className="flex gap-2">
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
              Previous
            </button>
            <button className="bg-green-800 hover:bg-green-900 text-white px-3 py-1 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JualAyamAfkir;
