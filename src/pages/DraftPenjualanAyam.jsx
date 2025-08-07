import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const draftSalesData = [
  {
    date: "20 Mar 2025",
    customer: "Dagang A",
    quantity: "4000 Ekor",
    pricePerUnit: 5000,
    totalPrice: 1000000,
  },
  {
    date: "20 Mar 2025",
    customer: "Dagang B",
    quantity: "4000 Ekor",
    pricePerUnit: 5000,
    totalPrice: 1000000,
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const DraftPenjualanAyam = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const detailPages = ["input-draft-penjualan-ayam"];
  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const inputDraftPesanDocHandle = () => {
    navigate(`${location.pathname}/input-draft-penjualan-ayam`);
  };

  if (isDetailPage) {
    return <Outlet />;
  }
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Draft Penjualan Ayam</h2>

      <div className="bg-white p-4 rounded shadow border">
        {/* Button Tambah Draft */}
        <div className="flex justify-end mb-3">
          <button
            onClick={inputDraftPesanDocHandle}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded text-sm font-medium"
          >
            + Draft Penjualan Ayam
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3">Tanggal Input</th>
                <th className="p-3">Pelanggan</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Harga / ekor</th>
                <th className="p-3">Harga Total</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {draftSalesData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.customer}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{formatCurrency(item.pricePerUnit)}</td>
                  <td className="p-3">{formatCurrency(item.totalPrice)}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const localNumber = "081246087972";
                          const waNumber = localNumber.replace(/^0/, "62");
                          const message = `Halo ${
                            item.customer
                          }, kami dari Anugerah Jaya Farm ingin mengonfirmasi penjualan ayam afkir sejumlah ${
                            item.quantity
                          } dengan total ${formatCurrency(item.totalPrice)}.`;
                          const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(
                            message
                          )}`;
                          window.open(waURL, "_blank");
                        }}
                        className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-900"
                      >
                        <IoLogoWhatsapp />
                      </button>
                      <button className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-900 text-sm">
                        Konfirmasi
                      </button>
                      <button className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 text-sm">
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
    </div>
  );
};

export default DraftPenjualanAyam;
