import React, { useState, useEffect } from "react";
import { getChickenCageById, updateCage } from "../services/cages";
import { useParams } from "react-router-dom";
import { getLocations } from "../services/location";

const EditKandang = () => {
  // Dummy data
  const dummyData = {
    nama: "Sidodadi DOC",
    lokasi: "Sidodadi",
    jenis: "Kandang DOC",
    kapasitas: 11000,
  };

  const { id } = useParams();
  const [locationOptions, setLocationOptions] = useState([
    "Sidodadi",
    "Mojopahit",
    "Gajah Mada",
  ]);
  const jenisOptions = ["Kandang DOC", "Kandang Petelur", "Kandang Pembesaran"];

  const [formData, setFormData] = useState({
    name: "",
    locationId: "",
    chickenCategory: "",
    capacity: "",
  });

  const fetchDetailData = async () => {
    try {
      const detailResponse = await getChickenCageById(id);
      console.log("detailResponse: ", detailResponse);
      if (detailResponse.status == 200) {
        const chickenCage = detailResponse.data.data;

        setFormData({
          name: chickenCage.cage.name || "",
          locationId: chickenCage.cage.location?.id || "",
          chickenCategory: chickenCage.chickenCategory || "",
          capacity: chickenCage.cage.capacity || "",
        });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchLocationOptions = async () => {
    try {
      const locationsResponse = await getLocations();
      console.log("locationsResponse: ", locationsResponse);

      if (locationsResponse.status === 200) {
        const allLocations = locationsResponse.data.data;
        const role = localStorage.getItem("role");
        const locationId = parseInt(localStorage.getItem("locationId"), 10);
        console.log("allLocations: ", allLocations);
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
    fetchDetailData();
    fetchLocationOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data yang dikirim:", formData);
    const payload = {
      name: formData.name,
      locationId: parseInt(formData.locationId),
      chickenCategory: formData.chickenCategory,
      capacity: parseInt(formData.capacity),
    };

    console.log("payload: ", payload);

    try {
      const updateResponse = await updateCage(payload, id);
      console.log("updateResponse: ", updateResponse);
    } catch (error) {
      console.log("error :", error);
    }
    // Simpan ke API di sini
  };

  return (
    <div className="p-8 border rounded-lg  mx-auto">
      <h2 className="text-xl font-bold mb-6">Edit Kandang</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama Kandang */}
        <div>
          <label className="block mb-1 font-medium">Nama Kandang</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-black-4 border-black-7"
          />
        </div>

        {/* Lokasi Kandang */}
        <div>
          <label className="block mb-1 font-medium">Lokasi Kandang</label>
          <select
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-black-4 border-black-7"
          >
            {locationOptions.map((lok, idx) => (
              <option key={idx} value={lok.id}>
                {lok.name}
              </option>
            ))}
          </select>
        </div>

        {/* Jenis Kandang */}
        <div>
          <label className="block mb-1 font-medium">Jenis Kandang</label>
          <select
            name="chickenCategory"
            value={formData.chickenCategory}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-black-4 border-black-7"
          >
            {jenisOptions.map((jenis, idx) => (
              <option key={idx} value={jenis}>
                {jenis}
              </option>
            ))}
          </select>
        </div>

        {/* Kapasitas */}
        <div>
          <label className="block mb-1 font-medium">
            Kapasitas Maksimum Kandang (Ekor)
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-black-4 border-black-7"
          />
        </div>

        {/* Tombol */}
        <div className="text-right pt-2">
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </form>

      <button
        onClick={() => {
          console.log("formData: ", formData);
        }}
      >
        CHECK
      </button>
    </div>
  );
};

export default EditKandang;
