import React from "react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { getTodayDateInBahasa } from "../utils/dateFormat";

const riwayatAktivitasTokoData = [
  {
    waktu: "10:30",
    namaBarang: "Telur OK",
    satuan: "Ikat",
    kuantitas: 4000,
    toko: "Toko A",
    tempatPemesanan: "-",
    keterangan: "Barang keluar",
  },
  {
    waktu: "09:00",
    namaBarang: "Telur Retak",
    satuan: "Butir",
    kuantitas: 1200,
    toko: "Toko B",
    tempatPemesanan: "-",
    keterangan: "Barang keluar",
  },
  {
    waktu: "08:00",
    namaBarang: "Telur Pecah",
    satuan: "Butir",
    kuantitas: 1200,
    toko: "Toko A",
    tempatPemesanan: "Gudang A1",
    keterangan: "Barang masuk",
  },
  {
    waktu: "07:20",
    namaBarang: "Telur Retak",
    satuan: "Butir",
    kuantitas: 1200,
    toko: "Toko B",
    tempatPemesanan: "Gudang A1",
    keterangan: "Barang masuk",
  },
];

const RiwayatStok = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call parent function with search input
  };

  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Riwayat Stok Toko</h1>

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
                <th className="py-2 px-4">Nama barang</th>
                <th className="py-2 px-4">Satuan</th>
                <th className="py-2 px-4">Kuantitas</th>
                <th className="py-2 px-4">Toko</th>
                <th className="py-2 px-4">Tempat pemesanan</th>
                <th className="py-2 px-4">Keterangan</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {riwayatAktivitasTokoData.map((item, index) => (
                <tr key={index} className="border-b border-black-6">
                  <td className="py-2 px-4 ">{item.waktu}</td>

                  <td className="py-2 px-4">{item.namaBarang}</td>
                  <td className="py-2 px-4">{item.satuan}</td>
                  <td className="py-2 px-4">{item.kuantitas}</td>
                  <td className="py-2 px-4">{item.toko}</td>
                  <td className="py-2 px-4">{item.tempatPemesanan}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`py-1 px-5 rounded text-sm font-semibold ${
                        item.keterangan === "Barang masuk"
                          ? "bg-aman-box-surface-color text-aman-text-color"
                          : item.keterangan === "Pending"
                          ? "bg-green-200 text-green-900"
                          : item.keterangan === "Barang keluar"
                          ? "bg-orange-200 text-orange-900"
                          : "bg-kritis-box-surface-color text-kritis-text-color"
                      }`}
                    >
                      {item.keterangan}
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

export default RiwayatStok;
