import React, { useEffect, useState } from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import { GiChicken } from "react-icons/gi"; // Mengimpor ikon GiChicken
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { GoAlertFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { getWarehouses } from "../services/warehouses";
import { getSuppliers } from "../services/supplier";

// Data untuk diskon berdasarkan kadar air
const discountData = [
  { range: [0, 15.0], discount: 0 },
  { range: [15.01, 16.0], discount: 0 },
  { range: [16.01, 17.0], discount: 0 },
  { range: [17.01, 18.0], discount: 0.6 },
  { range: [18.01, 19.0], discount: 1.8 },
  { range: [19.01, 20.0], discount: 3.0 },
  { range: [20.01, 21.0], discount: 4.2 },
  { range: [21.01, 22.0], discount: 5.4 },
  { range: [22.01, 23.0], discount: 6.6 },
  { range: [23.01, 24.0], discount: 7.8 },
  { range: [24.01, 25.0], discount: 9.0 },
  { range: [25.01, 26.0], discount: 10.2 },
  { range: [26.01, 27.0], discount: 11.4 },
  { range: [27.01, 28.0], discount: 12.6 },
  { range: [28.01, 29.0], discount: 13.8 },
  { range: [29.01, 30.0], discount: 15.0 },
  { range: [30.01, 31.0], discount: 16.2 },
  { range: [31.01, 32.0], discount: 17.4 },
  { range: [32.01, 33.0], discount: 18.6 },
  { range: [33.01, 34.0], discount: 19.8 },
  { range: [34.01, 35.0], discount: 21.0 },
  { range: [35.01, 36.0], discount: 22.2 },
  { range: [36.01, 37.0], discount: 23.4 },
  { range: [37.01, 38.0], discount: 24.6 },
  { range: [38.01, 39.0], discount: 25.8 },
  { range: [39.01, 40.0], discount: 27.0 },
  { range: [40.01, 41.0], discount: 28.2 },
  { range: [41.01, 42.0], discount: 29.4 },
  { range: [42.01, 43.0], discount: 30.6 },
  { range: [43.01, 44.0], discount: 31.8 },
];

const InputDraftPengadaanJagung = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    warehouse: "",
    moistureLevel: "",
    ovenCondition: "",
    ovenCanOperate: "",
    supplier: "",
    quantity: "",
  });

  const [currentCornStock, setCurrentCornStock] = useState(100);
  const maxWarehouseCapacity = 150;

  // Base price for corn, based on the provided image
  const basePrice = parseFloat(formData.moistureLevel) < 17 ? 5800 : 5450;

  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState();

  const moistureLevelOptions = ["16%", "15%", "14%", "13%", "12%"];
  const ovenConditionOptions = ["Hidup", "Mati"];
  const ovenCanOperateOptions = ["Ya", "Tidak"];
  const [supplierOptions, setsupplierOptions] = useState([]);
  const maxOrderQuantity = selectedWarehouse?.cornCapacity || 0;

  // Calculated values
  const discountRate =
    discountData.find(
      (d) =>
        parseFloat(formData.moistureLevel) > d.range[0] &&
        parseFloat(formData.moistureLevel) <= d.range[1]
    )?.discount || 0;

  const discountedPricePerKg = basePrice - (basePrice * discountRate) / 100;
  const totalPurchasePrice = formData.quantity * discountedPricePerKg;
  const isQuantityOverMax = parseInt(formData.quantity) > maxOrderQuantity;

  // Disable state for form fields
  const isFormDisabled =
    formData.ovenCondition === "Hidup" && formData.ovenCanOperate === "Tidak";

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name !== "moistureLevel") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      value = Number(value);
      if (value > 100) {
        value = 100;
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    console.log("Saving Draft:", formData);
    // You would implement the API call to save the data here
    navigate("/pengadaan-jagung/draft-pengadaan-jagung");
  };

  const fetchWarehouses = async () => {
    try {
      const warehouseResponse = await getWarehouses();
      console.log("warehouseResponse: ", warehouseResponse);
      if (warehouseResponse.status == 200) {
        setWarehouseOptions(warehouseResponse.data.data);
        setSelectedWarehouse(warehouseResponse.data.data[0]);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const supplierResponse = await getSuppliers();
      if (supplierResponse.status == 200) {
        setsupplierOptions(supplierResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
    fetchSuppliers();
  }, []);

  return (
    <div className="flex flex-col px-4 py-3 gap-6 font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Input Draft Pengadaan Jagung</h1>
      </div>

      {/* Info Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stok Jagung */}
        <div className="flex items-center bg-green-100 rounded-lg p-4 gap-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">
                Stok Jagung Saat ini
              </span>
              <span className="text-2xl font-bold">{currentCornStock} Kg</span>
            </div>
            <div className="p-2 rounded-xl bg-green-700">
              <GiChicken size={24} color="white" />
            </div>
          </div>
        </div>
        {/* Kapasitas Gudang */}
        <div className="flex items-center bg-green-100 rounded-lg p-4 gap-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">
                Kapasitas Maksimum Gudang
              </span>
              <span className="text-2xl font-bold">
                {selectedWarehouse?.cornCapacity} Kg
              </span>
            </div>
            <div className="p-2 rounded-xl bg-green-700">
              <IoHome size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <form
        onSubmit={handleSimpan}
        className="bg-white p-6 border rounded-lg w-full border-black-6 flex flex-col gap-6"
      >
        {/* Tanggal Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Tanggal Input
          </label>
          <input
            type="text"
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 cursor-not-allowed"
            value={getTodayDateInBahasa()}
            disabled
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="warehouse"
            className="text-sm font-semibold text-gray-700"
          >
            Gudang Penyimpanan
          </label>
          <select
            id="warehouse"
            name="warehouse"
            value={selectedWarehouse?.id}
            onChange={(e) => {
              const selectedWarehouse = warehouseOptions.find(
                (item) => item.id == e.target.value
              );
              setSelectedWarehouse(selectedWarehouse);
            }}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white"
            disabled={isFormDisabled}
          >
            <option value="" disabled>
              Pilih Gudang
            </option>
            {warehouseOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Nama Barang
          </label>
          <p className="text-xl font-bold">Jagung</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Harga Jagung Normal/Kg
          </label>
          <div className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100">
            <span className="font-bold">
              Rp {basePrice.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Multi-column fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kadar Air */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="moistureLevel"
              className="text-sm font-semibold text-gray-700"
            >
              Kadar Air Jagung
            </label>
            <div className="relative">
              <input
                type="number"
                id="moistureLevel"
                name="moistureLevel"
                max={100}
                value={formData.moistureLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300"
              />
              <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">
                %
              </span>
            </div>
          </div>
          {/* Kondisi Oven */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ovenCondition"
              className="text-sm font-semibold text-gray-700"
            >
              Kondisi Oven
            </label>
            <select
              id="ovenCondition"
              name="ovenCondition"
              value={formData.ovenCondition}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled>
                Pilih Kondisi
              </option>
              {ovenConditionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {/* Oven dapat hidup? */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ovenCanOperate"
              className="text-sm font-semibold text-gray-700"
            >
              Oven jagung dapat hidup 1-2 hari?
            </label>
            <select
              id="ovenCanOperate"
              name="ovenCanOperate"
              value={formData.ovenCanOperate}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled>
                Pilih Ya/Tidak
              </option>
              {ovenCanOperateOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Supplier */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="supplier"
            className="text-sm font-semibold text-gray-700"
          >
            Supplier
          </label>
          <select
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white"
            disabled={isFormDisabled}
          >
            <option value="" disabled>
              Pilih Supplier
            </option>
            {supplierOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Jumlah Pesan & Jumlah Maksimum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="quantity"
              className="text-sm font-semibold text-gray-700"
            >
              Jumlah Pesan
            </label>
            <div className="relative">
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-md border ${
                  isQuantityOverMax ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                disabled={isFormDisabled}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                Kg
              </span>
            </div>
            {isQuantityOverMax && (
              <p className="flex items-center gap-1 text-red-500 text-sm mt-1">
                <GoAlertFill />
                Jumlah barang yang anda masukkan melebihi jumlah maksimum pesan
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Jumlah Maksimum Pesan
            </label>
            <div className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100">
              <span className="font-bold">{maxOrderQuantity} Kg</span>
            </div>
          </div>
        </div>

        {/* Hasil Harga Beli / Kg & Harga Beli Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Hasil Harga Beli / Kg
            </label>
            <div className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100">
              <span className="font-bold">
                Rp {discountedPricePerKg.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Harga Beli Total
            </label>
            <div className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100">
              <span className="font-bold">
                Rp {totalPurchasePrice.toLocaleString("id-ID") || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white font-medium"
            disabled={isFormDisabled}
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputDraftPengadaanJagung;
