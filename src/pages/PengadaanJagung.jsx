import React, { useEffect, useState } from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { GoAlertFill } from "react-icons/go";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getTodayDateInBahasa } from "../utils/dateFormat";

// Mock service function for fetching corn data.
const getCornProcurements = async () => {
  // Replace with your actual API call that returns the combined data
  return {
    status: 200,
    data: {
      data: {
        cornProcurements: [
          {
            id: 10,
            orderDate: "20 Mar 2025",
            itemName: "Jagung",
            quantity: 12,
            unit: "Kg",
            supplierName: "Dagang Jagung A",
            estimationArrivalDate: "23 Mar 2025",
            deadlinePaymentDate: "23 Mar 2025",
            isMoreThanDeadlinePaymentDate: true,
            paymentStatus: "Belum Lunas",
            procurementStatus: "Sedang Dikirim",
            isArrived: false,
          },
          {
            id: 11,
            orderDate: "20 Mar 2025",
            itemName: "Jagung",
            quantity: 12,
            unit: "Kg",
            supplierName: "Dagang Jagung B",
            estimationArrivalDate: "23 Mar 2025",
            deadlinePaymentDate: "23 Mar 2025",
            isMoreThanDeadlinePaymentDate: false,
            paymentStatus: "Belum Dibayar",
            procurementStatus: "Sedang Dikirim",
            isArrived: false,
          },
          {
            id: 12,
            orderDate: "20 Mar 2025",
            itemName: "Jagung",
            quantity: 10,
            unit: "Kg",
            supplierName: "Dagang Jagung C",
            estimationArrivalDate: "23 Mar 2025",
            deadlinePaymentDate: "23 Mar 2025",
            isMoreThanDeadlinePaymentDate: false,
            paymentStatus: "Lunas",
            procurementStatus: "Selesai - Sesuai",
            isArrived: true,
          },
        ],
      },
    },
  };
};

// Reusable badge component
const badge = (text, variant = "neutral") => {
  const map = {
    warning: "bg-[#F2D08A] text-[#5F4000]",
    info: "bg-teal-200 text-teal-900",
    danger: "bg-[#FF5E5E] text-[#640404]",
    success: "bg-[#87FF8B] text-[#0E6A09]",
    neutral: "bg-stone-200 text-stone-900",
  };
  return (
    <span className={`px-3 py-1 rounded text-sm font-medium ${map[variant]}`}>
      {text}
    </span>
  );
};

const PengadaanJagung = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [daftarJagungData, setDaftarJagungData] = useState([]);
  const detailPages = ["draft-pengadaan-jagung"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const fetchJagungData = async () => {
    try {
      const dataResponse = await getCornProcurements();
      if (dataResponse.status === 200) {
        setDaftarJagungData(dataResponse.data.data.cornProcurements);
      }
    } catch (error) {
      console.error("Error fetching corn data:", error);
    }
  };

  useEffect(() => {
    fetchJagungData();
    if (location.state?.refetch) {
      fetchJagungData();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleBarangSampai = (item) => {
    console.log("Barang Sampai clicked for:", item);
    // Logic for handling 'Barang Sampai' modal or API call
  };

  const handleDetail = (id) => {
    navigate(`${location.pathname}/detail-jagung/${id}`);
  };

  const handleDraftPengadaanJagung = () => {
    // Logic for navigating to the 'Draft Pengadaan Jagung' page
    navigate(`${location.pathname}/draft-pengadaan-jagung`);
  };

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col px-4 py-3 gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Pengadaan Jagung</h1>
        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">
            Hari ini ({getTodayDateInBahasa()})
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white p-4 border rounded-lg w-full border-black-6">
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={handleDraftPengadaanJagung}
            className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
          >
            <div className="text-base font-medium ms-2 text-black">
              Draft Pengadaan Jagung
            </div>
          </button>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="px-4 py-3">Tanggal Pemesanan</th>
                <th className="px-4 py-3">Nama barang</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Supplier</th>
                <th className="px-4 py-3">Estimasi Tiba</th>
                <th className="px-4 py-3">Tenggat Pembayaran</th>
                <th className="px-4 py-3">Status Pembayaran</th>
                <th className="px-4 py-3">Keterangan</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftarJagungData.map((item, idx) => (
                <React.Fragment key={item.id || idx}>
                  <tr className="border-b">
                    <td className="px-4 py-3">{item.orderDate}</td>
                    <td className="px-4 py-3">{item.itemName}</td>
                    <td className="px-4 py-3">{`${item.quantity} ${item.unit}`}</td>
                    <td className="px-4 py-3">{item.supplierName}</td>
                    <td className="px-4 py-3">{item.estimationArrivalDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span>{item.deadlinePaymentDate}</span>
                        {item.isMoreThanDeadlinePaymentDate && (
                          <span title="Terlambat" className="text-red-500">
                            <GoAlertFill size={24} />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {item.paymentStatus === "Lunas"
                        ? badge("Lunas", "success")
                        : item.paymentStatus === "Belum Dibayar"
                        ? badge("Belum Dibayar", "danger")
                        : badge("Belum Lunas", "warning")}
                    </td>
                    <td className="px-4 py-3">
                      {item.procurementStatus === "Selesai - Sesuai"
                        ? badge("Selesai - Sesuai", "success")
                        : item.procurementStatus === "Sampai - Tidak Sesuai"
                        ? badge("Sampai - Tidak Sesuai", "success")
                        : item.procurementStatus === "Sedang Dikirim"
                        ? badge("Sedang Dikirim", "warning")
                        : item.procurementStatus
                        ? badge(item.procurementStatus, "neutral")
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {!item.isArrived && (
                          <button
                            onClick={() => handleBarangSampai(item)}
                            className="bg-orange-300 hover:bg-orange-500 text-black px-3 py-1 rounded"
                          >
                            Barang Sampai
                          </button>
                        )}
                        <button
                          onClick={() => handleDetail(item.id)}
                          className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded"
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              {daftarJagungData.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            Menampilkan 1-10 dari 1000 riwayat
          </span>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-md bg-green-200 text-green-700 font-medium">
              Previous
            </button>
            <button className="px-4 py-2 rounded-md bg-green-700 text-white font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PengadaanJagung;
