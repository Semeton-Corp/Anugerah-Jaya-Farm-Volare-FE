import React, { useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  formatDate,
  formatDateToDDMMYYYY,
  getTodayDateInBahasa,
} from "../utils/dateFormat";
import { getStoreItemsHistories } from "../services/stores";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  const [storeItemHistories, setStoreItemHistories] = useState([]);

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const dateInputRef = useRef(null);
  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.() || dateInputRef.current.click();
    }
  };

  const detailPages = ["detail-riwayat-stok"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const detailRiwayatHandle = (id) => {
    const currentPath = location.pathname;
    const detailPath = currentPath + `/detail-riwayat-stok/${id}`;

    navigate(detailPath);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    console.log("date: ", date);
    setSelectedDate(date);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call parent function with search input
  };

  const fetchHistoryData = async (page) => {
    try {
      const date = selectedDate
        ? formatDateToDDMMYYYY(selectedDate)
        : undefined;

      const historyResponse = await getStoreItemsHistories(date, page);
      // console.log("page: ", page);

      if (historyResponse.status == 200) {
        setStoreItemHistories(historyResponse.data.data.storeItemHistories);
      }
      // setTotaldata(historyResponse.data.data.totalData);
      // setHistoryData(historyResponse.data.data.warehouseItemHistories);
      // setTotalPages(historyResponse.data.data.totalPage);
    } catch (error) {
      console.error("Error fetching warehouse history:", error);
    }
  };

  useEffect(() => {
    fetchHistoryData(page);
  }, [selectedDate, page]);

  if (isDetailPage) {
    return <Outlet />;
  }
  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Riwayat Stok Toko</h1>

        <div
          className="flex items-center rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer gap-2"
          onClick={openDatePicker}
        >
          <input
            ref={dateInputRef}
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer gap-2"
          />
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
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {storeItemHistories.map((item, index) => (
                <tr key={index} className="border-b border-black-6">
                  <td className="py-2 px-4 ">{item.time}</td>
                  <td className="py-2 px-4">{item.item.name}</td>
                  <td className="py-2 px-4">{item.item.unit}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">{item.destination}</td>
                  <td className="py-2 px-4">{item.source ?? "-"}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`py-1 px-5 rounded text-sm font-semibold ${
                        item.status === "Barang masuk"
                          ? "bg-aman-box-surface-color text-aman-text-color"
                          : item.status === "Pending"
                          ? "bg-green-200 text-green-900"
                          : item.status === "Barang keluar"
                          ? "bg-orange-200 text-orange-900"
                          : "bg-kritis-box-surface-color text-kritis-text-color"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span
                      onClick={() => {
                        detailRiwayatHandle(item.id);
                      }}
                      className="underline hover:text-black-5 cursor-pointer"
                    >
                      Detail
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {storeItemHistories.length < 1 && (
            <p className="p-3 w-full flex justify-center italic text-gray-300">
              Belum ada riwayat stok toko
            </p>
          )}

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
      <button
        onClick={() => {
          console.log("selectedDate: ", selectedDate);
        }}
      >
        CHECK
      </button>
    </div>
  );
};

export default RiwayatStok;
