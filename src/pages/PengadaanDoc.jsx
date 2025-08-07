import React from "react";
import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import KonfirmasiPengadaanDocModal from "../components/KonfirmasiPengadaanDocModal";

const dummyOrders = [
  {
    orderDate: "20 Mar 2025",
    quantity: "1000 Ekor",
    supplier: "Dagang 01",
    estimatedArrival: "23 Mar 2025",
    paymentStatus: "Dibayar Setengah",
    shippingStatus: "Sedang Dikirim",
  },
  {
    orderDate: "20 Mar 2025",
    quantity: "12 Ekor",
    supplier: "Dagang 02",
    estimatedArrival: "23 Mar 2025",
    paymentStatus: "Belum Dibayar",
    shippingStatus: "Sedang Dikirim",
  },
  {
    orderDate: "20 Mar 2025",
    quantity: "12 Ekor",
    supplier: "Dagang 03",
    estimatedArrival: "23 Mar 2025",
    paymentStatus: "Lunas",
    shippingStatus: "Selesai",
  },
];

const getPaymentClass = (status) => {
  switch (status) {
    case "Dibayar Setengah":
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
    case "Sedang Dikirim":
      return "bg-orange-200 text-orange-900";
    case "Selesai":
      return "bg-[#87FF8B] text-[#066000]";
    default:
      return "";
  }
};

const PengadaanDoc = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Semua Status Pembayaran");
  const options = [
    "Semua Status Pembayaran",
    "Belum Dibayar",
    "Dibayar Setengah",
    "Lunas",
  ];

  const [showBarangsampaiModal, setShowBarangSampaiModal] = useState(false);

  const detailPages = ["draft-pesan-doc"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const draftPesanDocHandle = () => {
    navigate(`${location.pathname}/draft-pesan-doc`);
  };

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
            className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
          >
            Draft Pesan DOC
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3">Tanggal Pemesanan</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Estimasi Tiba</th>
                <th className="p-3">Status Pembayaran</th>
                <th className="p-3">Status Pengiriman</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyOrders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{order.orderDate}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.supplier}</td>
                  <td className="p-3">{order.estimatedArrival}</td>
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
                        order.shippingStatus
                      )}`}
                    >
                      {order.shippingStatus}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {order.shippingStatus !== "Selesai" && (
                      <button
                        onClick={() => {
                          setShowBarangSampaiModal(true);
                        }}
                        className="bg-orange-300 hover:bg-orange-500 text-sm px-3 py-1 rounded cursor-pointer"
                      >
                        Barang Sampai
                      </button>
                    )}
                    <button className="bg-green-700 hover:bg-green-900 text-white text-sm px-3 py-1 rounded cursor-pointer">
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
            kandang: "Sidodadi DOC",
            namaBarang: "Ayam DOC",
            supplier: "Dagang A",
            jumlah: 12,
          }}
          onClose={() => setShowBarangSampaiModal(false)}
          onConfirm={(result) => {
            console.log("Hasil konfirmasi:", result);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default PengadaanDoc;
