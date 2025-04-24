import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getStores } from "../services/stores";
import { getWarehouseItems } from "../services/warehouses";
import {
  getTodayDateInBahasa,
  formatDateToDDMMYYYY,
} from "../utils/dateFormat";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createStoreSale } from "../services/stores";
import { getStoreSaleById } from "../services/stores";

const InputDataPesanan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailPages = ["input-data-pesanan"];
  const dateInputRef = useRef(null);

  const { id } = useParams();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("Ikat");

  const [price, setPrice] = useState(0);
  const [nominal, setNominal] = useState(0);
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const today = new Date().toISOString().split("T")[0];
  const [sendDate, setSendDate] = useState(today);
  const [paymentDate, setPaymentDate] = useState(today);

  const [paymentType, setPaymentType] = useState("Cicil");
  const [paymentMethod, setPaymentMethod] = useState("Tunai");

  const [paymentProof, setPaymentProof] = useState("https://example.com");

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const fetchStoresData = async () => {
    try {
      const response = await getStores();

      if (response.status == 200) {
        setStores(response.data.data);
        setSelectedStore(response.data.data[0].id);
      }
    } catch (error) {
      alert("Gagal memuat data toko: ", error);
      console.log("error: ", error);
    }
  };

  const fetchItemsData = async (storeId) => {
    try {
      const response = await getWarehouseItems("Telur", storeId);
      // console.log("response ", response);

      if (response.status == 200) {
        setItems(response.data.data);
        setSelectedItem(response.data.data[0]);
      }
    } catch (error) {}
  };

  const fetchEditSaleStoreData = async (id) => {
    try {
      const response = await getStoreSaleById(id);
      console.log("id: ", id);

      console.log("response get sale by id: ", response);
      // console.log("customer name: ", response.data.data.customer);

      if (response.status == 200) {
        setSelectedStore(response.data.data.store.id);
        setCustomer(response.data.data.customer);
        setPhone(response.data.data.phone);
        setSelectedItem(response.data.data.warehouseItem.name);
        setQuantity(response.data.data.quantity);
        setUnit(response.data.data.saleUnit);
        setPrice(response.data.data.price);
        setSendDate(response.data.data.sentDate);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchStoresData();
    fetchItemsData(selectedStore);

    if (id) {
      fetchEditSaleStoreData(id);
    }
  }, []);

  useEffect(() => {
    fetchItemsData(selectedStore);
  }, [selectedStore]);

  useEffect(() => {
    setTotal(price * quantity);
  }, [price, quantity]);

  useEffect(() => {
    setRemaining(total - nominal);
  }, [total, nominal]);

  const submitHandle = async () => {
    const storeSalePayment = {
      paymentDate: formatDateToDDMMYYYY(paymentDate),
      nominal: nominal.toString(),
      paymentProof: paymentProof,
      paymentMethod: paymentMethod,
    };

    const payload = {
      customer: customer,
      phone: phone.toString(),
      warehouseItemId: selectedItem.id,
      saleUnit: unit,
      storeId: parseInt(selectedStore),
      quantity: quantity,
      price: price.toString(),
      sendDate: formatDateToDDMMYYYY(sendDate),
      paymentType: paymentType,
      storeSalePayment: storeSalePayment,
    };

    // console.log("payload is ready: ", payload);

    try {
      const response = await createStoreSale(payload);
      // console.log("response: ", response);

      if (response.status == 201) {
        navigate(-1);
      }
    } catch (error) {
      // console.log("response: ", error);

      alert("Gagal menyimpan data pesanan");
    }
  };

  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header section */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">
          {id ? "Detail Pesanan" : "Input Data Pesanan"}
        </h1>
        <div className="text-base flex gap-2">
          <p>{`Hari ini (${getTodayDateInBahasa()})`}</p>
        </div>
      </div>

      {/* Telur  ok, retak, pecah, reject*/}

      {id ? (
        <></>
      ) : (
        <div className="flex md:grid-cols-2 gap-4 justify-between">
          {/* telur OK */}
          <div className="p-4 w-full rounded-md border-2 border-black-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Telur OK</h2>
              <div className="p-2 rounded-xl bg-green-700">
                <MdEgg size={24} color="white" />
              </div>
            </div>

            <div className="flex justify-center flex-wrap gap-4">
              {/* item ikat */}
              <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                <p className="text-3xl font-bold text-center">50</p>
                <p className="text-xl text-center">Ikat</p>
              </div>
              {/* item karpet */}
              <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                <p className="text-3xl font-bold text-center">100</p>
                <p className="text-xl text-center">Karpet</p>
              </div>
              {/* item butir */}
              <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                <p className="text-3xl font-bold text-center">1000</p>
                <p className="text-xl text-center">Butir</p>
              </div>
            </div>
          </div>

          {/* telur Retak */}
          <div className="p-4 w-full rounded-md border-2 border-black-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Telur Retak</h2>
              <div className="p-2 rounded-xl bg-green-700">
                <TbEggCrackedFilled size={24} color="white" />
              </div>
            </div>

            <div className="flex justify-center flex-wrap gap-4">
              {/* item butir */}
              <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                <p className="text-3xl font-bold text-center">30</p>
                <p className="text-xl text-center">Butir</p>
              </div>
            </div>
          </div>
          {/* penjualan telur */}
          <div className="p-4 w-full rounded-md border-2 border-black-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Telur Pecah</h2>
              <div className="p-2 rounded-xl bg-green-700">
                <TbEggCrackedFilled size={24} color="white" />
              </div>
            </div>

            <div className="flex justify-center flex-wrap gap-4">
              {/* item butir */}
              <div className="flex flex-col items-center justify-center w-32 py-4 bg-green-200 rounded-md">
                <p className="text-3xl font-bold text-center">80</p>
                <p className="text-xl text-center">Butir</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* InputDataPesanan box  */}
      <div className="p-4 border border-black-6 rounded-[4px]">
        <h1 className="text-lg font-bold">
          {id ? "Detail Data Pesanan" : "Input Data Pesanan"}
        </h1>

        {/* Pilih Toko/Gudang */}
        <label className="block font-medium  mt-4">Pilih Toko</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
          value={selectedStore}
          onChange={(e) => {
            setSelectedStore(e.target.value);
          }}
        >
          {stores.map((store) => (
            <option value={store.id} key={store.id}>
              {store.name}
            </option>
          ))}
        </select>

        {/* nama pelanggan & nomor telpon */}
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block font-medium  mt-4">Nama Pelanggan</label>
            <input
              className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
              type="text"
              placeholder="Masukkan nama barang"
              value={customer}
              onChange={(e) => {
                setCustomer(e.target.value);
              }}
            />
          </div>

          <div className="w-full">
            <label className="block font-medium  mt-4">Nomor Telepon</label>
            <input
              className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
              type="number"
              placeholder="Masukkan nomor telepon"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>

        {/* nama barang & jumlah barang */}
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block font-medium  mt-4">Nama Barang</label>
            <select
              className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
              value={selectedItem}
              onChange={(e) => {
                setSelectedItem(e.target.value);
              }}
            >
              {items.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block font-medium  mt-4">Jumlah Barang</label>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <input
                  className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
                  type="number"
                  placeholder="Masukkan nama barang"
                  value={quantity === 0 ? "" : quantity}
                  onChange={(e) => {
                    setQuantity(Number(e.target.value));
                  }}
                />
              </div>

              <div className="w-full">
                <select
                  className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                >
                  <option disabled hidden value="">
                    Pilih satuan kuantitas
                  </option>
                  <option value="Ikat">Ikat</option>
                  <option value="Karpet">Karpet</option>
                  <option value="Butir">Butir</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* harga (butir) & tanggal kirim */}
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block font-medium  mt-4">{`Harga (per ${unit})`}</label>
            <input
              className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
              type="number  "
              placeholder="Masukkan nama barang"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>

          <div className="w-full">
            <label className="block font-medium mt-4">Tanggal Kirim</label>
            <input
              ref={dateInputRef}
              className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
              type="date"
              value={sendDate}
              onClick={() => {
                // Manually open the date picker when the input is clicked
                if (dateInputRef.current?.showPicker) {
                  dateInputRef.current.showPicker(); // Modern browsers
                }
              }}
              onChange={(e) => setSendDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full justify-end p-4">
          <div>
            <div className="text-xl font-semibold">Total</div>
            <div className="font-semibold text-3xl flex">
              <p className="me-2">RP</p>
              <p className="">
                {total === 0 ? "-" : Intl.NumberFormat("id-ID").format(total)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Pembayaran */}
      <div className="p-4 border border-black-6 rounded-[4px]">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">Pembayaran</h1>
          <div
            className="px-5 py-3 bg-orange-400 rounded-[4px] hover:bg-orange-600 cursor-pointer"
            onClick={() => setShowPaymentModal(true)}
          >
            Pilih Pembayaran
          </div>
        </div>

        {/* table */}
        <div className="mt-4">
          <table className="w-full">
            <thead className="w-full bg-green-700 text-white">
              <tr>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Metode Pembayaran</th>
                <th className="px-4 py-2">Nominal Pembayaran</th>
                <th className="px-4 py-2">Sisa Cicilan</th>
                <th className="px-4 py-2">Bukti</th>
              </tr>
            </thead>
            <tbody className="border-b">
              {paymentDate &&
              paymentMethod &&
              nominal &&
              remaining &&
              paymentProof ? (
                <tr>
                  <td className="px-4 py-2">{paymentDate}</td>
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
                  <td colSpan={5} className="text-center py-4 text-gray-500">
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
            <h1 className="text-lg font-bold">Status Pembayaran: </h1>
            <div
              className={`px-5 py-3 text-xl rounded-[4px] ${
                paymentType === "Cicil"
                  ? "bg-orange-200 text-kritis-text-color"
                  : "bg-aman-box-surface-color text-aman-text-color"
              }`}
            >
              {paymentType === "Cicil" ? "Belum Lunas" : "Lunas"}
            </div>
          </div>

          <div>
            <div className="text-xl font-semibold">Sisa cicilan</div>
            <div className="font-semibold text-3xl flex">
              <p className="me-2">RP</p>
              <p className="">
                {remaining === 0
                  ? "-"
                  : Intl.NumberFormat("id-ID").format(remaining)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* simpan button */}
      <div className="flex justify-end mb-8">
        <div
          onClick={() => {
            console.log("===== Form Data =====");
            console.log("Toko:", selectedStore);
            console.log("Barang:", selectedItem);
            console.log("Nama Pelanggan:", customer);
            console.log("No. Telepon:", phone);
            console.log("Jumlah:", quantity);
            console.log("Unit:", unit);
            console.log("Harga:", price);
            console.log("Tanggal Kirim:", formatDateToDDMMYYYY(sendDate));
            console.log("Status Pembayaran:", paymentType);
            console.log("Nominal:", nominal);
            console.log("=====================");

            submitHandle();
          }}
          className="px-5 py-3 bg-green-700 rounded-[4px] hover:bg-green-900 cursor-pointer text-white"
        >
          Simpan
        </div>
      </div>

      {/* simpan button */}
      <div className="flex justify-end mb-8">
        <div
          onClick={() => {
            console.log("===== Form Data =====");
            console.log("ID:", id);
            console.log("Toko:", selectedStore);
            console.log("Barang:", selectedItem);
            console.log("Nama Pelanggan:", customer);
            console.log("No. Telepon:", phone);
            console.log("Jumlah:", quantity);
            console.log("Satuan:", unit);
            console.log("Harga:", price);
            console.log("Total:", total);
            console.log("Tanggal Kirim:", sendDate);
            console.log("Tanggal Bayar:", paymentDate);
            console.log("Jenis Pembayaran:", paymentType);
            console.log("Metode Pembayaran:", paymentMethod);
            console.log("Nominal Bayar:", nominal);
            console.log("Sisa Cicilan:", remaining);
            console.log("Bukti Pembayaran:", paymentProof);
            console.log("=====================");
          }}
          className="px-5 py-3 bg-green-700 rounded-[4px] hover:bg-green-900 cursor-pointer text-white"
        >
          CHECK
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed w-full inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full bg-white mx-40 p-6 rounded-lg shadow-xl relative">
            <h3 className="text-xl font-bold mb-4">Pembayaran</h3>

            {/* Tipe Pembayaran */}
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
            </select>

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
              value={nominal}
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
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-500 rounded cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
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

export default InputDataPesanan;
