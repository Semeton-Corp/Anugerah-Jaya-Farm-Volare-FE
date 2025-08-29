// src/pages/GeneralCashflow.jsx
import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { PiCalendarBlank } from "react-icons/pi";
import YearSelector from "../components/YearSelector";

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const formatRupiah = (n = 0) =>
  "Rp " +
  Number(n)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const SummaryCard = ({ title, value, yoy, highlight = false }) => {
  const cardCls = `
    rounded-md p-4
    ${
      highlight
        ? "border-2 border-green-500 bg-green-100"
        : "border border-green-400 bg-green-50"
    }
  `;
  const titleCls = `font-semibold ${
    highlight ? "text-green-800" : "text-green-700"
  } mb-1`;

  return (
    <div className={cardCls}>
      <div className={titleCls}>{title}</div>
      <div className="text-2xl font-bold text-sky-900">
        {formatRupiah(value)}
      </div>
      <div className=" text-gray-500 mt-2">
        {yoy == null
          ? "—"
          : `${yoy > 0 ? "▲" : "▼"} ${Math.abs(
              yoy
            )}% dibanding tahun sebelumnya`}
      </div>
    </div>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-md">
    <div className="px-6 py-6">
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="px-2 pb-3">{children}</div>
  </div>
);

export default function GeneralCashflow() {
  const [ds] = useState(() => ({
    2024: {
      summary: {
        profit: 4_500_000,
        revenue: 4_500_000,
        expense: 4_500_000,
        cash: 4_500_000,
        receivable: 4_500_000,
        debt: 4_500_000,
      },
      pendapatan: [
        1620000, 1800000, 2070000, 2340000, 2520000, 2700000, 2880000, 3150000,
        3420000, 3690000, 4050000, 4500000,
      ],
      pengeluaran: [
        810000, 990000, 1170000, 1080000, 990000, 900000, 990000, 1080000,
        1260000, 1350000, 1080000, 900000,
      ],
      keuntungan: [
        810000, 810000, 900000, 1260000, 1530000, 1800000, 1890000, 2070000,
        2160000, 2340000, 2970000, 3600000,
      ],
      gudang: [
        2250000, 2070000, 1890000, 1800000, 1980000, 2160000, 2340000, 2520000,
        2700000, 2880000, 3060000, 3240000,
      ],
      toko: [
        1980000, 1800000, 1620000, 1350000, 1260000, 1350000, 1530000, 1800000,
        2070000, 2340000, 2700000, 3150000,
      ],
      kas: [
        1350000, 1530000, 1710000, 1890000, 2070000, 2250000, 2520000, 2880000,
        3240000, 3600000, 4050000, 4500000,
      ],
    },
    2025: {
      summary: {
        profit: 5_000_000,
        revenue: 5_000_000,
        expense: 5_000_000,
        cash: 5_000_000,
        receivable: 5_000_000,
        debt: 5_000_000,
      },
      pendapatan: [
        1800000, 2000000, 2300000, 2600000, 2800000, 3000000, 3200000, 3500000,
        3800000, 4100000, 4500000, 5000000,
      ],
      pengeluaran: [
        900000, 1100000, 1300000, 1200000, 1100000, 1000000, 1100000, 1200000,
        1400000, 1500000, 1200000, 1000000,
      ],
      keuntungan: [
        900000, 900000, 1000000, 1400000, 1700000, 2000000, 2100000, 2300000,
        2400000, 2600000, 3300000, 4000000,
      ],
      gudang: [
        2500000, 2300000, 2100000, 2000000, 2200000, 2400000, 2600000, 2800000,
        3000000, 3200000, 3400000, 3600000,
      ],
      toko: [
        2200000, 2000000, 1800000, 1500000, 1400000, 1500000, 1700000, 2000000,
        2300000, 2600000, 3000000, 3500000,
      ],
      kas: [
        1500000, 1700000, 1900000, 2100000, 2300000, 2500000, 2800000, 3200000,
        3600000, 4000000, 4500000, 5000000,
      ],
    },
  }));
  const [year, setYear] = useState(2025);

  const currency = (v) => formatRupiah(Number(v));

  const dataYear = ds[year];
  const prevYear = ds[year - 1];

  const yoy = (cur, prev) =>
    prev ? Math.round(((cur - prev) / prev) * 100) : null;

  const pendapatanVs = useMemo(
    () =>
      MONTHS.map((bulan, i) => ({
        bulan,
        pendapatan: dataYear.pendapatan[i],
        pengeluaran: dataYear.pengeluaran[i],
        keuntungan: dataYear.keuntungan[i],
      })),
    [dataYear]
  );

  const penjualanTelur = useMemo(
    () =>
      MONTHS.map((bulan, i) => ({
        bulan,
        gudang: dataYear.gudang[i],
        toko: dataYear.toko[i],
      })),
    [dataYear]
  );

  const kasProfit = useMemo(
    () =>
      MONTHS.map((bulan, i) => ({
        bulan,
        kas: dataYear.kas[i],
        keuntungan: dataYear.keuntungan[i],
      })),
    [dataYear]
  );

  const CustomTooltip = ({ active, label, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-md border bg-white px-3 py-2 shadow">
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        {payload.map((p) => (
          <div key={p.dataKey} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: p.stroke }}
            />
            <span className="capitalize">{p.name || p.dataKey}</span>
            <span className="ml-auto font-medium">{currency(p.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">General Cashflow</h1>
        <YearSelector year={year} setYear={setYear} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        <SummaryCard
          title="Keuntungan"
          value={dataYear.summary.profit}
          yoy={yoy(dataYear.summary.profit, prevYear?.summary.profit)}
          highlight
        />
        <SummaryCard
          title="Pendapatan"
          value={dataYear.summary.revenue}
          yoy={yoy(dataYear.summary.revenue, prevYear?.summary.revenue)}
        />
        <SummaryCard
          title="Pengeluaran"
          value={dataYear.summary.expense}
          yoy={yoy(dataYear.summary.expense, prevYear?.summary.expense)}
        />
        <SummaryCard
          title="Kas"
          value={dataYear.summary.cash}
          yoy={yoy(dataYear.summary.cash, prevYear?.summary.cash)}
          highlight
        />
        <SummaryCard
          title="Piutang"
          value={dataYear.summary.receivable}
          yoy={yoy(dataYear.summary.receivable, prevYear?.summary.receivable)}
        />
        <SummaryCard
          title="Hutang"
          value={dataYear.summary.debt}
          yoy={yoy(dataYear.summary.debt, prevYear?.summary.debt)}
        />
      </div>

      <ChartCard title="Grafik Pendapatan - Pengeluaran">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={pendapatanVs}
            margin={{ top: 12, right: 24, bottom: 8, left: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="bulan" tickMargin={8} />
            <YAxis width={100} tickFormatter={currency} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={28} iconType="circle" />

            <Line
              type="monotone"
              name="pendapatan"
              dataKey="pendapatan"
              stroke="#3b82f6"
              strokeWidth={2.5}
              strokeLinecap="round"
              dot={{ r: 3, strokeWidth: 1, stroke: "#3b82f6", fill: "#fff" }}
              activeDot={{ r: 6 }}
              connectNulls
              animationDuration={600}
            />
            <Line
              type="monotone"
              name="keuntungan"
              dataKey="keuntungan"
              stroke="#22c55e"
              strokeWidth={2.5}
              strokeLinecap="round"
              dot={{ r: 3, strokeWidth: 1, stroke: "#22c55e", fill: "#fff" }}
              activeDot={{ r: 6 }}
              connectNulls
              animationDuration={600}
            />
            <Line
              type="monotone"
              name="pengeluaran"
              dataKey="pengeluaran"
              stroke="#ef4444"
              strokeWidth={2.5}
              strokeLinecap="round"
              dot={{ r: 3, strokeWidth: 1, stroke: "#ef4444", fill: "#fff" }}
              activeDot={{ r: 6 }}
              connectNulls
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Grafik Penjualan Telur">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={penjualanTelur}
            margin={{ top: 16, right: 24, bottom: 8, left: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="bulan" tickMargin={8} />
            <YAxis width={80} tickFormatter={currency} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={28} iconType="circle" />

            <Line
              type="monotone"
              name="Gudang"
              dataKey="gudang"
              stroke="#3b82f6"
              strokeWidth={2.5}
              strokeLinecap="round"
              dot={{ r: 3, strokeWidth: 1, stroke: "#3b82f6", fill: "#fff" }}
              activeDot={{ r: 6 }}
              connectNulls
              animationDuration={600}
            />
            <Line
              type="monotone"
              name="Toko"
              dataKey="toko"
              stroke="#22c55e"
              strokeWidth={2.5}
              strokeLinecap="round"
              dot={{ r: 3, strokeWidth: 1, stroke: "#22c55e", fill: "#fff" }}
              activeDot={{ r: 6 }}
              connectNulls
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Kas - Net Profit">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={kasProfit}
            margin={{ top: 16, right: 24, bottom: 8, left: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="bulan" tickMargin={8} />
            <YAxis width={80} tickFormatter={currency} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={28} iconType="circle" />

            <Line
              type="monotone"
              name="Kas"
              dataKey="kas"
              stroke="#3b82f6"
              strokeWidth={2.5}
              strokeLinecap="round"
              dot={{ r: 3, strokeWidth: 1, stroke: "#3b82f6", fill: "#fff" }}
              activeDot={{ r: 6 }}
              connectNulls
              animationDuration={600}
            />
            <Line
              type="monotone"
              name="Keuntungan"
              dataKey="keuntungan"
              stroke="#22c55e"
              strokeWidth={2.5}
              strokeLinecap="round"
              dot={{ r: 3, strokeWidth: 1, stroke: "#22c55e", fill: "#fff" }}
              activeDot={{ r: 6 }}
              connectNulls
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
