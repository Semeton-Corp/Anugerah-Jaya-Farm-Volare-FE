import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

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

const chartData = [
  {
    date: "29 Mar",
    telurOK_ikat: 50,
    telurOK_karpet: 100,
    telurOK_butir: 1000,
    telurRetak: 30,
    telurPecah: 80,
    telurReject: 10,
  },
  {
    date: "30 Mar",
    telurOK_ikat: 45,
    telurOK_karpet: 90,
    telurOK_butir: 980,
    telurRetak: 20,
    telurPecah: 60,
    telurReject: 8,
  },
  {
    date: "31 Mar",
    telurOK_ikat: 52,
    telurOK_karpet: 110,
    telurOK_butir: 1020,
    telurRetak: 25,
    telurPecah: 70,
    telurReject: 9,
  },
  {
    date: "01 Apr",
    telurOK_ikat: 48,
    telurOK_karpet: 95,
    telurOK_butir: 970,
    telurRetak: 28,
    telurPecah: 75,
    telurReject: 11,
  },
  {
    date: "02 Apr",
    telurOK_ikat: 55,
    telurOK_karpet: 105,
    telurOK_butir: 1010,
    telurRetak: 18,
    telurPecah: 50,
    telurReject: 6,
  },
  {
    date: "03 Apr",
    telurOK_ikat: 49,
    telurOK_karpet: 98,
    telurOK_butir: 990,
    telurRetak: 22,
    telurPecah: 65,
    telurReject: 7,
  },
  {
    date: "04 Apr",
    telurOK_ikat: 58,
    telurOK_karpet: 120,
    telurOK_butir: 1050,
    telurRetak: 15,
    telurPecah: 45,
    telurReject: 5,
  },
];

const produksiDetail = [
  {
    kandang: "Kandang A1",
    qty: 1000,
    ok: 800,
    retak: 12,
    pecah: 100,
    reject: 40,
    abnormality: "3%",
    keterangan: "aman",
  },
  {
    kandang: "Kandang A2",
    qty: 1000,
    ok: 800,
    retak: 12,
    pecah: 100,
    reject: 40,
    abnormality: "12%",
    keterangan: "kritis",
  },
];

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
    vaksin: "Vaksin A (5 ml)",
    obat: "Obat B (4ml)",
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
    vaksin: "-",
    obat: "-",
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
    vaksin: "-",
    obat: "-",
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
    vaksin: "-",
    obat: "-",
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
    vaksin: "-",
    obat: "-",
  },
];

const ProduksiTelur = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailPages = ["detail-produksi"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const detailProduksiHandle = () => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/detail-produksi";

    navigate(detailPath);
  };
  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Produksi Telur</h1>
            <div className="flex gap-2">
              <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                <MdStore size={18} />
                <div className="text-base font-medium ms-2">Semua site</div>
              </div>
              <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                <PiCalendarBlank size={18} />
                <div className="text-base font-medium ms-2">
                  Hari ini (20 Mar 2025)
                </div>
              </div>
            </div>
          </div>

          {/* Telur  ok, retak, pecah, reject*/}
          <div className="flex md:grid-cols-2 gap-4 justify-between">
            {/* telur OK */}
            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur OK</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <MdEgg size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                {/* item ikat */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">50</p>
                  <p className="text-xl text-center">Ikat</p>
                </div>
                {/* item karpet */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">100</p>
                  <p className="text-xl text-center">Karpet</p>
                </div>
                {/* item butir */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">1000</p>
                  <p className="text-xl text-center">Butir</p>
                </div>
              </div>
            </div>

            {/* telur Retak */}
            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur Retak</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <TbEggCrackedFilled size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                {/* item butir */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">30</p>
                  <p className="text-xl text-center">Butir</p>
                </div>
              </div>
            </div>
            {/* penjualan telur */}
            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur Pecah</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <TbEggCrackedFilled size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                {/* item butir */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">80</p>
                  <p className="text-xl text-center">Butir</p>
                </div>
              </div>
            </div>
            {/* penjualan telur */}
            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur Reject</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <TbEggCrackedFilled size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                {/* item butir */}
                <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">30</p>
                  <p className="text-xl text-center">Butir</p>
                </div>
              </div>
            </div>
          </div>

          {/* chart, incomes, and history section */}
          <div className="flex flex-col lg:flex-row h-120 gap-6">
            {/* Chart Section (3/4 width on large screens) */}
            <div className="w-full lg:w-full bg-white rounded-lg p-4 border border-black-6">
              <h2 className="text-xl font-semibold mb-4">
                Rekapitulasi Produksi
              </h2>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="right" />
                  <Line
                    type="monotone"
                    dataKey="telurOK_ikat"
                    stroke="#00D007"
                    name="Telur OK (ikat)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="telurOK_karpet"
                    stroke="#00D007"
                    name="Telur OK (karpet)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="telurOK_butir"
                    stroke="#00D007"
                    name="Telur OK (butir)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="telurRetak"
                    stroke="#FFD400"
                    name="Telur Retak"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="telurPecah"
                    stroke="#F4A11C"
                    name="Telur Pecah"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="telurReject"
                    stroke="#F41C1C"
                    name="Telur Reject"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* detail penjualan */}
          <div className=" flex gap-4 h-65">
            <div className=" w-full bg-white px-8 py-6 rounded-lg border border-black-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">Detail Produksi</h2>
                <div
                  onClick={detailProduksiHandle}
                  className="p-2 rounded-full hover:bg-black-4 cursor-pointer"
                >
                  <FiMaximize2 size={24} color="" />
                </div>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-700 text-white text-center">
                    <th className="py-2 px-4">Kandang</th>
                    <th className="py-2 px-4">QTY (butir)</th>
                    <th className="py-2 px-4">OK</th>
                    <th className="py-2 px-4">Retak</th>
                    <th className="py-2 px-4">Pecah</th>
                    <th className="py-2 px-4">Reject</th>
                    <th className="py-2 px-4">%Abnormality</th>
                    <th className="py-2 px-4">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {produksiDetail.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-4">{item.kandang}</td>
                      <td className="py-2 px-4">{item.qty}</td>
                      <td className="py-2 px-4">{item.ok}</td>
                      <td className="py-2 px-4">{item.retak}</td>
                      <td className="py-2 px-4">{item.pecah}</td>
                      <td className="py-2 px-4">{item.reject}</td>
                      <td className="py-2 px-4">{item.abnormality}</td>
                      <td className="py-2 px-4 flex justify-center">
                        <span
                          className={`w-24 py-1 flex justify-center rounded text-sm font-semibold ${
                            item.keterangan === "aman"
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-kritis-box-surface-color text-kritis-text-color"
                          }`}
                        >
                          {item.keterangan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProduksiTelur;
