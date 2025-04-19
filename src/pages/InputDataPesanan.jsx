import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getTodayDateInBahasa } from "../utils/dateFormat";

const dataAntrianPesanan = [
  {
    nomorAntrian: "1",
    tanggalKirim: "22 Maret 2025",
    namaBarang: "Telur OK",
    kuantitas: "12 Ikat",
    pengirim: "Toko A",
    customer: "Pak Tono",
  },
  {
    nomorAntrian: "2",
    tanggalKirim: "22 Maret 2025",
    namaBarang: "Telur retak",
    kuantitas: "12 Karpet",
    pengirim: "Toko B",
    customer: "Pak Adi",
  },
  {
    nomorAntrian: "3",
    tanggalKirim: "22 Maret 2025",
    namaBarang: "Telur pecah",
    kuantitas: "10 Karpet",
    pengirim: "Gudang A1",
    customer: "Pak Yono",
  },
];

const InputDataPesanan = () => {
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
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header section */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Input Data Pesanan</h1>
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

      {/* InputDataPesanan box  */}
      <div className="p-4 border border-black-6 rounded-[4px]">
        <h1 className="text-lg font-bold">Input Data Pesanan</h1>

        {/* Pilih Toko/Gudang */}
        <label
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
          value={selectedCage}
          onChange={(e) => {}}
        >
          Pilih Toko/Gudang
        </label>
        <select className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
        ></select>
      </div>
    </div>
  );
};

export default InputDataPesanan;
