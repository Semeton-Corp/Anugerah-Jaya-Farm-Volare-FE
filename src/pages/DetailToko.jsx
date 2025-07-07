import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getStoreDetail } from "../services/stores";
import TambahPekerjaModal from "../components/TambahPekerjaModal";
import { createStorePlacement } from "../services/placement";
import { getRoles } from "../services/roles";
import { getListUser } from "../services/user";

const DetailToko = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [toko, setToko] = useState({});
  const [employees, setEmployees] = useState([]);

  const [showTambahPegawaiModal, setShowTambahPegawaiModal] = useState(false);

  const [employeeOptions, setEmployeeOptions] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const handleEditToko = () => {
    const newPath = location.pathname.replace("detail-toko", "tambah-toko");
    navigate(newPath);
  };

  const handleDeleteToko = async () => {
    const confirmed = window.confirm("Yakin ingin menghapus toko ini?");
    if (confirmed) {
      try {
        // const res = await deleteStore(id);
        // if (res.status === 200) {
        //   navigate(-1, { state: { refetch: true } });
        // }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesResponse = await getRoles();
      if (rolesResponse.status == 200) {
        // console.log("rolesResponse.data.data: ", rolesResponse.data.data);
        const allRoles = rolesResponse.data.data;
        const filterRoles = allRoles.filter(
          (role) => role.name === "Pekerja Toko"
        );
        setRoles(filterRoles);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleAddEmployee = () => {
    // Navigate to add employee modal or page
  };

  const handleViewProfile = (empId) => {
    alert(`Lihat profil pegawai ID: ${empId}`);
  };

  const handleDeleteEmployee = (empId) => {
    alert(`Hapus pegawai ID: ${empId}`);
  };

  const fetchTokoDetail = async () => {
    try {
      const res = await getStoreDetail(id);
      console.log("res: ", res);
      if (res.status === 200) {
        setToko(res.data.data);
        setEmployees(res.data.data.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPegawai = async () => {
    // alert("pegawai added");
    const payload = {
      userId: selectedEmployee,
      storeId: parseInt(id),
    };
    // console.log("payload: ", payload);

    try {
      const addPegawairesponse = await createStorePlacement(payload);
      console.log("addPegawairesponse: ", addPegawairesponse);
      if (addPegawairesponse.status === 201) {
        setShowTambahPegawaiModal(false);
        fetchTokoDetail();
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const employeeOptionsResponse = await getListUser(selectedRole);
      //   console.log("employeeResponse: ", employeeResponse.data.data.users);
      if (employeeOptionsResponse.status) {
        setEmployeeOptions(employeeOptionsResponse.data.data.users);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchTokoDetail();
    fetchRoles();
    fetchEmployees();
  }, [selectedRole]);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Detail Toko */}
      <div className="border p-4 rounded">
        <h2 className="font-bold text-lg mb-4">Detail Toko</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm">Nama Toko</p>
            <p className="font-bold">{toko?.name}</p>
          </div>
          <div>
            <p className="text-sm">Lokasi Toko</p>
            <p className="font-bold">{toko?.location?.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded"
            onClick={handleEditToko}
          >
            Edit Toko
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={handleDeleteToko}
          >
            Hapus Toko
          </button>
        </div>
      </div>

      {/* Pegawai */}
      <div className="border p-4 rounded">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Pegawai</h2>
          <button
            className="bg-orange-300 hover:bg-orange-500  px-4 py-2 rounded"
            onClick={() => setShowTambahPegawaiModal(true)}
          >
            + Tambahkan Pegawai
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Jabatan</th>
                <th className="px-4 py-2">Nomor Telepon</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.role?.name}</td>
                  <td className="px-4 py-2">{emp.phoneNumber}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded"
                      onClick={() => handleViewProfile(emp.id)}
                    >
                      Lihat Profil
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteEmployee(emp.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    Belum ada pegawai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TambahPekerjaModal
        isOpen={showTambahPegawaiModal}
        onClose={() => setShowTambahPegawaiModal(false)}
        onSave={handleAddPegawai}
        jabatanOptions={roles}
        pekerjaOptions={employeeOptions}
        selectedJabatan={selectedRole}
        setSelectedJabatan={setSelectedRole}
        selectedPekerja={selectedEmployee}
        setSelectedPekerja={setSelectedEmployee}
      />
    </div>
  );
};

export default DetailToko;
