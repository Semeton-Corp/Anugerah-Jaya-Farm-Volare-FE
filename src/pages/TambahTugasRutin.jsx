import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getStores } from "../services/stores";
import { getWarehouses } from "../services/warehouses";
import { getCage } from "../services/cages";
import { kategoriAyam } from "../data/KategoriAyam";
import { inputAyam } from "../services/chickenMonitorings";
import { getChickenMonitoringById } from "../services/chickenMonitorings";
import { useParams } from "react-router-dom";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { MdDelete } from "react-icons/md";
import { updateChickenMonitoring } from "../services/chickenMonitorings";
import {
  deleteChickenVaccineMonitoring,
  deleteChickenDiseaseMonitoring,
} from "../services/chickenMonitorings";

const TambahTugasRutin = () => {
  const [obatExpanded, setObatExpanded] = useState(false);

  const [cages, setCages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const [selectedCage, setSelectedCage] = useState(0);
  const selectedCageName = cages.find((cage) => cage.id === selectedCage);

  const [selectedChikenCategory, setSelectedChikenCategory] = useState(
    kategoriAyam[0]
  );
  const [ageChiken, setAgeChiken] = useState(0);
  const [totalLiveChicken, setTotalLiveChicken] = useState(0);
  const [totalSickChicken, setTotalSickChicken] = useState(0);
  const [totalDeathChicken, setTotalDeathChicken] = useState(0);
  const [slot, setSlot] = useState(0);
  const [totalFeed, setTotalFeed] = useState(0);

  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [vaksinExpanded, setVaksinExpanded] = useState(false);
  const [vaksinList, setVaksinList] = useState([]);

  const handleVaksinChange = (index, field, value) => {
    const newList = [...vaksinList];
    newList[index][field] = value;
    setVaksinList(newList);
  };

  const addVaksinInput = () => {
    setVaksinList([
      ...vaksinList,
      { jenis: "", dosis: "", satuan: "mililiter" },
    ]);

    if (!vaksinExpanded) {
      setVaksinExpanded(true);
    }
  };

  const [obatList, setObatList] = useState([]);

  const handleObatChange = (index, field, value) => {
    const newList = [...obatList];
    newList[index][field] = value;
    setObatList(newList);
  };

  const addObatInput = () => {
    setObatList([
      ...obatList,
      { penyakit: "", jenis: "", dosis: "", satuan: "mililiter" },
    ]);

    if (!obatExpanded) {
      setObatExpanded(true);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await getCage();
      if (response.status === 200) {
        const cageData = response.data.data;
        setLocations(cageData);

        const storeResponse = await getStores();
        if (storeResponse.status === 200) {
          const storeData = storeResponse.data.data;
          setLocations((prev) => [...prev, ...storeData]);

          const warehouseResponse = await getWarehouses();
          if (warehouseResponse.status === 200) {
            const warehousesData = warehouseResponse.data.data;

            setLocations((prev) => [...prev, ...warehousesData]);
          }
        }
      }
    } catch (error) {
      console.log("gagal :", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  async function simpanAyamHandle() {
    setLoading(true);

    // Validate chickenVaccines
    const chickenVaccines = [];
    for (const v of vaksinList) {
      if (!v.jenis || !v.dosis || !v.satuan) {
        alert("Semua field vaksin harus diisi terlebih dahulu!");
        console.log("v.jenis: ", v.jenis);
        console.log("v.dosis: ", v.dosis);
        console.log("v.satuan: ", v.satuan);

        setLoading(false);
        return; // STOP ENTIRE FUNCTION
      }

      const item = {
        vaccine: v.jenis,
        dose: parseFloat(v.dosis),
        unit: v.satuan,
      };
      if (v.id) item.id = v.id;

      chickenVaccines.push(item);
    }

    // Validate chickenDiseases
    const chickenDiseases = [];

    for (const o of obatList) {
      if (!o.penyakit || !o.jenis || !o.dosis || !o.satuan) {
        alert("Semua field obat harus diisi terlebih dahulu!");
        setLoading(false);
        return; // STOP ENTIRE FUNCTION
      }

      const item = {
        disease: o.penyakit,
        medicine: o.jenis,
        dose: parseFloat(o.dosis),
        unit: o.satuan,
      };
      if (o.id) item.id = o.id;

      chickenDiseases.push(item);
    }

    // Check required main fields
    if (
      !selectedCage ||
      !selectedChikenCategory ||
      !ageChiken ||
      !totalLiveChicken ||
      !totalSickChicken ||
      !totalDeathChicken ||
      !totalFeed
    ) {
      alert("Semua field utama harus diisi!");
      setLoading(false);
      return; // STOP ENTIRE FUNCTION
    }

    const payload = {
      cageId: parseInt(selectedCage),
      chickenCategory: selectedChikenCategory,
      age: parseInt(ageChiken),
      totalLiveChicken: parseInt(totalLiveChicken),
      totalSickChicken: parseInt(totalSickChicken),
      totalDeathChicken: parseInt(totalDeathChicken),
      totalFeed: parseFloat(totalFeed),
      chickenDiseases,
      chickenVaccines,
    };

    console.log("Payload ready to send: ", payload);

    try {
      if (id) {
        const updateResponse = await updateChickenMonitoring(id, payload);

        if (updateResponse.status === 200) {
          navigate(-1);
        }
      } else {
        const response = await inputAyam(payload);
        console.log("response status: ", response.status);
        console.log("response message: ", response.message);
        if (response.status === 201) {
          navigate(-1, { state: { refetch: true } });
        }
      }
    } catch (error) {
      console.log("error:", error);

      const errorMessage =
        error?.response?.data?.message || error.message || "Terjadi kesalahan";

      if (errorMessage === "chicken monitoring already exists for today") {
        alert("Sudah terdapat data untuk kandang yang dipilih hari ini!");
      } else {
        alert("Gagal menyimpan data: " + errorMessage);
      }

      console.error("Gagal menyimpan atau mengupdate data ayam:", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const getDisplayValue = (val) => (val === 0 ? "" : val);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Tambah Tugas Tambahan</h1>
      </div>

      {/* Table Section */}
      <div className="w-full mx-auto p-6 bg-white shadow rounded border border-black-6">
        {/* nama tugas tambahan */}
        <div className="mt-4">
          <label className="block font-medium mb-1">Nama Tugas Tambahan</label>
          <input
            type="text"
            value={getDisplayValue(totalFeed)}
            placeholder="Nama Tugas Tambahan"
            className="w-full border border-black-6 rounded p-2 bg-black-4"
            onChange={(e) => {
              setTotalFeed(e.target.value);
            }}
          />
        </div>

        {/* Pilih Lokasi */}
        <label className="block font-medium  mt-4">Lokasi</label>
        <select
          className="w-full border border-black-6 bg-black-4 cursor-pointer rounded p-2 mb-4"
          value={selectedLocation.name}
          onChange={(e) => {
            setSelectedLocation(e.target.value);
          }}
        >
          {locations.map((location) => (
            <option key={location.name} value={location}>
              {location.name}
            </option>
          ))}
        </select>

        {/* nama tugas tambahan */}
        <div className="mt-4">
          <label className="block font-medium mb-1">Slot Pekerja</label>
          <input
            type="number"
            value={getDisplayValue(slot)}
            placeholder="Masukkan Jumlah Pekerja"
            className="w-1/2 border border-black-6 rounded p-2 bg-black-4"
            onChange={(e) => {
              setSlot(e.target.value);
            }}
          />
        </div>

        {/* Simpan Button */}
        <div className="mt-6 text-right ">
          <button
            onClick={() => {
              simpanAyamHandle();
            }}
            className="bg-emerald-700 text-white py-2 px-6 rounded hover:bg-emerald-600 cursor-pointer"
          >
            Simpan
          </button>
        </div>

        {/* Simpan Button */}
        {/* <div className="mt-6 text-right ">
            <button
              onClick={() => {
                console.log("✅ selectedChikenCategory:", selectedChikenCategory);
                console.log("📅 ageChiken:", ageChiken);
                console.log("🐔 totalLiveChicken:", totalLiveChicken);
                console.log("🤒 totalSickChicken:", totalSickChicken);
                console.log("💀 totalDeathChicken:", totalDeathChicken);
                console.log("🌾 totalFeed:", totalFeed);
                console.log("💉 vaksinList:", vaksinList);
                console.log("💊 obatList:", obatList);
              }}
              className="bg-emerald-700 text-white py-2 px-6 rounded hover:bg-emerald-600 cursor-pointer"
            >
              Check
            </button>
          </div> */}
      </div>
    </div>
  );
};

export default TambahTugasRutin;
