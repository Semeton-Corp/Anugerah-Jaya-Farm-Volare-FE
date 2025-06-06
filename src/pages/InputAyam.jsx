import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
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

const InputAyam = () => {
  const [obatExpanded, setObatExpanded] = useState(false);

  const [cages, setCages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [selectedCage, setSelectedCage] = useState(0);
  const selectedCageName = cages.find((cage) => cage.id === selectedCage);

  const [selectedChikenCategory, setSelectedChikenCategory] = useState(
    kategoriAyam[0]
  );
  const [ageChiken, setAgeChiken] = useState(0);
  const [totalLiveChicken, setTotalLiveChicken] = useState(0);
  const [totalSickChicken, setTotalSickChicken] = useState(0);
  const [totalDeathChicken, setTotalDeathChicken] = useState(0);
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

  useEffect(() => {
    const fetchCages = async () => {
      try {
        const response = await getCage();
        const data = response.data.data;
        setCages(data);

        if (id) {
          console.log("THERE IS AN ID: ", id);
          const updateResponse = await getChickenMonitoringById(id);
          const data = updateResponse.data.data;
          console.log("THERE IS DATA: ", data);

          setSelectedCage(data.cage.id);

          setSelectedChikenCategory(data.chickenCategory);
          setAgeChiken(data.age);
          setTotalLiveChicken(data.totalLiveChicken);
          setTotalSickChicken(data.totalSickChicken);
          setTotalDeathChicken(data.totalDeathChicken);
          setTotalFeed(data.totalFeed);

          const vaksinListget = data.chickenVaccines.map((v) => ({
            id: v.id,
            jenis: v.vaccine,
            dosis: parseFloat(v.dose),
            satuan: v.unit,
          }));

          setVaksinList(vaksinListget || []);

          const chickenDiseasesGet = data.chickenDiseases.map((o) => ({
            id: o.id,
            penyakit: o.disease,
            jenis: o.medicine,
            dosis: parseFloat(o.dose),
            satuan: o.unit,
          }));

          if (vaksinListget.length > 0) {
            setVaksinExpanded(true);
          }

          if (chickenDiseasesGet.length > 0) {
            setObatExpanded(true);
          }

          console.log("OBAT: ", data.chickenDiseases);
          setObatList(chickenDiseasesGet || []);
        } else {
          if (data.length > 0) {
            setSelectedCage(data[0].id);
          }
        }
      } catch (error) {
        console.error("Gagal memuat data kandang:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCages();
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

  const deleteVaccineHandle = async (chickenMonitoringId, id) => {
    var isDeleted = false;
    try {
      const response = await deleteChickenVaccineMonitoring(
        chickenMonitoringId,
        id
      );
      console.log("response :", response.status);
      if (response.status == 204) {
        isDeleted = true;
      }
    } catch (error) {
      alert("Gagal menghapus data vaksin: ", error);
    }

    return isDeleted;
  };

  const deleteDiseaseHandle = async (chickenMonitoringId, id) => {
    var isDeleted = false;
    try {
      const response = await deleteChickenDiseaseMonitoring(
        chickenMonitoringId,
        id
      );
      console.log("response :", response.status);
      if (response.status == 204) {
        isDeleted = true;
      }
    } catch (error) {
      alert("Gagal menghapus data penyakit/obat: ", error);
    }

    return isDeleted;
  };

  const getDisplayValue = (val) => (val === 0 ? "" : val);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">
          {userRole === "Pekerja Kandang" ? "Data Ayam" : "Detail Ayam"}
        </h1>
      </div>

      {/* Table Section */}
      <div className="w-full mx-auto p-6 bg-white shadow rounded border border-black-6">
        <h2 className="text-lg font-semibold mb-1">Input data harian</h2>
        <p className="text-sm mb-6">{getTodayDateInBahasa()}</p>

        {/* Pilih kandang */}
        <label className="block font-medium  mb-1">Pilih kandang</label>
        <select
          className="w-full border border-black-6 bg-black-4 cursor-pointer rounded p-2 mb-4"
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

        {/* Kategori dan Usia Ayam */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Kategori ayam</label>
            <select
              className="w-full border border-black-6 cursor-pointer  bg-black-4 rounded p-2"
              value={selectedChikenCategory}
              onChange={(e) => setSelectedChikenCategory(e.target.value)}
            >
              {kategoriAyam.map((kategori, index) => {
                return <option key={index}>{kategori}</option>;
              })}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Usia ayam</label>
            <input
              type="number"
              value={getDisplayValue(ageChiken)}
              className="bg-black-4 w-full border border-black-6 rounded p-2"
              onChange={(e) => {
                setAgeChiken(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Jumlah ayam */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-1">Jumlah ayam hidup</label>
            <input
              type="number"
              value={getDisplayValue(totalLiveChicken)}
              className="w-full bg-black-4 border border-black-6 rounded p-2"
              onChange={(e) => {
                setTotalLiveChicken(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Jumlah ayam sakit</label>
            <input
              type="number"
              value={getDisplayValue(totalSickChicken)}
              className="w-full bg-black-4 border border-black-6 rounded p-2"
              onChange={(e) => {
                setTotalSickChicken(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Jumlah ayam mati</label>
            <input
              type="number"
              value={getDisplayValue(totalDeathChicken)}
              className="w-full border border-black-6  bg-black-4 rounded p-2"
              onChange={(e) => {
                setTotalDeathChicken(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Jumlah pakan */}
        <div className="mt-4">
          <label className="block font-medium mb-1">Jumlah pakan (Kg)</label>
          <input
            type="number"
            value={getDisplayValue(totalFeed)}
            className="w-full border border-black-6 rounded p-2 bg-black-4"
            onChange={(e) => {
              setTotalFeed(e.target.value);
            }}
          />
        </div>

        {/* Vaksin Section */}
        <div className="mt-6 border border-black-6 rounded p-4 ">
          <div
            className="flex items-center cursor-pointer mb-3"
            onClick={() => setVaksinExpanded(!vaksinExpanded)}
          >
            <span className="mr-2">{vaksinExpanded ? "▼" : "▶"}</span>
            <strong>Vaksin</strong>
          </div>

          {vaksinExpanded &&
            vaksinList.map((vaksin, index) => (
              <div
                key={index}
                className="mb-6 border rounded-[4px] px-4 py-6 border-black-6 bg-black-4"
              >
                <div className="flex underline   justify-end p-2">
                  <div
                    onClick={() => {
                      if (vaksin.id) {
                        const isDeleted = deleteVaccineHandle(id, vaksin.id);
                        console.log("isDeleted: ", isDeleted);

                        if (isDeleted) {
                          const newList = [...vaksinList];
                          newList.splice(index, 1);
                          setVaksinList(newList);
                        }
                      } else {
                        const newList = [...vaksinList];
                        newList.splice(index, 1);
                        setVaksinList(newList);
                      }
                    }}
                    className="flex hover:text-black-7 cursor-pointer"
                  >
                    <p>Hapus Vaksin</p>
                    <button>
                      <MdDelete size={24} />
                    </button>
                  </div>
                </div>

                <label className="block font-medium mb-1">Jenis Vaksin</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mb-4 bg-white"
                  value={getDisplayValue(vaksin.jenis)}
                  onChange={(e) =>
                    handleVaksinChange(index, "jenis", e.target.value)
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Dosis</label>
                    <input
                      type="number"
                      className="w-full border rounded p-2 bg-white"
                      value={getDisplayValue(vaksin.dosis)}
                      onChange={(e) =>
                        handleVaksinChange(index, "dosis", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Satuan Dosis
                    </label>
                    <select
                      className="w-full border rounded p-2 bg-white"
                      value={vaksin.satuan}
                      onChange={(e) =>
                        handleVaksinChange(index, "satuan", e.target.value)
                      }
                    >
                      <option value="mililiter">mililiter</option>
                      <option value="liter">liter</option>
                      <option value="gram">gram</option>
                      <option value="kilogram">kilogram</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          <button
            onClick={addVaksinInput}
            className="mt-2 bg-emerald-700 text-white py-2 px-4 rounded hover:bg-emerald-600 cursor-pointer"
          >
            Tambah vaksin
          </button>
        </div>

        {/* Obat Section */}
        <div className="mt-6 border border-black-6 rounded p-4">
          <div
            className="flex items-center cursor-pointer mb-3"
            onClick={() => setObatExpanded(!obatExpanded)}
          >
            <span className="mr-2">{obatExpanded ? "▼" : "▶"}</span>
            <strong>Obat</strong>
          </div>

          {obatExpanded &&
            obatList.map((obat, index) => (
              <div
                key={index}
                className="mb-6 border  rounded-[4px] px-4 py-6 border-black-6 bg-black-4"
              >
                <div className="flex underline   justify-end p-2">
                  <div
                    onClick={() => {
                      if (obat.id) {
                        const isDeleted = deleteDiseaseHandle(id, obat.id);
                        console.log("isDeleted: ", isDeleted);

                        if (isDeleted) {
                          const newList = [...obatList];
                          newList.splice(index, 1);
                          setObatList(newList);
                        }
                      } else {
                        const newList = [...obatList];
                        newList.splice(index, 1);
                        setObatList(newList);
                      }
                    }}
                    className="flex hover:text-black-7 cursor-pointer"
                  >
                    <p>Hapus Obat</p>
                    <button>
                      <MdDelete size={24} />
                    </button>
                  </div>
                </div>

                <label className="block font-medium mb-1">Penyakit</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mb-4 bg-white"
                  value={getDisplayValue(obat.penyakit)}
                  onChange={(e) =>
                    handleObatChange(index, "penyakit", e.target.value)
                  }
                />

                <label className="block font-medium mb-1">Jenis Obat</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mb-4 bg-white"
                  value={getDisplayValue(obat.jenis)}
                  onChange={(e) =>
                    handleObatChange(index, "jenis", e.target.value)
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Dosis</label>
                    <input
                      type="number"
                      className="w-full border rounded p-2 bg-white"
                      value={getDisplayValue(obat.dosis)}
                      onChange={(e) =>
                        handleObatChange(index, "dosis", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">
                      Satuan Dosis
                    </label>
                    <select
                      className="w-full border rounded p-2 bg-white"
                      value={getDisplayValue(obat.satuan)}
                      onChange={(e) =>
                        handleObatChange(index, "satuan", e.target.value)
                      }
                    >
                      <option value="mililiter">mililiter</option>
                      <option value="liter">liter</option>
                      <option value="gram">gram</option>
                      <option value="kilogram">kilogram</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

          <button
            onClick={addObatInput}
            className="mt-2 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900 cursor-pointer"
          >
            Tambah Obat
          </button>
        </div>

        {/* Simpan Button */}
        <div className="mt-6 text-right ">
          <button
            onClick={() => {
              simpanAyamHandle();
            }}
            className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900 cursor-pointer"
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

export default InputAyam;
