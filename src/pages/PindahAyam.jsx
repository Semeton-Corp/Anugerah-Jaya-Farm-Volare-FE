// PindahAyam.jsx
import React, { useState } from "react";
import { GoAlertFill } from "react-icons/go";
import PindahAyamModal from "../components/PindahAyamModal";

const kandangList = [
  {
    nama: "Sidodadi DOC",
    id: "06112025000001",
    kategori: "DOC",
    usia: 1,
    jumlah: 11000,
    kapasitas: 11000,
  },
  {
    nama: "Sidodadi Grower",
    id: "06102025000001",
    kategori: "Grower",
    usia: 10,
    jumlah: 0,
    kapasitas: 5000,
  },
  {
    nama: "Sidodadi 01",
    id: "06092025000001",
    kategori: "Pre Layer",
    usia: 16,
    jumlah: 400,
    kapasitas: 4000,
  },
  {
    nama: "Sidodadi 02",
    id: "06082025000001",
    kategori: "Layer",
    usia: 19,
    jumlah: 400,
    kapasitas: 4000,
  },
  {
    nama: "Sidodadi 03",
    id: "06072025000001",
    kategori: "Afkir",
    usia: 30,
    jumlah: 300,
    kapasitas: 4000,
  },
];

const PindahAyam = () => {
  const [asal, setAsal] = useState(null);
  const [tujuan, setTujuan] = useState([]);
  const [jumlahDipindah, setJumlahDipindah] = useState(0);
  const [showAsalModal, setShowAsalModal] = useState(false);
  const [showTujuanModal, setShowTujuanModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPindahModal, setShowPindahModal] = useState(false);

  const sisaAyam = asal
    ? jumlahDipindah -
      tujuan.reduce((sum, t) => sum + parseInt(t.jumlahAlokasi || 0), 0)
    : 0;

  const handlePilihAsal = (kandang) => {
    setAsal(kandang);
    setShowAsalModal(false);
  };

  const handlePilihTujuan = (kandang) => {
    if (!asal) return;
    setTujuan((prev) => [
      ...prev,
      {
        ...kandang,
        jumlah: Math.min(sisaAyam, kandang.kapasitas),
        jumlahAlokasi: 0,
      },
    ]);
    setShowTujuanModal(false);
  };

  const handleUlang = (type, index) => {
    if (type === "asal") {
      setAsal(null);
      setJumlahDipindah(0);
      setTujuan([]);
    } else {
      setTujuan((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleJumlahAlokasiChange = (index, value) => {
    setTujuan((prev) => {
      const updated = [...prev];
      updated[index].jumlahAlokasi = parseInt(value) || 0;
      return updated;
    });
  };

  const handleConfirmPindah = () => {
    console.log("Ayam dipindahkan!");
    setShowPindahModal(false);
    // Lakukan proses pindah ayam di sini, misalnya panggil API
  };

  const tujuanOptions = kandangList.filter(
    (k) =>
      (!asal || k.nama !== asal.nama) && !tujuan.some((t) => t.nama === k.nama)
  );

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Pindah Ayam</h2>
      <div className="flex gap-4">
        {/* Kandang Asal */}
        <div className="w-1/2 p-4 border rounded space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Kandang Asal</h3>
            {asal && (
              <button
                className="bg-orange-300 hover:bg-orange-500 cursor-pointer text-black text-base px-3 py-1 rounded"
                onClick={() => handleUlang("asal")}
              >
                Pilih Ulang
              </button>
            )}
          </div>
          {!asal ? (
            <button
              className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-4 py-2 rounded"
              onClick={() => setShowAsalModal(true)}
            >
              Pilih Kandang
            </button>
          ) : (
            <div className="space-y-2 mt-4">
              <div className="flex flex-col gap-1">
                <p>Nama Kandang: </p>
                <p className="text-lg font-bold">{asal.nama} </p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Jumlah ayam dalam kandang: </p>
                <p className="text-lg font-bold">{asal.jumlah} Ekor </p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Ayam yang akan dipindah: </p>
                <input
                  type="number"
                  className="border px-2 py-1 w-full"
                  placeholder="Ayam yang akan dipindah"
                  min={1}
                  max={asal?.jumlah || 0}
                  value={jumlahDipindah}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (value > asal.jumlah) value = asal.jumlah;
                    if (value < 0) value = 0;
                    setJumlahDipindah(value);
                    setTujuan([]);
                  }}
                />
              </div>

              {sisaAyam !== 0 && (
                <p className="text-red-600 font-bold">
                  Sisa ayam yang belum berpindah: {sisaAyam} Ekor
                </p>
              )}
            </div>
          )}
        </div>

        {/* Kandang Tujuan */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Kandang Tujuan</h3>
            <button
              className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-4 py-2 rounded"
              onClick={() => {
                if (!asal || sisaAyam < 1) {
                  setShowAlert(true);
                  // console.log("sisaAyam: ", sisaAyam);
                  // console.log("asal: ", asal);
                } else {
                  setShowTujuanModal(true);
                  // console.log("sisaAyam: ", sisaAyam);
                  // console.log("asal: ", asal);
                }
              }}
            >
              Tambah kandang tujuan
            </button>
          </div>
          {tujuan.map((k, i) => (
            <div key={i} className="p-4 border rounded space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold">Kandang tujuan {i + 1}</h4>
                <button
                  className="bg-orange-300 hover:bg-orange-500 text-black px-3 py-1 rounded cursor-pointer"
                  onClick={() => handleUlang("tujuan", i)}
                >
                  Pilih Ulang ✕
                </button>
              </div>
              <p className="font-medium">Nama Kandang</p>
              <p className="text-lg font-bold">{k.nama}</p>
              <p className="font-medium">Kapasitas maksimum</p>
              <p className="text-lg font-bold">{k.kapasitas} Ekor</p>
              <label className="block mt-2 font-medium">
                Alokasi di Kandang ini
              </label>
              <input
                type="number"
                className="border px-2 py-1 w-full"
                placeholder="Ayam yang akan dipindah"
                max={k.kapasitas || 0}
                value={k.jumlahAlokasi}
                onChange={(e) => {
                  let value = parseInt(e.target.value);
                  if (value > k.kapasitas) value = k.kapasitas;
                  if (value < 0) value = 0;
                  handleJumlahAlokasiChange(i, value);
                }}
              />
            </div>
          ))}
          {sisaAyam < 0 && (
            <div className="bg-orange-100 text-red-600 px-4 py-2 rounded flex items-center gap-4 text-base">
              <GoAlertFill size={36} />
              Alokasi melebihi kapasitas maksimum kandang
            </div>
          )}
          {tujuan.length !== 0 && sisaAyam > 0 && (
            <div className="flex justify-end">
              <button
                className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-4 py-2 rounded"
                onClick={() => setShowPindahModal(true)}
              >
                Kofirmasi pemindahan ayam
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAsalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Daftar Kandang</h3>
              <button
                onClick={() => setShowAsalModal(false)}
                className="text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <table className="min-w-full table-auto border-gray-200">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Kandang</th>
                  <th className="px-4 py-2 text-left">ID Batch</th>
                  <th className="px-4 py-2 text-left">Kategori</th>
                  <th className="px-4 py-2 text-left">Usia Ayam</th>
                  <th className="px-4 py-2 text-left">Jumlah Ayam</th>
                  <th className="px-4 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kandangList.map((k, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{k.nama}</td>
                    <td className="px-4 py-2">{k.id}</td>
                    <td className="px-4 py-2">{k.kategori}</td>
                    <td className="px-4 py-2">{k.usia}</td>
                    <td className="px-4 py-2">{k.jumlah}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handlePilihAsal(k)}
                        className="bg-orange-300 hover:bg-orange-500 px-3 py-1 rounded"
                      >
                        Pilih Kandang
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showTujuanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Daftar Kandang Tujuan</h3>
              <button
                onClick={() => setShowTujuanModal(false)}
                className="text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <table className="min-w-full table-auto border-gray-200">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Kandang</th>
                  <th className="px-4 py-2 text-left">ID Batch</th>
                  <th className="px-4 py-2 text-left">Kategori</th>
                  <th className="px-4 py-2 text-left">Usia Ayam</th>
                  <th className="px-4 py-2 text-left">Kapasitas</th>
                  <th className="px-4 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tujuanOptions.map((k, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{k.nama}</td>
                    <td className="px-4 py-2">{k.id}</td>
                    <td className="px-4 py-2">{k.kategori}</td>
                    <td className="px-4 py-2">{k.usia}</td>
                    <td className="px-4 py-2">{k.kapasitas}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handlePilihTujuan(k)}
                        className="bg-orange-300 hover:bg-orange-500 px-3 py-1 rounded"
                      >
                        Pilih Kandang
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-lg font-semibold mb-4">
              {sisaAyam == 0
                ? "Tidak ayam yang tersisa untuk dipindah!"
                : sisaAyam < 0
                ? "Ayam yang dipindahkan sudah melebihi batas!"
                : "Silakan pilih kandang asal & isi jumlah yang ingin dipindah terlebih dahulu!"}
            </p>
            <button
              className="bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => setShowAlert(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <PindahAyamModal
        isOpen={showPindahModal}
        onClose={() => setShowPindahModal(false)}
        onConfirm={handleConfirmPindah}
      />
    </div>
  );
};

export default PindahAyam;
