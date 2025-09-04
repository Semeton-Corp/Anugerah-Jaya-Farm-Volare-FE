// src/pages/DetailPenjualanAyam.jsx
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAfkirChickenSalePayment,
  deleteAfkirChickenSalePayment,
  getAfkirChickenSale,
  updateAfkirChickenSalePayment,
} from "../services/chickenMonitorings";
import { convertToInputDateFormat, toYMD } from "../utils/dateFormat";
import { GoAlertFill } from "react-icons/go";

const rupiah = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;
const today = (() => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`; // untuk <input type="date" />
})();

const Badge = ({ tone = "neutral", children }) => {
  const tones = {
    neutral: "bg-gray-200 text-gray-800",
    warning: "bg-yellow-200 text-yellow-900",
    success: "bg-[#87FF8B] text-[#066000]",
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

export default function DetailPenjualanAyam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sale, setSale] = useState({
    saleDate: "20 Maret 2025",
    cage: { id: 1, name: "Sidodadi 04" },
    chickenAgeWeeks: 30,
    customer: {
      id: 11,
      name: "Pelanggan 01",
      phoneNumber: "08123456789",
      address: "Jalan Pelanggan 01",
    },
    totalSellChicken: 4000,
    pricePerChicken: 15000,
    payments: [
      {
        id: 1,
        paymentDate: "2025-03-27",
        paymentMethod: "Tunai",
        nominal: 100000,
        proof: "Bukti Pembayaran",
      },
    ],
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Tunai");
  const [paymentDate, setPaymentDate] = useState(today);
  const [nominal, setNominal] = useState("");
  const [paymentProof, setPaymentProof] = useState("https://example.com");

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [selectedDeletePayment, setSelectedDeletePayment] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditPayment, setSelectedEditPayment] = useState(null);

  const [isMoreThanDeadlinePaymentDate, setIsMoreThanDeadlinePaymentDate] =
    useState(false);
  const [deadlinePaymentDate, setDeadlinePaymentDate] = useState("");

  const totalPrice = useMemo(
    () =>
      Number(sale.totalSellChicken || 0) * Number(sale.pricePerChicken || 0),
    [sale.totalSellChicken, sale.pricePerChicken]
  );

  const rows = useMemo(() => {
    let sisa = totalPrice;
    return (sale.payments || []).map((p) => {
      const n = Number(p.nominal || 0);
      sisa = Math.max(sisa - n, 0);
      return { ...p, nominalNum: n, remainingNum: sisa };
    });
  }, [sale.payments, totalPrice]);

  const totalPaid = useMemo(
    () => (sale.payments || []).reduce((a, p) => a + Number(p.nominal || 0), 0),
    [sale.payments]
  );
  const finalRemaining = Math.max(totalPrice - totalPaid, 0);
  const payStatus =
    finalRemaining === 0 && (sale.payments?.length || 0) > 0
      ? "Lunas"
      : "Belum Lunas";

  const addPayment = async () => {
    const newPayment = {
      paymentDate: convertToInputDateFormat(paymentDate),
      paymentMethod,
      nominal: nominal,
      paymentProof: paymentProof,
    };
    // setSale((prev) => ({ ...prev, payments: [...prev.payments, newPayment] }));
    console.log("newPayment: ", newPayment);

    try {
      const addPaymentResponse = await createAfkirChickenSalePayment(
        newPayment,
        id
      );

      if (addPaymentResponse.status == 201) {
        fetchSalesData();
        setShowPaymentModal(false);
        setPaymentMethod("Tunai");
        setPaymentDate(today);
        setNominal("");
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  const openEdit = (payment) => {
    setSelectedEditPayment({
      ...payment,
      nominal: String(payment.nominal ?? ""),
      paymentDate: toYMD(payment.paymentDate),
    });
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    try {
      //FIX THE PAYMENT PROOF
      const payload = {
        paymentMethod: selectedEditPayment.paymentMethod,
        paymentProof: paymentProof,
        paymentDate: convertToInputDateFormat(selectedEditPayment.paymentDate),
        nominal: selectedEditPayment.nominal,
      };
      const updatePaymentResponse = await updateAfkirChickenSalePayment(
        payload,
        id,
        selectedEditPayment.id
      );
      if (updatePaymentResponse.status == 200) {
        alert("✅ Update data pembayaran berhasil!");
        setShowEditModal(false);
        fetchSalesData();
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleSave = () => {
    navigate(-1, { state: { refetch: true } });
    // const payload = {
    //   ...sale,
    //   payments: sale.payments.map((p) => ({
    //     paymentDate: p.paymentDate,
    //     paymentMethod: p.paymentMethod,
    //     nominal: String(p.nominal ?? "0"),
    //     proof: p.proof ?? null,
    //   })),
    // };
    // console.log("SAVE payload:", payload);
  };

  const handleDeletePayment = async () => {
    try {
      const deletePaymentResponse = await deleteAfkirChickenSalePayment(
        selectedDeletePayment.id,
        id
      );
      console.log("deletePaymentResponse: ", deletePaymentResponse);
      if (deletePaymentResponse.status == 204) {
        alert("✅ Berhasil menghapus data pembayaran");
        setShowConfirmDelete(false);
        fetchSalesData();
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchSalesData = async () => {
    try {
      const detailResponse = await getAfkirChickenSale(id);
      console.log("detailResponse: ", detailResponse);
      if (detailResponse.status == 200) {
        setSale(detailResponse.data.data);
        setIsMoreThanDeadlinePaymentDate(
          detailResponse.data.data.isMoreThanDeadlinePaymentDate
        );
        setDeadlinePaymentDate(detailResponse.data.data.deadlinePaymentDate);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Detail Penjualan Ayam</h2>

      <div className="border rounded p-6">
        {/* Ringkasan atas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-600">Tanggal Penjualan</p>
            <p className="font-semibold text-lg">{sale.sellDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Umur Ayam</p>
            <p className="font-semibold text-lg">{sale.chickenAge} Minggu</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Kandang</p>
            <p className="font-semibold text-lg">
              {sale.chickenCage?.cage?.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-600">Nama Pelanggan</p>
            <p className="font-semibold text-lg">
              {sale.afkirChickenCustomer?.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nomor Telepon</p>
            <p className="font-semibold text-lg">
              {sale.afkirChickenCustomer?.phoneNumber}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Alamat</p>
            <p className="font-semibold text-lg">
              {sale.afkirChickenCustomer?.address}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-2">
          <div>
            <p className="text-sm text-gray-600">Jumlah Ayam Terjual</p>
            <p className="font-semibold text-lg">
              {sale.totalSellChicken} Ekor
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Harga Jual / Ekor</p>
            <p className="font-semibold text-lg">
              {rupiah(sale.pricePerChicken)} / Ekor
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Harga Jual Total</p>
            <p className="font-semibold text-lg">{rupiah(totalPrice)}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-2">Payment Deadline</h2>
          <p
            className={`flex text-lg items-center gap-2 font-semibold ${
              isMoreThanDeadlinePaymentDate ? "text-red-600" : "text-black"
            }`}
          >
            {isMoreThanDeadlinePaymentDate && (
              <span className="text-red-600">
                <GoAlertFill />
              </span>
            )}
            {deadlinePaymentDate}
          </p>
        </div>

        {/* Pembayaran */}
        <div className="border rounded mt-6">
          <div className="flex items-center justify-between p-4">
            <p className="font-semibold text-lg">Pembayaran</p>
            {sale.remainingPayment != 0 && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-orange-300 hover:bg-orange-500 px-4 py-2 rounded text-black cursor-pointer"
              >
                Pilih Pembayaran
              </button>
            )}
          </div>

          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="text-left px-3 py-2 text-sm">Tanggal</th>
                    <th className="text-left px-3 py-2 text-sm">
                      Metode Pembayaran
                    </th>
                    <th className="text-left px-3 py-2 text-sm">
                      Nominal Pembayaran
                    </th>
                    <th className="text-left px-3 py-2 text-sm">Sisa Bayar</th>
                    <th className="text-left px-3 py-2 text-sm">
                      Bukti Pembayaran
                    </th>
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
                        <td className="px-3 py-2">
                          {new Date(p.date).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-3 py-2">{p.paymentMethod}</td>
                        <td className="px-3 py-2">{rupiah(p.nominalNum)}</td>
                        <td className="px-3 py-2">{rupiah(p.remainingNum)}</td>
                        <td className="px-3 py-2 underline cursor-pointer">
                          {p.proof}
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-3">
                            <button
                              className="p-1 rounded hover:bg-gray-100"
                              title="Edit"
                              onClick={() => openEdit(p)}
                            >
                              <BiSolidEditAlt size={18} />
                            </button>
                            <button
                              className="p-1 rounded hover:bg-gray-100"
                              title="Hapus"
                              onClick={() => {
                                setShowConfirmDelete(true);
                                setSelectedDeletePayment(p);
                              }}
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
                <p className="font-medium">
                  Sisa Bayar : {rupiah(finalRemaining)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-green-700 hover:bg-green-900 text-white cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Modal Tambah Pembayaran */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-xl">
            <h3 className="text-lg font-bold mb-4">Pembayaran</h3>

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
                  setPaymentMethod("Tunai");
                  setPaymentDate(today);
                  setNominal("");
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

      {showEditModal && selectedEditPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-xl">
            <h3 className="text-lg font-bold mb-4">Edit Pembayaran</h3>

            <label className="block mb-1 font-medium">Metode Pembayaran</label>
            <select
              className="w-full border rounded p-2 mb-3"
              value={selectedEditPayment.paymentMethod}
              onChange={(e) =>
                setSelectedEditPayment((p) => ({
                  ...p,
                  paymentMethod: e.target.value,
                }))
              }
            >
              <option value="Tunai">Tunai</option>
              <option value="Non Tunai">Non Tunai</option>
            </select>

            <label className="block mb-1 font-medium">Nominal Pembayaran</label>
            <input
              type="number"
              className="w-full border rounded p-2 mb-3"
              placeholder="Masukkan nominal"
              value={selectedEditPayment.nominal}
              onChange={(e) =>
                setSelectedEditPayment((p) => ({
                  ...p,
                  nominal: e.target.value,
                }))
              }
            />

            <label className="block mb-1 font-medium">Tanggal Bayar</label>
            <input
              type="date"
              className="w-full border rounded p-2 mb-3"
              value={selectedEditPayment.paymentDate}
              onChange={(e) =>
                setSelectedEditPayment((p) => ({
                  ...p,
                  paymentDate: e.target.value,
                }))
              }
            />

            <label className="block mb-1 font-medium">Bukti Pembayaran</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4"
              placeholder="Link / nama file"
              value={selectedEditPayment.proof ?? ""}
              onChange={(e) =>
                setSelectedEditPayment((p) => ({ ...p, proof: e.target.value }))
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedEditPayment(null);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-6">
              Apakah anda yakin untuk menghapus data pembayaran ini?
            </h2>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="cursor-pointer px-6 py-2 rounded-lg bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300"
              >
                Tidak
              </button>
              <button
                onClick={handleDeletePayment}
                className="cursor-pointer px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
