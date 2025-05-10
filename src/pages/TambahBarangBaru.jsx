import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCage } from "../services/cages";
import { inputTelur } from "../services/eggs";
import { getEggMonitoringById } from "../services/eggs";
import { useParams } from "react-router-dom";
import { updateEggMonitoring } from "../services/eggs";
import { getWarehouses } from "../services/warehouses";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { createWarehouseItems } from "../services/warehouses";

const TambahBarangBaru = () => {
  const [cages, setCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(0);

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);

  const [name, setName] = useState("");
  const [category, setCategory] = useState([
    "Pakan",
    "Telur",
    "Barang",
    "Bahan Baku",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(category[0]);
  const [unit, setUnit] = useState("");

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

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      name: name,
      unit: unit,
      category: selectedCategory,
    };
    try {
      const createResponse = await createWarehouseItems(payload);
      // console.log("createResponse: ", createResponse);
      if (createResponse.status == 201) {
        navigate(-1, { state: { refecth: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const getDisplayValue = (val) => (val === 0 ? "" : val);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      <h1 className="text-3xl font-bold">Tambah Barang Baru</h1>

      <div className="w-full mx-auto p-6 bg-white shadow rounded border">
        <h2 className="text-lg font-semibold mb-1">Input data barang</h2>
        <p className="text-sm mb-6">{getTodayDateInBahasa()}</p>

        {/* nama barang */}
        <label className="block font-medium mb-1">Nama Barang</label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-6 bg-black-4"
          placeholder="Masukkan nama barang"
          value={getDisplayValue(name)}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Pilih kategori */}
        <label className="block font-medium mb-1">Kategori</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-6"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          {category.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-medium mb-1">Satuan Barang</label>
            <input
              type="text"
              className="w-full border rounded p-2 bg-black-4"
              placeholder="Masukkan satuan barang..."
              value={getDisplayValue(unit)}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
        </div>

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
          console.log("name: ", name);
          console.log("category: ", category);
          console.log("unit: ", unit);
        }}
      >
        Check
      </button> */}
    </div>
  );
};

export default TambahBarangBaru;
