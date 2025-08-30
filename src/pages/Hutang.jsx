// src/pages/Hutang.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MonthYearSelector from "../components/MonthYearSelector";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaExclamationTriangle } from "react-icons/fa";
import { getDebtOverview } from "../services/cashflow";

// Helpers
const formatRupiah = (n = 0) =>
  "Rp " +
  Number(n || 0)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const COLORS = {
  "Sudah dibayar": "#215963",
  "Jatuh tempo": "#215963",
  "Belum Lunas": "#E29901",
};

const toWA = (phone) => {
  if (!phone) return "#";
  const digits = String(phone).replace(/[^\d]/g, "");
  const withCc = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${withCc}`;
};

export default function Hutang() {
  const navigate = useNavigate();
  const location = useLocation();

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthName, setMonthName] = useState(
    new Intl.DateTimeFormat("id-ID", { month: "long" }).format(new Date())
  );

  const category = "Semua";

  const [payables, setDebts] = useState([]);
  const [pie, setPie] = useState(null);
  const [loading, setLoading] = useState(true);

  const nearingDue = useMemo(() => {
    const now = new Date();
    const soon = new Date(now);
    soon.setDate(soon.getDate() + 7);
    const row = (payables || []).find((p) => {
      const d = new Date(p.deadlinePaymentDate);
      if (Number.isNaN(d.getTime())) return false;
      const stillOwe = Number(p.remainingPayment || 0) > 0;
      d.setHours(0, 0, 0, 0);
      return stillOwe && d >= now && d <= soon;
    });
    return row ? `Tagihan “${row.name}” berstatus “Mendekati Jatuh Tempo”` : "";
  }, [payables]);

  const detailPages = ["detail-hutang"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await getDebtOverview(category, monthName, year);
      console.log("debt res: ", res);
      if (res?.status === 200) {
        const payload = res.data?.data || {};
        setPie(payload.debtPie || null);
        setDebts(payload.debts || []);
      } else {
        setPie(null);
        setDebts([]);
      }
    } catch (e) {
      console.error("Gagal memuat hutang:", e);
      setPie(null);
      setDebts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, [monthName, year]);

  const pieData = useMemo(() => {
    if (!pie) return [];
    // Support either `overduePercentage` or `dueSoonPercentage` as “Jatuh tempo”
    const overdue = pie.overduePercentage ?? pie.dueSoonPercentage ?? 0;
    return [
      { name: "Sudah dibayar", value: Number(pie.paidPercentage || 0) },
      { name: "Jatuh tempo", value: Number(overdue || 0) },
      { name: "Belum Lunas", value: Number(pie.unpaidPercentage || 0) },
    ].filter((d) => d.value > 0);
  }, [pie]);

  const isOverdue = (deadline, remaining) => {
    if (!deadline) return false;
    const d = new Date(deadline);
    if (Number.isNaN(d.getTime())) return false;
    const stillOwe = Number(remaining || 0) > 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return stillOwe && d < today;
  };

  const statusPill = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("lunas") && !s.includes("belum")) {
      return (
        <span className="inline-block rounded bg-aman-box-surface-color text-aman-text-color px-3 py-1">
          Lunas
        </span>
      );
    }
    if (s.includes("tempo") || s.includes("overdue")) {
      return (
        <span className="inline-block rounded bg-kritis-box-surface-color text-kritis-text-color px-3 py-1">
          Jatuh Tempo
        </span>
      );
    }
    if (s.includes("belum")) {
      return (
        <span className="inline-block rounded bg-kritis-box-surface-color text-kritis-text-color px-3 py-1">
          Belum Lunas
        </span>
      );
    }
    return (
      <span className="inline-block rounded bg-gray-400 text-white px-3 py-1">
        {status || "-"}
      </span>
    );
  };

  const handleDetail = (cat, id) => {
    navigate(`${location.pathname}/detail-hutang/${cat}/${id}`);
  };

  if (isDetailPage) return <Outlet />;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hutang</h1>
        <MonthYearSelector
          month={month}
          year={year}
          setMonth={setMonth}
          setMonthName={setMonthName}
          setYear={setYear}
        />
      </div>

      {/* Banner peringatan */}
      {nearingDue && (
        <div className="flex items-center gap-3 rounded-md bg-amber-100 text-amber-900 px-4 py-3">
          <FaExclamationTriangle />
          <span className="font-medium">{nearingDue}</span>
        </div>
      )}

      {/* Card */}
      <div className="border rounded-md p-4">
        {/* Chart */}
        <div className="max-w-xl">
          {loading ? (
            <div className="text-sm text-gray-500">Memuat…</div>
          ) : pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  innerRadius={45}
                  stroke="#fff"
                  strokeWidth={1}
                >
                  {pieData.map((d) => (
                    <Cell key={d.name} fill={COLORS[d.name] || "#9CA3AF"} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v, n) => [`${Number(v).toFixed(2)}%`, n]}
                />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-sm text-gray-500">
              Tidak ada data untuk periode ini.
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="py-3 px-4 text-left rounded-tl-md">
                  Tenggat Waktu
                </th>
                <th className="py-3 px-4 text-left">Kategori</th>
                <th className="py-3 px-4 text-left">Lokasi Transaksi</th>
                <th className="py-3 px-4 text-left">Nama Pelanggan</th>
                <th className="py-3 px-4 text-left">Nominal Transaksi</th>
                <th className="py-3 px-4 text-left">Sisa Tagihan</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Hubungi</th>
                <th className="py-3 px-4 text-left rounded-tr-md">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {!loading && payables.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="py-8 text-center text-gray-500 italic"
                  >
                    Tidak ada data untuk periode ini.
                  </td>
                </tr>
              )}

              {payables.map((r) => {
                const overdue = isOverdue(
                  r.deadlinePaymentDate,
                  r.remainingPayment
                );
                return (
                  <tr key={`${r.category}-${r.id}`} className="align-top">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {overdue && (
                          <FaExclamationTriangle className="text-red-500" />
                        )}
                        <span className={overdue ? "text-red-500" : ""}>
                          {r.deadlinePaymentDate}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{r.category}</td>
                    <td className="py-3 px-4">{r.placeName}</td>
                    <td className="py-3 px-4">{r.name}</td>
                    <td className="py-3 px-4 font-medium">
                      {formatRupiah(r.nominal)}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatRupiah(r.remainingPayment)}
                    </td>
                    <td className="py-3 px-4">{statusPill(r.paymentStatus)}</td>
                    <td className="py-3 px-4">
                      <a
                        href={toWA(r.phoneNumber)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-9 h-9 rounded bg-green-700 hover:bg-green-900"
                        title="Hubungi via WhatsApp"
                      >
                        <IoLogoWhatsapp className="text-white" />
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="rounded bg-green-700 hover:bg-green-900 text-white px-3 py-1.5"
                        onClick={() => handleDetail(r.category, r.id)}
                      >
                        Lihat detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {payables.length > 0 && (
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={9} className="py-2 px-4"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
