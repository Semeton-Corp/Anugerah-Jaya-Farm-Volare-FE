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
import { useEffect } from "react";
import { updateStoreSale } from "../services/stores";
import { formatDateToDDMMYYYY } from "../utils/dateFormat";

// const dataAntrianPesanan = [
//   {
//     nomorAntrian: "1",
//     tanggalKirim: "22 Maret 2025",
//     namaBarang: "Telur OK",
//     kuantitas: "12 Ikat",
//     pengirim: "Toko A",
//     customer: "Pak Tono",
//   },
//   {
//     nomorAntrian: "2",
//     tanggalKirim: "22 Maret 2025",
//     namaBarang: "Telur retak",
//     kuantitas: "12 Karpet",
//     pengirim: "Toko B",
//     customer: "Pak Adi",
//   },
//   {
//     nomorAntrian: "3",
//     tanggalKirim: "22 Maret 2025",
//     namaBarang: "Telur pecah",
//     kuantitas: "10 Karpet",
//     pengirim: "Gudang A1",
//     customer: "Pak Yono",
//   },
// ];

const AntrianPesanan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailPages = ["input-data-pesanan"];

  const [dataAntrianPesanan, setDataAntrianPesanan] = useState([]);

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const inputDataPesananHandle = () => {
    const currentPath = location.pathname;
    const inputPath = currentPath + "/input-data-pesanan";

    navigate(inputPath);
  };

  const editDataPesananHandle = (id) => {
    const currentPath = location.pathname;
    const inputPath = currentPath + "/input-data-pesanan/" + id;

    navigate(inputPath);
  };

  const fetchDataAntrianPesanan = async () => {
    try {
      const response = await getListStoreSale();
      console.log("response: ", response);
      console.log("response.data.data: ", response.data.data);
      if (response.status == 200) {
        setDataAntrianPesanan(response.data.data.storeSales);
        console.log("dataAntrianpesanan: ", response.data.data);
      }
    } catch (error) {
      alert("Gagal memuat data antrian pesanan: ", error);
    }
  };

  const sendHandle = async (id, item) => {
    const payload = {
      customer: item.customer,
      phone: item.phone.toString(),
      warehouseItemId: item.selectedItem,
      saleUnit: item.unit,
      storeId: item.store.id,
      isSend: true,
      quantity: item.quantity,
      sendDate: formatDateToDDMMYYYY(item.sentDate),
      paymentType: item.paymentType,
      storeSalePayment: item.storeSalePayment,
      price: item.price,
    };

    try {
      const response = await updateStoreSale(id, payload);
      console.log("response send: ", response);
    } catch (error) {
      console.log("send error: ", error);
    }
  };

  useState(() => {
    fetchDataAntrianPesanan();
  }, []);

  useEffect(() => {
    fetchDataAntrianPesanan();

    if (location.state?.refetch) {
      fetchDataAntrianPesanan();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Kasir</h1>
            <div className="text-base flex gap-2">
              <p>{`Hari ini (${getTodayDateInBahasa()})`}</p>
            </div>
          </div>

          {/* Telur  ok, retak, pecah, reject*/}
          <div className="flex md:grid-cols-2 gap-4 justify-between">
            {/* telur OK */}
            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur OK</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <MdEgg size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                {/* item ikat */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">50</p>
                  <p className="text-xl text-center">Ikat</p>
                </div>
                {/* item karpet */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">100</p>
                  <p className="text-xl text-center">Karpet</p>
                </div>
                {/* item butir */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">1000</p>
                  <p className="text-xl text-center">Butir</p>
                </div>
              </div>
            </div>

            {/* telur Retak */}
            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur Retak</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <TbEggCrackedFilled size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                {/* item butir */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">30</p>
                  <p className="text-xl text-center">Butir</p>
                </div>
              </div>
            </div>
            {/* penjualan telur */}
            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur Pecah</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <TbEggCrackedFilled size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                {/* item butir */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">80</p>
                  <p className="text-xl text-center">Butir</p>
                </div>
              </div>
            </div>
          </div>

          {/* chart, incomes, and history section */}

          {/* detail penjualan */}
          <div className=" flex gap-4 ">
            <div className=" w-full bg-white px-8 py-6 rounded-lg border border-black-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">Antrian Pesanan</h2>
                <button
                  onClick={inputDataPesananHandle}
                  className="px-5 py-3 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer font-medium"
                >
                  + Input Data Pesanan
                </button>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-700 text-white text-center">
                    <th className="py-2 px-4">Antiran</th>
                    <th className="py-2 px-4">Tanggal Kirim</th>
                    <th className="py-2 px-4">Nama Barang</th>
                    <th className="py-2 px-4">Kuantitas</th>
                    <th className="py-2 px-4">Pengirim</th>
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Aksi</th>
                    <th className="py-2 px-4"></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {dataAntrianPesanan.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">
                        <div className="flex justify-center">
                          <p>#</p>
                          <p>{index + 1}</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">{item.sentDate}</td>
                      <td className="py-2 px-4">{item.warehouseItem.name}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">{item.store.name}</td>
                      <td className="py-2 px-4">{item.customer}</td>
                      <td className="py-2 px-4">
                        {item.isSend ? (
                          <></>
                        ) : (
                          <button
                            onClick={() => {
                              sendHandle(item.id, item);
                            }}
                            className="px-3 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer"
                          >
                            Kirim Telur
                          </button>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        <p
                          onClick={() => editDataPesananHandle(item.id)}
                          className="underline font-medium hover:text-black-6 cursor-pointer"
                        >
                          Detail
                        </p>
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

export default AntrianPesanan;
