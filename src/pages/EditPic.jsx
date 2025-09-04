import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListUser } from "../services/user";
import { useEffect } from "react";
import { createCagePlacement } from "../services/placement";
import { getChickenCageById } from "../services/cages";

const EditPic = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    picKandang: "",
    picTelur: "",
  });

  const picOptions = ["Siti Rahayu", "Yono", "Budi Santoso", "Abdi"];

  const [picCageOptions, setPicCageOptions] = useState([]);
  const [picEggOptions, setPicEggOptions] = useState([]);

  const { id, locationId, cageId } = useParams();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = [
      form.picKandang && {
        userId: form.picKandang,
        cageId: parseInt(cageId, 10),
      },
      form.picTelur && {
        userId: form.picTelur,
        cageId: parseInt(cageId, 10),
      },
    ].filter(Boolean);
    try {
      const placementResponse = await createCagePlacement(payload);
      if (placementResponse.status == 200) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchPicList = async () => {
    try {
      const [picCageResponse, picEggResponse] = await Promise.all([
        getListUser(2, locationId),
        getListUser(1, locationId),
      ]);

      if (picCageResponse.status == 200) {
        setPicCageOptions(picCageResponse.data.data);
        console.log("picCageResponse: ", picCageResponse);
      }
      if (picEggResponse.status == 200) {
        setPicEggOptions(picEggResponse.data.data);
        console.log("picEggResponse: ", picEggResponse);
        // console.log("picEggResponse: ", picEggResponse.data.data.users);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  const fetchDetailKandang = async () => {
    try {
      const detailResponse = await getChickenCageById(id);

      if (detailResponse.status === 200) {
        const detailData = detailResponse.data.data;

        const matchedCagePic = picCageOptions.find(
          (item) => item.name === detailData.chickenPic
        );

        const matchedEggPic = picEggOptions.find(
          (item) => item.name === detailData.eggPic
        );

        setForm({
          picKandang: matchedCagePic ? matchedCagePic.id : "",
          picTelur: matchedEggPic ? matchedEggPic.id : "",
        });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchPicList();
  }, []);

  useEffect(() => {
    if (picCageOptions || picEggOptions) {
      fetchDetailKandang();
    }
  }, [picCageOptions, picEggOptions]);

  return (
    <div className=" m-8 p-8 border rounded shadow bg-white">
      <h2 className="text-lg font-bold mb-6">Edit PIC</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">PIC Kandang</label>
          <select
            name="picKandang"
            value={form.picKandang}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-gray-100"
          >
            <option value="" disabled hidden>
              Pilih PIC Kandang...
            </option>
            {picCageOptions?.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">PIC Telur</label>
          <select
            name="picTelur"
            value={form.picTelur}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-gray-100"
          >
            <option value="" disabled hidden>
              Pilih PIC Kandang...
            </option>
            {picEggOptions?.map((option, index) => (
              <option key={index} value={option?.id}>
                {option?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-900 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPic;
