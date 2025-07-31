import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { useState } from "react";
import {
  allocateStoreSaleQueue,
  createStoreSale,
  getEggStoreItemSummary,
  getListStoreSale,
  getStores,
  getStoresaleQueues,
} from "../services/stores";
import { useEffect } from "react";
import { updateStoreSale } from "../services/stores";
import { formatDateToDDMMYYYY } from "../utils/dateFormat";
import { IoLogoWhatsapp } from "react-icons/io";
import { getItemPrices, getItemPricesDiscount } from "../services/item";
import AlokasiAntrianModal from "./AlokasiAntrianModal";
import { getCurrentUserStorePlacement } from "../services/placement";
import { getCustomers } from "../services/costumer";

const AntrianPesanan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailPages = ["input-data-pesanan"];

  const [dataAntrianPesanan, setDataAntrianPesanan] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const [telurOkKg, setTelurOkKg] = useState(0);
  const [telurOkIkat, setTelurOkIkat] = useState(0);
  const [telurRetakKg, setTelurRetakKg] = useState(0);
  const [telurRetakIkat, setTelurRetakIkat] = useState(0);
  const [telurBonyokPlastik, setTelurBonyokPlastik] = useState(0);

  const [selectedItem, setSelectedItem] = useState("");
  const [itemName, setItemName] = useState("");

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  const [customers, setCustomers] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("Pelanggan Lama");
  const [selectedCustomerId, setSelectedCustomerId] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const [units, setUnits] = useState(["Ikat", "Kg"]);
  const [unit, setUnit] = useState("Ikat");

  const [nominal, setNominal] = useState(0);
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [transactionCount, setTransactionCount] = useState(0);

  const [itemPrices, setItemPrices] = useState([]);
  const [itemPrice, setItemPrice] = useState([]);
  const [itemTotalPrice, setItemTotalPrice] = useState([]);
  const [itemPriceDiscounts, setItemPriceDiscounts] = useState([]);
  const [itemPriceDiscount, setItemPriceDiscount] = useState([]);
  const [discount, setDiscount] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const [sendDate, setSendDate] = useState(today);
  const [paymentDate, setPaymentDate] = useState(today);
  const [paymentStatus, setPaymentStatus] = useState("Belum Lunas");
  const [paymentMethod, setPaymentMethod] = useState("Tunai");
  const [paymentType, setPaymentType] = useState("Cicil");
  const [paymentProof, setPaymentProof] = useState("https://example.com");

  const [showAlokasiModal, setShowAlokasiModal] = useState(false);

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const inputDataPesananHandle = () => {
    const currentPath = location.pathname;
    const inputPath = currentPath + "/input-data-pesanan";
    navigate(inputPath);
  };

  const editDataPesananHandle = (id) => {
    const currentPath = location.pathname;
    const inputPath = currentPath + "/input-data-pesanan/" + id;
    navigate(inputPath);
  };

  const fetchDataAntrianPesanan = async () => {
    try {
      const response = await getStoresaleQueues();
      // console.log("response: ", response);
      if (response.status == 200) {
        setDataAntrianPesanan(response.data.data);
      }
    } catch (error) {
      alert("Gagal memuat data antrian pesanan: ", error);
    }
  };

  const fetchCustomerData = async () => {
    try {
      const customerResponse = await getCustomers();
      if (customerResponse.status == 200) {
        setCustomers(customerResponse.data.data);
      }
    } catch (error) {
      alert("Gagal memuat data toko: ", error);
      console.log("error: ", error);
    }
  };

  const fetchItemPrices = async () => {
    try {
      const priceResponse = await getItemPrices();
      const discountResponse = await getItemPricesDiscount();
      if (priceResponse.status == 200 && discountResponse.status == 200) {
        // console.log("priceResponse: ", priceResponse);
        setItemPrices(priceResponse.data.data);
        setItemPriceDiscounts(discountResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const setSelectedItemHandle = (item) => {
    console.log("item: ", item);
    setSelectedItem(item);
    setCustomerName(item.customer.name);
    setItemName(item.item.name);
    // if (item.item.name == "Telur Bonyok") {
    //   setUnits(["Plastik"]);
    // } else {
    //   setUnits(["Ikat", "Kg"]);
    // }

    setQuantity(item.quantity);

    setUnit(item.saleUnit);
  };

  const getItemSummary = async () => {
    try {
      const placementResponse = await getCurrentUserStorePlacement();
      if (placementResponse.status == 200) {
        const storeId = placementResponse.data.data[0].store.id;
        const summaryResponse = await getEggStoreItemSummary(storeId);
        // console.log("summaryResponse: ", summaryResponse);
        if (summaryResponse.status == 200) {
          const eggSummaries = summaryResponse.data.data;
          const okKg =
            eggSummaries.find(
              (item) => item.name === "Telur OK" && item.unit === "Kg"
            )?.quantity ?? 0;

          const okIkat =
            eggSummaries.find(
              (item) => item.name === "Telur OK" && item.unit === "Ikat"
            )?.quantity ?? 0;

          const retakKg =
            eggSummaries.find(
              (item) => item.name === "Telur Retak" && item.unit === "Kg"
            )?.quantity ?? 0;

          const retakIkat =
            eggSummaries.find(
              (item) => item.name === "Telur Retak" && item.unit === "Ikat"
            )?.quantity ?? 0;

          const bonyokPlastik =
            eggSummaries.find(
              (item) => item.name === "Telur Bonyok" && item.unit === "Plastik"
            )?.quantity ?? 0;

          setTelurOkKg(okKg);
          setTelurOkIkat(okIkat);
          setTelurRetakKg(retakKg);
          setTelurRetakIkat(retakIkat);
          setTelurBonyokPlastik(bonyokPlastik);
        }
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const getPrice = () => {
    const priceItem = itemPrices.find(
      (price) =>
        price.item.name == selectedItem.item.name && price.item.unit == unit
    );

    const applicableDiscounts = itemPriceDiscounts.filter(
      (discount) => transactionCount >= discount.minimumTransactionUser
    );

    const selectedDiscount = applicableDiscounts.length
      ? applicableDiscounts.reduce((prev, curr) =>
          curr.minimumTransactionUser > prev.minimumTransactionUser
            ? curr
            : prev
        )
      : 0;

    const price = priceItem?.price;
    const discountPercent = selectedDiscount.totalDiscount / 100;

    if (!price) {
      alert("❌ Harga barang yang dipilih belum ditentukan oleh pusat!");
    }

    const totalitemPrice = price * quantity;
    const totalDiscount = totalitemPrice * discountPercent;

    setDiscount(selectedDiscount.totalDiscount);
    setItemPrice(price);
    setItemTotalPrice(totalitemPrice);
    setItemPriceDiscount(totalDiscount);
    setTotal(totalitemPrice - totalDiscount);
  };

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

  const submitHandle = async () => {
    const storeSalePayment = {
      paymentDate: formatDateToDDMMYYYY(paymentDate),
      nominal: nominal.toString(),
      paymentProof: paymentProof,
      paymentMethod: paymentMethod,
    };

    const payload = {
      itemId: selectedItem?.item?.id,
      saleUnit: unit,
      storeId: parseInt(selectedStore),
      quantity: quantity,
      price: itemPrice.toString(),
      discount: discount,
      sendDate: formatDateToDDMMYYYY(sendDate),
      paymentType: paymentType,
      storeSalePayment: storeSalePayment,
      customerType: customerType,
      ...(customerType === "Pelanggan Baru"
        ? {
            customerName: customerName,
            customerPhoneNumber: phone.toString(),
          }
        : {
            customerId: selectedItem.customer.id,
          }),
    };

    // console.log("selectedItem.customer.id: ", selectedItem.customer.id);
    // console.log("create payload is ready: ", payload);

    try {
      const response = await allocateStoreSaleQueue(payload, selectedItem.id);
      console.log("response: ", response);
      if (response.status == 200) {
        navigate("/pekerja-toko/kasir/daftar-pesanan");
      }
    } catch (error) {
      console.log("response: ", error);

      if (
        error.response.data.message == "nominal is not equal to total price"
      ) {
        alert(
          "❌Jumlah pembayaran penuh harus memiliki nominal yang sama dengan tagihan total"
        );
      } else if (
        error.response.data.message ==
        "customer phone number must be in valid format 08"
      ) {
        alert("❌Masukkan format nomor telepon dengan 08XXXXXX");
      } else if (error.response.data.message == "customer already exist") {
        alert("❌Pelanggan sudah terdaftar, gunakan nomor telepon lain");
      } else {
        alert(
          "❌Gagal menyimpan data pesanan, periksa kembali data input anda"
        );
      }
    }
  };

  useState(() => {
    fetchDataAntrianPesanan();
    fetchItemPrices();
    getItemSummary();
    fetchCustomerData();
    fetchStoresData();
  }, []);

  useEffect(() => {
    fetchDataAntrianPesanan();

    if (location.state?.refetch) {
      fetchDataAntrianPesanan();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (quantity && selectedItem) {
      getPrice();
    }
  }, [selectedItem, transactionCount, quantity, unit]);

  useEffect(() => {
    setRemaining(itemTotalPrice - itemPriceDiscount - nominal);
  }, [total, nominal]);

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Antrian Pesanan</h1>
            <div className="text-base flex gap-2">
              <p>{`Hari ini (${getTodayDateInBahasa()})`}</p>
            </div>
          </div>

          {/* Telur  ok, retak, pecah, reject*/}
          <div className="flex md:grid-cols-2 gap-4 justify-between">
            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur OK</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <MdEgg size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex flex-col items-center justify-center min-w-32 px-4  py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {parseInt(telurOkIkat)}
                  </p>
                  <p className="text-xl text-center">Ikat</p>
                </div>
                <div className="flex flex-col items-center justify-center min-w-32 px-4  py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {parseInt(telurOkKg)}
                  </p>
                  <p className="text-xl text-center">Kg</p>
                </div>
              </div>
            </div>

            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur Retak</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <TbEggCrackedFilled size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex flex-col items-center justify-center min-w-32 px-4 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {parseInt(telurRetakIkat)}
                  </p>
                  <p className="text-xl text-center">Ikat</p>
                </div>
                <div className="flex flex-col items-center justify-center min-w-32 px-4  py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {parseInt(telurRetakKg)}
                  </p>
                  <p className="text-xl text-center">Kg</p>
                </div>
              </div>
            </div>
            <div className="p-4 w-full rounded-md border-2 border-black-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Telur Bonyok</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <TbEggCrackedFilled size={24} color="white" />
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-4">
                <div className="flex flex-col items-center justify-center min-w-32 px-4 py-4 bg-green-200 rounded-md">
                  <p className="text-3xl font-bold text-center">
                    {parseInt(telurBonyokPlastik)}
                  </p>
                  <p className="text-xl text-center">Plastik</p>
                </div>
              </div>
            </div>
          </div>

          {/* detail penjualan */}
          <div className=" flex gap-4 ">
            <div className=" w-full bg-white px-8 py-6 rounded-lg border border-black-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-700 text-white text-center">
                    <th className="py-2 px-4">Antiran</th>
                    <th className="py-2 px-4">Nama Barang</th>
                    <th className="py-2 px-4">Satuan</th>
                    <th className="py-2 px-4">Jumlah</th>
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {dataAntrianPesanan?.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">
                        <div className="flex justify-center">
                          <p>#</p>
                          <p>{index + 1}</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">{item?.item?.name}</td>
                      <td className="py-2 px-4">{item?.item?.unit}</td>
                      <td className="py-2 px-4">{item?.quantity}</td>
                      <td className="py-2 px-4">{item?.customer?.name}</td>

                      <td className="py-2 px-4">
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => {}}
                            className="px-3 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer"
                          >
                            <IoLogoWhatsapp />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItemHandle(item);
                              setShowAlokasiModal(true);
                            }}
                            className="px-3 py-1 bg-green-700 rounded-[4px] text-white hover:bg-green-900 cursor-pointer"
                          >
                            Alokasikan
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
          {showAlokasiModal && (
            <AlokasiAntrianModal
              customerName={customerName}
              itemName={itemName}
              quantity={quantity}
              setQuantity={setQuantity}
              units={units}
              unit={unit}
              setUnit={setUnit}
              setShowAlokasiModal={setShowAlokasiModal}
              paymentHistory={paymentHistory}
              setPaymentHistory={setPaymentHistory}
              paymentDate={paymentDate}
              setPaymentDate={setPaymentDate}
              paymentStatus={paymentStatus}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              nominal={nominal}
              setNominal={setNominal}
              remaining={remaining}
              itemTotalPrice={itemTotalPrice}
              itemPriceDiscount={itemPriceDiscount}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              paymentProof={paymentProof}
              submitHandle={submitHandle}
              sendDate={sendDate}
              setSendDate={setSendDate}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AntrianPesanan;
