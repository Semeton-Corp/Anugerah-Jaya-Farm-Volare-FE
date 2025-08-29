import React, { useEffect, useMemo, useState } from "react";
import { getLocationPresenceSummaries } from "../services/presence";

const classNames = (...arr) => arr.filter(Boolean).join(" ");

function Badge({ children, intent = "gray" }) {
  const styles = {
    green: "bg-[#87FF8B]/50 text-[#066000]",
    yellow: "bg-[#ECBB55]/50 text-[#5F4000]",
    blue: "bg-[#9FC4CA]/50 text-[#13353A]",
    red: "bg-[#FF5E5E]/50 text-[#640404]",
    gray: "bg-gray-100/50 text-gray-700",
  };
  return (
    <span
      className={classNames(
        "px-3 py-1 rounded-full text-sm font-medium",
        styles[intent]
      )}
    >
      {children}
    </span>
  );
}

function PillButton({ children, onClick, variant = "ghost", disabled }) {
  const base =
    "px-4 py-2 rounded-xl text-sm font-semibold border transition cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed";
  const variants = {
    ghost: "bg-white border-gray-200 hover:bg-gray-50",
    primary:
      "bg-emerald-500 border-emerald-600 text-white hover:bg-emerald-600",
    warning: "bg-[#ECBB55] text-[#5F4000] hover:bg-orange-500",
    danger: "bg-red-500 border-red-600 text-white hover:bg-red-600",
    neutral: "bg-[#9FC4CA] text-[#13353A]",
  };
  return (
    <button
      className={classNames(base, variants[variant])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Modal({ open, title, onClose, footer, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] space-y-4 overflow-y-auto px-6 py-5">
          {children}
        </div>
        <div className="flex items-center gap-3 border-t bg-gray-50 px-6 py-4">
          {footer}
        </div>
      </div>
    </div>
  );
}

export default function PresensiKelolaPegawai() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeModal, setActiveModal] = useState(null);
  const [selected, setSelected] = useState(new Set());

  const fetchSummary = async () => {
    try {
      const summaryResponse = await getLocationPresenceSummaries();
      console.log("summaryResponse: ", summaryResponse);
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    fetchSummary();
  }, []);

  const openModal = (type, rowIndex) => {
    setActiveModal({ type, rowIndex });
    setSelected(new Set());
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelected(new Set());
  };

  const currentRequests = useMemo(() => {
    if (!activeModal) return [];
    const r = rows[activeModal.rowIndex];
    return r?.requests?.[activeModal.type] || [];
  }, [activeModal, rows]);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    const ids = currentRequests
      .filter((x) => x.status === "pending")
      .map((x) => x.id);
    setSelected((prev) => {
      const allSelected = ids.every((id) => prev.has(id));
      return allSelected ? new Set() : new Set(ids);
    });
  };

  const updateStatus = (newStatus) => {
    if (!activeModal) return;
    const { rowIndex, type } = activeModal;
    setRows((prev) => {
      const next = [...prev];
      const reqs = next[rowIndex].requests[type].map((item) =>
        selected.has(item.id) && item.status === "pending"
          ? { ...item, status: newStatus }
          : item
      );
      next[rowIndex].requests[type] = reqs;
      return next;
    });
    setSelected(new Set());
  };

  if (error) {
    return (
      <div className="p-6">
        <p className="rounded-lg bg-red-50 p-4 text-red-700">
          Terjadi kesalahan: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">Presensi</h1>
        <div className="text-right text-gray-500">20 Maret 2025</div>
      </div>

      <div className="overflow-hidden rounded border shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Jabatan
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Jumlah Pegawai
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Hadir
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Sakit
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Izin
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Alpha
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Persetujuan Tidak Masuk
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Memuat data…
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.jabatan}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {row.jumlahPegawai} Orang
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge intent="green">{row.hadir} Orang</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge intent="yellow">{row.sakit} Orang</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge intent="blue">{row.izin} Orang</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge intent="red">{row.alpha} Orang</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-3">
                      <PillButton
                        variant="warning"
                        onClick={() => openModal("sakit", idx)}
                        disabled={row.sakit === 0}
                      >
                        Sakit
                      </PillButton>
                      <PillButton
                        variant="neutral"
                        onClick={() => openModal("izin", idx)}
                        disabled={row.izin === 0}
                      >
                        Izin
                      </PillButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ApprovalModal
        open={!!activeModal}
        type={activeModal?.type}
        row={activeModal ? rows[activeModal.rowIndex] : null}
        selected={selected}
        onToggle={toggleSelect}
        onToggleAll={toggleSelectAll}
        onApprove={() => updateStatus("approved")}
        onReject={() => updateStatus("rejected")}
        onClose={closeModal}
      />
    </div>
  );
}

function ApprovalModal({
  open,
  type,
  row,
  selected,
  onToggle,
  onToggleAll,
  onApprove,
  onReject,
  onClose,
}) {
  const isIzin = type === "izin";
  const title = isIzin ? `Persetujuan Izin` : `Persetujuan Sakit`;
  const requests = row?.requests?.[type] || [];
  const pending = requests.filter((x) => x.status === "pending");

  return (
    <Modal
      open={open}
      title={`${title}${row ? ` · ${row.jabatan}` : ""}`}
      onClose={onClose}
      footer={
        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-gray-500">
            {selected.size} dipilih dari {pending.length} permintaan
          </div>
          <div className="flex gap-3">
            <PillButton
              variant="danger"
              onClick={onReject}
              disabled={selected.size === 0}
            >
              Tolak ({selected.size})
            </PillButton>
            <PillButton
              variant="primary"
              onClick={onApprove}
              disabled={selected.size === 0}
            >
              Setujui ({selected.size})
            </PillButton>
          </div>
        </div>
      }
    >
      {requests.length === 0 && (
        <div className="rounded-xl border border-dashed p-6 text-center text-gray-500">
          Tidak ada permintaan.
        </div>
      )}

      {requests.length > 0 && (
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              onChange={onToggleAll}
              checked={
                pending.length > 0 && pending.every((x) => selected.has(x.id))
              }
              indeterminate={undefined}
            />
            Pilih Semua ({pending.length} permintaan)
          </label>

          {requests.map((r) => (
            <div key={r.id} className="rounded-2xl border p-4">
              <div className="mb-2 text-sm text-gray-500">
                {formatDateID(r.tanggal)}
              </div>
              <div className="flex items-start justify-between gap-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                    disabled={r.status !== "pending"}
                    checked={selected.has(r.id)}
                    onChange={() => onToggle(r.id)}
                  />
                  <div>
                    <div className="font-semibold">{r.nama}</div>
                    <div className="text-sm text-gray-600">
                      Keterangan : {r.keterangan}
                    </div>
                    <div className="mt-2">
                      {r.status === "pending" && (
                        <Badge intent="yellow">Menunggu Persetujuan</Badge>
                      )}
                      {r.status === "approved" && (
                        <Badge intent="green">Disetujui</Badge>
                      )}
                      {r.status === "rejected" && (
                        <Badge intent="red">Ditolak</Badge>
                      )}
                    </div>
                  </div>
                </label>
                <PillButton
                  onClick={() => window.open(r.buktiUrl, "_blank")}
                  variant="ghost"
                >
                  Bukti Izin
                </PillButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

function formatDateID(iso) {
  // Simple local date formatter for ID
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return iso;
  }
}
