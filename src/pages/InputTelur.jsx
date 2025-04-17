import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCage } from "../services/cage";
import { inputTelur } from "../services/egg";

const InputTelur = () => {
  const [cages, setCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(0);
  const [ok, setOk] = useState(0);
  const [retak, setRetak] = useState(0);
  const [pecah, setPecah] = useState(0);
  const [reject, setReject] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCages = async () => {
      try {
        const response = await getCage();
        const data = response.data.data;
        setCages(data);
        if (data.length > 0) {
          setSelectedCage(data[0].id);
        }
      } catch (error) {
        console.error("Gagal memuat data kandang:", error);
      }
    };

    fetchCages();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      cageId: selectedCage,
      totalGoodEgg: parseInt(ok),
      totalCrackedEgg: parseInt(retak),
      totalBrokeEgg: parseInt(pecah),
      totalRejectEgg: parseInt(reject),
    };

    console.log("payload: ", payload);

    try {
      const response = await inputTelur(payload);
      if (response.status === 201) {
        console.log("Data berhasil dikirim:", response.data);
        navigate(-1);
      }
    } catch (error) {
      console.error("Gagal mengirim data telur:", error);
    }
  };

  const getDisplayValue = (val) => (val === 0 ? "" : val);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      <div className="w-full mx-auto p-6 bg-white shadow rounded border">
        <h2 className="text-lg font-semibold mb-1">Input data harian</h2>
        <p className="text-sm mb-6">20 Maret 2025</p>

        {/* Pilih kandang */}
        <label className="block font-medium mb-1">Pilih kandang</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-6"
          value={selectedCage}
          onChange={(e) => setSelectedCage(Number(e.target.value))}
        >
          {cages.map((cage) => (
            <option key={cage.id} value={cage.id}>
              {cage.name}
            </option>
          ))}
        </select>

        {/* Form Telur */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        <div className="mt-6 text-right">
          <button
            onClick={() => {
              handleSubmit();
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
