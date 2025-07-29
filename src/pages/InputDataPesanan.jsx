import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  deleteStoreSale,
  getEggStoreItemSummary,
  getStores,
} from "../services/stores";
import { getWarehouseItems } from "../services/warehouses";
import {
  getTodayDateInBahasa,
  formatDateToDDMMYYYY,
  formatTanggalIndonesia,
} from "../utils/dateFormat";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createStoreSale } from "../services/stores";
import { getStoreSaleById } from "../services/stores";
import { convertToInputDateFormat } from "../utils/dateFormat";
import { createStoreSalePayment } from "../services/stores";
import { updateStoreSalePayment } from "../services/stores";
import { updateStoreSale } from "../services/stores";
import InformasiPembeli from "../components/InformasiPembeli";
import {
  getItemPrices,
  getItemPricesDiscount,
  getItems,
} from "../services/item";
import { getCustomers } from "../services/costumer";
import { getCurrentUserStorePlacement } from "../services/placement";

const InputDataPesanan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  const detailPages = ["input-data-pesanan"];
  const dateInputRef = useRef(null);

  const { id } = useParams();
  const [isEditable, setEditable] = useState(true);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const [customers, setCustomers] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("Pelanggan Lama");
  const [selectedCustomerId, setSelectedCustomerId] = useState(0);

  const [phone, setPhone] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("Ikat");

  const [price, setPrice] = useState(0);
  const [nominal, setNominal] = useState(0);
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [paymentHistory, setPaymentHistory] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const [sendDate, setSendDate] = useState(today);
  const [paymentDate, setPaymentDate] = useState(today);
  const [paymentType, setPaymentType] = useState("Cicil");
  const [paymentStatus, setPaymentStatus] = useState("Belum Lunas");
  const [paymentMethod, setPaymentMethod] = useState("Tunai");
  const [paymentProof, setPaymentProof] = useState("https://example.com");

  const [telurOkKg, setTelurOkKg] = useState(0);
  const [telurOkIkat, setTelurOkIkat] = useState(0);
  const [telurRetakKg, setTelurRetakKg] = useState(0);
  const [telurRetakIkat, setTelurRetakIkat] = useState(0);
  const [telurBonyokPlastik, setTelurBonyokPlastik] = useState(0);

  const [itemPrices, setItemPrices] = useState([]);
  const [itemPrice, setItemPrice] = useState([]);
  const [itemTotalPrice, setItemTotalPrice] = useState([]);
  const [itemPriceDiscounts, setItemPriceDiscounts] = useState([]);
  const [itemPriceDiscount, setItemPriceDiscount] = useState([]);
  const [discount, setDiscount] = useState([]);

  const [transactionCount, setTransactionCount] = useState(0);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [paymentId, setPaymentId] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  function getAvailableStock(name, unit) {
    if (name === "Telur OK" && unit === "Kg") return telurOkKg;
    if (name === "Telur OK" && unit === "Ikat") return telurOkIkat;
    if (name === "Telur Retak" && unit === "Kg") return telurRetakKg;
    if (name === "Telur Retak" && unit === "Ikat") return telurRetakIkat;
    if (name === "Telur Bonyok" && unit === "Plastik")
      return telurBonyokPlastik;
    return 0;
  }

  const fetchItemPrices = async () => {
    try {
      const priceResponse = await getItemPrices();
      const discountResponse = await getItemPricesDiscount();
      // console.log("priceResponse: ", priceResponse);
      // console.log("discountResponse: ", discountResponse);
      if (priceResponse.status == 200 && discountResponse.status == 200) {
        setItemPrices(priceResponse.data.data);
        setItemPriceDiscounts(discountResponse.data.data);
        if (id) {
          fetchEditSaleStoreData(id);
          setEditable(false);
        }
      }
    } catch (error) {
      console.log("error :", error);
    }
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

  const fetchStorePlacement = async () => {
    try {
      const response = await getCurrentUserStorePlacement();
      // console.log("response: ", response);
      if (response.status == 200) {
        setSelectedStore(response.data.data[0].store.id);
      }
    } catch (error) {
      alert("Gagal memuat data toko: ", error);
      console.log("error: ", error);
    }
  };

  const fetchItemsData = async (storeId) => {
    try {
      const response = await getItems("Telur", {
        // storeId
      });

      if (response.status == 200) {
        const filterData = response.data.data.filter(
          (item) => item.name != "Telur Reject"
        );
        setItems(filterData);

        setSelectedItem(filterData[0]);
      }
    } catch (error) {}
  };

  const fetchCustomerData = async () => {
    try {
      const customerResponse = await getCustomers();
      // console.log("customerResponse: ", customerResponse);
      if (customerResponse.status == 200) {
        setCustomers(customerResponse.data.data);
        // setStores(response.data.data);
        // setSelectedStore(response.data.data[0].id);
      }
    } catch (error) {
      alert("Gagal memuat data toko: ", error);
      console.log("error: ", error);
    }
  };

  const fetchEditSaleStoreData = async (id) => {
    try {
      const response = await getStoreSaleById(id);
      console.log("response get sale by id: ", response);
      // console.log("customer name: ", response.data.data.customer);

      if (response.status == 200) {
        console.log("test: ");
        setSelectedStore(response.data.data.store.id);
        setCustomerName(response.data.data.customer.name);
        setPhone(response.data.data.customer.phoneNumber);
        setSelectedItem(response.data.data.item);
        setQuantity(response.data.data.quantity);
        console.log("nilai quantity: ", response.data.data.quantity);
        setUnit(response.data.data.saleUnit);
        setPrice(response.data.data.price);
        setSendDate(convertToInputDateFormat(response.data.data.sentDate));
        setTotal(response.data.data.totalPrice);
        setPaymentHistory(response.data.data.payments);
        setRemaining(response.data.data.remainingPayment);
        setPaymentStatus(response.data.data.paymentStatus);
      }
    } catch (error) {}
  };

  const getPrice = () => {
    const priceItem = itemPrices.find(
      (price) =>
        price.item.name == selectedItem.name &&
        price.item.unit == selectedItem.unit
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

  const getItemSummary = async () => {
    try {
      const placementResponse = await getCurrentUserStorePlacement();
      if (placementResponse.status == 200) {
        const storeId = placementResponse.data.data[0].store.id;
        const summaryResponse = await getEggStoreItemSummary(storeId);
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

  //START useEffect
  useEffect(() => {
    getItemSummary();
    if (userRole == "Owner") {
      fetchStoresData();
    } else {
      fetchStorePlacement();
    }
    fetchCustomerData();
    fetchItemPrices();
    fetchItemsData(selectedStore);
  }, []);

  useEffect(() => {
    fetchItemsData(selectedStore);
  }, [selectedStore]);

  useEffect(() => {
    if (!selectedItem) return;

    const name = selectedItem.name;
    const unit = selectedItem.unit;
    const available = getAvailableStock(name, unit);

    if (quantity > available) {
      setIsOutOfStock(true);
    } else {
      setIsOutOfStock(false);
    }
  }, [quantity, selectedItem]);

  useEffect(() => {
    if (!id) {
      setRemaining(itemTotalPrice - itemPriceDiscount - nominal);
    }
  }, [total, nominal]);

  useEffect(() => {
    if (quantity) {
      getPrice();
    }
  }, [selectedItem, transactionCount, quantity]);

  const submitHandle = async () => {
    const storeSalePayment = {
      paymentDate: formatDateToDDMMYYYY(paymentDate),
      nominal: nominal.toString(),
      paymentProof: paymentProof,
      paymentMethod: paymentMethod,
    };

    const payload = {
      itemId: selectedItem.id,
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
            customerId: selectedCustomerId,
          }),
    };

    console.log("create payload is ready: ", payload);

    try {
      const response = await createStoreSale(payload);
      // console.log("response: ", response);

      if (response.status == 201) {
        navigate(-1, { state: { refetch: true } });
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

  const editSubmitHandle = async () => {
    const storeSalePayment = paymentHistory;
    const payload = {
      quantity: quantity,
      sendDate: formatDateToDDMMYYYY(sendDate),
    };
    // console.log("edit payload is ready: ", payload);

    try {
      const response = await updateStoreSale(id, payload);
      // console.log("response update: ", response);

      if (response.status == 200) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("response: ", error);
      if (
        error.response.data.message == "nominal is not equal to total price"
      ) {
        alert(
          "Jumlah pembayaran penuh harus memiliki nominal yang sama dengan tagihan total"
        );
      } else {
        alert("Gagal menyimpan data pesanan");
      }
    }
  };

  const handleDelete = async () => {
    try {
      const deleteResponse = await deleteStoreSale(id);
      // console.log("deleteResponse: ", deleteResponse);
      if (deleteResponse.status === 204) {
        setShowModal(false);
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
    setShowModal(false);
  };

  const createStoreSalePaymentHandle = async (id) => {
    const payload = {
      paymentDate: formatDateToDDMMYYYY(paymentDate),
      nominal: nominal.toString(),
      paymentProof: paymentProof,
      paymentMethod: paymentMethod,
    };

    // console.log("payload: ", payload);

    try {
      const response = await createStoreSalePayment(id, payload);
      // console.log("response: ", response);
      if (response.status == 201) {
        fetchEditSaleStoreData(id);
        setShowPaymentModal(false);
        setPaymentType("Cicil");
        setPaymentMethod("Tunai");
        setNominal(0);
        setPaymentDate(today);
        setShowPaymentModal(false);
      }
    } catch (error) {
      // console.log("error:", error.response.data.message);

      if (
        error.response.data.message ==
        "total payment is greater than total price"
      ) {
        alert(
          "Pembayaran yang dilakukan melebihi total tagihan, periksa kembali nominal bayar! "
        );
      } else {
        alert("Gagal menambahkan pembayaran ");
      }
    }
  };

  const updateStoreSalePaymentHandle = async () => {
    const payload = {
      paymentMethod: paymentMethod,
      paymentDate: formatDateToDDMMYYYY(paymentDate),
      nominal: nominal.toString(),
      paymentProof: paymentProof,
    };

    try {
      const response = await updateStoreSalePayment(id, paymentId, payload);
      // console.log("response: ", response);
      if (response.status == 200) {
        fetchEditSaleStoreData(id);
        setPaymentType("Cicil");
        setPaymentMethod("Tunai");
        setNominal(0);
        setPaymentDate(today);
        setPaymentId(0);
        setShowEditModal(false);
      }
    } catch (error) {
      // console.log("error:", error.response.data.message);
      if (
        error.response.data.message ==
        "total payment is greater than total price"
      ) {
        alert(
          "Pembayaran yang dilakukan melebihi total tagihan, periksa kembali nominal bayar! "
        );
      } else {
        alert("Gagal menambahkan pembayaran ");
      }
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

      {id ? (
        <></>
      ) : (
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
      )}

      <div className="p-4 border border-black-6 rounded-[4px]">
        <h1 className="text-lg font-bold">
          {id ? "Detail Data Pesanan" : "Input Data Pesanan"}
        </h1>

        <InformasiPembeli
          id={id}
          phone={phone}
          setPhone={setPhone}
          name={customerName}
          setName={setCustomerName}
          customerType={customerType}
          setCustomerType={setCustomerType}
          customers={customers}
          setTransactionCount={setTransactionCount}
          setSelectedCustomerId={setSelectedCustomerId}
        />

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block font-medium  mt-4">Nama Barang</label>
            {isEditable && !id ? (
              <select
                className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-4"
                value={selectedItem?.id}
                onChange={(e) => {
                  const selected = items.find(
                    (item) => item.id == e.target.value
                  );
                  // console.log("selected: ", selected);
                  setUnit(selected.unit);
                  setSelectedItem(selected);
                }}
              >
                {items.map((item) => (
                  <option value={item.id} key={item.id}>
                    {`${item.name} - ${item.unit}`}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-lg font-bold">{selectedItem.name}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mt-4">Jumlah Barang</label>
            {isEditable ? (
              <input
                className="w-full border bg-black-4 cursor-text rounded p-2 mb-4"
                type="number"
                placeholder="Masukkan jumlah barang"
                value={quantity === 0 ? "" : quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            ) : (
              <p className="text-lg font-bold">{quantity}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block font-medium mt-4">Satuan</label>
            <p className="text-lg font-bold items-center">
              {selectedItem.unit}
            </p>
          </div>
        </div>

        {isOutOfStock && (
          <p className="text-red-600">
            *Jumlah barang yang anda masukkan tidak mencukupi, maka pesanan akan
            masuk antrian
          </p>
        )}

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              className={`block font-medium mt-4 ${
                isOutOfStock ? " text-gray-400/40" : "text-black"
              }`}
            >
              Tanggal Kirim
            </label>
            {isEditable ? (
              <input
                disabled={isOutOfStock}
                ref={dateInputRef}
                className={`w-full border bg-black-4  rounded p-2 mb-4 ${
                  isOutOfStock
                    ? "bg-gray-400/10 cursor-not-allowed text-gray-400/20"
                    : "cursor-pointer"
                }`}
                type="date"
                value={sendDate}
                onClick={() => {
                  if (dateInputRef.current?.showPicker) {
                    dateInputRef.current.showPicker();
                  }
                }}
                onChange={(e) => setSendDate(e.target.value)}
              />
            ) : (
              <p className="text-lg font-bold">
                {formatTanggalIndonesia(sendDate)}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="p-4 max-w-4xl">
            <div className="grid grid-cols-2 mb-2">
              <span
                className={`text-lg ${
                  isOutOfStock ? " text-gray-400/30" : "text-black"
                }`}
              >
                Harga Barang :
              </span>
              <span
                className={`font-bold text-lg text-right ${
                  isOutOfStock ? " text-gray-400/30" : "text-black"
                }`}
              >
                Rp {isOutOfStock ? "0" : itemTotalPrice ?? "0"}
              </span>
            </div>

            <div className="grid grid-cols-2 mb-4">
              <span
                className={`text-lg ${
                  isOutOfStock ? " text-gray-400/30" : "text-black"
                }`}
              >
                Potongan Harga :
              </span>
              <span
                className={`font-bold text-lg text-right ${
                  isOutOfStock ? " text-gray-400/30" : "text-black"
                }`}
              >
                Rp -{isOutOfStock ? "0" : itemPriceDiscount}
              </span>
            </div>

            <hr className="my-2 " />

            <div className="grid grid-cols-2 mt-4">
              <span
                className={`text-lg ${
                  isOutOfStock ? " text-gray-400/30" : "text-black"
                }`}
              >
                Total :
              </span>
              <span
                className={`font-bold text-lg text-right ${
                  isOutOfStock ? " text-gray-400/30" : "text-black"
                }`}
              >
                Rp {isOutOfStock ? "0" : itemTotalPrice - itemPriceDiscount}
              </span>
            </div>
          </div>
        </div>
        {/* edit button */}
        {id && (
          <div className="flex gap-6 justify-end mt-4">
            <div
              onClick={() => {
                setEditable(!isEditable);
              }}
              className="px-5 py-3 bg-green-700 rounded-[4px] hover:bg-green-900 cursor-pointer text-white"
            >
              Edit data pesanan
            </div>
            <div
              onClick={() => {
                setShowModal(true);
              }}
              className="px-5 py-3 bg-kritis-box-surface-color rounded-[4px] hover:bg-kritis-text-color cursor-pointer text-white"
            >
              Hapus
            </div>
          </div>
        )}
      </div>

      {/* Status Pembayaran */}
      <div className="p-4 border border-black-6 rounded-[4px]">
        <div className="flex justify-between">
          <h1
            className={`text-lg font-bold ${
              isOutOfStock ? " text-gray-400/30" : "text-black"
            }`}
          >
            Pembayaran
          </h1>

          <div
            className={`px-5 py-3  rounded-[4px]  ${
              isOutOfStock
                ? " bg-orange-400/30 cursor-not-allowed"
                : "bg-orange-400 hover:bg-orange-600 cursor-pointer"
            } `}
            onClick={() => {
              if (!isOutOfStock) {
                if (paymentStatus == "Lunas") {
                  alert("Pesanan ini sudah Lunas!");
                } else {
                  setShowPaymentModal(true);
                }
              }
            }}
          >
            Pilih Pembayaran
          </div>
        </div>

        {/* table */}
        <div className="mt-4">
          <table className="w-full">
            <thead
              className={`w-full  ${
                isOutOfStock
                  ? " bg-green-700/30 text-white"
                  : "bg-green-700 text-white"
              }`}
            >
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
                      Rp {Intl.NumberFormat("id-ID").format(payment.remaining)}
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
                    className={`text-center py-4 italic  ${
                      isOutOfStock ? "text-gray-500/20" : "text-gray-500"
                    }`}
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
            <h1
              className={`text-lg font-bold ${
                isOutOfStock ? "text-gray-400/50" : "text-black"
              }`}
            >
              Status Pembayaran:{" "}
            </h1>
            <div
              className={`px-5 py-3 text-xl rounded-[4px] ${
                paymentStatus === "Belum Lunas"
                  ? "bg-orange-200 text-kritis-text-color"
                  : "bg-aman-box-surface-color text-aman-text-color"
              }
              ${
                isOutOfStock ? "bg-orange-200/50 text-kritis-text-color/30" : ""
              }
              `}
            >
              {paymentStatus}
            </div>
          </div>

          <div>
            <div
              className={`text-xl font-semibold ${
                isOutOfStock ? "text-gray-500/20" : "text-black"
              }`}
            >
              Sisa cicilan
            </div>
            <div
              className={`font-semibold text-3xl flex ${
                isOutOfStock ? "text-gray-500/20" : "text-black"
              }`}
            >
              <p className="me-2">RP</p>
              <p className="">
                {remaining === 0
                  ? "0"
                  : isOutOfStock
                  ? "0"
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
            if (id) {
              editSubmitHandle();
            } else {
              submitHandle();
            }
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
            const storeSalePayment = {
              paymentDate: formatDateToDDMMYYYY(paymentDate),
              nominal: nominal.toString(),
              paymentProof: paymentProof,
              paymentMethod: paymentMethod,
            };
            const payload = {
              itemId: selectedItem.id,
              saleUnit: unit,
              storeId: parseInt(selectedStore),
              quantity: quantity,
              price: itemTotalPrice.toString(),
              discount: discount,
              sendDate: formatDateToDDMMYYYY(sendDate),
              paymentType: paymentType,
              storeSalePayment: storeSalePayment,
              customerType: customerType,
            };
            console.log("===== Form Data =====");
            console.log("payload: ", payload);
            console.log("customers: ", customers);
            console.log("itemPrices: ", itemPrices);
            console.log("itemPriceDiscounts: ", itemPriceDiscounts);
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
            <h3 className="text-xl font-bold mb-4">
              {id ? "Tambah Pembayaran" : "Pembayaran"}
            </h3>

            {/* Tipe Pembayaran */}
            {id ? (
              <></>
            ) : (
              <>
                <label className="block mb-2 font-medium">
                  Tipe Pembayaran
                </label>
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
            )}

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
                  if (id) {
                    setShowPaymentModal(false);
                    setPaymentType("Cicil");
                    setPaymentMethod("Tunai");
                    setNominal(0);
                    setPaymentDate(today);
                  } else {
                    setPaymentType("Cicil");
                    setPaymentMethod("Tunai");
                    setNominal(0);
                    setPaymentDate(today);
                    setShowPaymentModal(false);
                  }
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-500 rounded cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (id) {
                    createStoreSalePaymentHandle(id);
                  } else {
                    setShowPaymentModal(false);
                  }
                }}
                className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed w-full inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full bg-white mx-40 p-6 rounded-lg shadow-xl relative">
            <h3 className="text-xl font-bold mb-4">
              {id ? "Tambah Pembayaran" : "Pembayaran"}
            </h3>

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
                  if (id) {
                    setShowEditModal(false);
                    setPaymentType("Cicil");
                    setPaymentMethod("Tunai");
                    setNominal(0);
                    setPaymentDate(today);
                  } else {
                    setPaymentType("Cicil");
                    setPaymentMethod("Tunai");
                    setNominal(0);
                    setPaymentDate(today);
                    setPaymentId(0);
                    setShowEditModal(false);
                  }
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-500 rounded cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (id) {
                    updateStoreSalePaymentHandle();
                  } else {
                    setShowPaymentModal(false);
                  }
                }}
                className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-center text-lg font-semibold mb-4">
              Apakah anda yakin untuk menghapus data penjualan ini?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-semibold cursor-pointer"
              >
                Tidak
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold cursor-pointer"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          console.log("telurOkIkat: ", telurOkIkat);
          console.log("selectedItem: ", selectedItem);
        }}
      >
        CHECK
      </button>
    </div>
  );
};

export default InputDataPesanan;
