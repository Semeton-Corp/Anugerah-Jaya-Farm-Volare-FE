import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getStores } from "../services/stores";
import { getWarehouses } from "../services/warehouses";
import { getCage } from "../services/cages";
import { useParams } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { getRoles } from "../services/roles";

const TambahTugasRutin = () => {
  const { id } = useParams();

  const [locations, setLocations] = useState(["Kandang", "Toko", "Gudang"]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        description: "",
        startTime: "00.00",
        endTime: "00.00",
        isExpanded: true,
      },
    ]);
  };

  const handleTasksChange = (index, field, value) => {
    const newList = [...tasks];
    newList[index][field] = value;
    setTasks(newList);
  };

  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const tambahTugasHarianHandle = () => {
    addTask();
  };

  const fetchRoles = async () => {
    try {
      const rolesResponse = await getRoles();
      console.log("rolesResponse.data.data: ", rolesResponse.data.data);
      if (rolesResponse.status === 200) {
        setRoles(rolesResponse.data.data);
        setSelectedRole(rolesResponse.data.data[0]);
      }
      //   console.log("response: ", response);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const getDisplayValue = (val) => (val === 0 ? "" : val);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Tambah Tugas Tambahan</h1>
      </div>

      {/* Table Section */}
      <div className="w-full mx-auto p-6 bg-white shadow rounded border border-black-6">
        {/* Pilih Lokasi */}
        <label className="block font-medium  mt-4">Jabatan</label>
        <select
          className="w-full border border-black-6 bg-black-4 cursor-pointer rounded p-2"
          value={selectedRole?.name}
          onChange={(e) => {
            // const selected = locations.find(
            //   (location) => location.name == e.target.value
            // );
            const selected = roles.find((role) => role.name == e.target.value);
            console.log("selected: ", selected);
            setSelectedRole(selected);
          }}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>

        {/* nama tugas tambahan */}
        <div className="mt-4">
          <label className="block font-medium mb-4">Daftar Tugas Harian</label>
          <div className="flex gap-4 mb-4">
            {/* tambah tugas button */}
            <div
              onClick={tambahTugasHarianHandle}
              className="rounded-[4px] py-2 px-6 bg-green-700 flex items-center justify-center text-white text-base font-medium hover:bg-green-900 cursor-pointer"
            >
              + Tambah tugas
            </div>

            {/* hapus button */}
            <div className="rounded-[4px] py-2 px-6 bg-kritis-box-surface-color flex items-center justify-center text-white text-base font-medium hover:bg-kritis-text-color cursor-pointer">
              Hapus Tugas
            </div>
          </div>

          {tasks.length > 0 ? (
            tasks.map((task, index) =>
              task.isExpanded ? (
                <div className="p-6 border flex flex-col gap-4 border-black-6 rounded-[4px] bg-black-4 mb-4">
                  <div className="flex justify-between items-center text-base font-bold">
                    <p>{`Tambah Tugas ${index + 1}`}</p>
                    <IoIosArrowUp
                      size={24}
                      className="hover:bg-black-6 cursor-pointer"
                    />
                  </div>

                  {/* nama tugas */}
                  <div>
                    <label className="block font-medium mb-2">{`Nama Tugas ${
                      index + 1
                    }`}</label>
                    <input
                      type="text"
                      className="w-full border rounded p-2 mb-4 bg-white"
                      placeholder={`Masukkan Nama Tugas ${index + 1}...`}
                      value={getDisplayValue(task.description)}
                      onChange={(e) => {
                        handleTasksChange(index, "description", e.target.value);
                      }}
                    />
                  </div>

                  {/* waktu pelaksanaan */}
                  <div>
                    <label className="block font-medium mb-2">
                      Waktu Pelaksanaan Tugas
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="time"
                        className=" border rounded p-2  bg-white"
                        value={getDisplayValue(task.startTime)}
                        onChange={(e) => {
                          handleTasksChange(index, "startTime", e.target.value);
                        }}
                      />
                      <p className="text-base">Sampai</p>

                      <input
                        type="time"
                        className=" border rounded p-2  bg-white"
                        value={getDisplayValue(task.endTime)}
                        onChange={(e) => {
                          handleTasksChange(index, "endTime", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )
            )
          ) : (
            <div>
              <p className="text-lg text-black-6">Belum ada tugas harian</p>
            </div>
          )}
        </div>

        {/* Simpan Button */}
        <div className="mt-6 text-right ">
          <button
            onClick={() => {}}
            className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900 cursor-pointer"
          >
            Simpan
          </button>
        </div>

        {/* Simpan Button */}
        <div className="mt-6 text-right ">
          <button
            onClick={() => {
              console.log("tasks: ", tasks);
              console.log("selectedRole: ", selectedRole);
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

export default TambahTugasRutin;
