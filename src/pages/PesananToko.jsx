import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FaWarehouse, FaTruck } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const pesananTokoData = [
  {
    namaBarang: "Telur OK",
    satuan: "Ikat",
    kuantitas: 12,
    tokoPemesan: "Toko A1",
    keterangan: "Belum dikirim",
    aksi: ["Kirim barang", "Tolak"],
  },
  {
    namaBarang: "Telur retak",
    satuan: "Karpet",
    kuantitas: 12,
    tokoPemesan: "Toko A1",
    keterangan: "Dalam pengiriman",
    aksi: [],
  },
  {
    namaBarang: "Telur pecah",
    satuan: "Karpet",
    kuantitas: 10,
    tokoPemesan: "Toko A2",
    keterangan: "Sampai",
    aksi: [],
  },
];

const PesananToko = () => {
  const userRole = localStorage.getItem("role");

  return (
    <div className="flex flex-col px-4 py-3 gap-3 ">
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Pesanan Toko</h1>
        <div className="flex gap-2">
          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <FaWarehouse size={18} />
            <div className="text-base font-medium ms-2">Semua Gudang</div>
          </div>
        </div>
      </div>

      <div className="flex  items-center">
        <h2 className="text-xl font-medium">Stok Telur Tersedia : </h2>
      </div>

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
              <p className="text-xl text-center">Pack</p>
            </div>
          </div>
        </div>
      </div>

      {/* tabel */}
      <div className="bg-white p-6 border rounded-lg w-full border-black-6">
        <div className="flex  items-center mb-4">
          <h2 className="text-lg font-semibold">Pesanan Toko</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-center">
                <th className="py-2 px-4">Nama Barang</th>
                <th className="py-2 px-4">Satuan</th>
                <th className="py-2 px-4">Kuantitas</th>
                <th className="py-2 px-4">Toko Pemesan</th>
                <th className="py-2 px-4">Keterangan</th>
                {userRole === "Pekerja Gudang" ||
                  (userRole === "Kepala Kandang" && (
                    <th className="py-2 px-4">Aksi</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {pesananTokoData.map((data, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 text-center"
                >
                  <td className="py-2 px-4">{data.namaBarang}</td>
                  <td className="py-2 px-4">{data.satuan}</td>
                  <td className="py-2 px-4">{data.kuantitas}</td>
                  <td className="py-2 px-4">{data.tokoPemesan}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`w-48 mx-auto py-1 flex justify-center rounded text-sm font-semibold ${
                        data.keterangan === "Sampai"
                          ? "bg-aman-box-surface-color text-aman-text-color"
                          : data.keterangan === "Dalam pengiriman"
                          ? "bg-orange-200 text-orange-900"
                          : "bg-kritis-box-surface-color text-kritis-text-color"
                      }`}
                    >
                      {data.keterangan}
                    </span>
                  </td>
                  {userRole === "Pekerja Gudang" ||
                    (userRole === "Kepala Kandang" && (
                      <td className="py-2 px-4 flex justify-center gap-4">
                        <BiSolidEditAlt
                          onClick={() => {}}
                          size={24}
                          className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                        />
                        <MdDelete
                          onClick={() => {}}
                          size={24}
                          className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                        />
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PesananToko;
