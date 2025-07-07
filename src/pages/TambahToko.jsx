import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocations } from "../services/location";
import { createStore } from "../services/stores";

const TambahToko = () => {
  const navigate = useNavigate();

  const [namaToko, setNamaToko] = useState("");
  const [lokasi, setLokasi] = useState("");

  const [locationOptions, setLocationOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: namaToko,
      locationId: parseInt(lokasi),
    };
    console.log("payload: ", payload);
    try {
      const createResponse = await createStore(payload);
      // console.log("createResponse: ", createResponse);
      if (createResponse.status === 201) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
    // console.log("Data disimpan:", payload);

    // TODO: fetch/axios ke backend jika sudah ada API

    // Redirect / feedback
    // navigate("/toko");
  };

  
  const fetchLocationOptions = async () => {
    try {
      const locationsResponse = await getLocations();
      //   console.log("locationsResponse: ", locationsResponse);

      if (locationsResponse.status === 200) {
        const allLocations = locationsResponse.data.data;
        const role = localStorage.getItem("role");
        const locationId = parseInt(localStorage.getItem("locationId"), 10);

        if (role !== "Owner") {
          const filteredLocations = allLocations.filter(
            (item) => item.id === locationId
          );
          setLocationOptions(filteredLocations);
        } else {
          setLocationOptions(allLocations);
        }
      }
    } catch (error) {
      alert("Terjadi Kesalahan :", error);
    }
  };

  useEffect(() => {
    fetchLocationOptions();
  }, []);

  return (
    <div className="p-6">
      <div className="border rounded p-6 mx-auto">
        <h1 className="text-xl font-bold mb-6">Tambah Toko</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nama toko */}
          <div>
            <label className="block mb-1 font-medium">Nama Toko</label>
            <input
              type="text"
              value={namaToko}
              onChange={(e) => setNamaToko(e.target.value)}
              placeholder="Tuliskan nama kandang"
              className="w-full p-2 border rounded bg-gray-100"
              required
            />
          </div>

          {/* Lokasi toko */}
          <div>
            <label className="block mb-1 font-medium">Lokasi Toko</label>
            <select
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100"
              required
            >
              <option value="" disabled>
                Pilih site lokasi kandang
              </option>
              {locationOptions.map((lokasi, index) => (
                <option key={index} value={lokasi.id}>
                  {lokasi.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahToko;
