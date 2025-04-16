import React, { useState } from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import {
  FaArrowUpLong,
  FaArrowDownLong,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { FiMaximize2 } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const detailAyamData = [
  {
    kandang: "Kandang A1",
    kategori: "DOC",
    usiaMinggu: 49,
    hidup: 4000,
    sakit: 50,
    mati: 10,
    pakanKg: 20,
    mortalitas: "3%",
  },
  {
    kandang: "Kandang A2",
    kategori: "Grower",
    usiaMinggu: 49,
    hidup: 1200,
    sakit: 20,
    mati: 12,
    pakanKg: 40,
    mortalitas: "0.8%",
  },
  {
    kandang: "Kandang A3",
    kategori: "Pre Layer",
    usiaMinggu: 49,
    hidup: 1200,
    sakit: 20,
    mati: 12,
    pakanKg: 40,
    mortalitas: "0.8%",
  },
  {
    kandang: "Kandang A4",
    kategori: "Layer",
    usiaMinggu: 49,
    hidup: 1200,
    sakit: 20,
    mati: 12,
    pakanKg: 40,
    mortalitas: "0.8%",
  },
  {
    kandang: "Kandang A5",
    kategori: "Afkir",
    usiaMinggu: 49,
    hidup: 1200,
    sakit: 20,
    mati: 12,
    pakanKg: 40,
    mortalitas: "0.8%",
  },
];

const InputAyam = () => {
  const [vaksinExpanded, setVaksinExpanded] = useState(true);
  const [obatExpanded, setObatExpanded] = useState(true);

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded border">
      <h2 className="text-lg font-semibold mb-1">Input data harian</h2>
      <p className="text-sm mb-6">20 Maret 2025</p>

      {/* Pilih kandang */}
      <label className="block font-medium mb-1">Pilih kandang</label>
      <select className="w-full border rounded p-2 mb-4">
        <option>Pilih kandang...</option>
      </select>

      {/* Kategori dan Usia Ayam */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Kategori ayam</label>
          <select className="w-full border rounded p-2">
            <option>Pilih kandang...</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Usia ayam</label>
          <select className="w-full border rounded p-2">
            <option>Pilih kandang...</option>
          </select>
        </div>
      </div>

      {/* Jumlah ayam */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block font-medium mb-1">Jumlah ayam hidup</label>
          <input type="number" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Jumlah ayam sakit</label>
          <input type="number" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Jumlah ayam mati</label>
          <input type="number" className="w-full border rounded p-2" />
        </div>
      </div>

      {/* Jumlah pakan */}
      <div className="mt-4">
        <label className="block font-medium mb-1">Jumlah pakan (Kg)</label>
        <input type="number" className="w-full border rounded p-2" />
      </div>

      {/* Vaksin Section */}
      <div className="mt-6 border rounded p-4">
        <div
          className="flex items-center cursor-pointer mb-3"
          onClick={() => setVaksinExpanded(!vaksinExpanded)}
        >
          <span className="mr-2">{vaksinExpanded ? "▼" : "▶"}</span>
          <strong>Vaksin</strong>
        </div>

        {vaksinExpanded && (
          <>
            <label className="block font-medium mb-1">Jenis Vaksin</label>
            <input type="text" className="w-full border rounded p-2 mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Dosis</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block font-medium mb-1">Satuan Dosis</label>
                <input
                  type="text"
                  placeholder="cth : ml"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            <button className="mt-4 bg-emerald-700 text-white py-2 px-4 rounded hover:bg-emerald-600">
              Tambah vaksin
            </button>
          </>
        )}
      </div>

      {/* Obat Section */}
      <div className="mt-6 border rounded p-4">
        <div
          className="flex items-center cursor-pointer mb-3"
          onClick={() => setObatExpanded(!obatExpanded)}
        >
          <span className="mr-2">{obatExpanded ? "▼" : "▶"}</span>
          <strong>Obat</strong>
        </div>

        {obatExpanded && (
          <>
            <label className="block font-medium mb-1">Penyakit</label>
            <input type="text" className="w-full border rounded p-2 mb-4" />

            <label className="block font-medium mb-1">Jenis Obat</label>
            <input type="text" className="w-full border rounded p-2 mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Dosis</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block font-medium mb-1">Satuan Dosis</label>
                <input
                  type="text"
                  placeholder="cth : ml"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Simpan Button */}
      <div className="mt-6 text-right">
        <button className="bg-emerald-700 text-white py-2 px-6 rounded hover:bg-emerald-600">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default InputAyam;
