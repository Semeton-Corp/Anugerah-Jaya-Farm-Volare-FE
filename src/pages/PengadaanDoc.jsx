import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";

const PengadaanDoc = () => {
  const draftPengadaanDOC = [
    {
      tanggalInput: "20 Mar 2025",
      supplier: "Dagang A",
      jumlah: "4000 Ekor",
      harga: "Rp 1.000.000",
      status: "Belum Konfirmasi",
    },
    {
      tanggalInput: "20 Mar 2025",
      supplier: "Dagang B",
      jumlah: "4000 Ekor",
      harga: "Rp 1.000.000",
      status: "Belum Konfirmasi",
    },
  ];

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Draft Pengadaan DOC</h1>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-300">
        <div className="flex justify-end items-center mb-2">
          <button className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            + Draft Pemesanan DOC
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-green-700 text-white ">
            <tr>
              <th className="px-3 py-2">Tanggal Input</th>
              <th className="px-3 py-2">Suplier</th>
              <th className="px-3 py-2">Jumlah</th>
              <th className="px-3 py-2">Harga</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {draftPengadaanDOC.map((item, index) => (
              <tr key={index} className="border-b text-center">
                <td className="px-3 py-2">{item.tanggalInput}</td>
                <td className="px-3 py-2">{item.supplier}</td>
                <td className="px-3 py-2">{item.jumlah}</td>
                <td className="px-3 py-2">{item.harga}</td>
                <td className="px-3 py-2">
                  <span className="bg-orange-200 text-black px-2 py-1 rounded text-sm">
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-3 justify-center">
                    <button className="px-3 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer">
                      <IoLogoWhatsapp />
                    </button>
                    <button
                      onClick={() => {}}
                      className="px-3 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer"
                    >
                      Konfirmasi
                    </button>
                    <button
                      onClick={() => {}}
                      className="px-3 py-1 bg-kritis-box-surface-color rounded-[4px] text-white hover:bg-kritis-text-color cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PengadaanDoc;
