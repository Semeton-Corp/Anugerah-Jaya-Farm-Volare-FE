// src/pages/Pendapatan.jsx
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { FaCalendarAlt } from "react-icons/fa";
import MonthYearSelector from "../components/MonthYearSelector";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MONTHS_ID = [
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

const CATEGORIES = [
  "Penjualan Ayam",
  "Penjualan Telur Toko",
  "Penjualan Telur Gudang",
];

const COLORS = {
  "Penjualan Ayam": "#215963",
  "Penjualan Telur Toko": "#E29901",
  "Penjualan Telur Gudang": "#d97706",
};

const formatRupiah = (n = 0) =>
  "Rp " +
  Number(n)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export default function Pendapatan() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows] = useState([
    {
      id: 1,
      date: "2025-08-22",
      kategori: "Penjualan Ayam",
      lokasi: "Kandang Sidodadi",
      namaBarang: "Ayam Afkir",
      jumlahBarang: "4000 Ekor",
      pelanggan: "Pak Adi",
      nominal: 20000000,
    },
    {
      id: 2,
      date: "2025-08-22",
      kategori: "Penjualan Telur Toko",
      lokasi: "Toko A",
      namaBarang: "Telur Retak",
      jumlahBarang: "10 Kg",
      pelanggan: "Pak Tono",
      nominal: 300000,
    },
    {
      id: 3,
      date: "2025-08-22",
      kategori: "Penjualan Telur Gudang",
      lokasi: "Gudang Pusat",
      namaBarang: "Telur OK",
      jumlahBarang: "20 Ikat",
      pelanggan: "Yasin",
      nominal: 5000000,
    },
  ]);

  const [category, setCategory] = useState("Semua");
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [monthName, setMonthName] = useState(MONTHS_ID[month]);

  const detailPages = ["detail-pendapatan"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const d = new Date(r.date);
      const byMonth = d.getMonth() === month && d.getFullYear() === year;
      const byCat = category === "Semua" ? true : r.kategori === category;
      return byMonth && byCat;
    });
  }, [rows, category, month, year]);

  // pie data (keep stable order via CATEGORIES)
  const pieData = useMemo(() => {
    const totals = new Map(CATEGORIES.map((c) => [c, 0]));
    filtered.forEach((r) => {
      const key = r.kategori ?? "Penjualan Ayam";
      totals.set(key, (totals.get(key) || 0) + Number(r.nominal || 0));
    });
    return (
      CATEGORIES.map((name) => ({ name, value: totals.get(name) || 0 }))
        // hide zero segments from the chart (legend still shows via <Legend/>)
        .filter((d) => d.value > 0)
    );
  }, [filtered]);

  const totalNominal = useMemo(
    () => filtered.reduce((sum, r) => sum + Number(r.nominal || 0), 0),
    [filtered]
  );

  // Custom tooltip with Rupiah + percentage of total
  const PieTip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const { name, value, payload: p } = payload[0];
    const pct = totalNominal ? Math.round((value / totalNominal) * 100) : 0;
    return (
      <div className="rounded-md border bg-white px-3 py-2 shadow text-sm">
        <div className="font-medium">{name}</div>
        <div className="text-gray-700">
          {formatRupiah(value)} ({pct}%)
        </div>
      </div>
    );
  };

  const handleDetail = () => {
    navigate(`${location.pathname}/detail-pendapatan`);
  };

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pendapatan</h1>

        <div className="flex items-center gap-2">
          {/* Kategori
          <div className="relative">
            <button
              onClick={() => setCategory((prev) => prev)} 
              className="bg-orange-300 hover:bg-orange-500 cursor-pointer text-black px-4 py-2 rounded flex items-center gap-2"
            >
              <FaCalendarAlt size={16} />
              {category === "Semua" ? "Semua Kategori" : category}
            </button>
            <div className="absolute right-0 mt-2 w-56 rounded border bg-white shadow z-10">
              <ul className="py-1 text-sm">
                <li>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-gray-100"
                    onClick={() => setCategory("Semua")}
                  >
                    Semua
                  </button>
                </li>
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100"
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* Bulan/Tahun */}
          <MonthYearSelector
            month={month}
            year={year}
            setMonth={setMonth}
            setMonthName={setMonthName}
            setYear={setYear}
          />
        </div>
      </div>

      {/* Summary row */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600">
          Periode:{" "}
          <span className="font-medium">
            {monthName} {year}
          </span>
        </span>
        <span className="text-sm text-gray-600">
          Kategori: <span className="font-medium">{category}</span>
        </span>
        <span className="text-sm text-gray-600">
          Total Pemasukan:{" "}
          <span className="font-semibold">{formatRupiah(totalNominal)}</span>
        </span>
      </div>

      {/* Card wrapper */}
      <div className="border rounded-md p-4">
        {/* Pie + legend */}
        <div className="max-w-2xl">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  innerRadius={50}
                  stroke="#fff"
                  strokeWidth={1}
                  paddingAngle={2}
                  isAnimationActive
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[entry.name] || "#9CA3AF"}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTip />} />
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
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="py-3 px-4 text-left rounded-tl-md">Tanggal</th>
                  <th className="py-3 px-4 text-left">Kategori</th>
                  <th className="py-3 px-4 text-left">Lokasi Transaksi</th>
                  <th className="py-3 px-4 text-left">Nama Barang</th>
                  <th className="py-3 px-4 text-left">Jumlah Barang</th>
                  <th className="py-3 px-4 text-left">Nama Pelanggan</th>
                  <th className="py-3 px-4 text-left">Nominal Pemasukan</th>
                  <th className="py-3 px-4 text-left rounded-tr-md">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => {
                  const d = new Date(item.date);
                  const tanggal = `${String(d.getDate()).padStart(
                    2,
                    "0"
                  )} ${MONTHS_ID[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
                  return (
                    <tr key={item.id} className="align-top">
                      <td className="py-3 px-4 whitespace-nowrap">{tanggal}</td>
                      <td className="py-3 px-4">{item.kategori}</td>
                      <td className="py-3 px-4">{item.lokasi}</td>
                      <td className="py-3 px-4">{item.namaBarang}</td>
                      <td className="py-3 px-4">{item.jumlahBarang}</td>
                      <td className="py-3 px-4">{item.pelanggan}</td>
                      <td className="py-3 px-4 font-medium">
                        {formatRupiah(item.nominal)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-2 w-28">
                          <button
                            className="rounded bg-orange-300 hover:bg-orange-500 text-black px-3 py-1.5 cursor-pointer"
                            onClick={() => alert("Lihat Bukti")}
                          >
                            Lihat Bukti
                          </button>
                          <button
                            className="rounded bg-green-700 hover:bg-green-900 text-white px-3 py-1.5 cursor-pointer"
                            onClick={() => {
                              handleDetail();
                            }}
                          >
                            Lihat detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-8 text-center text-gray-500 italic"
                    >
                      Tidak ada data untuk periode & kategori terpilih.
                    </td>
                  </tr>
                )}
              </tbody>

              {/* Table footer total */}
              {filtered.length > 0 && (
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 font-semibold" colSpan={6}>
                      Total
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {formatRupiah(totalNominal)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
