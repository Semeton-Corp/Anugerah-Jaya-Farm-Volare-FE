import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getStores } from "../services/stores";
import { getWarehouses } from "../services/warehouses";
import { getCage } from "../services/cages";
import { useParams } from "react-router-dom";
import {
  createAdditionalWorks,
  getAdditionalWorkById,
} from "../services/dailyWorks";
import { translateDateToBahasa } from "../utils/dateFormat";
import { deleteAdditionalWorkById } from "../services/dailyWorks";
import { updateAdditionalWorkById } from "../services/dailyWorks";

const TambahTugasTambahan = () => {
  const { id } = useParams();

  const [locations, setLocations] = useState(["Kandang", "Toko", "Gudang"]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const [slot, setSlot] = useState(0);
  const [description, setDescription] = useState("");

  const [additionalWorkStaffInformation, setAdditionalWorkStaffInformation] =
    useState([]);
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  // const fetchLocations = async () => {
  //   try {
  //     const [cageResponse, storeResponse, warehouseResponse] =
  //       await Promise.all([getCage(), getStores(), getWarehouses()]);

  //     if (
  //       cageResponse.status === 200 &&
  //       storeResponse.status === 200 &&
  //       warehouseResponse.status === 200
  //     ) {
  //       const combinedData = [
  //         ...cageResponse.data.data,
  //         ...storeResponse.data.data,
  //         ...warehouseResponse.data.data,
  //       ];
  //       setLocations(combinedData);
  //       setSelectedLocation(combinedData[0]);
  //     }
  //   } catch (error) {
  //     console.log("gagal :", error);
  //   }
  // };

  const fetchAdditionalData = async (id) => {
    try {
      const getAdditionalResponse = await getAdditionalWorkById(id);
      console.log("getAdditionalResponse: ", getAdditionalResponse);
      if (getAdditionalResponse.status == 200) {
        setDescription(getAdditionalResponse.data.data.description);
        setSelectedLocation(getAdditionalResponse.data.data.location);
        setSlot(getAdditionalResponse.data.data.slot);
        setAdditionalWorkStaffInformation(
          getAdditionalResponse.data.data.additionalWorkStaffInformation
        );
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    // fetchLocations();
    if (id) {
      fetchAdditionalData(id);
    }
  }, []);

  const tambahTugasHandle = async () => {
    const payload = {
      description,
      slot: parseInt(slot),
      location: selectedLocation,
    };

    try {
      const response = await createAdditionalWorks(payload);
      // console.log("response:", response);
      if (response.status === 201) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("gagal :", error);
    }
  };

  const getDisplayValue = (val) => (val === 0 ? "" : val);

  const deleteAdditionalsWork = async (id) => {
    try {
      const deleteResponse = await deleteAdditionalWorkById(id);
      // console.log("deleteResponse: ", deleteResponse);
      if (deleteResponse.status == 204) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const updateTugasHandle = async (id) => {
    const payload = {
      description,
      slot: parseInt(slot),
      location: selectedLocation,
    };

    try {
      const updateResponse = await updateAdditionalWorkById(id, payload);
      // console.log("updateResponse: ", updateResponse);
      if (updateResponse.status == 200) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">
          {id ? "Detail Tugas Tambahan" : "Tambah Tugas Tambahan"}
        </h1>
      </div>

      {/* Table Section */}
      <div className="w-full mx-auto p-6 bg-white shadow rounded border border-black-6">
        {/* nama tugas tambahan */}
        <div className="mt-4">
          <label className="block font-medium mb-1">Nama Tugas Tambahan</label>
          <input
            type="text"
            value={description}
            placeholder="Nama Tugas Tambahan"
            className="w-full border border-black-6 rounded p-2 bg-black-4"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        {/* Pilih Lokasi */}
        <label className="block font-medium  mt-4">Lokasi</label>
        <select
          className="w-full border border-black-6 bg-black-4 cursor-pointer rounded p-2"
          value={selectedLocation}
          onChange={(e) => {
            // const selected = locations.find(
            //   (location) => location.name == e.target.value
            // );
            setSelectedLocation(e.target.value);
          }}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* nama tugas tambahan */}
        <div className="mt-4">
          <label className="block font-medium">Slot Pekerja</label>
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

        {id ? (
          <div className="mt-4">
            <label className="block font-medium">Pegawai yang mengambil</label>
            <div className=" py-2 ">
              <table className="w-full mb-8">
                <thead className="px-8 rounded-[4px] bg-green-700 text-white text-center">
                  <tr>
                    <th className="py-2 px-4">Tanggal</th>
                    <th className="py-2 px-4">Waktu</th>
                    <th className="py-2 px-4">Nama Pegawai</th>
                    <th className="py-2 px-4">Status </th>
                  </tr>
                </thead>
                <tbody className="">
                  {additionalWorkStaffInformation.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-black-6 text-center"
                    >
                      <td className="py-2 px-4">
                        {translateDateToBahasa(item.date)}
                      </td>
                      <td className="py-2 px-4">{item.time}</td>
                      <td className="py-2 px-4">{item.staffName}</td>
                      <td className="py-2 px-4 flex justify-center">
                        <span
                          className={`w-36 py-1 flex justify-center rounded text-sm font-semibold ${
                            item.isDone
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-orange-200 text-kritis-text-color"
                          }`}
                        >
                          {item.isDone ? "Selesai" : "Dalam Proses"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="flex gap-4 justify-end">
          {/* Hapus Tugas Button */}
          <div className="mt-6 text-right ">
            <button
              onClick={() => {
                deleteAdditionalsWork(id);
              }}
              className="bg-kritis-box-surface-color text-white py-2 px-6 rounded hover:bg-kritis-text-color cursor-pointer"
            >
              Hapus Tugas Tambahan
            </button>
          </div>

          {/* Simpan Button */}
          <div className="mt-6 text-right ">
            <button
              onClick={() => {
                if (id) {
                  updateTugasHandle(id);
                } else {
                  tambahTugasHandle();
                }
              }}
              className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900 cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </div>

        {/* Simpan Button */}
        <div className="mt-6 text-right ">
          <button
            onClick={() => {
              console.log("description:", description);
              console.log("selectedLocation:", selectedLocation);
              console.log("slot: ", slot);
            }}
            className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900 cursor-pointer"
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahTugasTambahan;
