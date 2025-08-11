import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  createChickenProcurementPayment,
  getChickenProcurement,
} from "../services/chickenMonitorings";
import { convertToInputDateFormat } from "../utils/dateFormat";

const rupiah = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

const Badge = ({ children, tone = "neutral" }) => {
  const tones = {
    neutral: "bg-gray-200 text-gray-800",
    warning: "bg-orange-200 text-orange-900",
    success: "bg-[#87FF8B] text-[#369B34]",
    info: "bg-cyan-200 text-cyan-900",
  };
  return (
    <span
      className={`inline-block px-3 py-1 rounded ${
        tones[tone] || tones.neutral
      }`}
    >
      {children}
    </span>
  );
};

export default function DetailPengadaanDoc() {
  const [data, setData] = useState({
    orderDate: "-",
    estimationDate: "-",
    statusShipping: "-",
    supplierName: "-",
    cageName: "-",
    quantity: 0,
    totalPrice: 0,
    payments: [
      {
        id: 1,
        paymentDate: "27 Maret 2025",
        paymentMethod: "Tunai",
        nominal: 2500000,
        proof: "Bukti Pembayaran",
      },
    ],
  });

  const { id } = useParams();

  const today = new Date().toISOString().slice(0, 10);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Tunai");
  const [paymentDate, setPaymentDate] = useState(today);
  const [nominal, setNominal] = useState("");
  const [paymentProof, setPaymentProof] = useState("https://example.com");

  const priceTotal = Number(data?.totalPrice || 0);
  const rows = useMemo(() => {
    let sisa = priceTotal;
    return (data?.payments || []).map((p) => {
      const n = Number(p.nominal || 0);
      sisa = Math.max(sisa - n, 0);
      return { ...p, nominalNum: n, remainingNum: sisa };
    });
  }, [data, priceTotal]);

  const totalPaid = useMemo(
    () =>
      (data?.payments || []).reduce((a, p) => a + Number(p.nominal || 0), 0),
    [data]
  );
  const finalRemaining = Math.max(priceTotal - totalPaid, 0);
  const payStatus =
    finalRemaining === 0 && (data?.payments?.length || 0) > 0
      ? "Lunas"
      : "Belum Lunas";
  const shipTone =
    data?.statusShipping === "Sedang Dikirim" ? "warning" : "info";

  const addPayment = async () => {
    try {
      const payload = {
        nominal: nominal,
        paymentMethod: paymentMethod,
        paymentDate: convertToInputDateFormat(paymentDate),
        paymentProof: paymentProof,
      };
      console.log("id: ", id);
      console.log("payload: ", payload);
      const paymentResponse = await createChickenProcurementPayment(
        payload,
        id
      );
      console.log("paymentResponse: ", paymentResponse);

      if (paymentResponse.status === 201) {
        alert("✅ Pembayaran berhasil ditambahkan");
        setShowPaymentModal(false);
        setNominal("");
        setPaymentMethod("Tunai");
        setPaymentDate(today);
        fetchDetailData();
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const deletePayment = (paymentId) => {
    setData((prev) => ({
      ...prev,
      payments: prev.payments.filter((p) => p.id !== paymentId),
    }));
  };

  const fetchDetailData = async () => {
    try {
      const detailResponse = await getChickenProcurement(id);
      console.log("detailResponse: ", detailResponse);
      if (detailResponse.status === 200) {
        setData(detailResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching procurement details:", error);
    }
  };

  useEffect(() => {
    fetchDetailData();
  }, []);

  return (
    <div className="border rounded p-4">
      <h2 className="text-2xl font-semibold mb-4">Detail Pengadaan DOC</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-2">
        <div>
          <p className=" text-gray-600">Tanggal Pemesanan</p>
          <p className="text-lg font-semibold">{data?.orderDate}</p>
        </div>
        <div></div>
        <div>
          <p className=" text-gray-600">Status Pengiriman</p>
          <Badge tone={shipTone}>{data?.statusShipping}</Badge>
        </div>
        <div>
          <p className=" text-gray-600">Estimasi Tiba</p>
          <p className="text-lg font-semibold">{data?.estimationArrivalDate}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div>
          <p className=" text-gray-600">Supplier</p>
          <p className="text-lg  font-semibold">{data?.supplier?.name}</p>
        </div>
        <div>
          <p className=" text-gray-600">Kandang</p>
          <p className=" text-lg font-semibold">{data?.cage?.name}</p>
        </div>
        <div>
          <p className=" text-gray-600">Jumlah Pemesanan</p>
          <p className="text-lg font-semibold">{data?.quantity}</p>
        </div>
        <div>
          <p className=" text-gray-600">Harga</p>
          <p className="text-lg font-semibold">{rupiah(data?.totalPrice)}</p>
        </div>
      </div>
      <div className="border rounded mt-3">
        <div className="flex items-center justify-between p-4">
          <p className="font-semibold text-lg">Pembayaran</p>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-orange-300 hover:bg-orange-500 px-4 py-2 rounded text-black cursor-pointer"
          >
            Tambah Pembayaran
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="mb-3">
            <span className="text-sm mr-2">Tipe Pembayaran :</span>
            <Badge
              tone={
                finalRemaining === 0
                  ? "success"
                  : data.payments?.length
                  ? "warning"
                  : "neutral"
              }
            >
              {finalRemaining === 0
                ? "Dibayar Penuh"
                : data.payments?.length
                ? "Dibayar Setengah"
                : "Belum Dibayar"}
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="text-left px-3 py-2">Tanggal</th>
                  <th className="text-left px-3 py-2">Metode Pembayaran</th>
                  <th className="text-left px-3 py-2">Nominal Pembayaran</th>
                  <th className="text-left px-3 py-2">Sisa Bayar</th>
                  <th className="text-left px-3 py-2">Bukti Pembayaran</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      className="px-3 py-3 text-center text-gray-500"
                      colSpan={6}
                    >
                      Belum ada data pembayaran.
                    </td>
                  </tr>
                ) : (
                  rows.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="px-3 py-2">{p.date}</td>
                      <td className="px-3 py-2">{p.paymentMethod}</td>
                      <td className="px-3 py-2">{rupiah(p.nominalNum)}</td>
                      <td className="px-3 py-2">{rupiah(p.remainingNum)}</td>
                      <td className="px-3 py-2 underline cursor-pointer">
                        {p.proof}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-3">
                          <button className="p-1 rounded hover:bg-gray-100">
                            <BiSolidEditAlt size={18} />
                          </button>
                          <button
                            onClick={() => deletePayment(p.id)}
                            className="p-1 rounded hover:bg-gray-100"
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold">Status Pembayaran :</span>
              <Badge tone={payStatus === "Lunas" ? "success" : "warning"}>
                {payStatus}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm">Sisa Bayar : {rupiah(finalRemaining)}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          console.log("data: ", data);
        }}
      >
        CHECK
      </button>

      {/* Modal Tambah Pembayaran */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-xl">
            <h3 className="text-lg font-bold mb-4">Tambah Pembayaran</h3>

            <label className="block mb-1 font-medium">Metode Pembayaran</label>
            <select
              className="w-full border rounded p-2 mb-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Tunai">Tunai</option>
              <option value="Non Tunai">Non Tunai</option>
            </select>

            <label className="block mb-1 font-medium">Nominal Pembayaran</label>
            <input
              type="number"
              className="w-full border rounded p-2 mb-3"
              placeholder="Masukkan nominal"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
            />

            <label className="block mb-1 font-medium">Tanggal Bayar</label>
            <input
              type="date"
              className="w-full border rounded p-2 mb-3"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />

            <label className="block mb-1 font-medium">Bukti Pembayaran</label>
            <input type="file" className="w-full border rounded p-2 mb-4" />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setNominal("");
                  setPaymentMethod("Tunai");
                  setPaymentDate(today);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={addPayment}
                className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
