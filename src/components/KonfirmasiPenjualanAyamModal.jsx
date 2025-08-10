// KonfirmasiPenjualanAyamModal.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { BiSolidEditAlt } from "react-icons/bi";

// Pakai util kamu kalau ada; kalau tidak, fallback sederhana:
const toInputDate = (d) => {
  try {
    if (!d) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    const parsed = new Date(d);
    return isNaN(parsed) ? "" : parsed.toISOString().slice(0, 10);
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
    kandang: { id: 1, name: "Sidodadi 04" },
    kandangOptions: [
      { id: 1, name: "Sidodadi 04" },
      { id: 2, name: "Kediri 02" },
    ],
    customer: { id: 1, name: "Pelanggan 01" },
    quantity: 1100, // ekor
    pricePerUnit: 5000000, // harga per ekor
  },
}) => {
  // Editable fields
  const [kandang, setKandang] = useState(sale.kandang);
  const [qty, setQty] = useState(sale.quantity);
  const [pricePerUnit, setPricePerUnit] = useState(sale.pricePerUnit);
  const [saleDate] = useState(sale.saleDate); // tampil saja
  const [estimationArrivalDate] = useState(""); // tidak dipakai di penjualan

  const [editQty, setEditQty] = useState(false);
  const [editPrice, setEditPrice] = useState(false);

  // Global payment method (dipilih di luar modal)
  const [paymentMethod, setPaymentMethod] = useState("Tunai");

  // Payments
  const [payments, setPayments] = useState([]); // {paymentDate, paymentMethod, nominal:string, proof}
  const orderTotal = useMemo(
    () => Number(qty || 0) * Number(pricePerUnit || 0),
    [qty, pricePerUnit]
  );

  const totalPaid = useMemo(
    () => payments.reduce((a, p) => a + Number(p.nominal || 0), 0),
    [payments]
  );
  const remaining = Math.max(orderTotal - totalPaid, 0);
  const paymentStatus =
    remaining === 0 && payments.length > 0 ? "Lunas" : "Belum Lunas";

  // Modal state (satu pembayaran per buka modal)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [nominal, setNominal] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const dateRef = useRef(null);

  // Hitung sisa bayar per baris berdasarkan urutan
  const remainingAfterIdx = (idx) => {
    const paidToIdx = payments
      .slice(0, idx + 1)
      .reduce((acc, p) => acc + Number(p.nominal || 0), 0);
    return Math.max(orderTotal - paidToIdx, 0);
  };

  const addPayment = () => {
    // Ambil metode dari global select
    const amount = Number(nominal || 0);
    const newPay = {
      paymentDate: toInputDate(paymentDate),
      paymentMethod,
      nominal: String(amount), // <- string untuk backend Go
      proof: paymentProof ? paymentProof.name : "-",
    };
    setPayments((prev) => [...prev, newPay]);
    // reset form
    setShowPaymentModal(false);
    setNominal("");
    setPaymentProof(null);
    setPaymentDate(new Date().toISOString().slice(0, 10));
  };

  const deletePayment = (idx) => {
    setPayments((prev) => prev.filter((_, i) => i !== idx));
  };

  // Recalculate nothing needed on qty/price change, because we compute sisa on the fly

  const handleConfirm = () => {
    const cleanedPayments = payments.map(({ ...p }) => {
      return {
        paymentDate: p.paymentDate,
        paymentMethod: p.paymentMethod,
        nominal: String(p.nominal || "0"),
        proof: p.proof,
      };
    });

    onConfirm?.({
      saleDate,
      kandangId: kandang?.id,
      customerId: sale.customer?.id,
      quantity: Number(qty || 0),
      pricePerUnit: Number(pricePerUnit || 0),
      totalPrice: orderTotal,
      payments: cleanedPayments,
      paymentStatus,
      remaining,
    });
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
            <p className="font-semibold">{kandang?.name}</p>
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
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                <span className="font-semibold">Ekor</span>
              </div>
            ) : (
              <p className="font-bold mt-1">{qty} Ekor</p>
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
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
              />
            ) : (
              <p className="font-bold mt-1">{rupiah(pricePerUnit)} / Ekor</p>
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
            className="border rounded p-2 ml-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Penuh">Penuh</option>
            <option value="Cicil">Cicil</option>
          </select>
        </div>

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

            <label className="block mb-1 font-medium">Tanggal Bayar</label>
            <input
              type="date"
              className="w-full border rounded p-2 mb-3"
              value={toInputDate(paymentDate)}
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
