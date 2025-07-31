import React, { useRef, useState } from "react";
import { formatDateToDDMMYYYY } from "../utils/dateFormat";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const AlokasiAntrianModal = ({
  customerName,
  itemName,
  quantity,
  setQuantity,
  units,
  unit,
  setUnit,
  setShowAlokasiModal,
  paymentHistory,
  setPaymentHistory,
  paymentDate,
  setPaymentDate,
  paymentStatus,
  paymentMethod,
  setPaymentMethod,
  nominal,
  setNominal,
  remaining,
  itemTotalPrice,
  itemPriceDiscount,
  paymentType,
  setPaymentType,
  paymentProof,
  submitHandle,
  sendDate,
  setSendDate,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const dateInputRef = useRef(null);

  const addPaymentHistory = () => {
    const storeSalePayment = {
      paymentDate: formatDateToDDMMYYYY(paymentDate),
      nominal: nominal.toString(),
      paymentProof: paymentProof,
      paymentMethod: paymentMethod,
    };
    setPaymentHistory((prevHistory) => [...prevHistory, storeSalePayment]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Alokasi Telur Antrian Pesanan
        </h2>

        <div className="mb-2">
          <p className="text-sm">Nama Pembeli</p>
          <p className="font-bold">{customerName}</p>
        </div>
        <div className="mb-2">
          <p className="text-sm">Nama Barang</p>
          <p className="font-bold">{itemName}</p>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">
              Jumlah Barang
            </label>
            <input
              type="number"
              value={quantity}
              className="w-full border rounded px-3 py-2"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Satuan</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            >
              {units?.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Tanggal Kirim
          </label>
          <input
            ref={dateInputRef}
            className={`w-full border rounded p-2 mb-4cursor-pointer`}
            type="date"
            value={sendDate}
            onClick={() => {
              if (dateInputRef.current?.showPicker) {
                dateInputRef.current.showPicker();
              }
            }}
            onChange={(e) => setSendDate(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <p>
            Harga Barang :{" "}
            <span className="font-semibold">{`Rp ${itemTotalPrice.toLocaleString(
              "id-ID"
            )}`}</span>
          </p>
          <p>
            Potongan Harga :{" "}
            <span className="font-semibold">{`Rp - ${itemPriceDiscount.toLocaleString(
              "id-ID"
            )}`}</span>
          </p>
        </div>

        <hr className="my-4" />

        <div className="mb-4">
          <p className="text-xl font-bold">{`Total : Rp ${(
            itemTotalPrice - itemPriceDiscount
          ).toLocaleString("id-ID")}`}</p>
        </div>

        {/* Status Pembayaran */}
        <div className="p-4 border border-black-6 rounded-[4px]">
          <div className="flex justify-between">
            <h1
              className={`text-lg font-bold "text-black"
              `}
            >
              Pembayaran
            </h1>

            <div
              className={`px-5 py-3  rounded-[4px] bg-orange-400 hover:bg-orange-600 cursor-pointer`}
              onClick={() => {
                if (paymentStatus == "Lunas") {
                  alert("Pesanan ini sudah Lunas!");
                } else {
                  setShowPaymentModal(true);
                }
              }}
            >
              Pilih Pembayaran
            </div>
          </div>

          {/* table */}
          <div className="mt-4">
            <table className="w-full">
              <thead className={`w-full bg-green-700 text-white`}>
                <tr>
                  <th className="px-4 py-2">Tanggal</th>
                  <th className="px-4 py-2">Metode Pembayaran</th>
                  <th className="px-4 py-2">Nominal Pembayaran</th>
                  <th className="px-4 py-2">Sisa Cicilan</th>
                  <th className="px-4 py-2">Bukti</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="border-b text-center">
                {paymentHistory && paymentHistory.length > 0 ? (
                  paymentHistory.map((payment, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{payment.paymentDate}</td>
                      <td className="px-4 py-2">{payment.paymentMethod}</td>
                      <td className="px-4 py-2">
                        Rp {Intl.NumberFormat("id-ID").format(payment.nominal)}
                      </td>
                      <td className="px-4 py-2">
                        Rp{" "}
                        {Intl.NumberFormat("id-ID").format(
                          itemTotalPrice - itemPriceDiscount - payment.nominal
                        )}
                      </td>
                      <td className="px-4 py-2 underline cursor-pointer">
                        Lihat Bukti
                      </td>
                      <td className="px-4 py-2 flex gap-3 justify-center">
                        <BiSolidEditAlt
                          onClick={() => {
                            setPaymentMethod(payment?.paymentMethod);
                            setNominal(payment?.nominal);
                            setPaymentDate(
                              convertToInputDateFormat(payment?.date)
                            );
                            setPaymentId(payment?.id);
                            setShowEditModal(true);
                          }}
                          size={24}
                          className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                        />
                        <MdDelete
                          onClick={() => {}}
                          size={24}
                          className="cursor-pointer text-black hover:text-gray-300 transition-colors duration-200"
                        />
                      </td>
                    </tr>
                  ))
                ) : paymentDate &&
                  paymentMethod &&
                  nominal &&
                  remaining &&
                  paymentProof ? (
                  <tr>
                    <td className="px-4 py-2">
                      {formatDateToDDMMYYYY(paymentDate)}
                    </td>
                    <td className="px-4 py-2">{paymentMethod}</td>
                    <td className="px-4 py-2">
                      Rp {Intl.NumberFormat("id-ID").format(nominal)}
                    </td>
                    <td className="px-4 py-2">
                      Rp {Intl.NumberFormat("id-ID").format(remaining)}
                    </td>
                    <td className="px-4 py-2 underline cursor-pointer">
                      Lihat Bukti
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className={`text-center py-4 italic  text-gray-500`}
                    >
                      Belum ada data pembayaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* status pembayaran */}
          <div className="flex mt-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className={`text-lg font-bold text-black`}>
                Status Pembayaran:{" "}
              </h1>
              <div
                className={`px-5 py-3 text-xl rounded-[4px] ${
                  paymentStatus === "Belum Lunas"
                    ? "bg-orange-200 text-kritis-text-color"
                    : "bg-aman-box-surface-color text-aman-text-color"
                }
                     
                      `}
              >
                {paymentStatus}
              </div>
            </div>

            <div>
              <div className={`text-xl font-semibold text-black`}>
                Sisa cicilan
              </div>
              <div className={`font-semibold text-3xl flex text-black`}>
                <p className="me-2">RP</p>
                <p className="">
                  {Intl.NumberFormat("id-ID").format(remaining)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => {
              setShowAlokasiModal(false);
              setPaymentHistory([]);
            }}
            className="ptext-green-700 px-6 rounded border border-green-700 hover:bg-green-200 cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={() => {
              submitHandle();
            }}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-900 cursor-pointer "
          >
            Buat Pesanan
          </button>
        </div>
      </div>
      {showPaymentModal && (
        <div className="fixed w-full inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full bg-white mx-40 p-6 rounded-lg shadow-xl relative">
            <h3 className="text-xl font-bold mb-4">Pembayaran</h3>

            {/* Tipe Pembayaran */}
            <>
              <label className="block mb-2 font-medium">Tipe Pembayaran</label>
              <select
                className="w-full border p-2 rounded mb-4"
                value={paymentType}
                onChange={(e) => {
                  setPaymentType(e.target.value);
                }}
              >
                <option className="text-black-6" value="" disabled hidden>
                  Pilih Metode Pembayaran
                </option>
                <option value="Penuh">Penuh</option>
                <option value="Cicil">Cicil</option>
              </select>{" "}
            </>

            {/* Metode Pembayaran */}
            <label className="block mb-2 font-medium">Metode Pembayaran</label>
            <select
              className="w-full border p-2 rounded mb-4"
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            >
              <option className="text-black-6" value="" disabled hidden>
                Pilih Metode Pembayaran
              </option>
              <option value="Tunai">Tunai</option>
              <option value="Non Tunai">Non Tunai</option>
            </select>

            {/* Nominal Bayar */}
            <label className="block mb-2 font-medium">Nominal Bayar</label>
            <input
              type="number"
              className="w-full border p-2 rounded mb-4"
              placeholder="Masukkan nominal pembayaran"
              value={nominal == 0 ? "" : nominal}
              onChange={(e) => {
                setNominal(e.target.value);
              }}
            />

            {/* Tanggal Bayar */}

            <label className="block font-medium ">Tanggal Bayar</label>
            <input
              ref={dateInputRef}
              className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
              type="date"
              value={paymentDate}
              onClick={() => {
                // Manually open the date picker when the input is clicked
                if (dateInputRef.current?.showPicker) {
                  dateInputRef.current.showPicker(); // Modern browsers
                }
              }}
              onChange={(e) => setPaymentDate(e.target.value)}
            />

            {/* Bukti Pembayaran */}
            <label className="block mb-2 font-medium">Bukti Pembayaran</label>
            <input type="file" className="w-full border p-2 rounded mb-4" />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setPaymentType("Cicil");
                  setPaymentMethod("Tunai");
                  setNominal(0);
                  setShowPaymentModal(false);
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-500 rounded cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  addPaymentHistory();
                  setShowPaymentModal(false);
                }}
                className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlokasiAntrianModal;
