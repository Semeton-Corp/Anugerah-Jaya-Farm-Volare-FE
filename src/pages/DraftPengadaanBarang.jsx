// src/pages/DraftPengadaanBarang.jsx
import React, { useMemo, useState } from "react";
import { IoCalendarOutline, IoLogoWhatsapp } from "react-icons/io5";
import KonfirmasiPemesananDocModal from "../components/KonfirmasiPemesananDocModal";
import {
  confirmationWarehouseItemProcurementDraft,
  getWarehouseItemProcurementDrafts,
  getWarehouses,
} from "../services/warehouses";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import KonfirmasiPemesananBarangModal from "../components/KonfirmasiPemesananBarangModal";

const toRupiah = (n) =>
  `Rp ${Number(n || 0).toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;

const DraftPengadaanBarang = () => {
  const navigate = useNavigate();

  const [draftData, setDraftData] = useState([]);

  const [showBatalModal, setShowBatalModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [kandangOptions, setKandangOptions] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const detailPages = ["input-draft-pengadaan-barang"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const handleCompare = () => console.log("Perbandingan Pakan clicked");
  const handleAdd = () => console.log("Tambah Pengadaan clicked");
  const handlePesan = (row) => console.log("Pesan:", row);
  const handleEdit = (row) => console.log("Edit:", row);
  const handleBatal = (row) =>
    setDrafts((prev) => prev.filter((d) => d.id !== row.id));
  const openWA = (row) =>
    window.open(`https://wa.me/${row.wa.replace(/\D/g, "")}`, "_blank");

  const fmtShort = (iso) => {
    const d = new Date(iso);
    const opt = { day: "2-digit", month: "short", year: "numeric" };
    return d.toLocaleDateString("en-GB", opt).replace(",", "");
  };

  const inputDraftPesanBarangHandle = () => {
    navigate(`${location.pathname}/input-draft-pengadaan-barang`);
  };

  const fetchDraftData = async () => {
    try {
      const draftResponse = await getWarehouseItemProcurementDrafts();
      console.log("draftResponse: ", draftResponse);
      if (draftResponse.status == 200) {
        setDraftData(draftResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleConfirmProcuremnet = async (payload) => {
    try {
      const submitResponse = await confirmationWarehouseItemProcurementDraft(
        payload,
        selectedItem.id
      );
      console.log("submitResponse: ", submitResponse);
      if (submitResponse.status == 200) {
        setDraftData(submitResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchDraftData();
  }, []);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Draft Pengadaan Barang</h2>
      </div>
      <div className="bg-white p-4 rounded border shadow">
        <div className="flex justify-end items-center mb-3 gap-4">
          <button
            onClick={() => {}}
            className="bg-orange-300 hover:bg-yellow-500 py-2 rounded px-4 cursor-pointer"
          >
            Perbandingan Pakan
          </button>
          <button
            onClick={inputDraftPesanBarangHandle}
            className="bg-orange-300 hover:bg-yellow-500 py-2 px-4 rounded cursor-pointer"
          >
            + Tambah Pengadaan Barang
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3">Tanggal Input</th>
                <th className="p-3">Nama Barang</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Satuan</th>
                <th className="p-3">Suplier</th>
                <th className="p-3">Harga total</th>
                {/* <th className="p-3">Status</th> */}
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {draftData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{item.inputDate}</td>
                  <td className="p-3">{item.item.name}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.item.unit}</td>
                  <td className="p-3">{item.supplier.name}</td>
                  <td className="p-3">
                    {`Rp ${Number(item.totalPrice).toLocaleString("id-ID")}`}
                  </td>

                  <td className="p-3 flex items-center gap-2">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => {
                          const localNumber = "081246087972";
                          const waNumber = localNumber.replace(/^0/, "62");

                          const namaCustomer = item?.customer?.name || "";
                          const namaBarang = item?.item?.name || "";
                          const satuan = item?.item?.unit || "";
                          const jumlah = item?.quantity || "";
                          const message = `Halo ${namaCustomer}, kami dari Anugerah Jaya Farm ingin mengonfirmasi pesanan Anda:%0A%0A🧺 Nama Barang: ${namaBarang}%0A📦 Jumlah: ${jumlah} ${satuan}%0A%0AApakah jadi untuk memesan?`;
                          const waURL = `https://wa.me/${waNumber}?text=${message}`;

                          window.open(waURL, "_blank");
                        }}
                        className="px-3 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer"
                      >
                        <IoLogoWhatsapp />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          console.log("item: ", item);
                          setShowOrderModal(true);
                        }}
                        className="px-3 py-1 bg-orange-300 rounded-[4px] hover:bg-orange-500 cursor-pointer"
                      >
                        Pesan
                      </button>
                      <button
                        onClick={() => {}}
                        className="px-3 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowBatalModal(true);
                        }}
                        className="px-3 py-1 bg-kritis-box-surface-color rounded-[4px] text-white hover:bg-kritis-text-color cursor-pointer"
                      >
                        Batalkan
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showBatalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-md px-8 py-6 max-w-md text-center">
            <p className="text-lg font-semibold mb-6">
              Apakah anda yakin untuk pengadaan barang ini?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowBatalModal(false)}
                className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-black font-semibold px-6 py-2 rounded-lg"
              >
                Tidak
              </button>
              <button
                onClick={() => {
                  handleDelete();
                }}
                className="bg-red-400 hover:bg-red-500 cursor-pointer text-white font-semibold px-6 py-2 rounded-lg"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      {showOrderModal && (
        <KonfirmasiPemesananBarangModal
          selectedItem={selectedItem}
          onClose={() => setShowOrderModal(false)}
          onConfirm={(payload) => {
            handleConfirmProcuremnet(payload);
            console.log("ORDER PAYLOAD →", payload);
            // setShowOrderModal(false);
            // TODO: call API here
          }}
        />
      )}
    </div>
  );
};

export default DraftPengadaanBarang;
