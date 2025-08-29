// src/pages/TambahPengeluaran.jsx
import React, { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { getLocations } from "../services/location";
import { useEffect } from "react";
import { getStores } from "../services/stores";
import { getWarehouses } from "../services/warehouses";
import { getCage } from "../services/cages";

const formatTanggalID = (d = new Date()) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);

const KATEGORI_OPTIONS = ["Operasional", "Lain-lain"];

const LOKASI_OPTIONS = [
  "Sidodadi - Kandang 01",
  "Sidodadi - Kandang 02",
  "Sidodadi - Toko A",
  "Sidodadi - Gudang Pusat",
];

export default function TambahPengeluaran() {
  const [form, setForm] = useState({
    expenseCategory: "",
    locationId: "",
    placeId: "",
    locationType: "",
    /////////////
    namaTransaksi: "",
    penerima: "",
    telepon: "",
    nominal: "",
    metode: "",
    deskripsi: "",
    buktiFile: null,
  });

  const [lokasiOptions, setLokasiOptions] = useState(LOKASI_OPTIONS);
  const [selectedLokasiId, setSelectedLokasiId] = useState(0);

  const getId = (o) =>
    o?.id ?? o?._id ?? o?.storeId ?? o?.cageId ?? o?.warehouseId ?? o?.value;

  const getName = (o) =>
    o?.name ??
    o?.storeName ??
    o?.cageName ??
    o?.warehouseName ??
    o?.title ??
    "-";

  const mapOptions = (arr, sourceLabel) =>
    (arr || []).map((item) => ({
      placeId: getId(item),
      label: `${getName(item)} (${sourceLabel})`,
      locationType: sourceLabel,
    }));

  const [siteOptions, setSiteOptions] = useState(LOKASI_OPTIONS);

  const fileRef = useRef(null);

  const onChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onLokasiChange = (e) => {
    const value = e.target.value;
    const opt = lokasiOptions.find((o) => String(o.placeId) === String(value));
    setForm((f) => ({
      ...f,
      placeId: value,
      locationType: opt?.locationType || "",
    }));
  };

  const onChooseFile = () => fileRef.current?.click();

  const onFile = (e) => {
    const file = e.target.files?.[0];
    setForm((f) => ({ ...f, buktiFile: file || null }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert(
      "Disimpan!\n\n" +
        JSON.stringify(
          {
            ...form,
            buktiFile: form.buktiFile ? form.buktiFile.name : null,
          },
          null,
          2
        )
    );
  };

  const fetchSite = async () => {
    try {
      const siteResponse = await getLocations();
      if (siteResponse.status == 200) {
        setSiteOptions(siteResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchLokasi = async () => {
    try {
      if (!form?.locationId) return;
      const [storesRes, cagesRes, warehousesRes] = await Promise.all([
        getStores(form.locationId),
        getCage(form.locationId),
        getWarehouses(form.locationId),
      ]);

      const stores = mapOptions(
        storesRes?.data?.data ?? storesRes?.data,
        "Toko"
      );
      const cages = mapOptions(
        cagesRes?.data?.data ?? cagesRes?.data,
        "Kandang"
      );
      const warehouses = mapOptions(
        warehousesRes?.data?.data ?? warehousesRes?.data,
        "Gudang"
      );

      const merged = [...stores, ...cages, ...warehouses];
      console.log("merged: ", merged);
      setLokasiOptions(merged);
    } catch (error) {
      console.error("error :", error);
    }
  };

  useEffect(() => {
    fetchSite();
  }, []);

  useEffect(() => {
    fetchLokasi();
  }, [form.locationId]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Tambah Pengeluaran</h1>
        <div className="text-gray-700 font-medium">{formatTanggalID()}</div>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-md border border-gray-300 p-5 md:p-6"
      >
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Kategori Pengeluaran
          </label>
          <select
            value={form.kategori}
            onChange={onChange("expenseCategory")}
            className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 outline-none"
          >
            <option value="" disabled>
              Pilih kategori pengeluaran
            </option>
            {KATEGORI_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Site Transaksi
          </label>
          <select
            value={form.locationId}
            onChange={onChange("locationId")}
            className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 outline-none"
          >
            <option value="" disabled>
              Pilih lokasi pengeluaran
            </option>
            {siteOptions.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Lokasi Transaksi
          </label>
          <select
            value={form.placeId}
            onChange={onLokasiChange}
            className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 outline-none"
          >
            <option value="" disabled>
              Pilih lokasi pengeluaran
            </option>
            {lokasiOptions.map((o) => (
              <option key={`${o.source}-${o.placeId}`} value={o.placeId}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Nama Transaksi
          </label>
          <input
            type="text"
            value={form.namaTransaksi}
            onChange={onChange("namaTransaksi")}
            placeholder="Nama Tugas Tambahan"
            className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Penerima</label>
            <input
              type="text"
              value={form.penerima}
              onChange={onChange("penerima")}
              placeholder="Masukkan tanggal pelaksanaan tugas"
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Nomor Telepon
            </label>
            <input
              type="number"
              value={form.telepon}
              onChange={onChange("telepon")}
              placeholder="Masukkan waktu pelaksanaan tugas"
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Nominal Pengeluaran
            </label>

            <div className="flex items-center rounded border border-gray-300 bg-gray-100 px-3 py-2">
              <span className="text-gray-600 mr-2 select-none">Rp</span>
              <input
                type="number"
                inputMode="numeric"
                value={form.nominal}
                onChange={onChange("nominal")}
                placeholder="0"
                className="flex-1 bg-transparent outline-none border-0 focus:ring-0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Metode Pembayaran
            </label>
            <select
              value={form.metode}
              onChange={onChange("metode")}
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 outline-none"
            >
              <option value="" disabled>
                Pilih metode pembayaran
              </option>
              <option value="Tunai">Tunai</option>
              <option value="Non Tunai">Non Tunai</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Bukti Pembayaran
          </label>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={onFile}
            accept="image/*,application/pdf"
          />
          <button
            type="button"
            onClick={onChooseFile}
            className="inline-flex items-center gap-2 rounded border border-gray-300 bg-gray-100 px-3 py-2"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-gray-300">
              <FiUpload size={14} />
            </span>
            {form.buktiFile ? form.buktiFile.name : "Unggah bukti pembayaran"}
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Deskripsi Pengeluaran
          </label>
          <textarea
            rows={3}
            value={form.deskripsi}
            onChange={onChange("deskripsi")}
            placeholder="Tuliskan deskripsi pekerjaan tambahan"
            className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded bg-green-700 hover:bg-green-900 text-white px-5 py-2"
          >
            Simpan
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          console.log("form: ", form);
          console.log("lokasiOptions: ", lokasiOptions);
        }}
      >
        CHECK
      </button>
    </div>
  );
}
