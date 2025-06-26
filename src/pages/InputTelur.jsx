import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCage, getChickenCage } from "../services/cages";
import { inputTelur } from "../services/eggs";
import { getEggMonitoringById } from "../services/eggs";
import { useParams } from "react-router-dom";
import { updateEggMonitoring } from "../services/eggs";
import { getWarehouses, getWarehousesByLocation } from "../services/warehouses";
import CalculatorInput from "../components/CalculatorInput";

const InputTelur = () => {
  const [chickenCages, setChickenCages] = useState([]);
  const [selectedChickenCage, setSelectedChickenCage] = useState(0);
  const [idBatch, setIdBatch] = useState("");
  const [chickenCategory, setChickenCategory] = useState("");
  const [chickenAge, setChickenAge] = useState(0);

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);

  const [totalKarpetGoodEgg, setTotalKarpetGoodEgg] = useState(0);
  const [totalRemainingGoodEgg, setTotalRemainingGoodEgg] = useState(0);
  const [totalWeightGoodEgg, setTotalWeightGoodEgg] = useState(0);

  const [totalKarpetCrackedEgg, setTotalKarpetCrackedEgg] = useState(0);
  const [totalRemainingCrackedEgg, setTotalRemainingCrackedEgg] = useState(0);
  const [totalWeightCrackedEgg, setTotalWeightCrackedEgg] = useState(0);

  const [totalKarpetRejectEgg, setTotalKarpetRejectEgg] = useState(0);
  const [totalRemainingRejectEgg, setTotalRemainingRejectEgg] = useState(0);

  // const [selectedCageName, setSelectedCageName] = useState("");
  const [ok, setOk] = useState("");
  const [retak, setRetak] = useState("");
  const [pecah, setPecah] = useState("");
  const [reject, setReject] = useState("");
  const [weight, setWeight] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchChickenCages = async () => {
      try {
        const response = await getChickenCage();
        const data = response.data.data;

        setChickenCages(data);
        setSelectedChickenCage(data[0].id);
        // console.log("data: ", data[0].id);

        // console.log("Kandang: ", data);

        if (id) {
          const updateResponse = await getEggMonitoringById(id);
          console.log("updateResponse: ", updateResponse);

          const data = updateResponse.data.data;
          if (updateResponse.status == 200) {
            setSelectedChickenCage(data.cage.id);
            setSelectedWarehouse(data.warehouse.id);
            setOk(data.totalGoodEggs);
            setRetak(data.totalCrackedEggs);
            setPecah(data.totalBrokeEggs);
            setReject(data.totalRejectEggs);
            setWeight(data.weight);
          }

          // console.log("Nama kandang: ", data.cage.name);

          // setSelectedCageName(data.cage.name);
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
        const response = await getWarehousesByLocation();
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

    fetchChickenCages();
    fetchWarehouses();
  }, []);

  const handleSubmit = async () => {
    const cageId = Number(selectedChickenCage);
    const warehouseId = Number(selectedWarehouse);

    if (
      !cageId ||
      !warehouseId ||
      !totalKarpetGoodEgg ||
      !totalRemainingGoodEgg ||
      !totalWeightGoodEgg ||
      !totalKarpetCrackedEgg ||
      !totalWeightCrackedEgg ||
      !totalKarpetRejectEgg ||
      !totalRemainingRejectEgg
    ) {
      alert("Semua field harus diisi terlebih dahulu!");
      return;
    }

    if (!Number.isInteger(cageId)) {
      console.error("Invalid cageId:", selectedChickenCage);
      return;
    }

    const payload = {
      chickenCageId: selectedChickenCage,
      warehouseId: selectedWarehouse,
      totalKarpetGoodEgg,
      totalRemainingGoodEgg,
      totalWeightGoodEgg,
      totalKarpetCrackedEgg,
      totalRemainingCrackedEgg,
      totalWeightCrackedEgg,
      totalKarpetRejectEgg,
      totalRemainingRejectEgg,
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
        console.log("response: ", response);
        if (response.status === 201) {
          console.log("Data berhasil dikirim:", response.data);
          navigate(-1);
        } else {
          console.log("status bukan 200:", response.data);
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan";

        if (errorMessage === "egg monitoring already exists for today") {
          alert("Sudah terdapat data untuk kandang yang dipilih hari ini!");
        } else {
          alert("Gagal menyimpan data: " + errorMessage);
        }

        console.error(
          "Gagal menyimpan atau mengupdate data ayam:",
          errorMessage
        );
      }
    }
  };

  const getDisplayValue = (val) => (val === 0 ? "" : val);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      <div className="w-full mx-auto p-6 bg-white shadow rounded border">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-1">Input data harian</h2>
          <p className="text-sm mb-6">20 Maret 2025</p>
        </div>
        {/* Pilih kandang */}
        <label className="block font-medium mb-1">Kandang</label>

        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-8"
          value={selectedChickenCage ? JSON.stringify(selectedChickenCage) : ""}
          onChange={(e) => {
            const cageObj = JSON.parse(e.target.value);
            setSelectedChickenCage(cageObj);
            setIdBatch(cageObj.batchId);
            setChickenCategory(cageObj.chickenCategory);
            setChickenAge(cageObj.chickenAge);
          }}
        >
          <option value="" disabled hidden>
            Pilih kandang...
          </option>
          {chickenCages.map((cage) => (
            <option key={cage.id} value={JSON.stringify(cage)}>
              {cage.cage.name || "Tanpa Nama"}
            </option>
          ))}
        </select>

        <div className="flex justify-between pr-16 mb-6">
          <div>
            <label className="block font-medium mb-1">ID Batch</label>
            <p className="text-lg font-bold">{idBatch ? idBatch : "-"}</p>
          </div>
          <div>
            <label className="block font-medium mb-1">Kategori ayam</label>
            <p className="text-lg font-bold">
              {chickenCategory ? chickenCategory : "-"}
            </p>
          </div>
          <div>
            <label className="block font-medium mb-1">Usia ayam (Minggu)</label>
            <p className="text-lg font-bold">
              {chickenAge !== null && chickenAge !== undefined
                ? chickenAge
                : "-"}
            </p>
          </div>
        </div>

        <label className="block font-medium mb-1">Gudang Penyimpanan</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-8"
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

        <h2 className="text-lg font-semibold mb-1">Telur OK</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <CalculatorInput
              label="Jumlah Karpet"
              value={totalKarpetGoodEgg}
              onChange={(val) => setTotalKarpetGoodEgg(val)}
            />
          </div>
          <div>
            <CalculatorInput
              label="Jumlah Telur Butir Sisa (Butir)"
              value={totalRemainingGoodEgg}
              onChange={(val) => setTotalRemainingGoodEgg(val)}
            />
          </div>
          <div>
            <CalculatorInput
              label="Berat Telur (Kg)"
              value={totalWeightGoodEgg}
              onChange={(val) => setTotalWeightGoodEgg(val)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Berat Total (Kg)</label>
            <p className="text-lg font-bold">{idBatch ? idBatch : "-"}</p>
          </div>
          <div>
            <label className="block font-medium mb-1">
              Berat rata-rata (Gr/Butir)
            </label>
            <p className="text-lg font-bold">{idBatch ? idBatch : "-"}</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-1">Telur Retak</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <CalculatorInput
              label="Jumlah Karpet"
              value={totalKarpetCrackedEgg}
              onChange={(val) => setTotalKarpetCrackedEgg(val)}
            />
          </div>
          <div>
            <CalculatorInput
              label="Jumlah Telur Butir Sisa"
              value={totalRemainingCrackedEgg}
              onChange={(val) => setTotalRemainingCrackedEgg(val)}
            />
          </div>
          <div>
            <CalculatorInput
              label="Berat Telur (Kg)"
              value={totalWeightCrackedEgg}
              onChange={(val) => setTotalWeightCrackedEgg(val)}
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-1">Telur Reject</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <CalculatorInput
              label="Jumlah Karpet"
              value={totalKarpetRejectEgg}
              onChange={(val) => setTotalKarpetRejectEgg(val)}
            />
          </div>
          <div>
            <CalculatorInput
              label="Jumlah Telur Butir"
              value={totalRemainingRejectEgg}
              onChange={(val) => setTotalRemainingRejectEgg(val)}
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={() => {
              handleSubmit();
              console.log("selectedCage: ", selectedChickenCage);
            }}
            className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          console.log("id: ", id);
          console.log("chickenCages: ", chickenCages);
          console.log("selectedChickenCage: ", selectedChickenCage);
          console.log("selectedWarehouse: ", selectedWarehouse);
        }}
      >
        Check
      </button>
    </div>
  );
};

export default InputTelur;
