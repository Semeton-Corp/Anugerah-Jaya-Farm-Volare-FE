import React from "react";

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
  paymentDate,
  paymentStatus,
  paymentMethod,
  nominal,
  remaining,
}) => {
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
          <p>
            Harga Barang : <span className="font-semibold">Rp 100.000</span>
          </p>
          <p>
            Potongan Harga : <span className="font-semibold">Rp -0</span>
          </p>
        </div>

        <hr className="my-4" />

        <div className="mb-4">
          <p className="text-xl font-bold">Total : Rp 100.000</p>
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
              onClick={() => {}}
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
                      <td className="px-4 py-2">{payment.date}</td>
                      <td className="px-4 py-2">{payment.paymentMethod}</td>
                      <td className="px-4 py-2">
                        Rp {Intl.NumberFormat("id-ID").format(payment.nominal)}
                      </td>
                      <td className="px-4 py-2">
                        Rp{" "}
                        {Intl.NumberFormat("id-ID").format(payment.remaining)}
                      </td>
                      <td className="px-4 py-2 underline cursor-pointer">
                        Lihat Bukti
                      </td>
                      <td className="px-4 py-2 flex gap-3 justify-center">
                        <BiSolidEditAlt
                          onClick={() => {
                            setPaymentMethod(payment.paymentMethod);
                            setNominal(payment.nominal);
                            setPaymentDate(
                              convertToInputDateFormat(payment.date)
                            );
                            setPaymentId(payment.id);
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
                  {remaining === 0
                    ? "0"
                    : Intl.NumberFormat("id-ID").format(remaining)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              setShowAlokasiModal(false);
            }}
            className=""
          >
            Batal
          </button>
          <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-900 ">
            Buat Pesanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlokasiAntrianModal;
