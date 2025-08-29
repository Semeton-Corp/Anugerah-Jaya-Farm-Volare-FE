import React, { useMemo, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const YearSelector = ({
  year,
  setYear,
  startYear,
  endYear,
  range = 10,
}) => {
  const [open, setOpen] = useState(false);
  const current = new Date().getFullYear();

  const years = useMemo(() => {
    if (
      typeof startYear === "number" &&
      typeof endYear === "number" &&
      endYear >= startYear
    ) {
      return Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
      );
    }
    const start = current - Math.floor(range / 2);
    return Array.from({ length: range }, (_, i) => start + i);
  }, [startYear, endYear, range, current]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-orange-300 hover:bg-orange-500 cursor-pointer text-black px-4 py-2 rounded flex items-center gap-2"
      >
        <FaCalendarAlt size={18} /> {year}
      </button>

      {open && (
        <div className="absolute mt-2 w-32 rounded shadow-lg bg-white z-50 p-3 border">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tahun
          </label>
          <select
            value={year}
            onChange={(e) => {
              setYear(parseInt(e.target.value, 10));
              setOpen(false);
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default YearSelector;
