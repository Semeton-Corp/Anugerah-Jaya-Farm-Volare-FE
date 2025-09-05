import { useEffect } from "react";
import { useState } from "react";

export const EditPembayaranModal = ({
  open,
  onClose,
  onSave,
  title = "Tambah Pembayaran",
  defaultMethod = "Tunai",
  initialValues, // { paymentMethod, nominal, paymentDate(YYYY-MM-DD), paymentProof }
}) => {
  const [paymentMethod, setPaymentMethod] = useState(defaultMethod);
  const [nominal, setNominal] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [paymentProof, setPaymentProof] = useState("https://example.com");

  useEffect(() => {
    if (!open) return;

    if (initialValues) {
      setPaymentMethod(initialValues.paymentMethod || defaultMethod);
      setNominal(
        initialValues.nominal != null ? String(initialValues.nominal) : ""
      );
      // initialValues.paymentDate bisa "DD-MM-YYYY" dari API, kita normalisasi
      const raw = initialValues.paymentDate || "";
      const parts = raw.includes("-") ? raw.split("-") : [];
      const isDDMMYYYY =
        parts.length === 3 && parts[0].length === 2 && parts[2].length === 4;
      const isoLike = isDDMMYYYY
        ? `${parts[2]}-${parts[1]}-${parts[0]}`
        : raw || new Date().toISOString().slice(0, 10);

      setPaymentDate(isoLike);
      setPaymentProof(initialValues.paymentProof || "https://example.com");
    } else {
      setPaymentMethod(defaultMethod);
      setNominal("");
      setPaymentDate(new Date().toISOString().slice(0, 10));
      setPaymentProof("https://example.com");
    }
  }, [open, defaultMethod, initialValues]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-xl">
        <h3 className="text-lg font-bold mb-4">{title}</h3>

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
          min={0}
        />

        <label className="block mb-1 font-medium">Tanggal Bayar</label>
        <input
          type="date"
          className="w-full border rounded p-2 mb-3"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
        />

        <label className="block mb-1 font-medium">Bukti Pembayaran (URL)</label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          placeholder="https://contoh.com/bukti"
          value={paymentProof}
          onChange={(e) => setPaymentProof(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={() =>
              onSave({
                paymentMethod,
                nominal,
                paymentDate,
                paymentProof,
              })
            }
            className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
