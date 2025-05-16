import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import { FaClock } from "react-icons/fa6";
import { BiSolidBox } from "react-icons/bi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { FiMaximize2 } from "react-icons/fi";
import { FaPercentage, FaWarehouse, FaTruck } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const stokGudangData = [
  {
    namaBarang: "Jagung",
    id: "ID1234",
    jenisBarang: "Pakan",
    qty: "12 sak",
    lokasiSimpan: "Gudang A1",
    estimasiHabis: "22 Maret 2025",
    keterangan: "aman",
  },
  {
    namaBarang: "Dedak",
    id: "ID1234",
    jenisBarang: "Pakan",
    qty: "12 sak",
    lokasiSimpan: "Gudang A1",
    estimasiHabis: "22 Maret 2025",
    keterangan: "kritis",
  },
  {
    namaBarang: "Telur",
    id: "ID1234",
    jenisBarang: "Telur",
    qty: "12 sak",
    lokasiSimpan: "Gudang A1",
    estimasiHabis: "22 Maret 2025",
    keterangan: "kritis",
  },
];

const riwayatGudangData = [
  {
    tanggal: "22 Maret 2025",
    namaBarang: "Jagung",
    id: "ID1234",
    jenisBarang: "Pakan",
    qty: "12 sak",
    lokasiSimpan: "Gudang A1",
    keterangan: "Barang Masuk",
  },
  {
    tanggal: "22 Maret 2025",
    namaBarang: "Dedak",
    id: "ID1234",
    jenisBarang: "Pakan",
    qty: "12 sak",
    lokasiSimpan: "Gudang A1",
    keterangan: "Barang Masuk",
  },
  {
    tanggal: "22 Maret 2025",
    namaBarang: "Telur",
    id: "ID1234",
    jenisBarang: "Jual",
    qty: "12 sak",
    lokasiSimpan: "Gudang A1",
    keterangan: "Barang Keluar",
  },
];

const Gudang = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("role");
  const detailPages = ["detail-stok-gudang", "riwayat-aktivitas-gudang"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );
  const navigate = useNavigate();

  const detailStokGudangHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/detail-stok-gudang";

    navigate(detailPath);
  };

  const riwayatAktivitasGudangHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/riwayat-aktivitas-gudang";

    navigate(detailPath);
  };

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">
              {userRole == "Pekerja Gudang" ? "Stok Gudang" : "Gudang"}
            </h1>
            <div className="flex gap-2">
              <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                <FaWarehouse size={18} />
                <div className="text-base font-medium ms-2">Semua Gudang</div>
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
                <h2 className="text-lg font-semibold">Total Item</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <BiSolidBox size={24} color="white" />
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
                <h2 className="text-lg font-semibold">Stok Aman</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <FaCheck size={24} color="white" />
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
                <h2 className="text-lg font-semibold">Stok Kritis</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <HiMiniExclamationTriangle size={24} color="white" />
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
                <h2 className="text-lg font-semibold">Dalam Pesanan</h2>
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
                <h2 className="text-lg font-semibold">Telur</h2>
                <div
                  onClick={detailStokGudangHandle}
                  className="p-2 rounded-full hover:bg-black-4 cursor-pointer"
                >
                  <FiMaximize2 size={24} color="" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-base">
                  <thead>
                    <tr className="bg-green-700 font-medium text-white text-center">
                      <th className="py-2 px-4">Nama Barang</th>
                      <th className="py-2 px-4">QTY</th>
                      <th className="py-2 px-4">Satuan</th>
                      <th className="py-2 px-4">Lokasi simpan</th>
                      <th className="py-2 px-4">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stokGudangData.map((item, index) => (
                      <tr key={index} className="border-b text-center">
                        <td className="py-2 px-4">{item.namaBarang}</td>
                        <td className="py-2 px-4">{item.qty}</td>
                        <td className="py-2 px-4">{item.lokasiSimpan}</td>
                        <td className="py-2 px-4">{item.estimasiHabis}</td>
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
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Barang</h2>
              <div
                onClick={riwayatAktivitasGudangHandle}
                className="p-2 rounded-full hover:bg-black-4 cursor-pointer"
              >
                <FiMaximize2 size={24} color="" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-green-700 text-white font-medium text-center">
                    <th className="py-2 px-4">Nama barang</th>
                    <th className="py-2 px-4">Kategori</th>
                    <th className="py-2 px-4">QTY</th>
                    <th className="py-2 px-4">Satuan</th>
                    <th className="py-2 px-4">Lokasi simpan</th>
                    <th className="py-2 px-4">Estimasi Habis</th>
                    <th className="py-2 px-4">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {riwayatGudangData.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="py-2 px-4">{item.tanggal}</td>
                      <td className="py-2 px-4">{item.namaBarang}</td>
                      <td className="py-2 px-4">{item.id}</td>
                      <td className="py-2 px-4">{item.jenisBarang}</td>
                      <td className="py-2 px-4">{item.qty}</td>
                      <td className="py-2 px-4">{item.lokasiSimpan}</td>
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
      )}
    </>
  );
};

export default Gudang;
