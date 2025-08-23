// src/pages/PembagianPakan.jsx
import React, { useMemo, useState } from "react";
import {
  confirmationChickenCageFeed,
  getChickenCageFeed,
  getChickenCageFeeds,
} from "../services/cages";
import { useEffect } from "react";
import { getWarehouses } from "../services/warehouses";

const rupiahKg = (n) =>
  `${Number(n || 0).toLocaleString("id-ID", { maximumFractionDigits: 0 })} Kg`;

const rowsDummy = [
  {
    id: 1,
    kandang: "Sidodadi DOC",
    kategori: "DOC",
    usiaMinggu: 1,
    jumlahAyam: 100,
    jenisPakan: "Adukan",
    jumlahPakan: 110,
    sisaKemarin: 10,
  },
  {
    id: 2,
    kandang: "Sidodadi Grower",
    kategori: "Grower",
    usiaMinggu: 1,
    jumlahAyam: 11000,
    jenisPakan: "Adukan",
    jumlahPakan: 100,
    sisaKemarin: 0,
  },
  {
    id: 3,
    kandang: "Sidodadi 01",
    kategori: "Pre-Layer",
    usiaMinggu: 1,
    jumlahAyam: 4000,
    jenisPakan: "Jadi",
    jumlahPakan: 100,
    sisaKemarin: 0,
  },
  {
    id: 4,
    kandang: "Sidodadi 02",
    kategori: "Layer",
    usiaMinggu: 1,
    jumlahAyam: 4000,
    jenisPakan: "Jadi",
    jumlahPakan: 100,
    sisaKemarin: 0,
  },
];

const formulaByKategori = {
  DOC: [
    { bahan: "Konsentrat", persen: 65 },
    { bahan: "Premix", persen: 15 },
  ],
  Grower: [
    { bahan: "Konsentrat", persen: 60 },
    { bahan: "Premix", persen: 10 },
    { bahan: "Jagung", persen: 30 },
  ],
  "Pre-Layer": [
    { bahan: "Konsentrat", persen: 55 },
    { bahan: "Premix", persen: 10 },
    { bahan: "Jagung", persen: 35 },
  ],
  Layer: [
    { bahan: "Konsentrat", persen: 50 },
    { bahan: "Premix", persen: 10 },
    { bahan: "Jagung", persen: 40 },
  ],
};

const gudangList = [
  { id: "G1", name: "Gudang Utama" },
  { id: "G2", name: "Gudang Timur" },
  { id: "G3", name: "Gudang Barat" },
];

export default function PembagianPakan() {
  const locationId = localStorage.getItem("locationId");
  const userRole = localStorage.getItem("role");

  const [rows] = useState(rowsDummy);
  const [kandangList, setKandangList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [gudangOptions, setGudangOptions] = useState(gudangList);
  const [gudangId, setGudangId] = useState("");
  const [confirmationData, setConfirmationData] = useState([]);

  const formula = useMemo(() => {
    if (!selected) return [];
    const base = formulaByKategori[selected.kategori] || [];
    return base.map((f) => ({
      ...f,
      jumlah: Math.round((selected.jumlahPakan * f.persen) / 100),
    }));
  }, [selected]);

  const canConfirmRow = (row) => {
    return row.id !== 1;
  };

  const openModal = async (row) => {
    setSelected(row);
    setGudangId("");

    try {
      const detailResponse = await getChickenCageFeed(row?.id);
      console.log("detailResponse: ", detailResponse);
      if (detailResponse.status == 200) {
        setConfirmationData(detailResponse.data.data);
        setOpen(true);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  const submitConfirm = async () => {
    if (!selected) return;
    const payload = {
      warehouseId: gudangId,
    };
    try {
      const confirmResponse = await confirmationChickenCageFeed();
      if (confirmResponse.status == 200) {
        closeModal();
        fetchKandangList();
      }
    } catch (error) {
      console.log("error :", error);
    }
    // console.log("KONFIRMASI PEMBAGIAN PAKAN -> payload:", payload);
  };

  const fetchKandangList = async () => {
    try {
      const kandangResponse = await getChickenCageFeeds();
      if (kandangResponse.status == 200) {
        const list = kandangResponse.data.data;
        let filteredList;
        // if (userRole != "Owner") {
        //   filteredList = list.filter(
        //     (item) => item.cage.location.id == locationId
        //   );
        // } else {
        //   filteredList = list;
        // }
        setKandangList(list);
        console.log("filteredList: ", filteredList);
      }
      // console.log("kandangResponse: ", kandangResponse);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const warehouseResponse = await getWarehouses();
      if (warehouseResponse.status == 200) {
        const warehouses = warehouseResponse.data.data;
        let filteredWarehouses;

        if (userRole !== "Owner") {
          filteredWarehouses = warehouses.filter(
            (warehouse) => warehouse.location.id == locationId
          );
        }
        setGudangOptions(filteredWarehouses);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
    fetchKandangList();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pembagian Pakan</h1>

      <div className="p-6 bg-white border rounded">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-700 text-white text-left">
              <th className="p-3">Kandang</th>
              <th className="p-3">Kategori Ayam</th>
              <th className="p-3">Usia Ayam (Minggu)</th>
              <th className="p-3">Jumlah Ayam (Ekor)</th>
              <th className="p-3">Jenis Pakan</th>
              <th className="p-3">Jumlah Pakan</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kandangList.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.cage.name}</td>
                <td className="p-3">{r.chickenCategory}</td>
                <td className="p-3">{r.chickenAge}</td>
                <td className="p-3">
                  {r.totalChicken.toLocaleString("id-ID")} Ekor
                </td>
                <td className="p-3">{r.jenisPakan}</td>
                <td className="p-3">{rupiahKg(r.totalFeed)}</td>
                <td className="p-3">
                  {r.chickenCategory && (
                    <button
                      disabled={!canConfirmRow(r)}
                      onClick={() => openModal(r)}
                      className={`px-4 py-1 rounded ${
                        canConfirmRow(r)
                          ? "bg-orange-300 hover:bg-orange-500 cursor-pointer"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      Konfirmasi
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl m-6 rounded shadow-xl">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-bold">Konfirmasi Pembagian Pakan</h3>
              <button
                className="text-2xl leading-none hover:text-gray-500 cursor-pointer"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Kandang</p>
                  <p className="font-semibold">{confirmationData.cage.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Usia Ayam</p>
                  <p className="font-semibold">
                    {confirmationData.chickenAge} Minggu
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Kategori Ayam</p>
                  <p className="font-semibold">
                    {confirmationData.chickenCategory}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jumlah Ayam</p>
                  <p className="font-semibold">
                    {confirmationData.totalChicken.toLocaleString("id-ID")} Ekor
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Sisa Pakan Kemarin</p>
                  <p className="font-semibold">
                    {rupiahKg(confirmationData.yesterdayTotalFeed)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Jumlah yang akan dibuat
                  </p>
                  <p className="font-semibold">
                    {rupiahKg(confirmationData.expectedTotalFeed)}
                  </p>
                </div>
              </div>

              <div className="border rounded">
                <div className="px-4 py-3 border-b font-semibold">
                  Formula Pakan
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-700 text-white">
                      <tr>
                        <th className="text-left px-3 py-2">Bahan Baku</th>
                        <th className="text-left px-3 py-2">Persentase</th>
                        <th className="text-left px-3 py-2">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {confirmationData.feedDetails.map((f, i) => (
                        <tr key={i} className="border-b">
                          <td className="px-3 py-2">{f?.item?.name}</td>
                          <td className="px-3 py-2">{f?.percentage}%</td>
                          <td className="px-3 py-2">{rupiahKg(f?.quantity)}</td>
                        </tr>
                      ))}
                      {confirmationData.feedDetails.length === 0 && (
                        <tr>
                          <td
                            className="px-3 py-4 text-center text-gray-500"
                            colSpan={3}
                          >
                            Formula belum diatur untuk kategori ini.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Pilih Gudang
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={gudangId}
                  onChange={(e) => setGudangId(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih gudang
                  </option>
                  {gudangOptions.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 p-5 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={submitConfirm}
                disabled={!gudangId}
                className={`px-4 py-2 rounded text-white ${
                  gudangId
                    ? "bg-green-700 hover:bg-green-900 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
