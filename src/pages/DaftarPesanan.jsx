import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { useState } from "react";
import { getListStoreSale } from "../services/stores";

const DaftarPesanan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailPages = ["input-data-pesanan"];

  const [dataAntrianPesanan, setDataAntrianPesanan] = useState([]);

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const editDataPesananHandle = (id) => {
    const currentPath = location.pathname;
    const inputPath = currentPath + "/input-data-pesanan/" + id;

    navigate(inputPath);
  };

  const fetchDataAntrianPesanan = async () => {
    try {
      const response = await getListStoreSale();
      console.log("response List: ", response);
      console.log("(response.data.data): ", response.data.data.storeSales);
      if (response.status == 200) {
        setDataAntrianPesanan(response.data.data.storeSales);
      }
    } catch (error) {
      alert("Gagal memuat data antrian pesanan: ", error);
    }
  };

  useState(() => {
    fetchDataAntrianPesanan();
  }, []);

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Daftar Pesanan</h1>
            <div className="text-base flex gap-2">
              <p>{`Hari ini (${getTodayDateInBahasa()})`}</p>
            </div>
          </div>

          {/* detail penjualan */}
          <div className=" flex gap-4 ">
            <div className=" w-full bg-white px-8 py-6 rounded-lg border border-black-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-700 text-white text-center">
                    <th className="py-2 px-4">Nama Barang</th>
                    <th className="py-2 px-4">QTY</th>
                    <th className="py-2 px-4">Pelanggan</th>
                    <th className="py-2 px-4">Pembayaran</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Pengiriman</th>
                    <th className="py-2 px-4"></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {dataAntrianPesanan.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{item.warehouseItem.name}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">{item.customer}</td>
                      <td className="py-2 px-8">
                        <div
                          className={`px-3 py-1 rounded-[4px] ${
                            item.paymentType == "Penuh"
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-orange-200 text-orange-900"
                          }`}
                        >
                          {item.paymentType}
                        </div>
                      </td>

                      <td className="py-2 px-8">
                        <div
                          className={`px-3 py-1 rounded-[4px] ${
                            item.paymentStatus == "Lunas"
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-orange-200 text-orange-900"
                          }`}
                        >
                          {item.paymentStatus}
                        </div>
                      </td>

                      <td className="py-2 px-8">
                        <div
                          className={`px-3 py-1 rounded-[4px] ${
                            item.isSend == true
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-kritis-box-surface-color text-kritis-text-color"
                          }`}
                        >
                          {item.isSend ? "Terkirim" : "Belum Terkirim"}
                        </div>
                      </td>

                      <td className="py-2 px-4">
                        <button
                          onClick={() => {
                            editDataPesananHandle(item.id);
                          }}
                          className="px-3 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer"
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
        </div>
      )}
    </>
  );
};

export default DaftarPesanan;
