import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

const dataAntrianPesanan = [
  {
    nomorAntrian: 1,
    tanggalKirim: "22 Maret 2025",
    namaBarang: "Telur OK",
    kuantitas: "12 ikat",
    customer: "Pak Tono",
    status: "pending",
  },
  {
    nomorAntrian: 2,
    tanggalKirim: "22 Maret 2025",
    namaBarang: "Telur retak",
    kuantitas: "12 Karpet",
    customer: "Pak Adi",
    status: "pending",
  },
  {
    nomorAntrian: 3,
    tanggalKirim: "22 Maret 2025",
    namaBarang: "Telur pecah",
    kuantitas: "10 Karpet",
    customer: "Pak Yono",
    status: "pending",
  },
];

const AntrianPesanan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailPages = ["input-data-pesanan"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const inputDataPesananHandle = () => {
    const currentPath = location.pathname;
    const inputPath = currentPath + "/input-data-pesanan";

    navigate(inputPath);
  };

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Produksi Telur</h1>
            <div className="flex gap-2">
              <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                <MdStore size={18} />
                <div className="text-base font-medium ms-2">Semua site</div>
              </div>
              <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                <PiCalendarBlank size={18} />
                <div className="text-base font-medium ms-2">
                  Hari ini (20 Mar 2025)
                </div>
              </div>
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
          <div className=" flex gap-4 h-65">
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
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Aksi</th>
                    <th className="py-2 px-4"></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {dataAntrianPesanan.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-4">
                        <div className="flex justify-center">
                          <p>#</p>
                          <p>{item.nomorAntrian}</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">{item.tanggalKirim}</td>
                      <td className="py-2 px-4">{item.namaBarang}</td>
                      <td className="py-2 px-4">{item.kuantitas}</td>
                      <td className="py-2 px-4">{item.customer}</td>
                      <td className="py-2 px-4">
                        <button className="px-3 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer">
                          Kirim Telur
                        </button>
                      </td>
                      <td className="py-2 px-4">
                        {" "}
                        <p className="underline font-bold hover:text-black-6 cursor-pointer">
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
