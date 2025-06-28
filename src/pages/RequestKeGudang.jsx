import React from "react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

const dalamPesananData = [
  {
    tanggalPesan: "20 Mar 2025",
    namaBarang: "Telur OK",
    satuan: "Ikat",
    qty: 12,
    toko: "Toko A",
    tempatPemesanan: "Gudang A1",
    keterangan: "Sedang Dikirim",
    aksi: "Barang Sampai",
  },
  {
    tanggalPesan: "18 Mar 2025",
    namaBarang: "Telur retak",
    satuan: "Karpet",
    qty: 12,
    toko: "Toko A",
    tempatPemesanan: "Gudang A1",
    keterangan: "Pending",
    aksi: "Edit",
  },
  {
    tanggalPesan: "19 Mar 2025",
    namaBarang: "Telur pecah",
    satuan: "Karpet",
    qty: 10,
    toko: "Toko B",
    tempatPemesanan: "Gudang A1",
    keterangan: "Selesai",
    aksi: "",
  },
  {
    tanggalPesan: "19 Mar 2025",
    namaBarang: "Telur pecah",
    satuan: "Karpet",
    qty: 10,
    toko: "Toko A",
    tempatPemesanan: "Gudang A1",
    keterangan: "Ditolak",
    aksi: "",
  },
];

const RequestKeGudang = () => {
  const userRole = localStorage.getItem("role");
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const detailPages = ["pesan-barang"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const pesanBarangHandle = () => {
    const currentPath = location.pathname;
    const inputPath = currentPath + "/pesan-barang";

    navigate(inputPath);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call parent function with search input
  };

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Request ke Gudang</h1>

            <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
              <PiCalendarBlank size={18} />
              <div className="text-base font-medium ms-2">Semua Hari</div>
            </div>
          </div>

          {/* entire box */}
          <div className="p-6 rounded-[4px] border border-black-6">
            <div className="flex justify-end">
              <button
                onClick={pesanBarangHandle}
                className="px-5 py-3 bg-orange-300 rounded-[4px] text-black hover:bg-orange-500 cursor-pointer font-medium mb-3"
              >
                Pesan Barang
              </button>
            </div>
            {/* pegawai table */}
            <div className="">
              <table className="w-full ">
                <thead className="px-8 rounded-[4px] bg-green-700 text-white text-center">
                  <tr className="">
                    <th className="py-2 px-4">Tanggal Pesan</th>
                    <th className="py-2 px-4">Nama barang</th>
                    <th className="py-2 px-4">Satuan</th>
                    <th className="py-2 px-4">QTY</th>
                    <th className="py-2 px-4">Toko</th>
                    <th className="py-2 px-4">Tempat pemesanan</th>
                    <th className="py-2 px-4">Keterangan</th>
                    {userRole !== "Owner" && (
                      <>
                        <th className="py-2 px-4">Aksi</th>
                        <th className="py-2 px-4"></th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {dalamPesananData.map((item, index) => (
                    <tr key={index} className="border-b border-black-6">
                      <td className="py-2 px-4 ">{item.tanggalPesan}</td>

                      <td className="py-2 px-4">{item.namaBarang}</td>
                      <td className="py-2 px-4">{item.satuan}</td>
                      <td className="py-2 px-4">{item.qty}</td>
                      <td className="py-2 px-4">{item.toko}</td>
                      <td className="py-2 px-4">{item.tempatPemesanan}</td>

                      <td className="py-2 px-4">
                        <span
                          className={`py-1 px-5 rounded text-sm font-semibold ${
                            item.keterangan === "Selesai"
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : item.keterangan === "Pending"
                              ? "bg-green-200 text-green-900"
                              : item.keterangan === "Sedang Dikirim"
                              ? "bg-orange-200 text-orange-900"
                              : "bg-kritis-box-surface-color text-kritis-text-color"
                          }`}
                        >
                          {item.keterangan}
                        </span>
                      </td>
                      {userRole !== "Owner" && (
                        <>
                          <td>
                            <button
                              onClick={() => {
                                takeAdditionalTaskHandle(item.id);
                              }}
                              className="cursor-pointer bg-green-700 text-white text-sm font-semibold px-4 py-1 rounded hover:bg-green-900"
                            >
                              Barang Sampai
                            </button>
                          </td>
                          <td className="py-2 px-4 flex justify-center">
                            <BiSolidEditAlt
                              onClick={() => {
                                editDataHandle(row.id);
                              }}
                              size={24}
                              className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                            />
                          </td>
                        </>
                      )}
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
      )}
    </>
  );
};

export default RequestKeGudang;
