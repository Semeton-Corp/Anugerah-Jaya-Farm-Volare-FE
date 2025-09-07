import React, { useMemo, useRef, useState, useEffect } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const toInputDate = (d) => {
  try {
    if (!d) return "";
    const parsed = /^\d{4}-\d{2}-\d{2}$/.test(d) ? new Date(d) : new Date(d);
    if (isNaN(parsed)) return "";

    const day = String(parsed.getDate()).padStart(2, "0");
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const year = parsed.getFullYear();

    return `${day}-${month}-${year}`;
  } catch {
    return "";
  }
};

const rupiah = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

const KonfirmasiPenjualanAyamModal = ({
  onClose,
  onConfirm,
  sale = {
    saleDate: "20 Maret 2025",
    chickenCage: { id: 1, name: "Sidodadi 04" },
    customer: { id: 1, name: "Pelanggan 01" },
    totalSellChicken: 1100,
    pricePerChicken: 5000000,
  },
}) => {
  const [chickenCage, setChickenCage] = useState(sale.chickenCage);
  const [totalSellChicken, setTotalSellChicken] = useState(
    sale.totalSellChicken
  );
  const [pricePerChicken, setPricePerChicken] = useState(sale.pricePerChicken);
  const [saleDate] = useState(sale.saleDate);
  const [estimationArrivalDate] = useState("");

  const [deadlinePaymentDate, setDeadlinePaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [editQty, setEditQty] = useState(false);
  const [editPrice, setEditPrice] = useState(false);

  const [paymentType, setPaymentType] = useState("Penuh");
  const [paymentMethod, setPaymentMethod] = useState("Tunai");

  const [payments, setPayments] = useState([]);
  const orderTotal = useMemo(
    () => Number(totalSellChicken || 0) * Number(pricePerChicken || 0),
    [totalSellChicken, pricePerChicken]
  );

  const totalPaid = useMemo(
    () => payments.reduce((a, p) => a + Number(p.nominal || 0), 0),
    [payments]
  );
  const remaining = Math.max(orderTotal - totalPaid, 0);
  const paymentStatus =
    remaining === 0 && payments.length > 0 ? "Lunas" : "Belum Lunas";

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const today = (() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${year}-${month}-${day}`;
  })();
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [nominal, setNominal] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const dateRef = useRef(null);

  const remainingAfterIdx = (idx) => {
    const paidToIdx = payments
      .slice(0, idx + 1)
      .reduce((acc, p) => acc + Number(p.nominal || 0), 0);
    return Math.max(orderTotal - paidToIdx, 0);
  };

  const addPayment = () => {
    const amount = Number(nominal || 0);
    const newPay = {
      paymentDate: toInputDate(paymentDate),
      paymentMethod: paymentMethod,
      nominal: String(amount),
      proof: paymentProof ? paymentProof.name : "-",
    };
    setPayments((prev) => [...prev, newPay]);
    setShowPaymentModal(false);
    setNominal("");
    setPaymentProof(null);
    setPaymentDate(new Date().toISOString().slice(0, 10));
  };

  const deletePayment = (idx) => {
    setPayments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleConfirm = () => {
    const totalPrice =
      Number(totalSellChicken || 0) * Number(pricePerChicken || 0);

    const cleanedPayments = payments.map((p) => ({
      paymentDate: p.paymentDate ?? "",
      paymentMethod: p.paymentMethod ?? "",
      nominal: Number(p.nominal ?? 0),
      proof: p.proof ?? null,
    }));

    const totalPaid = cleanedPayments.reduce(
      (sum, p) => sum + Number(p.nominal || 0),
      0
    );
    console.log("paymentType: ", paymentType);
    console.log("totalPaid: ", totalPaid);
    console.log("totalPrice: ", totalPrice);

    if (paymentType === "Penuh" && totalPaid !== totalPrice) {
      alert(
        "❌ Total pembayaran harus sama dengan harga total penjualan untuk pembayaran penuh."
      );
      return;
    }

    const payload = {
      chickenCageId: chickenCage?.id ?? null,
      afkirChickenCustomerId: sale.customer?.id ?? null,
      totalSellChicken: Number(totalSellChicken || 0),
      pricePerChicken: pricePerChicken || "0",
      payments: cleanedPayments.map((p) => ({
        ...p,
        nominal: String(p.nominal),
      })),
      paymentType: paymentType ?? "",
      deadlinePaymentDate:
        paymentType == "Penuh" ? undefined : deadlinePaymentDate,
    };

    onConfirm?.(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-[95%] max-w-4xl p-6 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">
          Konfirmasi Penjualan Ayam
        </h2>

        {/* Info atas */}
        <div className="mb-4 grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Tanggal Penjualan</p>
            <p className="font-semibold">{saleDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Kandang</p>
            <p className="font-semibold">{chickenCage?.cage?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pelanggan</p>
            <p className="font-semibold">{sale.customer?.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-2">
          {/* Qty */}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">Jumlah ayam terjual</p>
              <button
                className="p-1 rounded border hover:bg-gray-100"
                onClick={() => setEditQty((v) => !v)}
                title="Edit Jumlah"
              >
                <BiSolidEditAlt size={16} />
              </button>
            </div>
            {editQty ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  className="border rounded px-3 py-2 w-full"
                  value={totalSellChicken}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > chickenCage?.totalChicken) {
                      setTotalSellChicken(chickenCage?.totalChicken);
                    } else {
                      setTotalSellChicken(value);
                    }
                  }}
                />
                <span className="font-semibold">Ekor</span>
              </div>
            ) : (
              <p className="font-bold mt-1">{totalSellChicken} Ekor</p>
            )}
          </div>

          {/* Price per unit */}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">Harga Jual / Ekor</p>
              <button
                className="p-1 rounded border hover:bg-gray-100"
                onClick={() => setEditPrice((v) => !v)}
                title="Edit Harga"
              >
                <BiSolidEditAlt size={16} />
              </button>
            </div>
            {editPrice ? (
              <input
                type="number"
                className="border rounded px-3 py-2 mt-1 w-full"
                value={pricePerChicken}
                onChange={(e) => setPricePerChicken(e.target.value)}
              />
            ) : (
              <p className="font-bold mt-1">{rupiah(pricePerChicken)} / Ekor</p>
            )}
          </div>

          {/* Total */}
          <div>
            <p className="text-sm text-gray-600">Harga Jual Total</p>
            <p className="font-bold mt-1">{rupiah(orderTotal)}</p>
          </div>
        </div>

        {/* Global payment controls */}
        <div className="flex flex-col mt-4 mb-2">
          <label className="text-sm text-gray-600">Tipe Pembayaran</label>
          <select
            className="border rounded p-2"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="Penuh">Penuh</option>
            <option value="Cicil">Cicil</option>
          </select>
        </div>

        {paymentType != "Penuh" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Tenggat Pembayaran
            </label>
            <input
              type="date"
              className="border rounded p-2"
              value={deadlinePaymentDate}
              onChange={(e) => setDeadlinePaymentDate(e.target.value)}
            />
          </div>
        )}

        {/* Pembayaran */}
        <div className="border rounded mt-3">
          <div className="flex items-center justify-between p-4">
            <p className="font-semibold text-lg">Pembayaran</p>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded text-black cursor-pointer"
            >
              Pilih Pembayaran
            </button>
          </div>

          <div className="px-4 pb-4">
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
                  {payments.length === 0 ? (
                    <tr>
                      <td
                        className="px-3 py-3 text-center text-gray-500"
                        colSpan={6}
                      >
                        Belum ada data pembayaran.
                      </td>
                    </tr>
                  ) : (
                    payments.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2">{p.paymentDate}</td>
                        <td className="px-3 py-2">{p.paymentMethod}</td>
                        <td className="px-3 py-2">{rupiah(p.nominal)}</td>
                        <td className="px-3 py-2">
                          {rupiah(remainingAfterIdx(i))}
                        </td>
                        <td className="px-3 py-2 underline cursor-pointer">
                          {p.proof || "-"}
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => deletePayment(i)}
                            className="p-1 rounded hover:bg-gray-100"
                            title="Hapus"
                          >
                            <MdDelete size={20} />
                          </button>
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
                <span
                  className={`px-3 py-1 rounded ${
                    paymentStatus === "Lunas"
                      ? "bg-green-200 text-green-900"
                      : "bg-orange-200 text-orange-900"
                  }`}
                >
                  {paymentStatus}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm">Sisa Bayar : {rupiah(remaining)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-green-700 hover:bg-green-900 text-white cursor-pointer"
          >
            Konfirmasi
          </button>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-xl">
            <h3 className="text-lg font-bold mb-4">Pembayaran</h3>

            <label className="block mb-1 font-medium">Nominal Pembayaran</label>
            <input
              type="number"
              className="w-full border rounded p-2 mb-3"
              placeholder="Masukkan nominal"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
            />

            <label className="text-sm text-gray-600">Metode Pembayaran</label>
            <select
              className="w-full border rounded p-2 mb-3 "
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Tunai">Tunai</option>
              <option value="Non Tunai">Non Tunai</option>
            </select>

            <label className="block mb-1 font-medium">Tanggal Bayar</label>
            <input
              type="date"
              className="w-full border rounded p-2 mb-3"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              ref={dateRef}
            />

            <label className="block mb-1 font-medium">Bukti Pembayaran</label>
            <input
              type="file"
              className="w-full border rounded p-2 mb-4"
              onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPaymentModal(false)}
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
};

export default KonfirmasiPenjualanAyamModal;
