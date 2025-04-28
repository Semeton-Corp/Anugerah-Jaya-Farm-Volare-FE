import React from "react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { getTodayDateInBahasa } from "../utils/dateFormat";

const suplierData = [
  {
    namaSupplier: "Pelet099",
    namaBarang: "Pelet",
    alamat: "JL. AJF 1",
    nomorTelepon: "0812345678",
    details: "Details",
  },
  {
    namaSupplier: "Super Jagung",
    namaBarang: "Telur Retak",
    alamat: "JL. AJF 2",
    nomorTelepon: "0812345678",
    details: "Details",
  },
  {
    namaSupplier: "Dagang Dedak",
    namaBarang: "Dedak",
    alamat: "JL. AJF 3",
    nomorTelepon: "0812345678",
    details: "Details",
  },
];
const DaftarSuplier = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call parent function with search input
  };

  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Daftar Supplier</h1>

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
          <div className="flex justify-end items-center mb-4">
            <div
              onClick={() => {}}
              className="flex items-center rounded-lg px-4 py-2 bg-green-700 hover:bg-green-900 cursor-pointer"
            >
              <div className="text-base font-medium ms-2 text-white">
                + Tambah Data Supplier
              </div>
            </div>
          </div>
          <table className="w-full ">
            <thead className="px-8 rounded-[4px] bg-green-700 text-white text-center">
              <tr className="">
                <th className="py-2 px-4">Nama Supplier</th>
                <th className="py-2 px-4">Nama barang</th>
                <th className="py-2 px-4">Alamat</th>
                <th className="py-2 px-4">Nomor Telepon</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {suplierData.map((item, index) => (
                <tr key={index} className="border-b border-black-6">
                  <td className="py-2 px-4 ">{item.namaSupplier}</td>
                  <td className="py-2 px-4">{item.namaBarang}</td>
                  <td className="py-2 px-4">{item.satuan}</td>
                  <td className="py-2 px-4">{item.alamat}</td>
                  <td className="py-2 px-4">
                    <p className="underline hover:text-black-6 cursor-pointer">
                      Detail
                    </p>
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

export default DaftarSuplier;
