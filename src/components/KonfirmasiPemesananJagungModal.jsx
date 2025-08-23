import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const rupiah = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;
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

const KonfirmasiPemesananJagungModal = ({
  open = true,
  onClose,
  onConfirm,
  data = {
    id: null,
    quantity: 50,
    pricePerKg: 5000,
    totalPrice: 250000,
    supplier: { id: 1, name: "Super Jagung" },
    maxOrderQuantity: 100,
    moistureLevel: 16.5,
    ovenCondition: "Hidup",
  },
}) => {
  const unitPriceFromDraft = useMemo(() => {
    const q = Number(data?.quantity || 0);
    const basePrice = Number(data?.price || 0);
    const discount = Number(data?.discount || 0);
    if (basePrice > 0) {
      return basePrice * (1 - discount / 100);
    }
    if (q > 0 && Number(data?.totalPrice || 0) > 0) {
      return Math.round(Number(data.totalPrice) / q);
    }
    return 0;
  }, [data]);

  const [qty, setQty] = useState(Number(data?.quantity || 0));
  const [pricePerKg, setPricePerKg] = useState(Number(unitPriceFromDraft || 0));
  const [editQty, setEditQty] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const maxQty = Number(data?.maxOrderQuantity || 0);

  const [expiredAt, setExpiredAt] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [deadlinePaymentDate, setDeadlinePaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const totalPrice = useMemo(
    () => Number(qty || 0) * Number(pricePerKg || 0),
    [qty, pricePerKg]
  );

  const [paymentType, setPaymentType] = useState("Penuh");
  const [payments, setPayments] = useState([]);
  const totalPaid = useMemo(
    () => payments.reduce((a, p) => a + Number(p.nominal || 0), 0),
    [payments]
  );
  const remaining = Math.max(totalPrice - totalPaid, 0);
  const paymentStatus =
    remaining === 0 && payments.length > 0 ? "Lunas" : "Belum Lunas";

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [nominal, setNominal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Tunai");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [paymentProof, setPaymentProof] = useState("https://example.com");
  const dateRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    setQty(Number(data?.quantity || 0));
    setPricePerKg(Number(unitPriceFromDraft || 0));
    setPaymentType("Penuh");
    setPayments([]);
    setNominal("");
    setPaymentMethod("Tunai");
    setPaymentDate(new Date().toISOString().slice(0, 10));
    setPaymentProof("https://example.com");
  }, [open, data, unitPriceFromDraft]);

  const remainingAfterIdx = (idx) => {
    const paidToIdx = payments
      .slice(0, idx + 1)
      .reduce((acc, p) => acc + Number(p.nominal || 0), 0);
    return Math.max(totalPrice - paidToIdx, 0);
  };

  const addPayment = () => {
    const amount = nominal;
    if (!amount) return;
    const newPay = {
      paymentDate: toInputDate(paymentDate),
      paymentMethod,
      nominal: String(amount),
      paymentProof: paymentProof,
    };
    setPayments((prev) => [...prev, newPay]);
    setShowPaymentModal(false);
    setNominal("");
    setPaymentProof("https://example.com");
    setPaymentDate(new Date().toISOString().slice(0, 10));
  };

  const deletePayment = (idx) => {
    setPayments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleConfirm = () => {
    // validasi pembayaran penuh
    if (paymentType === "Penuh" && totalPaid !== totalPrice) {
      alert(
        "❌ Total pembayaran harus sama dengan harga total pesanan untuk tipe 'Penuh'."
      );
      return;
    }

    const payload = {
      warehouseId: data?.warehouse?.id,
      supplierId: data?.supplier?.id ?? null,
      ovenCondition: data?.oveCondition,
      cornWaterLevel: data?.cornWaterLevel,
      isOvenCanOperateInNearDay: data?.isOvenCanOperateInNearDay,
      quantity: Number(qty || 0),
      price: data?.price,
      discount: data?.discount,
      paymentType,
      expiredAt: toInputDate(expiredAt),
      deadlinePaymentDate: toInputDate(deadlinePaymentDate),
      payments: payments.map((p) => ({
        paymentDate: p.paymentDate ?? "",
        paymentMethod: p.paymentMethod ?? "",
        nominal: String(p.nominal ?? "0"),
        paymentProof: p.paymentProof ?? null,
      })),
    };

    onConfirm?.(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="bg-white w-[95%] max-w-4xl p-6 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">
          Konfirmasi Pemesanan Jagung
        </h2>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mt-3">Nama Barang</p>
          <p className="font-extrabold text-lg">Jagung</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Tanggal Pemesanan</p>
            <p className="font-semibold">
              {new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p className="text-sm text-gray-600 mt-3">Supplier</p>
            <p className="font-semibold">{data?.supplier?.name || "-"}</p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Kadar Air Jagung</p>
                <p className="font-semibold">
                  {data?.cornWaterLevel != null
                    ? `${data.cornWaterLevel}%`
                    : "> 16 %"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Kondisi Oven</p>
                <p className="font-semibold">{data?.ovenCondition || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Jumlah Maksimum Pesan</p>
                <p className="font-semibold">{maxQty ? `${maxQty} Kg` : "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Harga Total (auto)</p>
                <p className="font-semibold">{rupiah(totalPrice)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Qty & Price editable */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
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
                  min={0}
                  max={maxQty || undefined}
                  className="border rounded px-3 py-2 w-full"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                />
                <span className="font-semibold">Kg</span>
              </div>
            ) : (
              <p className="font-bold mt-1">{qty} Kg</p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 ">
              <p className="text-sm text-gray-600">Harga Beli / Kg</p>
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
                value={pricePerKg}
                onChange={(e) => setPricePerKg(Number(e.target.value))}
              />
            ) : (
              <p className="font-bold mt-1">{rupiah(pricePerKg)} / Kg</p>
            )}
          </div>
        </div>

        {/* Tipe Pembayaran */}
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-sm text-gray-600">
            Tanggal Kadaluarsa Jagung
          </label>
          <input
            type="date"
            className="border rounded p-2"
            value={expiredAt}
            onChange={(e) => setExpiredAt(e.target.value)}
          />
        </div>

        {/* Pembayaran */}
        <div className="flex flex-col mb-2">
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

        {/* Tenggat Pembayaran */}
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
                        colSpan={6}
                        className="px-3 py-3 text-center text-gray-500"
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

        {/* Aksi */}
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
            Konfirmasi pesanan
          </button>
          {/* <button
            onClick={() => {
              console.log("data: ", data);
            }}
          >
            CHECK
          </button> */}
        </div>
      </div>

      {/* ====== PAYMENT MODAL ====== */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
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
              className="w-full border rounded p-2 mb-3"
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

export default KonfirmasiPemesananJagungModal;
