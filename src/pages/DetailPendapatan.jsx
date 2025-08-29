// src/pages/DetailPendapatan.jsx
import React from "react";

const formatRupiah = (n = 0) =>
  "Rp " +
  Number(n)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const formatTanggalID = (iso) => {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
};

const Field = ({ label, value, className = "" }) => (
  <div className={className}>
    <div className=" text-gray-600">{label}</div>
    <div className="mt-1 font-extrabold">{value || "-"}</div>
  </div>
);

export default function DetailPendapatan() {
  const data = {
    tanggal: "2025-03-20",
    waktu: "10:30",
    kategori: "Penjualan Ayam",
    lokasi: "Gudang Pusat",
    namaPelanggan: "Yasin",
    telpPelanggan: "08123456789",
    namaBarang: "Telur OK",
    jumlahBarang: "2 Ikat",
    tipeTransaksi: "Cicilan",
    totalTransaksi: 5_000_000,
    nominalPemasukan: 1_000_000,
    metodePembayaran: "Tunai",
    diinputOleh: "Selamet",
    buktiUrl: "#", // ganti dengan link bukti
    strukUrl: "#", // ganti dengan link struk
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Detail Pendapatan</h1>

      <div className="rounded-md border border-gray-300 p-6">
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-10">
          {/* Baris 1 */}
          <Field label="Tanggal" value={formatTanggalID(data.tanggal)} />
          <Field label="Waktu" value={data.waktu} />

          {/* Baris 2 */}
          <Field label="Kategori" value={data.kategori} />
          <div />

          {/* Baris 3 */}
          <Field label="Lokasi Transaksi" value={data.lokasi} />
          <div />

          {/* Baris 4 */}
          <Field label="Nama Pelanggan" value={data.namaPelanggan} />
          <Field label="Nomor Telepon Pelanggan" value={data.telpPelanggan} />

          {/* Baris 5 */}
          <Field label="Nama barang" value={data.namaBarang} />
          <Field label="Jumlah Barang" value={data.jumlahBarang} />

          {/* Baris 6 */}
          <Field label="Tipe Transaksi" value={data.tipeTransaksi} />
          <div />

          {/* Baris 7 */}
          <Field
            label="Total Transaksi"
            value={formatRupiah(data.totalTransaksi)}
          />
          <Field label="Metode Pembayaran" value={data.metodePembayaran} />

          {/* Baris 8 */}
          <Field
            label="Nominal Pemasukan"
            value={formatRupiah(data.nominalPemasukan)}
          />
          <div />
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <a
            href={data.buktiUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-orange-300 hover:bg-orange-500 px-4 py-2 font-medium text-black"
            onClick={(e) => data.buktiUrl === "#" && e.preventDefault()}
          >
            Lihat Bukti Transaksi
          </a>
          <a
            href={data.strukUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-orange-300 hover:bg-orange-500 px-4 py-2 font-medium text-black"
            onClick={(e) => data.strukUrl === "#" && e.preventDefault()}
          >
            Lihat Struk Transaksi
          </a>
        </div>

        {/* Footer */}
        <div className="mt-6">
          <div className=" text-gray-600">Transaksi Diinputkan oleh</div>
          <div className="mt-1 font-extrabold">{data.diinputOleh}</div>
        </div>
      </div>
    </div>
  );
}
