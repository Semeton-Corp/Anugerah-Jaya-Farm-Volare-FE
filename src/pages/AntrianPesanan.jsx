import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg, MdShoppingCart } from "react-icons/md";
import { MdStore } from "react-icons/md";
import { TbEggCrackedFilled } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { useState } from "react";
import { getListStoreSale } from "../services/stores";
import { useEffect } from "react";
import { updateStoreSale } from "../services/stores";
import { formatDateToDDMMYYYY } from "../utils/dateFormat";
import { IoLogoWhatsapp } from "react-icons/io";
import { getItemPrices, getItemPricesDiscount } from "../services/item";
import AlokasiAntrianModal from "./AlokasiAntrianModal";

const AntrianPesanan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailPages = ["input-data-pesanan"];

  const [dataAntrianPesanan, setDataAntrianPesanan] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const [selectedItem, setSelectedItem] = useState("");
  const [itemName, setItemName] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("Pelanggan Lama");
  const [selectedCustomerId, setSelectedCustomerId] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const [units, setUnits] = useState(["Ikat", "Kg"]);
  const [unit, setUnit] = useState("Ikat");

  const [nominal, setNominal] = useState(0);
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [itemPrices, setItemPrices] = useState([]);
  const [itemPrice, setItemPrice] = useState([]);
  const [itemTotalPrice, setItemTotalPrice] = useState([]);
  const [itemPriceDiscounts, setItemPriceDiscounts] = useState([]);
  const [itemPriceDiscount, setItemPriceDiscount] = useState([]);
  const [discount, setDiscount] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const [paymentDate, setPaymentDate] = useState(today);
  const [paymentStatus, setPaymentStatus] = useState("Belum Lunas");
  const [paymentMethod, setPaymentMethod] = useState("Tunai");

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
      const response = await getListStoreSale();
      console.log("response: ", response);
      if (response.status == 200) {
        setDataAntrianPesanan(response.data.data.storeSales);
      }
    } catch (error) {
      alert("Gagal memuat data antrian pesanan: ", error);
    }
  };

  const fetchItemPrices = async () => {
    try {
      const priceResponse = await getItemPrices();
      const discountResponse = await getItemPricesDiscount();
      if (priceResponse.status == 200 && discountResponse.status == 200) {
        setItemPrices(priceResponse.data.data);
        setItemPriceDiscounts(discountResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const setSelectedItemHandle = (item) => {
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

  useState(() => {
    fetchDataAntrianPesanan();
    fetchItemPrices();
  }, []);

  useEffect(() => {
    fetchDataAntrianPesanan();

    if (location.state?.refetch) {
      fetchDataAntrianPesanan();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4 ">
          {/* header section */}
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Kasir</h1>
            <div className="text-base flex gap-2">
              <p>{`Hari ini (${getTodayDateInBahasa()})`}</p>
            </div>
          </div>

          {/* Telur  ok, retak, pecah, reject*/}
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
                      <td className="py-2 px-4">
                        <p
                          onClick={() => editDataPesananHandle(item?.id)}
                          className="underline font-medium hover:text-black-6 cursor-pointer"
                        >
                          Detail
                        </p>
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
              paymentDate={paymentDate}
              paymentStatus={paymentStatus}
              paymentMethod={paymentMethod}
              nominal={nominal}
              remaining={remaining}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AntrianPesanan;
