import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCage } from "../services/cages";
import { inputTelur } from "../services/eggs";
import { getEggMonitoringById } from "../services/eggs";
import { useParams } from "react-router-dom";
import { updateEggMonitoring } from "../services/eggs";
import {
  createWarehouseOrderItem,
  getWarehouseItems,
  getWarehouses,
} from "../services/warehouses";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { getSuppliers } from "../services/supplier";

const InputPengadaanBarang = () => {
  const [cages, setCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(0);

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);

  const [warehouseItems, setWarehouseItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const [quantity, setQuantity] = useState("");
  const [estimasiHabis, setEstimasiHabis] = useState("");

  const [ok, setOk] = useState("");
  const [retak, setRetak] = useState("");
  const [pecah, setPecah] = useState("");
  const [reject, setReject] = useState("");
  const [weight, setWeight] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchWarehouses = async () => {
    try {
      const response = await getWarehouses();
      if (response.status == 200) {
        setWarehouses(response.data.data);
        console.log("list warehouse: ", response.data.data);

        setSelectedWarehouse(response.data.data[0].id);
        console.log("selected warehouse: ", response.data.data[0].id);
      }
    } catch (error) {
      console.error("Gagal memuat data gudang:", error);
    }
  };

  const fetchWarehouseItems = async () => {
    try {
      const itemsResponse = await getWarehouseItems();
      console.log("itemsResponse: ", itemsResponse);
      if (itemsResponse.status == 200) {
        const filteredItems = itemsResponse.data.data.filter(
          (item) => item.category !== "Telur"
        );
        setWarehouseItems(filteredItems);
        setSelectedItem(itemsResponse.data.data[0]);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const supplierResponse = await getSuppliers();
      console.log("supplierResponse: ", supplierResponse);
      if (supplierResponse.status == 200) {
        setSuppliers(supplierResponse.data.data);
        setSelectedSupplier(supplierResponse.data.data[0].id);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchWarehouseItems();
    fetchWarehouses();
    fetchSuppliers();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      warehouseItemId: parseInt(selectedItem.id),
      warehouseId: parseInt(selectedWarehouse),
      supplierId: parseInt(selectedSupplier),
      quantity: parseInt(quantity),
    };

    // console.log("payload: ", payload);

    try {
      const createResponse = await createWarehouseOrderItem(payload);
      // console.log("createResponse: ", createResponse);
      if (createResponse.status == 201) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const getDisplayValue = (val) => (val === 0 ? "" : val);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      <h1 className="text-3xl font-bold">Input Pengadaan Barang</h1>

      <div className="w-full mx-auto p-6 bg-white shadow rounded border">
        <h2 className="text-lg font-semibold mb-1">Input Pengadaan Barang</h2>
        <p className="text-sm mb-6">{getTodayDateInBahasa()}</p>

        {/* Pilih gudang */}
        <label className="block font-medium mb-1">Pilih gudang</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-6"
          value={selectedWarehouse}
          onChange={(e) => {
            setSelectedWarehouse(e.target.value);
          }}
        >
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>

        {/* Pilih barang */}
        <label className="block font-medium mb-1">Nama Barang</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-6"
          value={selectedItem.id}
          onChange={(e) => {
            const selected = warehouseItems.find(
              (item) => item.id == e.target.value
            );
            setSelectedItem(selected);
          }}
        >
          {warehouseItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="flex gap-4"></div>
        <div>
          <label className="block font-medium mb-1">Jumlah Pesanan</label>
          <div className="flex w-fullgap-4 items-center mb-6">
            <input
              type="number"
              className="w-full border rounded py-2 px-2 bg-black-4"
              placeholder="Masukkan jumlah barang..."
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <p className="text-lg font-bold">{selectedItem.unit}</p>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Estimasi Habis</label>
          <div className="flex w-fullgap-4 items-center mb-6">
            <input
              type="number"
              className="w-full border rounded py-2 px-2 bg-black-4"
              placeholder="Masukkan estimasi habis barang (ex : 7 Hari)"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <p className="text-lg font-bold">{selectedItem.unit}</p>
          </div>
        </div>

        {/* Pilih supplier */}
        <label className="block font-medium mb-1">Suplier</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-6"
          value={selectedSupplier}
          onChange={(e) => {
            setSelectedSupplier(e.target.value);
          }}
        >
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>

        <div className="mt-6 text-right">
          <button
            onClick={() => {
              handleSubmit();
              console.log("selectedCage: ", selectedCage);
            }}
            className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
      {/* <button
        onClick={() => {
          console.log("selectedWarehouse: ", selectedWarehouse);
          console.log("selectedItem: ", selectedItem);
          console.log("quantity: ", quantity);
          console.log("selectedSupplier: ", selectedSupplier);
        }}
      >
        Check
      </button> */}
    </div>
  );
};

export default InputPengadaanBarang;
