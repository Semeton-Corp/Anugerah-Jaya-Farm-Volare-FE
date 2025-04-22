import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCage } from "../services/cage";
import { inputTelur } from "../services/egg";
import { getEggMonitoringById } from "../services/egg";
import { useParams } from "react-router-dom";
import { updateEggMonitoring } from "../services/egg";
import { getWarehouses } from "../services/warehouse";

const InputTelur = () => {
  const [cages, setCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(0);

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);

  // const [selectedCageName, setSelectedCageName] = useState("");
  const [ok, setOk] = useState("");
  const [retak, setRetak] = useState("");
  const [pecah, setPecah] = useState("");
  const [reject, setReject] = useState("");
  const [weight, setWeight] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchCages = async () => {
      try {
        const response = await getCage();
        const data = response.data.data;
        setCages(data);
        setSelectedCage(data[0].id);
        // console.log("data: ", data[0].id);

        // console.log("Kandang: ", data);

        if (id) {
          const updateResponse = await getEggMonitoringById(id);
          console.log("updateResponse: ", updateResponse.status);

          const data = updateResponse.data.data;

          setSelectedCage(data.cage.id);
          console.log("Nama kandang: ", data.cage.name);

          // setSelectedCageName(data.cage.name);

          setOk(data.totalGoodEggs);
          setRetak(data.totalCrackedEggs);
          setPecah(data.totalBrokeEggs);
          setReject(data.totalRejectEggs);
        } else {
          if (data.length > 0) {
            // setSelectedCageName(cages[0]?.name);
          }
        }
      } catch (error) {
        console.error("Gagal memuat data kandang:", error);
      }
    };

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

    fetchCages();
    fetchWarehouses();
  }, []);

  const handleSubmit = async () => {
    const cageId = Number(selectedCage);
    const warehouseId = Number(selectedWarehouse);

    if (
      !cageId ||
      !warehouseId ||
      !ok ||
      !retak ||
      !pecah ||
      !reject ||
      !weight
    ) {
      alert("Semua field harus diisi terlebih dahulu!");
      return;
    }

    if (!Number.isInteger(cageId)) {
      console.error("Invalid cageId:", selectedCage);
      return;
    }

    const payload = {
      cageId,
      warehouseId,
      totalGoodEgg: parseInt(ok),
      totalCrackedEgg: parseInt(retak),
      totalBrokeEgg: parseInt(pecah),
      totalRejectEgg: parseInt(reject),
      weight: parseInt(weight),
    };

    console.log("payload: ", payload);

    if (id) {
      console.log("THERE IS AN ID: ", id);

      try {
        const response = await updateEggMonitoring(id, payload);

        if (response.status === 200) {
          console.log("Data berhasil Diupdate:", response.data);
          navigate(-1);
        } else {
          console.log("status bukan 200:", response.data);
        }
      } catch (error) {
        console.error("Gagal mengirim data telur:", error);
      }
    } else {
      try {
        const response = await inputTelur(payload);
        if (response.status === 201) {
          console.log("Data berhasil dikirim:", response.data);
          navigate(-1);
        } else {
          console.log("status bukan 200:", response.data);
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || error.message || "Terjadi kesalahan";
  
        if (errorMessage === "egg monitoring already exists for today") {
          alert("Sudah terdapat data untuk kandang yang dipilih hari ini!");
        } else {
          alert("Gagal menyimpan data: " + errorMessage);
        }
  
        console.error("Gagal menyimpan atau mengupdate data ayam:", errorMessage);
      }
    }
  };

  const getDisplayValue = (val) => (val === 0 ? "" : val);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      <div className="w-full mx-auto p-6 bg-white shadow rounded border">
        <h2 className="text-lg font-semibold mb-1">Input data harian</h2>
        <p className="text-sm mb-6">20 Maret 2025</p>

        {/* Pilih gudang */}
        <label className="block font-medium mb-1">Pilih gudang</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-6"
          value={selectedWarehouse.id}
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
            className="bg-emerald-700 text-white py-2 px-6 rounded hover:bg-emerald-600 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputTelur;
