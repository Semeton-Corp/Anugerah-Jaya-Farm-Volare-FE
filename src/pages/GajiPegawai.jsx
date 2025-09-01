// src/pages/GajiPegawai.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MonthYearSelector from "../components/MonthYearSelector";
import { getUserSalarySummary, getUserSalaries } from "../services/cashflow";
import { getRoles } from "../services/roles";
import { IoSearch } from "react-icons/io5";
import SalaryPayModal from "../components/SalaryPayModal";
// ^ adjust import paths if these live elsewhere

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

export const fmtRp = (n = 0) =>
  "Rp " +
  Number(n || 0)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const SummaryCard = ({ title, value, icon }) => (
  <div className="rounded-md bg-[#bfd7db] p-4">
    <div className="text-sm font-semibold text-slate-800 mb-1">{title}</div>
    <div className="flex items-center gap-2">
      {icon}
      <div className="text-2xl font-extrabold text-slate-900">{value}</div>
    </div>
  </div>
);

export default function GajiPegawai() {
  const navigate = useNavigate();

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [monthName, setMonthName] = useState(MONTHS_ID[now.getMonth()]);

  const [isPayOpen, setIsPayOpen] = useState(false);
  const [activeSalaryId, setActiveSalaryId] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [locationId, setLocationId] = useState("");

  const [page, setPage] = useState(1);

  const [summary, setSummary] = useState({
    totalUser: 0,
    totalBaseSalary: 0,
    totalAdditionalWorkSalary: 0,
    totalBonusSalary: 0,
  });
  const [rows, setRows] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

  const [roleOptions, setRoleOptions] = useState([]);

  const detailPages = ["detail-gaji"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const handleDetail = (salaryId) => {
    navigate(`${location.pathname}/detail-gaji/${salaryId}`);
  };

  const fetchSummary = async () => {
    try {
      const res = await getUserSalarySummary(monthName, year);
      if (res?.status === 200) {
        const d = res.data?.data || {};
        setSummary({
          totalUser: Number(d.totalUser || 0),
          totalBaseSalary: Number(d.totalBaseSalary || 0),
          totalAdditionalWorkSalary: Number(d.totalAdditionalWorkSalary || 0),
          totalBonusSalary: Number(d.totalBonusSalary || 0),
        });
      }
    } catch (e) {
      console.log("summary error:", e);
      setSummary((s) => ({ ...s, totalUser: 0 }));
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      console.log("res: ", res);
      if (res?.status === 200) {
        setRoleOptions(res.data.data);
      }
    } catch (e) {
      console.log("summary error:", e);
      setSummary((s) => ({ ...s, totalUser: 0 }));
    }
  };

  const fetchRows = async () => {
    setLoading(true);
    try {
      const params = {
        month: monthName,
        year,
        page,
        keyword: keyword || undefined,
        roleId: roleId || undefined,
        locationId: locationId || undefined,
      };
      const res = await getUserSalaries(params);
      console.log("res: ", res);
      if (res?.status === 200) {
        const d = res.data?.data || {};
        setRows(d.userSalaries || []);
        setTotalData(Number(d.totalData || 0));
        setTotalPage(Number(d.totalPage || 1));
      } else {
        setRows([]);
        setTotalData(0);
        setTotalPage(1);
      }
    } catch (e) {
      console.log("rows error:", e);
      setRows([]);
      setTotalData(0);
      setTotalPage(1);
    } finally {
      setLoading(false);
    }
  };

  const openPayModal = (salaryId) => {
    setActiveSalaryId(salaryId);
    setIsPayOpen(true);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [monthName, year, roleId, keyword]);

  useEffect(() => {
    fetchSummary();
  }, [monthName, year]);

  useEffect(() => {
    fetchRows();
  }, [monthName, year, page, roleId, keyword]);

  const onSearch = (e) => {
    e.preventDefault();
    fetchRows();
  };

  const startIdx = (page - 1) * (rows.length || 0) + (rows.length ? 1 : 0);
  const endIdx = (page - 1) * (rows.length || 0) + rows.length;

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">Gaji Pegawai</h1>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryCard
          title="Total Pegawai"
          value={`${summary.totalUser} Orang`}
          icon={
            <span className="inline-block w-7 h-7 rounded-full bg-slate-900/20" />
          }
        />
        <SummaryCard
          title="Total Gaji Reguler"
          value={fmtRp(summary.totalBaseSalary)}
          icon={
            <span className="inline-block w-7 h-7 rounded-full bg-slate-900/20" />
          }
        />
        <SummaryCard
          title="Total Gaji Pekerjaan Tambahan"
          value={fmtRp(summary.totalAdditionalWorkSalary)}
          icon={
            <span className="inline-block w-7 h-7 rounded-full bg-slate-900/20" />
          }
        />
        <SummaryCard
          title="Total Gaji Bonus"
          value={fmtRp(summary.totalBonusSalary)}
          icon={
            <span className="inline-block w-7 h-7 rounded-full bg-slate-900/20" />
          }
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-2 items-center justify-end">
        {/* (optional) site filter visual only */}
        <button
          type="button"
          className="rounded bg-orange-300 hover:bg-orange-500 text-black px-4 py-2 cursor-pointer"
          onClick={() => alert("Filter site coming soon")}
        >
          Semua site
        </button>

        <MonthYearSelector
          month={month}
          year={year}
          setMonth={setMonth}
          setMonthName={setMonthName}
          setYear={setYear}
        />
      </div>

      {/* Search + role filter + table */}
      <div className="border rounded-md p-4">
        <form
          onSubmit={onSearch}
          className="flex flex-wrap gap-2 items-center mb-3"
        >
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center gap-2 border rounded px-3 py-2 bg-white">
              <IoSearch size={24} className="me-2" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari Pegawai…"
                className="w-full outline-none"
              />
            </div>
          </div>
          <button
            className="rounded bg-orange-300 hover:bg-orange-500 text-black px-4 py-2 cursor-pointer"
            type="submit"
          >
            Cari
          </button>

          {/* Role filter */}
          <div className="ml-auto">
            <div className="flex items-center rounded px-3 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="bg-transparent outline-none font-medium"
              >
                <option value="">Semua jabatan</option>
                {roleOptions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="py-3 px-4 text-left rounded-tl-md">Pegawai</th>
                <th className="py-3 px-4 text-left">Jabatan</th>
                <th className="py-3 px-4 text-left">Waktu Penggajian</th>
                <th className="py-3 px-4 text-left rounded-tr-md">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    Memuat…
                  </td>
                </tr>
              )}

              {!loading && rows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 text-center text-gray-500 italic"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              )}

              {rows.map((row) => {
                const u = row.user || {};
                const paid = Boolean(row.isPaid);
                return (
                  <tr key={row.id}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.photoProfile}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{u.role?.name || "-"}</td>
                    <td className="py-3 px-4">{row.salaryInterval || "-"}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={paid}
                          title={
                            paid ? "Gaji sudah dibayar" : "Bayar gaji sekarang"
                          }
                          className={`rounded px-3 py-1.5 transition
                            ${
                              paid
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-orange-300 hover:bg-orange-500 text-black cursor-pointer"
                            }`}
                          onClick={() => {
                            if (paid) return;
                            openPayModal(row.id);
                          }}
                        >
                          Bayar Gaji
                        </button>

                        <button
                          type="button"
                          disabled={!paid}
                          title={
                            paid
                              ? "Lihat detail gaji"
                              : "Belum bisa lihat detail sebelum dibayar"
                          }
                          className={`rounded px-3 py-1.5 transition
                            ${
                              paid
                                ? "bg-green-700 hover:bg-green-900 text-white cursor-pointer"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          onClick={() => {
                            if (!paid) return;
                            handleDetail(row.id);
                          }}
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500">
            {rows.length > 0
              ? `Menampilkan ${startIdx}-${endIdx} dari ${totalData} riwayat`
              : `Menampilkan 0 dari ${totalData} riwayat`}
          </div>
          <div className="flex gap-2">
            <button
              className="rounded bg-gray-200 hover:bg-gray-300 px-3 py-1.5 disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <button
              className="rounded bg-gray-200 hover:bg-gray-300 px-3 py-1.5 disabled:opacity-50"
              disabled={page >= totalPage}
              onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <SalaryPayModal
        isOpen={isPayOpen}
        salaryId={activeSalaryId}
        onClose={() => setIsPayOpen(false)}
        onSaved={() => {
          setIsPayOpen(false);
          fetchRows();
        }}
      />
    </div>
  );
}
