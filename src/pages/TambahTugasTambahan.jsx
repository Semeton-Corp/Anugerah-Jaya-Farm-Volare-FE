import React, { useState } from "react";
import { useEffect } from "react";
import { getLocations } from "../services/location";
import { getCage } from "../services/cages";
import { getWarehouses } from "../services/warehouses";
import { getStores } from "../services/stores";
import { formatDateToDDMMYYYY } from "../utils/dateFormat";
import { RiDeleteBinFill } from "react-icons/ri";
import { getRoles } from "../services/roles";
import { getListUser } from "../services/user";
import { createAdditionalWorks } from "../services/dailyWorks";
import { useNavigate } from "react-router-dom";

const TambahTugasTambahan = () => {
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [site, setSite] = useState("");
  const [location, setLocation] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slot, setSlot] = useState(1);
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [workers, setWorkers] = useState([{ role: "", id: "" }]);

  const [employeeOptions, setEmployeeOptions] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeOptionsMap, setEmployeeOptionsMap] = useState({});

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const [siteOptions, setSiteOptions] = useState();
  const [lokasiOptions, setLokasiOptions] = useState([
    "Kandang",
    "Gudang",
    "Toko",
  ]);
  const [specificLocationOptions, setSpecificLocationOptions] = useState([]);

  const handleAddWorker = () => {
    setWorkers([...workers, { role: "", id: "" }]);
  };

  const handleRemoveWorker = (index) => {
    const newWorkers = [...workers];
    newWorkers.splice(index, 1);
    setWorkers(newWorkers);
  };

  const handleWorkerChange = (index, field, value) => {
    const newWorkers = [...workers];
    newWorkers[index][field] = value;
    setWorkers(newWorkers);

    if (field === "role") {
      fetchEmployeesForRole(value, index);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      name: taskName,
      locationId: parseInt(site),
      locationType: location,
      placeId: parseInt(specificLocation),
      workDate: `${formatDateToDDMMYYYY(date)} ${time}`,
      slot: parseInt(slot),
      salary: salary,
      description: description,
      userIds: workers.map((w) => w.name),
    };

    try {
      const submitResponse = await createAdditionalWorks(payload);
      // console.log("submitResponse: ", submitResponse);
      if (submitResponse.status == 201) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
    console.log("Submitted data:", payload);
  };

  const fetchSite = async () => {
    try {
      const siteResponse = await getLocations();
      // console.log("siteResponse: ", siteResponse);
      if (siteResponse.status == 200) {
        setSiteOptions(siteResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchSpecificLocations = async () => {
    if (!site || !location) {
      setSpecificLocationOptions([]);
      return;
    }
    // console.log("site: ", site);
    // console.log("location: ", location);

    try {
      let response;
      if (location === "Kandang") {
        response = await getCage({ locationId: site });
      } else if (location === "Gudang") {
        response = await getWarehouses({ locationId: site });
      } else if (location === "Toko") {
        response = await getStores({ locationId: site });
      }

      if (response?.status === 200) {
        console.log("response: ", response);
        setSpecificLocationOptions(response.data.data);
      } else {
        setSpecificLocationOptions([]);
      }
    } catch (err) {
      console.error("Failed to fetch specific locations", err);
      setSpecificLocationOptions([]);
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesResponse = await getRoles();
      console.log("rolesResponse: ", rolesResponse);
      if (rolesResponse.status == 200) {
        // console.log("rolesResponse.data.data: ", rolesResponse.data.data);
        const allRoles = rolesResponse.data.data;
        setRoles(allRoles);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchEmployeesForRole = async (roleId, index) => {
    if (!roleId) return;

    try {
      const response = await getListUser(roleId, site);
      if (response.status === 200) {
        setEmployeeOptionsMap((prev) => ({
          ...prev,
          [index]: response.data.data.users,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch employees for role", err);
    }
  };

  const fetchEmployees = async () => {
    if (!selectedRole) {
      setEmployeeOptions([]);
      return;
    }
    try {
      const employeeOptionsResponse = await getListUser(selectedRole, location);
      console.log("employeeResponse: ", employeeResponse.data.data.users);
      if (employeeOptionsResponse.status) {
        setEmployeeOptions(employeeOptionsResponse.data.data.users);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchSite();
    fetchRoles();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [selectedRole]);

  useEffect(() => {
    fetchSpecificLocations();
    fetchEmployeesForRole();
  }, [site, location]);

  useEffect(() => {
    fetchEmployeesForRole();
  }, [site]);

  return (
    <div className="mx-6 p-6 bg-white rounded border space-y-4">
      <h1 className="text-2xl font-bold">Tambah Tugas Tambahan</h1>

      <div>
        <label className="block font-medium">Nama Tugas Tambahan</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Masukkan nama tugas tambahan..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Site</label>
          <select
            className="w-full border rounded p-2"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          >
            <option value="">Pilih Site</option>
            {siteOptions?.map((site, index) => (
              <option key={index} value={site.id}>
                {site.name}
              </option>
            ))}
            {/* <option value="Sidodadi">Sidodadi</option> */}
          </select>
        </div>
        <div>
          <label className="block font-medium">Lokasi</label>
          <select
            className="w-full border rounded p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Pilih Lokasi</option>
            {lokasiOptions?.map((lokasi, index) => (
              <option key={index} value={lokasi}>
                {lokasi}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Lokasi Spesifik</label>
          <select
            className="w-full border rounded p-2"
            value={specificLocation}
            onChange={(e) => setSpecificLocation(e.target.value)}
          >
            <option value="">Pilih Lokasi Spesifik</option>
            {specificLocationOptions?.map((specific, index) => (
              <option key={index} value={specific.id}>
                {specific.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Tanggal Pelaksanaan</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Waktu Pelaksanaan</label>
          <input
            type="time"
            className="w-full border rounded p-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Slot Pekerja</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">Pilih Pekerja (optional)</label>
        {workers.map((worker, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              className="flex-1 border rounded p-2"
              value={worker.role}
              onChange={(e) =>
                handleWorkerChange(index, "role", e.target.value)
              }
            >
              <option value="">Pilih Jabatan Pekerja</option>
              {roles?.map((role, index) => (
                <option key={index} value={role.id}>
                  {role.name}
                </option>
              ))}
              {/* <option value="Mandor">Mandor</option>
              <option value="Pekerja">Pekerja</option> */}
            </select>
            <select
              className="flex-1 border rounded p-2"
              value={worker.name}
              onChange={(e) =>
                handleWorkerChange(index, "name", e.target.value)
              }
            >
              <option value="">Pilih Nama Pekerja</option>
              {employeeOptionsMap[index]?.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleRemoveWorker(index)}
              className="ml-2 text-red-600 hover:text-red-800 cursor-pointer"
            >
              <RiDeleteBinFill size={32} />
            </button>
          </div>
        ))}
        <button
          onClick={handleAddWorker}
          className="mt-2 bg-yellow-500 text-black py-1 px-4 rounded hover:bg-yellow-600"
        >
          Tambah pekerja
        </button>
      </div>

      <div>
        <label className="block font-medium">Gaji Tambahan / Pekerja</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Rp 300.000"
        />
      </div>

      <div>
        <label className="block font-medium">Deskripsi Pekerjaan</label>
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900"
        >
          Simpan
        </button>
      </div>
      <button
        onClick={() => {
          console.log("taskName:", taskName);
          console.log("site:", site);
          console.log("location:", location);
          console.log("specificLocation:", specificLocation);
          console.log("date:", formatDateToDDMMYYYY(date));
          console.log("time:", time);
          console.log("slot:", slot);
          console.log("salary:", salary);
          console.log("description:", description);
          console.log("workers:", workers);
          console.log("roles: ", roles);
          console.log("specificLocationOptions: ", specificLocationOptions);
        }}
      >
        CHECK
      </button>
    </div>
  );
};

export default TambahTugasTambahan;
