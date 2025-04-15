import React from "react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarBlank } from "react-icons/pi";
import profileAvatar from "../assets/profile_avatar.svg";

const tugasTambahan = [
  {
    tanggal: "27 Maret 2025",
    tugas: "Dekorasi kandang untuk 17 Agustus",
    lokasi: "Kandang",
    slotPekerja: 3,
    status: "Belum diproses",
  },
  {
    tanggal: "25 Maret 2025",
    tugas: "Dekorasi toko untuk 17 Agustus",
    lokasi: "Toko",
    slotPekerja: 0,
    status: "Dalam Proses",
  },
  {
    tanggal: "19 Maret 2025",
    tugas: "Perbaikan pintu gudang",
    lokasi: "Gudang",
    slotPekerja: 0,
    status: "Selesai",
  },
];

const tugasRutin = [
  {
    jabatan: "Kepala Kandang",
    jumlahTugas: 30,
    jumlahPekerja: 2,
  },
  {
    jabatan: "Pekerja Toko",
    jumlahTugas: 15,
    jumlahPekerja: 3,
  },
  {
    jabatan: "Pekerja Kandang",
    jumlahTugas: 5,
    jumlahPekerja: 10,
  },
];

const TugasPegawai = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call parent function with search input
  };
  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Tugas Pegawai</h1>
      </div>

      {/* tugas tambahan box */}
      <div className=" rounded-[4px] border border-black-6">
        <div className="px-6 pt-8 pb-4 flex items-center justify-between">
          <p className="text-lg font-bold">Tugas Tambahan</p>
          <div className="rounded-[4px] py-2 px-6 bg-green-700 flex items-center justify-center text-white text-base font-medium hover:bg-green-900 cursor-pointer">
            + Tambah tugas
          </div>
        </div>

        {/* tugas tambahan table */}
        <div className="px-6 py-2 ">
          <table className="w-full mb-8">
            <thead className="px-8 rounded-[4px] bg-green-700 text-white text-left">
              <tr>
                <th className="py-2 px-4">Tanggal</th>
                <th className="py-2 px-4">Tugas Tambahan</th>
                <th className="py-2 px-4">Lokasi</th>
                <th className="py-2 px-4">Slot Pekerja</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody className="">
              {tugasTambahan.map((item, index) => (
                <tr key={index} className="border-b border-black-6">
                  <td className="py-2 px-4">{item.tanggal}</td>
                  <td className="py-2 px-4">{item.tugas}</td>
                  <td className="py-2 px-4">{item.lokasi}</td>
                  <td className="py-2 px-4">{item.slotPekerja}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`w-36 py-1 flex justify-center rounded text-sm font-semibold ${
                        item.status === "Selesai"
                          ? "bg-aman-box-surface-color text-aman-text-color"
                          : item.status === "Dalam Proses"
                          ? "bg-orange-200 text-kritis-text-color"
                          : "bg-kritis-box-surface-color text-kritis-text-color"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-2 px-4 underline text-black hover:text-black-6 cursor-pointer">
                    Detail
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* tugas rutin box */}

      <div className=" rounded-[4px] border border-black-6">
        <div className="px-6 pt-8 pb-4 flex items-center justify-between">
          <p className="text-lg font-bold">Tugas Rutin</p>
          <div className="rounded-[4px] py-2 px-6 bg-green-700 flex items-center justify-center text-white text-base font-medium hover:bg-green-900 cursor-pointer">
            + Tambah tugas rutin
          </div>
        </div>

        {/* tugas tambahan table */}
        <div className="px-6 py-2 ">
          <table className="w-full mb-8">
            <thead className="px-8 rounded-[4px] bg-green-700 text-white text-left">
              <tr>
                <th className="py-2 px-4">Jabatan</th>
                <th className="py-2 px-4">Jumlah Tugas</th>
                <th className="py-2 px-4">Jumlah Pekerja</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody className="">
              {tugasRutin.map((item, index) => (
                <tr key={index} className="border-b border-black-6">
                  <td className="py-2 px-4">{item.jabatan}</td>
                  <td className="py-2 px-4">{item.jumlahTugas}</td>
                  <td className="py-2 px-4">{item.jumlahPekerja}</td>

                  <td className="py-2 px-4 underline text-black hover:text-black-6 cursor-pointer">
                    Detail
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TugasPegawai;
