import React, { forwardRef } from "react";
import { toJpeg } from "html-to-image";
import logo from "../assets/logo_ajf.svg";

const ReceiptModal = forwardRef(({ data, onClose }, ref) => {
  const handleDownload = async () => {
    if (ref.current === null) return;

    try {
      const dataUrl = await toJpeg(ref.current, {
        quality: 1,
        pixelRatio: 3,
      });
      const link = document.createElement("a");
      link.download = "struk.jpg";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const handleShare = async () => {
    if (ref.current === null) return;

    try {
      const blob = await toJpeg(ref.current, {
        quality: 1,
        pixelRatio: 3,
      }).then((dataUrl) => fetch(dataUrl).then((res) => res.blob()));

      const file = new File([blob], "struk.jpg", { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Struk Pembayaran",
          text: "Berikut adalah struk belanja Anda.",
          files: [file],
        });
      } else {
        alert("Sharing tidak didukung di perangkat ini.");
      }
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 bg-opacity-50 flex items-center justify-center">
      <div>
        <div
          ref={ref}
          className="bg-white text-black w-[500px] p-4 shadow-md text-[12px] font-mono relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-sm"
          >
            ✕
          </button>

          {/* Header toko */}
          <div className="text-center mb-2">
            <div className="flex justify-center">
              <img
                src={logo}
                alt="AJF Logo"
                className="w-12 h-12 sm:w-14 sm:h-14"
              />
            </div>

            <h2 className="font-bold text-[14px]">Anugerah Jaya Farm</h2>
            <p className="text-[10px]">Jl. Anugerah Jaya Farm 1, Sidodadi</p>
            <p className="text-[10px] mb-1">Jawa Timur | Telp: 08123456789</p>
            <hr className="border-t border-gray-300 my-2" />
          </div>

          {/* Info waktu dan struk */}
          <div className="mb-2">
            <p>
              Waktu: <span className="float-right">{data.time}</span>
            </p>
            <p>
              No Struk:{" "}
              <span className="float-right">{data.receiptNumber}</span>
            </p>
          </div>

          {/* Info pelanggan */}
          <div className="mb-2">
            <p>
              Pelanggan:{" "}
              <span className="float-right">{data.customerName}</span>
            </p>
            <p>
              No HP: <span className="float-right">{data.customerPhone}</span>
            </p>
          </div>

          <hr className="border-t border-gray-300 my-2" />

          {/* Tabel barang */}
          <div className="mb-2">
            <div className="flex justify-between font-bold border-b pb-1">
              <span>Item</span>
              <span>Qty</span>
              <span>Unit</span>
              <span>Harga</span>
              <span>Total</span>
            </div>
            {data.items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.qty}</span>
                <span>{item.unit}</span>
                <span>{item.unitPrice}</span>
                <span>{item.total}</span>
              </div>
            ))}
          </div>

          <hr className="border-t border-gray-300 my-2" />

          {/* Ringkasan */}
          <div className="text-[12px] mb-1">
            <p>
              Sub Total: <span className="float-right">Rp {data.subTotal}</span>
            </p>
            <p>
              Diskon: <span className="float-right">-Rp {data.discount}</span>
            </p>
            <p className="font-bold">
              Total: <span className="float-right">Rp {data.total}</span>
            </p>
            <p className="mt-1">
              Bayar: <span className="float-right">Rp {data.total}</span>
            </p>
            <p>
              Sisa Cicilan:{" "}
              <span className="float-right">{data.remaining}</span>
            </p>
            <p className="mt-1">
              Tipe Pembayaran:{" "}
              <span className="float-right">{data.paymentType}</span>
            </p>
            <p>
              Metode: <span className="float-right">{data.paymentMethod}</span>
            </p>
          </div>

          <hr className="border-t border-gray-300 my-3" />

          {/* Footer */}
          <div className="text-center text-[10px]">
            <p>Terima kasih telah berbelanja</p>
            <p>di Anugerah Jaya Farm</p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="mt-3 flex gap-3 justify-between">
          <button
            onClick={handleDownload}
            className="bg-green-700 text-white px-6 py-3 text-xs rounded hover:bg-green-900 cursor-pointer"
          >
            Download
          </button>
          <button
            onClick={handleShare}
            className="bg-green-700 text-white px-4 py-1 text-xs rounded hover:bg-green-900 cursor-pointer"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
});

export default ReceiptModal;
