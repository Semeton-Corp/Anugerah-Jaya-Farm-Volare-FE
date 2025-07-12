import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getCage, getChickenCage } from "../services/cages";
import { kategoriAyam } from "../data/KategoriAyam";
import { deleteChickenData, inputAyam } from "../services/chickenMonitorings";
import { getChickenMonitoringById } from "../services/chickenMonitorings";
import { useParams } from "react-router-dom";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { MdDelete } from "react-icons/md";
import { updateChickenMonitoring } from "../services/chickenMonitorings";
import {
  deleteChickenVaccineMonitoring,
  deleteChickenDiseaseMonitoring,
} from "../services/chickenMonitorings";
import DeleteModal from "../components/DeleteModal";

const InputAyam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationId = localStorage.getItem("locationId");
  const userRole = localStorage.getItem("role");
  const [obatExpanded, setObatExpanded] = useState(false);

  const [chickenCages, setChickenCages] = useState([]);
  const [selectedChickenCage, setSelectedChickenCage] = useState("");

  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const selectedCageName = chickenCages.find(
    (cage) => cage.id === selectedChickenCage
  );

  const [selectedChikenCategory, setSelectedChikenCategory] = useState("");
  const [ageChiken, setAgeChiken] = useState(0);
  const [totalLiveChicken, setTotalLiveChicken] = useState(0);
  const [totalSickChicken, setTotalSickChicken] = useState(0);
  const [totalDeathChicken, setTotalDeathChicken] = useState(0);
  const [totalFeed, setTotalFeed] = useState(0);
  const [note, setNote] = useState("");

  const [isEditMode, setIsEditMode] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        let response;
        if (userRole == "Owner") {
          response = await getChickenCage();
        } else {
          response = await getChickenCage(locationId);
        }
        const dataChickenCage = response.data.data;
        console.log("dataChickenCage: ", dataChickenCage);

        setChickenCages(dataChickenCage);
        setSelectedChickenCage(dataChickenCage[0]);

        if (id) {
          // console.log("THERE IS AN ID: ", id);
          const updateResponse = await getChickenMonitoringById(id);
          const data = updateResponse.data.data;
          console.log("THERE IS DATA: ", data);

          setSelectedChickenCage(data.chickenCage);
          setTotalSickChicken(data.totalSickChicken);
          setTotalDeathChicken(data.totalDeathChicken);
          setTotalFeed(data.totalFeed);
          setIsEditMode(false);

          console.log("data.chickenCage.cage: ", data.chickenCage);

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
            // setSelectedCage(data[0].id);
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

  async function deleteDataHandle() {
    try {
      const response = await deleteChickenData(id);
      console.log("response.status", response.status);

      if (response.status === 204) {
        alert("✅ Data berhasil dihapus!");
        navigate(-1);
      } else {
        alert("⚠️ Gagal menghapus data. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Gagal menghapus data ayam:", error);
      alert("❌ Terjadi kesalahan saat menghapus data.");
    }
  }

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
      !selectedChickenCage ||
      !totalSickChicken ||
      !totalDeathChicken ||
      !totalFeed
    ) {
      alert("Semua field utama harus diisi!");
      setLoading(false);
      return; // STOP ENTIRE FUNCTION
    }

    const payload = {
      chickenCageId: parseInt(selectedChickenCage.cage.id),
      // chickenCategory: selectedChikenCategory,
      // age: parseInt(ageChiken),
      // totalLiveChicken: parseInt(totalLiveChicken),
      totalSickChicken: parseInt(totalSickChicken),
      totalDeathChicken: parseInt(totalDeathChicken),
      totalFeed: parseFloat(totalFeed),
      note: note,
      // chickenDiseases,
      // chickenVaccines,
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
        <h1 className="text-3xl font-bold">
          {userRole === "Pekerja Kandang" ? "Data Ayam" : "Detail Ayam"}
        </h1>
      </div>

      {/* Table Section */}
      <div className="w-full mx-auto p-6 bg-white shadow rounded border border-black-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold mb-1">Input data harian</h2>
          <p className="text-lg ">{getTodayDateInBahasa()}</p>
        </div>

        {/* Pilih kandang */}
        <label className="block font-medium  mb-1">Pilih kandang</label>
        {isEditMode ? (
          <select
            className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-8"
            value={
              selectedChickenCage ? JSON.stringify(selectedChickenCage) : ""
            }
            onChange={(e) => {
              const cageObj = JSON.parse(e.target.value);
              setSelectedChickenCage(cageObj);
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
              {selectedChickenCage.cage.name}
            </p>
          </div>
        )}

        {/* Kategori dan Usia Ayam */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">ID Batch</label>
            <div className="flex items-center py-3">
              <p className="text-lg font-bold">
                {selectedChickenCage?.batchId
                  ? `${selectedChickenCage?.batchId}`
                  : `-`}
              </p>
            </div>
            {/* <select
              className="w-full border border-black-6 cursor-pointer  bg-black-4 rounded p-2"
              value={selectedChikenCategory}
              onChange={(e) => setSelectedChikenCategory(e.target.value)}
            >
              {kategoriAyam.map((kategori, index) => {
                return <option key={index}>{kategori}</option>;
              })}
            </select> */}
          </div>
          <div>
            <label className="block font-medium mb-1">Kategori ayam</label>
            <div className="flex items-center py-3">
              <p className="text-lg font-bold">
                {selectedChickenCage?.chickenCategory
                  ? `${selectedChickenCage?.chickenCategory}`
                  : `-`}
              </p>
            </div>

            {/* <select
              className="w-full border border-black-6 cursor-pointer  bg-black-4 rounded p-2"
              value={selectedChikenCategory}
              onChange={(e) => setSelectedChikenCategory(e.target.value)}
            >
              {kategoriAyam.map((kategori, index) => {
                return <option key={index}>{kategori}</option>;
              })}
            </select> */}
          </div>
          <div>
            <label className="block font-medium mb-1">Usia ayam (Minggu)</label>
            <div className="flex items-center py-3">
              <p className="text-lg font-bold">
                {selectedChickenCage?.chickenAge
                  ? `${selectedChickenCage?.chickenAge}`
                  : `0`}
              </p>
            </div>
            {/* <input
              type="number"
              value={getDisplayValue(ageChiken)}
              className="bg-black-4 w-full border border-black-6 rounded p-2"
              onChange={(e) => {
                setAgeChiken(e.target.value);
              }}
            /> */}
          </div>
        </div>

        {/* Jumlah ayam */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-1">Jumlah ayam hidup</label>
            <div className="flex items-center py-3">
              <p className="text-lg font-bold">
                {selectedChickenCage?.totalChicken
                  ? `${selectedChickenCage?.totalChicken}`
                  : `-`}
              </p>
            </div>
            {/* <input
              type="number"
              value={getDisplayValue(totalLiveChicken)}
              className="w-full bg-black-4 border border-black-6 rounded p-2"
              onChange={(e) => {
                setTotalLiveChicken(e.target.value);
              }}
            /> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-1">Jumlah ayam sakit</label>
            {isEditMode ? (
              <input
                type="number"
                value={getDisplayValue(totalSickChicken)}
                className="w-full bg-black-4 border border-black-6 rounded p-2"
                placeholder="Masukkan jumlah ayam sakit"
                onChange={(e) => {
                  setTotalSickChicken(e.target.value);
                }}
              />
            ) : (
              <div>
                <p className="text-lg font-bold mb-4">{totalSickChicken}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Jumlah ayam mati</label>
            {isEditMode ? (
              <input
                type="number"
                value={getDisplayValue(totalDeathChicken)}
                className="w-full border border-black-6  bg-black-4 rounded p-2"
                placeholder="Masukkan jumlah ayam mati"
                onChange={(e) => {
                  setTotalDeathChicken(e.target.value);
                }}
              />
            ) : (
              <div>
                <p className="text-lg font-bold mb-4">{totalDeathChicken}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="mt-4">
            <label className="block font-medium mb-1">Jumlah pakan (Kg)</label>
            {isEditMode ? (
              <input
                type="number"
                value={getDisplayValue(totalFeed)}
                className="w-full border border-black-6 rounded p-2 bg-black-4"
                placeholder="Masukkan jumlah pakan"
                onChange={(e) => {
                  setTotalFeed(e.target.value);
                }}
              />
            ) : (
              <div>
                <p className="text-lg font-bold mb-4">{totalFeed}</p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-1">
              Jumlah pakan (Gr/Ekor)
            </label>
            <div className="flex items-center py-3">
              <p className="text-lg font-bold">
                {totalFeed &&
                selectedChickenCage?.totalChicken &&
                parseInt(selectedChickenCage.totalChicken) !== 0
                  ? `${(
                      (totalFeed * 1000) /
                      parseInt(selectedChickenCage.totalChicken)
                    ).toFixed(2)}`
                  : `-`}
              </p>
            </div>
          </div>
        </div>

        {/* Jumlah pakan */}

        {/* Catatan pekerja */}
        <div className="mt-4">
          <label className="block font-medium mb-1">Catatan Pekerja</label>
          {isEditMode ? (
            <textarea
              type="text"
              value={note}
              className="w-full border border-black-6 rounded p-2 bg-black-4"
              placeholder="Masukkan catatan jika terdapat catatan untuk kondisi kandang"
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
          ) : (
            <div>
              <p className="text-lg font-bold mb-4">{note ? note : "-"}</p>
            </div>
          )}
        </div>

        {/* Vaksin Section */}
        {/* <div className="mt-6 border border-black-6 rounded p-4 ">
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
        </div> */}

        {/* Obat Section */}
        {/* <div className="mt-6 border border-black-6 rounded p-4">
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
        </div> */}

        {/* Simpan Button */}
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
                  simpanAyamHandle();
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

        {/* Simpan Button */}
        <div className="mt-6 text-right ">
          <button
            onClick={() => {
              const payload = {
                chickenCageId: parseInt(selectedChickenCage),
                totalSickChicken: parseInt(totalSickChicken),
                totalDeathChicken: parseInt(totalDeathChicken),
                totalFeed: parseFloat(totalFeed),
                note: note,
              };
              console.log("payload: ", payload);
              console.log("cages: ", chickenCages);
              console.log("selectedChickenCage: ", selectedChickenCage);
              console.log("totalFeed: ", totalFeed);
              console.log("totalLiveChicken: ", totalLiveChicken);
            }}
            className="bg-emerald-700 text-white py-2 px-6 rounded hover:bg-emerald-600 cursor-pointer"
          >
            Check
          </button>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={deleteDataHandle}
      />
    </div>
  );
};

export default InputAyam;
