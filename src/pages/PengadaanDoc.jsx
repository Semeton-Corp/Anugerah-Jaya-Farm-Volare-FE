import React from "react";
import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import KonfirmasiPengadaanDocModal from "../components/KonfirmasiPengadaanDocModal";
import {
  arrivalConfirmationChickenProcurement,
  getChickenProcurements,
} from "../services/chickenMonitorings";
import { useEffect } from "react";
import { GoAlertFill } from "react-icons/go";

const getPaymentClass = (status) => {
  switch (status) {
    case "Belum Lunas":
      return "bg-orange-200 text-orange-900";
    case "Belum Dibayar":
      return "bg-[#FF5E5E] text-[#640404]";
    case "Lunas":
      return "bg-[#87FF8B] text-[#066000]";
    default:
      return "";
  }
};

const getShippingClass = (status) => {
  switch (status) {
    case false:
      return "bg-orange-200 text-orange-900";
    case true:
      return "bg-[#87FF8B] text-[#066000]";
    default:
      return "";
  }
};

const PengadaanDoc = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Semua Status Pembayaran");
  const [orderData, setOrderData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [page, setPage] = useState(1);

  const options = [
    "Semua Status Pembayaran",
    "Belum Dibayar",
    "Dibayar Setengah",
    "Lunas",
  ];

  const [showBarangsampaiModal, setShowBarangSampaiModal] = useState(false);

  const detailPages = ["draft-pesan-doc", "detail-pengadaan-doc"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const fetchOrderData = async () => {
    try {
      const ordersResponse = await getChickenProcurements(page);
      console.log("ordersResponse: ", ordersResponse);
      if (ordersResponse.status === 200) {
        setOrderData(ordersResponse.data.data.chickenProcurements);
      }
      ``;
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleSubmitArrivalConfiramation = async (result) => {
    try {
      const payload = {
        quantity: result.quantity,
        ...(result.catatan?.trim() ? { note: result.catatan } : {}),
      };

      const arrivalResponse = await arrivalConfirmationChickenProcurement(
        payload,
        selectedItem.id
      );

      if (arrivalResponse.status === 200) {
        alert("✅ Konfirmasi pengadaan berhasil");
        setShowBarangSampaiModal(false);
        fetchOrderData();
      }
      console.log("arrivalResponse: ", arrivalResponse);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const draftPesanDocHandle = () => {
    navigate(`${location.pathname}/draft-pesan-doc`);
  };

  const handleDetailProcurement = (id) => {
    navigate(`${location.pathname}/detail-pengadaan-doc/${id}`);
  };

  useEffect(() => {
    fetchOrderData();
    if (location?.state?.refetch) {
      fetchOrderData();
    }
  }, [location]);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Pengadaan DOC</h1>

        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <FaMoneyBillWave size={18} />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="ml-2 bg-transparent text-base font-medium outline-none"
          >
            {options.map((opt) => (
              <option key={opt} value={opt} className="text-black">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-300">
        <div className="flex justify-end items-center mb-2">
          <button
            onClick={draftPesanDocHandle}
            className="flex items-center rounded px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
          >
            Draft Pesan DOC
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3">Tanggal Pemesanan</th>
                <th className="p-3">Kandang</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Estimasi Tiba</th>
                <th className="p-3">Tenggat Pembayaran</th>
                <th className="p-3">Status Pembayaran</th>
                <th className="p-3">Status Pengiriman</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{order.orderDate}</td>
                  <td className="p-3">{order.cage?.name}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.supplier.name}</td>
                  <td className="p-3">{order.estimationArrivalDate}</td>
                  <td className="p-3 flex items-center gap-2">
                    <span
                      className={
                        order.paymentStatus === "Lunas"
                          ? "text-gray-200"
                          : order.isMoreThanDeadlinePaymentDate
                          ? "text-red-600"
                          : ""
                      }
                    >
                      {order.paymentStatus == "Lunas"
                        ? "(Lunas)"
                        : order.deadlinePaymentDate || "-"}
                    </span>
                    {order.isMoreThanDeadlinePaymentDate && (
                      <span
                        title="Sudah melewati deadline"
                        className="text-red-600"
                      >
                        <GoAlertFill size={24} />
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded ${getPaymentClass(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded ${getShippingClass(
                        order.IsArrived
                      )}`}
                    >
                      {order.IsArrived ? "Selesai" : "Sedang Dikirim"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {!order.IsArrived && (
                      <button
                        onClick={() => {
                          console.log("order: ", order);
                          setShowBarangSampaiModal(true);
                          setSelectedItem(order);
                          console.log("order: ", order);
                        }}
                        className="bg-orange-300 hover:bg-orange-500 text-sm px-3 py-1 rounded cursor-pointer"
                      >
                        Ayam Sampai
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleDetailProcurement(order.id);
                      }}
                      className="bg-green-700 hover:bg-green-900 text-white text-sm px-3 py-1 rounded cursor-pointer"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Menampilkan 1-10 dari 1000 riwayat
          </span>
          <div className="flex gap-2">
            <button className="bg-gray-200 text-black px-4 py-1 rounded">
              Previous
            </button>
            <button className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-4 py-1 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
      {showBarangsampaiModal && (
        <KonfirmasiPengadaanDocModal
          data={{
            kandang: selectedItem?.cage?.name || "-",
            namaBarang: "Ayam DOC",
            supplier: selectedItem?.supplier?.name || "-",
            jumlah: selectedItem?.quantity || 0,
          }}
          onClose={() => setShowBarangSampaiModal(false)}
          onConfirm={(result) => {
            handleSubmitArrivalConfiramation(result);
          }}
        />
      )}
    </div>
  );
};

export default PengadaanDoc;
