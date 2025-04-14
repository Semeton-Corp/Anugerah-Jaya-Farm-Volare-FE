import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import {
  GiBirdCage,
  GiHealthDecrease,
  GiChicken,
  GiDeathSkull,
} from "react-icons/gi";
import { FiMaximize2 } from "react-icons/fi";
import { FaPercentage, FaWarehouse, FaTruck } from "react-icons/fa";

const produksiDetail = [
  {
    kandang: "Kandang A1",
    qty: 1000,
    ok: 800,
    retak: 12,
    pecah: 100,
    reject: 40,
    abnormality: "3%",
    keterangan: "aman",
  },
  {
    kandang: "Kandang A2",
    qty: 1000,
    ok: 800,
    retak: 12,
    pecah: 100,
    reject: 40,
    abnormality: "12%",
    keterangan: "kritis",
  },
];

const stokTokoData = [
  {
    namaBarang: "Telur OK",
    idBarang: "ID1234",
    satuan: "Ikat",
    kuantitas: 4000,
    tempat: "Gudang A1",
    keterangan: "kritis",
  },
  {
    namaBarang: "Telur Retak",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "kritis",
  },
  {
    namaBarang: "Telur Pecah",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "aman",
  },
  {
    namaBarang: "Telur Retak",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "aman",
  },
];

const aktivitasTokoData = [
  {
    tanggal: "20 Maret 2025",
    namaBarang: "Telur OK",
    idBarang: "ID1234",
    satuan: "Ikat",
    kuantitas: 4000,
    tempat: "Gudang A1",
    keterangan: "kritis",
  },
  {
    tanggal: "21 Maret 2025",
    namaBarang: "Telur Retak",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "kritis",
  },
  {
    tanggal: "22 Maret 2025",
    namaBarang: "Telur Pecah",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "aman",
  },
  {
    tanggal: "23 Maret 2025",
    namaBarang: "Telur Retak",
    idBarang: "ID1234",
    satuan: "Butir",
    kuantitas: 1200,
    tempat: "Gudang A1",
    keterangan: "aman",
  },
];

const Toko = () => {
  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header section */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Toko</h1>
        <div className="flex gap-2">
          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <MdStore size={18} />
            <div className="text-base font-medium ms-2">Semua Toko</div>
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
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Pendapatan</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <PiMoneyWavyFill size={24} color="white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <p className="text-3xl font-semibold me-3">Rp</p>
              <p className="text-3xl font-semibold">25.000</p>
            </div>
          </div>
        </div>

        {/* ayam sakit */}
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Terjual di toko</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <MdShoppingCart size={24} color="white" />
            </div>
          </div>

          <div className="flex  flex-wrap gap-4">
            <div className="flex flex-wrap gap-4">
              <div>
                {/* popuasl */}
                <p className="text-3xl font-semibold">150</p>
              </div>
            </div>
          </div>
        </div>
        {/* penjualan telur */}
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Stok gudang</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <FaWarehouse size={24} color="white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* item butir */}
            <div className="flex flex-wrap gap-4">
              <div>
                {/* popuasl */}
                <p className="text-3xl font-semibold">2000</p>
              </div>
            </div>
          </div>
        </div>
        {/* penjualan telur */}
        <div className="p-4 w-full rounded-md bg-green-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sedang dipesan</h2>
            <div className="p-2 rounded-xl bg-green-700">
              <FaTruck size={24} color="white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* item butir */}
            <div className="flex flex-wrap gap-4">
              <div className="flex">
                {/* popuasl */}
                <p className="text-3xl font-semibold pe-2">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chart, incomes, and history section */}
      <div className="flex flex-col lg:flex-row h-120 gap-6">
        {/* Chart Section (3/4 width on large screens) */}
        <div className="w-full bg-white px-8 py-6 rounded-lg border border-gray-300">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold">Stok toko</h2>
            <div className="p-2 rounded-full hover:bg-black-4 cursor-pointer">
              <FiMaximize2 size={24} color="" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="bg-green-700 font-medium text-white text-center">
                  <th className="py-2 px-4">Nama Barang</th>
                  <th className="py-2 px-4">ID Barang</th>
                  <th className="py-2 px-4">Satuan</th>
                  <th className="py-2 px-4">Kuantitas</th>
                  <th className="py-2 px-4">Tempat Pemesanan</th>
                  <th className="py-2 px-4">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {stokTokoData.map((item, index) => (
                  <tr key={index} className="border-b text-center">
                    <td className="py-2 px-4">{item.namaBarang}</td>
                    <td className="py-2 px-4">{item.idBarang}</td>
                    <td className="py-2 px-4">{item.satuan}</td>
                    <td className="py-2 px-4">{item.kuantitas}</td>
                    <td className="py-2 px-4">{item.tempat}</td>
                    <td className="py-2 px-4 flex justify-center">
                      <span
                        className={`w-24 py-1 flex justify-center rounded text-sm font-semibold ${
                          item.keterangan === "aman"
                            ? "bg-aman-box-surface-color text-aman-text-color"
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
          </div>
        </div>
      </div>

      {/* detail penjualan */}
      <div className="bg-white p-4 rounded-lg border border-gray-300">
        <h2 className="text-lg font-semibold mb-4">Riwayat Aktivitas Toko</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-base">
            <thead>
              <tr className="bg-green-700 text-white font-medium text-center">
                <th className="py-2 px-4">Tanggal</th>
                <th className="py-2 px-4">Nama barang</th>
                <th className="py-2 px-4">ID Barang</th>
                <th className="py-2 px-4">Satuan</th>
                <th className="py-2 px-4">Kuantitas</th>
                <th className="py-2 px-4">Tempat Pemesanan</th>
                <th className="py-2 px-4">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {aktivitasTokoData.map((item, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="py-2 px-4">{item.tanggal}</td>
                  <td className="py-2 px-4">{item.namaBarang}</td>
                  <td className="py-2 px-4">{item.idBarang}</td>
                  <td className="py-2 px-4">{item.satuan}</td>
                  <td className="py-2 px-4">{item.kuantitas}</td>
                  <td className="py-2 px-4">{item.tempat}</td>
                  <td className="py-2 px-4 flex justify-center">
                    <span
                      className={`w-24 py-1 flex justify-center rounded text-sm font-semibold ${
                        item.keterangan === "aman"
                          ? "bg-aman-box-surface-color text-aman-text-color"
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
        </div>
      </div>
    </div>
  );
};

export default Toko;
