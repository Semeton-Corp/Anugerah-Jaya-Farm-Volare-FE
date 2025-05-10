import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCage } from "../services/cages";
import { inputTelur } from "../services/eggs";
import { getEggMonitoringById } from "../services/eggs";
import { useParams } from "react-router-dom";
import { updateEggMonitoring } from "../services/eggs";
import { getWarehouses } from "../services/warehouses";
import { getTodayDateInBahasa } from "../utils/dateFormat";

const InputPengadaanBarang = () => {
  const [cages, setCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(0);

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);

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

  const handleSubmit = async () => {};

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
            const id = Number(e.target.value);
            setSelectedWarehouse(id);
          }}
        >
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>

        {/* Pilih kandang */}
        <label className="block font-medium mb-1">Pilih kandang</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-6"
          value={selectedCage}
          onChange={(e) => {
            const id = Number(e.target.value);
            setSelectedCage(id);
          }}
        >
          {cages.map((cage) => (
            <option key={cage.id} value={cage.id}>
              {cage.name}
            </option>
          ))}
        </select>

        {/* Form Telur */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Telur OK</label>
            <input
              type="number"
              className="w-full border rounded p-2 bg-black-4"
              placeholder="Masukkan jumlah telur..."
              value={getDisplayValue(ok)}
              onChange={(e) => setOk(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Telur Retak</label>
            <input
              type="number"
              className="w-full border rounded p-2 bg-black-4"
              placeholder="Masukkan jumlah telur..."
              value={getDisplayValue(retak)}
              onChange={(e) => setRetak(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Telur Pecah</label>
            <input
              type="number"
              className="w-full border rounded p-2 bg-black-4"
              placeholder="Masukkan jumlah telur..."
              value={getDisplayValue(pecah)}
              onChange={(e) => setPecah(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Telur Reject</label>
            <input
              type="number"
              className="w-full border rounded p-2 bg-black-4"
              placeholder="Masukkan jumlah telur..."
              value={getDisplayValue(reject)}
              onChange={(e) => setReject(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-medium mb-1">Berat Telur (Kg)</label>
            <input
              type="number"
              className="w-full border rounded p-2 bg-black-4"
              placeholder="Masukkan jumlah telur..."
              value={getDisplayValue(weight)}
              onChange={(e) => setWeight(e.target.value)}
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
            console.log("Selected Cage ID:", selectedCage);
            console.log("Selected Warehouse ID:", selectedWarehouse);
            console.log("OK:", ok);
            console.log("Retak:", retak);
            console.log("Pecah:", pecah);
            console.log("Reject:", reject);
            console.log("Weight:", weight);
            console.log("Route Param ID:", id);
          }}
        >
          Check
        </button> */}
    </div>
  );
};

export default InputPengadaanBarang;
