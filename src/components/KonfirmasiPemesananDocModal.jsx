// KonfirmasiPemesananDocModal.jsx
import React, { useMemo, useRef, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const rupiah = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

const KonfirmasiPemesananDocModal = ({
  onClose,
  onConfirm,
  order = {
    orderDate: "20 Maret 2025",
    supplier: "Dagang A",
    kandang: "Sidodadi DOC",
    kandangOptions: ["Sidodadi DOC", "Kediri DOC", "Blitar DOC"],
    quantity: 1100,
    price: 5000000,
  },
}) => {
  const [kandang, setKandang] = useState(order.kandang);
  const [qty, setQty] = useState(order.quantity);
  const [price, setPrice] = useState(order.price);
  const [etaDate, setEtaDate] = useState("");

  const [editKandang, setEditKandang] = useState(false);
  const [editQty, setEditQty] = useState(false);
  const [editPrice, setEditPrice] = useState(false);

  const [payments, setPayments] = useState([]);
  const totalPaid = useMemo(
    () => payments.reduce((acc, p) => acc + Number(p.nominal || 0), 0),
    [payments]
  );
  const remaining = Math.max(Number(price || 0) - totalPaid, 0);
  const paymentStatus =
    remaining === 0 && payments.length > 0 ? "Lunas" : "Belum Lunas";

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState("Penuh");
  const [paymentMethod, setPaymentMethod] = useState("Tunai");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [nominal, setNominal] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);

  const [draftPayments, setDraftPayments] = useState([]);

  const dateRef = useRef(null);

  const addPayment = () => {
    const paid = payments.reduce((a, p) => a + Number(p.nominal || 0), 0);
    const sisa = Math.max(Number(price || 0) - paid, 0);

    const finalNominal = paymentType === "Penuh" ? sisa : Number(nominal || 0);

    const newPay = {
      paymentDate,
      paymentMethod,
      nominal: finalNominal,
      proof: paymentProof ? paymentProof.name : "-",
    };

    setPayments((p) => [...p, newPay]);
    setShowPaymentModal(false);
    setPaymentMethod("Tunai");
    setNominal("");
    setPaymentProof(null);
    setPaymentDate(new Date().toISOString().slice(0, 10));
  };

  const deletePayment = (idx) => {
    setPayments((p) => p.filter((_, i) => i !== idx));
  };

  const confirmOrder = () => {
    onConfirm?.({
      supplier: order.supplier,
      orderDate: order.orderDate,
      kandang,
      quantity: Number(qty || 0),
      price: Number(price || 0),
      etaDate,
      payments,
      paymentStatus,
      remaining,
    });
  };

  const remainingAfterIdx = (idx) => {
    const paidToIdx = payments
      .slice(0, idx + 1)
      .reduce((acc, p) => acc + Number(p.nominal || 0), 0);
    return Math.max(Number(price || 0) - paidToIdx, 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-[95%] max-w-3xl p-6 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">
          Konfirmasi Pemesanan DOC
        </h2>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Tanggal Pemesanan</p>
            <p className="font-semibold">{order.orderDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Supplier</p>
            <p className="font-semibold">{order.supplier}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">Kandang</p>
              <button
                className="p-1 rounded border hover:bg-gray-100"
                onClick={() => setEditKandang((v) => !v)}
                title="Edit Kandang"
              >
                <BiSolidEditAlt size={16} />
              </button>
            </div>
            {editKandang ? (
              <select
                className="border rounded px-3 py-2 mt-1 w-full"
                value={kandang.id}
                onChange={(e) => {
                  const selectedCage = order.kandangOptions?.find(
                    (k) => k.id === parseInt(e.target.value)
                  );
                  setKandang(selectedCage);
                }}
              >
                {order.kandangOptions?.map((kandang) => (
                  <option key={kandang.id} value={kandang.id}>
                    {kandang.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="font-bold mt-1">{kandang.name}</p>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">Harga</p>
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            ) : (
              <p className="font-bold mt-1">{rupiah(price)}</p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">Jumlah Pemesanan</p>
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

          <div className="mb-4">
            <p className="text-sm text-gray-600">Tanggal Estimasi Tiba</p>
            <div className="relative mt-1">
              <input
                type="date"
                value={etaDate || ""}
                onChange={(e) => setEtaDate(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                style={{ appearance: "auto" }}
              />
            </div>
          </div>
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
            onClick={confirmOrder}
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

            {payments.length === 0 && (
              <>
                <label className="block mb-1 font-medium">
                  Tipe Pembayaran
                </label>
                <select
                  className="w-full border rounded p-2 mb-3"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <option value="Penuh">Penuh</option>
                  <option value="Cicil">Cicil</option>
                </select>
              </>
            )}

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

export default KonfirmasiPemesananDocModal;
