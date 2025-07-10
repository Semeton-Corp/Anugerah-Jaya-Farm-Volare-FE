import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCage, getChickenCage } from "../services/cages";
import { deleteEggData, inputTelur } from "../services/eggs";
import { getEggMonitoringById } from "../services/eggs";
import { useParams } from "react-router-dom";
import { updateEggMonitoring } from "../services/eggs";
import { getWarehouses, getWarehousesByLocation } from "../services/warehouses";
import CalculatorInput from "../components/CalculatorInput";
import { Joystick } from "lucide-react";
import DeleteModal from "../components/DeleteModal";
import { useMemo } from "react";

const InputTelur = () => {
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const [locationId, setLocationId] = useState(
    localStorage.getItem("locationId")
  );

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

  const [isEditMode, setIsEditMode] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter(
      (warehouse) => warehouse.id === selectedChickenCage?.cage?.location?.id
    );
  }, [warehouses, selectedChickenCage]);

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
        let warehouseResponse;

        if (userRole === "Owner") {
          warehouseResponse = await getWarehousesByLocation();
        } else {
          warehouseResponse = await getWarehousesByLocation(locationId);
        }

        const chickenResponse = await getChickenCage();

        setWarehouses(warehouseResponse.data.data);
        setSelectedWarehouse(warehouseResponse.data.data[0]);

        const dataChickenCage = chickenResponse.data.data;
        const dataWarehouse = warehouseResponse.data.data;

        console.log("dataWarehouse: ", dataWarehouse);
        console.log("dataChickenCage: ", dataChickenCage);

        if (userRole != "Owner") {
          const filterCage = dataChickenCage.filter(
            (cage) => cage.eggPic == userName
          );
          console.log("filterCage: ", filterCage);
          setChickenCages(filterCage);
          setSelectedChickenCage(filterCage[0]);
        } else {
          setChickenCages(dataChickenCage);
          setSelectedChickenCage(dataChickenCage[0]);
        }

        // console.log("data: ", data[0].id);

        // console.log("Kandang: ", data);

        if (id) {
          setIsEditMode(false);
          const updateResponse = await getEggMonitoringById(id);
          // console.log("updateResponse: ", updateResponse);

          const data = updateResponse.data.data;
          // console.log("data: ", data);
          if (updateResponse.status == 200) {
            const selectedCage = dataChickenCage.find(
              (cage) => cage.cage.id === data.cage.id
            );

            const selectedWarehouse = dataWarehouse.find(
              (warehouse) => warehouse.id === data.warehouse.id
            );

            console.log("dataChickenCage: ", dataChickenCage);

            console.log("data: ", data);
            // console.log("dataChickenCage: ", dataChickenCage);
            // console.log("selectedWarehouse: ", selectedWarehouse);

            setSelectedChickenCage(selectedCage);
            setSelectedWarehouse(selectedWarehouse);
            setTotalKarpetGoodEgg(data.totalKarpetGoodEgg);
            setTotalRemainingGoodEgg(data.totalRemainingGoodEgg);
            setTotalWeightGoodEgg(data.totalWeightGoodEgg);
            setTotalKarpetCrackedEgg(data.totalKarpetCrackedEgg);
            setTotalRemainingCrackedEgg(data.totalRemainingCrackedEgg);
            setTotalWeightCrackedEgg(data.totalWeightCrackedEgg);
            setTotalKarpetRejectEgg(data.totalKarpetRejectEgg);
            setTotalRemainingRejectEgg(data.totalRemainingRejectEgg);
          }

          // console.log("Nama kandang: ", data.cage.name);

          // setSelectedCageName(data.cage.name);
        } else {
          if (dataChickenCage.length > 0) {
            // console.log("dataChickenCage: ", dataChickenCage);
            // console.log("dataChickenCage[0]?.name: ", dataChickenCage[0]?.name);
            setSelectedChickenCage(dataChickenCage[0]);
          }
        }
      } catch (error) {
        console.error("Gagal memuat data kandang:", error);
      }
    };

    // const fetchWarehouses = async () => {
    //   try {
    //     const response = await getWarehousesByLocation();
    //     if (response.status == 200) {
    //       setWarehouses(response.data.data);
    //       // console.log("list warehouse: ", response.data.data);

    //       setSelectedWarehouse(response.data.data[0].id);
    //       // console.log("selected warehouse: ", response.data.data[0].id);
    //     }
    //   } catch (error) {
    //     console.error("Gagal memuat data gudang:", error);
    //   }
    // };

    fetchChickenCages();
    // fetchWarehouses();
  }, []);

  useEffect(() => {
    if (userRole != "Owner") {
      setLocationId(localStorage.getItem("locationId"));
    }
  }, [userRole]);

  const handleSubmit = async () => {
    const payload = {
      chickenCageId: selectedChickenCage.cage.id,
      warehouseId: selectedWarehouse.id,
      totalKarpetGoodEgg: parseInt(totalKarpetGoodEgg),
      totalRemainingGoodEgg: parseInt(totalRemainingGoodEgg),
      totalWeightGoodEgg: parseInt(totalWeightGoodEgg),
      totalKarpetCrackedEgg: parseInt(totalKarpetCrackedEgg),
      totalRemainingCrackedEgg: parseInt(totalRemainingCrackedEgg),
      totalWeightCrackedEgg: parseInt(totalWeightCrackedEgg),
      totalKarpetRejectEgg: parseInt(totalKarpetRejectEgg),
      totalRemainingRejectEgg: parseInt(totalRemainingRejectEgg),
    };

    // console.log("payload: ", payload);

    if (id) {
      // console.log("THERE IS AN ID: ", id);

      try {
        const response = await updateEggMonitoring(id, payload);

        if (response.status === 200) {
          console.log("Data berhasil Diupdate:", response.data);
          navigate(-1, { state: { refetch: true } });
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
          navigate(-1, { state: { refetch: true } });
        } else {
          console.log("status bukan 200:", response.data);
        }
      } catch (error) {
        const errorMessage =
          error?.response || error.message || "Terjadi kesalahan";

        if (errorMessage === "egg monitoring already exists for today") {
          alert("Sudah terdapat data untuk kandang yang dipilih hari ini!");
        } else {
          alert("Gagal menyimpan data: " + errorMessage.data.message);
        }

        console.error(
          "Gagal menyimpan atau mengupdate data ayam:",
          errorMessage
        );
      }
    }
  };

  async function deleteDataHandle() {
    try {
      const response = await deleteEggData(id);
      if (response.status == 204) {
        navigate(-1, { state: { refetch: true } });
      }
      console.log("response: ", response);
    } catch (error) {
      console.error("Gagal menghapus data ayam:", error);
    }
  }

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
        {isEditMode ? (
          <select
            className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-8"
            value={
              selectedChickenCage ? JSON.stringify(selectedChickenCage) : ""
            }
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
        ) : (
          <div>
            <p className="text-lg font-bold mb-4">
              {selectedChickenCage?.cage?.name}
            </p>
          </div>
        )}

        <div className="flex justify-between pr-16 mb-6">
          <div>
            <label className="block font-medium mb-1">ID Batch</label>
            <p className="text-lg font-bold">
              {selectedChickenCage?.batchId != ""
                ? selectedChickenCage?.batchId
                : "-"}
            </p>
          </div>
          <div>
            <label className="block font-medium mb-1">Kategori ayam</label>
            <p className="text-lg font-bold">
              {selectedChickenCage?.chickenCategory
                ? selectedChickenCage?.chickenCategory
                : "-"}
            </p>
          </div>
          <div>
            <label className="block font-medium mb-1">Usia ayam (Minggu)</label>
            <p className="text-lg font-bold">
              {selectedChickenCage?.chickenAge !== null &&
              selectedChickenCage?.chickenAge !== undefined
                ? selectedChickenCage?.chickenAge
                : "-"}
            </p>
          </div>
        </div>

        <label className="block font-medium mb-1">Gudang Penyimpanan</label>
        {isEditMode ? (
          <select
            className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-8"
            value={JSON.stringify(selectedWarehouse)}
            onChange={(e) => {
              const warehouseObj = JSON.parse(e.target.value);
              setSelectedWarehouse(warehouseObj);
            }}
          >
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={JSON.stringify(warehouse)}>
                {warehouse.name}
              </option>
            ))}
          </select>
        ) : (
          <div>
            <p className="text-lg font-bold mb-4">{selectedWarehouse?.name}</p>
          </div>
        )}

        <h2 className="text-lg font-semibold mb-1">Telur OK</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {isEditMode ? (
            <div>
              <CalculatorInput
                label="Jumlah Karpet"
                value={totalKarpetGoodEgg}
                onChange={(val) => setTotalKarpetGoodEgg(val)}
              />
            </div>
          ) : (
            <div>
              <label className="block font-medium mb-1">Jumlah Karpet</label>
              <p className="text-lg font-bold mb-4">{totalKarpetGoodEgg}</p>
            </div>
          )}

          {isEditMode ? (
            <div>
              <CalculatorInput
                label="Jumlah Telur Butir Sisa (Butir)"
                value={totalRemainingGoodEgg}
                onChange={(val) => setTotalRemainingGoodEgg(val)}
              />
            </div>
          ) : (
            <div>
              <label className="block font-medium mb-1">
                Jumlah Telur Butir Sisa (Butir)
              </label>
              <p className="text-lg font-bold mb-4">{totalRemainingGoodEgg}</p>
            </div>
          )}

          {isEditMode ? (
            <div>
              <CalculatorInput
                label="Berat Telur (Kg)"
                value={totalWeightGoodEgg}
                onChange={(val) => setTotalWeightGoodEgg(val)}
              />
            </div>
          ) : (
            <div>
              <label className="block font-medium mb-1">Berat Telur (Kg)</label>
              <p className="text-lg font-bold mb-4">{totalWeightGoodEgg}</p>
            </div>
          )}

          <div>
            <label className="block font-medium mb-1">
              Berat rata-rata (Gr/Butir)
            </label>
            <p className="text-lg font-bold">
              {totalKarpetGoodEgg * 30 + totalRemainingGoodEgg > 0
                ? (() => {
                    const avg =
                      (totalWeightGoodEgg * 1000) /
                      (totalKarpetGoodEgg * 30 + totalRemainingGoodEgg);
                    return avg.toFixed(2) === "0.00" ? "-" : avg.toFixed(2);
                  })()
                : "-"}
            </p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-1">Telur Retak</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {isEditMode ? (
            <div>
              <CalculatorInput
                label="Jumlah Karpet"
                value={totalKarpetCrackedEgg}
                onChange={(val) => setTotalKarpetCrackedEgg(val)}
              />
            </div>
          ) : (
            <div>
              <label className="block font-medium mb-1">Jumlah Karpet</label>
              <p className="text-lg font-bold mb-4">{totalKarpetCrackedEgg}</p>
            </div>
          )}

          {isEditMode ? (
            <div>
              <CalculatorInput
                label="Jumlah Telur Butir Sisa"
                value={totalRemainingCrackedEgg}
                onChange={(val) => setTotalRemainingCrackedEgg(val)}
              />
            </div>
          ) : (
            <div>
              <label className="block font-medium mb-1">
                Jumlah Telur Butir Sisa
              </label>
              <p className="text-lg font-bold mb-4">
                {totalRemainingCrackedEgg}
              </p>
            </div>
          )}

          {isEditMode ? (
            <div>
              <CalculatorInput
                label="Berat Telur (Kg)"
                value={totalWeightCrackedEgg}
                onChange={(val) => setTotalWeightCrackedEgg(val)}
              />
            </div>
          ) : (
            <div>
              <label className="block font-medium mb-1">Berat Telur (Kg)</label>
              <p className="text-lg font-bold mb-4">
                {totalRemainingCrackedEgg}
              </p>
            </div>
          )}
        </div>

        <h2 className="text-lg font-semibold mb-1">Telur Reject</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {isEditMode ? (
            <div>
              <CalculatorInput
                label="Jumlah Karpet"
                value={totalKarpetRejectEgg}
                onChange={(val) => setTotalKarpetRejectEgg(val)}
              />
            </div>
          ) : (
            <div>
              <label className="block font-medium mb-1">Jumlah Karpet</label>
              <p className="text-lg font-bold mb-4">{totalKarpetRejectEgg}</p>
            </div>
          )}

          {isEditMode ? (
            <div>
              <CalculatorInput
                label="Jumlah Telur Butir"
                value={totalRemainingRejectEgg}
                onChange={(val) => setTotalRemainingRejectEgg(val)}
              />
            </div>
          ) : (
            <div>
              <label className="block font-medium mb-1">
                Jumlah Telur Butir
              </label>
              <p className="text-lg font-bold mb-4">
                {totalRemainingRejectEgg}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between text-right">
          <div></div>
          <div className="flex gap-3">
            {id && (
              <div className="text-right">
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`${
                    isEditMode
                      ? "bg-red-600 hover:bg-red-800"
                      : "bg-green-700 hover:bg-green-900 "
                  } text-white py-3 px-8 rounded cursor-pointer`}
                >
                  {isEditMode ? "Batal Edit" : "Edit"}
                </button>
              </div>
            )}
            {isEditMode && (
              <button
                onClick={() => {
                  handleSubmit();
                  // console.log("selectedCage: ", selectedChickenCage);
                }}
                className="bg-green-700 text-white py-3 px-8 rounded hover:bg-green-900 cursor-pointer"
              >
                Simpan
              </button>
            )}

            {id && !isEditMode && (
              <div className="text-right">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-600 text-white py-3 px-8 rounded hover:bg-red-800 cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          // const payload = {
          //   chickenCageId: selectedChickenCage.cage.id,
          //   warehouseId: selectedWarehouse,
          //   totalKarpetGoodEgg: parseInt(totalKarpetGoodEgg),
          //   totalRemainingGoodEgg: parseInt(totalRemainingGoodEgg),
          //   totalWeightGoodEgg: parseInt(totalWeightGoodEgg),
          //   totalKarpetCrackedEgg: parseInt(totalKarpetCrackedEgg),
          //   totalRemainingCrackedEgg: parseInt(totalRemainingCrackedEgg),
          //   totalWeightCrackedEgg: parseInt(totalWeightCrackedEgg),
          //   totalKarpetRejectEgg: parseInt(totalKarpetRejectEgg),
          //   totalRemainingRejectEgg: parseInt(totalRemainingRejectEgg),
          // };
          // console.log("selectedWarehouse: ", selectedWarehouse);
          // console.log("isEditMode: ", isEditMode);
          // console.log("batchId: ", selectedChickenCage.batchId);
          // console.log("chickenCageId: ", selectedChickenCage);
          // console.log("payload: ", payload);
          // console.log("id: ", id);
          // console.log("chickenCages: ", chickenCages);
          // console.log("selectedChickenCage: ", selectedChickenCage);

          console.log("filteredWarehouses: ", filteredWarehouses);
          console.log("selectedWarehouse: ", selectedWarehouse);
          console.log("selectedChickenCage: ", selectedChickenCage);
          console.log("chickenCages: ", chickenCages);
          console.log("warehouses: ", warehouses);
        }}
      >
        Check
      </button>

      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={deleteDataHandle}
      />
    </div>
  );
};

export default InputTelur;
