import React, { forwardRef } from "react";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const MonthYearSelector = ({
  month,
  year,
  setMonth,
  setMonthName,
  setYear,
}) => {
  const [open, setOpen] = useState(false);

  const months = [
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

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-orange-300 hover:bg-orange-500 cursor-pointer text-black px-4 py-2 rounded flex items-center gap-2"
      >
        <FaCalendarAlt size={18} /> {months[month]} {year}
      </button>

      {open && (
        <div className="absolute mt-2 w-40 rounded shadow-lg bg-white z-50 p-3 border">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Bulan
            </label>
            <select
              value={month}
              onChange={(e) => {
                const selectedIndex = parseInt(e.target.value);
                setMonth(selectedIndex);
                setMonthName(months[selectedIndex]);
                setOpen(!open);
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              {months.map((m, i) => (
                <option key={i} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tahun
            </label>
            <select
              value={year}
              onChange={(e) => {
                setYear(parseInt(e.target.value));
                setOpen(!open);
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              {Array.from(
                { length: 10 },
                (_, i) => new Date().getFullYear() - 5 + i
              ).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthYearSelector;
