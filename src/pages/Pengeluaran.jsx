// src/pages/Pengeluaran.jsx
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
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
  "Karyawan",
  "Operasional",
  "Pengadaan DOC",
  "Pengadaan Pakan",
  "Lainnya",
];

const COLORS = {
  Karyawan: "#73A9B1",
  Operasional: "#215963",
  "Pengadaan DOC": "#E29901",
  "Pengadaan Pakan": "#ECBB55",
  Lainnya: "#5F4000",
};

const formatRupiah = (n = 0) =>
  "Rp " +
  Number(n)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export default function Pengeluaran() {
  const navigate = useNavigate();
  const location = useLocation();

  const [rows] = useState([
    {
      id: 1,
      date: "2025-03-22",
      kategori: "Operasional",
      namaTransaksi: "Bensin",
      lokasi: "Sidodadi - Kandang 01",
      nominal: 20000000,
      penerima: "Pertamina",
    },
    {
      id: 2,
      date: "2025-03-22",
      kategori: "Pengadaan Pakan",
      namaTransaksi: "Jagung",
      lokasi: "Sidodadi - Toko A",
      nominal: 300000,
      penerima: "Super Jagung",
    },
    {
      id: 3,
      date: "2025-03-22",
      kategori: "Lainnya",
      namaTransaksi: "Pajak",
      lokasi: "Sidodadi - Gudang Pusat",
      nominal: 5000000,
      penerima: "Kantor Pajak",
    },
    {
      id: 4,
      date: "2025-03-22",
      kategori: "Karyawan",
      namaTransaksi: "Gaji",
      lokasi: "Sidodadi - Gudang Pusat",
      nominal: 5000000,
      penerima: "Budi Santoso",
    },
  ]);

  const first = new Date(rows[0]?.date || Date.now());
  const [year, setYear] = useState(first.getFullYear());
  const [month, setMonth] = useState(first.getMonth());
  const [monthName, setMonthName] = useState(MONTHS_ID[first.getMonth()]);

  const [category, setCategory] = useState("Semua");
  const [openCat, setOpenCat] = useState(false);

  const detailPages = ["tambah-pengeluaran"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const d = new Date(r.date);
      const byPeriod = d.getMonth() === month && d.getFullYear() === year;
      const byCat = category === "Semua" ? true : r.kategori === category;
      return byPeriod && byCat;
    });
  }, [rows, category, month, year]);

  const pieData = useMemo(() => {
    const totals = new Map(CATEGORIES.map((c) => [c, 0]));
    filtered.forEach((r) => {
      totals.set(
        r.kategori,
        (totals.get(r.kategori) || 0) + Number(r.nominal || 0)
      );
    });
    return CATEGORIES.map((name) => ({
      name,
      value: totals.get(name) || 0,
    })).filter((d) => d.value > 0);
  }, [filtered]);

  const totalNominal = useMemo(
    () => filtered.reduce((s, r) => s + Number(r.nominal || 0), 0),
    [filtered]
  );

  const PieTip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];
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

  const handleTambahPengeluaran = () => {
    navigate(`${location.pathname}/tambah-pengeluaran`);
  };

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pengeluaran</h1>

        <div className="flex items-center gap-2">
          {/* Kategori dropdown button */}
          {/* <div className="relative">
            <button
              onClick={() => setOpenCat((v) => !v)}
              className="bg-orange-300 hover:bg-orange-500 cursor-pointer text-black px-4 py-2 rounded flex items-center gap-2"
            >
              <FaCalendarAlt size={16} />
              {category === "Semua" ? "Semua Kategori" : category}
            </button>
            {openCat && (
              <div className="absolute right-0 mt-2 w-56 rounded border bg-white shadow z-10">
                <ul className="py-1 text-sm">
                  <li>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setCategory("Semua");
                        setOpenCat(false);
                      }}
                    >
                      Semua
                    </button>
                  </li>
                  {CATEGORIES.map((c) => (
                    <li key={c}>
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setCategory(c);
                          setOpenCat(false);
                        }}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}

          {/* Bulan / Tahun */}
          <MonthYearSelector
            month={month}
            year={year}
            setMonth={setMonth}
            setMonthName={setMonthName}
            setYear={setYear}
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md p-4">
        <div className=" p-4 w-full max-w-2xl my-4">
          {pieData.length > 0 ? (
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
                  paddingAngle={2}
                >
                  {pieData.map((e) => (
                    <Cell key={e.name} fill={COLORS[e.name] || "#9CA3AF"} />
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
        {/* Chart + Add button row */}
        <div className="flex items-start justify-end gap-4 my-3">
          <button
            onClick={() => handleTambahPengeluaran()}
            className="flex items-center gap-2 rounded bg-orange-300 hover:bg-orange-500 text-black px-4 py-2 h-10 mt-2"
          >
            <FaPlus />
            Tambah pengeluaran
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="py-3 px-4 text-left rounded-tl-md">Tanggal</th>
                <th className="py-3 px-4 text-left">Kategori</th>
                <th className="py-3 px-4 text-left">Nama Transaksi</th>
                <th className="py-3 px-4 text-left">Lokasi Transaksi</th>
                <th className="py-3 px-4 text-left">Nominal Transaksi</th>
                <th className="py-3 px-4 text-left">Penerima</th>
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
                    <td className="py-3 px-4">{item.namaTransaksi}</td>
                    <td className="py-3 px-4">{item.lokasi}</td>
                    <td className="py-3 px-4 font-medium">
                      {formatRupiah(item.nominal)}
                    </td>
                    <td className="py-3 px-4">{item.penerima}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-2 w-28">
                        <button
                          className="rounded bg-orange-300 hover:bg-orange-500 text-black px-3 py-1.5"
                          onClick={() => alert("Lihat Bukti")}
                        >
                          Lihat Bukti
                        </button>
                        <button
                          className="rounded bg-green-700 hover:bg-green-900 text-white px-3 py-1.5"
                          onClick={() => alert("Lihat detail")}
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
                    colSpan={7}
                    className="py-8 text-center text-gray-500 italic"
                  >
                    Tidak ada data untuk periode & kategori terpilih.
                  </td>
                </tr>
              )}
            </tbody>

            {filtered.length > 0 && (
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-semibold" colSpan={4}>
                    Total
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    {formatRupiah(totalNominal)}
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
