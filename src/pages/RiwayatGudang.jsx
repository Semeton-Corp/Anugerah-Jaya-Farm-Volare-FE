import React, { useRef } from "react";
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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getWarehouseItemHistories } from "../services/warehouses";

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

  const [selectedDate, setSelectedDate] = useState();

  const [page, setPage] = useState(1);
  const [historyData, setHistoryData] = useState([]);

  const [totalData, setTotaldata] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const detailPages = ["detail-riwayat-gudang"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const dateInputRef = useRef(null);
  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.() || dateInputRef.current.click();
    }
  };

  const detailRiwayatHandle = (id) => {
    const currentPath = location.pathname;
    const detailPath = currentPath + `/detail-riwayat-gudang/${id}`;

    navigate(detailPath);
  };

  const fetchHistoryData = async (page) => {
    try {
      const date = selectedDate
        ? formatDateToDDMMYYYY(selectedDate)
        : undefined;

      const historyResponse = await getWarehouseItemHistories(date, page);
      console.log("page: ", page);
      console.log("historyResponse: ", historyResponse);

      setTotaldata(historyResponse.data.data.totalData);
      setHistoryData(historyResponse.data.data.warehouseItemHistories);
      setTotalPages(historyResponse.data.data.totalPage);
    } catch (error) {
      console.error("Error fetching warehouse history:", error);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    console.log("date: ", date);
    setSelectedDate(date);
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
        <h1 className="text-3xl font-bold">Riwayat Gudang</h1>

        <div
          className="flex items-center rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer gap-2 px-4 py-2"
          onClick={openDatePicker}
        >
          {selectedDate ? (
            <input
              ref={dateInputRef}
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-transparent cursor-pointer"
            />
          ) : (
            <>
              <span className="text-gray-700">Semua Hari</span>
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="hidden"
              />
            </>
          )}
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
              {historyData.map((data, index) => (
                <tr key={index} className="border-b border-black-6">
                  <td className="py-2 px-4 ">{data.time}</td>
                  <td className="py-2 px-4">{data.item.name}</td>
                  <td className="py-2 px-4">{data.item.unit}</td>
                  <td className="py-2 px-4">{data.quantity}</td>
                  <td className="py-2 px-4">{data.source}</td>
                  <td className="py-2 px-4">{data.destination}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`py-1 px-5 rounded text-sm font-semibold ${
                        data.status === "Barang Masuk"
                          ? "bg-aman-box-surface-color text-aman-text-color"
                          : data.status === "Pending"
                          ? "bg-green-200 text-green-900"
                          : data.status === "Stok diperbaharui"
                          ? "bg-orange-200 text-orange-900"
                          : "bg-kritis-box-surface-color text-kritis-text-color"
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span
                      onClick={() => {
                        detailRiwayatHandle(data.id);
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

          {/* footer */}
          <div className="flex justify-between mt-16 px-6">
            {historyData?.length > 0 ? (
              <p className="text-sm text-[#CCCCCC]">{`Menampilkan halaman ${page} dari ${totalPages} halaman. Total ${totalData} data riwayat`}</p>
            ) : (
              <p></p>
            )}

            <div className="flex gap-3">
              <div
                className={`rounded-[4px] py-2 px-6 ${
                  page === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-green-100 hover:bg-green-200 cursor-pointer"
                } flex items-center justify-center text-black text-base font-medium `}
                onClick={() => page > 1 && setPage(page - 1)}
              >
                <p>Previous</p>
              </div>
              <div
                className={`rounded-[4px] py-2 px-6 ${
                  page === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800 cursor-pointer"
                } flex items-center justify-center text-white text-base font-medium `}
                onClick={() => page < totalPages && setPage(page + 1)}
              >
                <p>Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button
        onClick={() => {
          console.log("page: ", page);
          console.log("totalData: ", totalData);
          console.log("totalPage: ", totalPages);
        }}
      >
        CHECK
      </button> */}
    </div>
  );
};

export default RiwayatGudang;
