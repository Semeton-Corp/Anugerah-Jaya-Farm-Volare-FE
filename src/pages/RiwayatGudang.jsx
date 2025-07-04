import React from "react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const riwayatGudangData = [
  {
    waktu: "10:30",
    namaBarang: "Telur OK",
    satuan: "Ikat",
    kuantitas: 4,
    asalBarang: "Gudang A1",
    tujuan: "Pak Tono",
    keterangan: "Barang keluar",
  },
  {
    waktu: "09:00",
    namaBarang: "Telur Retak",
    satuan: "Butir",
    kuantitas: 120,
    asalBarang: "Gudang A1",
    tujuan: "Toko A",
    keterangan: "Barang keluar",
  },
  {
    waktu: "08:00",
    namaBarang: "Telur Pecah",
    satuan: "Butir",
    kuantitas: 1200,
    asalBarang: "Pelet990",
    tujuan: "Gudang A1",
    keterangan: "Barang masuk",
  },
  {
    waktu: "07:20",
    namaBarang: "Telur Retak",
    satuan: "Butir",
    kuantitas: 1200,
    asalBarang: "Kandang A1",
    tujuan: "Gudang A1",
    keterangan: "Barang masuk",
  },
];

const RiwayatGudang = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const detailPages = ["detail-riwayat-gudang"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const detailRiwayatHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/detail-riwayat-gudang";

    navigate(detailPath);
  };

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Riwayat Gudang</h1>

        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">
            Hari ini ({getTodayDateInBahasa()})
          </div>
        </div>
      </div>

      {/* entire box */}
      <div className=" rounded-[4px] border border-black-6">
        {/* pegawai table */}
        <div className="px-6 py-6">
          <table className="w-full ">
            <thead className="px-8 rounded-[4px] bg-green-700 text-white text-center">
              <tr className="">
                <th className="py-2 px-4">Waktu</th>
                <th className="py-2 px-4">Nama Barang</th>
                <th className="py-2 px-4">Satuan</th>
                <th className="py-2 px-4">Kuantitas</th>
                <th className="py-2 px-4">Asal Barang</th>
                <th className="py-2 px-4">Tujuan</th>
                <th className="py-2 px-4">Keterangan</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {riwayatGudangData.map((data, index) => (
                <tr key={index} className="border-b border-black-6">
                  <td className="py-2 px-4 ">{data.waktu}</td>
                  <td className="py-2 px-4">{data.namaBarang}</td>
                  <td className="py-2 px-4">{data.satuan}</td>
                  <td className="py-2 px-4">{data.kuantitas}</td>
                  <td className="py-2 px-4">{data.asalBarang}</td>
                  <td className="py-2 px-4">{data.tujuan}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`py-1 px-5 rounded text-sm font-semibold ${
                        data.keterangan === "Barang masuk"
                          ? "bg-aman-box-surface-color text-aman-text-color"
                          : data.keterangan === "Pending"
                          ? "bg-green-200 text-green-900"
                          : data.keterangan === "Stok diperbaharui"
                          ? "bg-orange-200 text-orange-900"
                          : "bg-kritis-box-surface-color text-kritis-text-color"
                      }`}
                    >
                      {data.keterangan}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span
                      onClick={detailRiwayatHandle}
                      className="underline hover:text-black-5 cursor-pointer"
                    >
                      Detail
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* footer */}
          <div className="flex justify-between mt-16 px-6">
            <p className="text-sm text-[#CCCCCC]">Menampilkan 1-7 data</p>
            <div className="flex gap-3">
              <div className="rounded-[4px] py-2 px-6 bg-green-100 flex items-center justify-center text-black text-base font-medium hover:bg-green-200 cursor-pointer">
                <p>Previous </p>
              </div>
              <div className="rounded-[4px] py-2 px-6 bg-green-700 flex items-center justify-center text-white text-base font-medium hover:bg-green-800 cursor-pointer">
                <p>Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatGudang;
