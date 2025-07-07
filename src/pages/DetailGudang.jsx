import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getWarehousesDetail } from "../services/warehouses";

const DetailGudang = () => {
  const { id } = useParams();
  const [gudang, SetGudang] = useState({});

  const employees = [
    { id: 1, name: "Budi", role: "Kepala Kandang", phone: "08123456789" },
    { id: 2, name: "Anton", role: "Pekerja Gudang", phone: "08123456789" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [showDeleteGudangModal, setShowDeleteGudangModal] = useState(false);

  const handleEditGudang = () => {
    const newPath = location.pathname.replace("detail-gudang", "tambah-gudang");
    navigate(newPath);
  };

  const handleDeleteGudang = () => {
    alert("Delete gudang clicked");
  };

  const handleAddEmployee = () => {
    alert("Add employee clicked");
  };

  const handleViewProfile = (id) => {
    alert(`View profile of employee ID: ${id}`);
  };

  const handleDeleteEmployee = (id) => {
    alert(`Delete employee ID: ${id}`);
  };

  const fetchDetailData = async () => {
    try {
      const detailResponse = await getWarehousesDetail(id);
      //   console.log("detailResponse: ", detailResponse);
      if (detailResponse.status === 200) {
        SetGudang(detailResponse.data.data);
        console.log("detailResponse.data.data: ", detailResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchDetailData();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Detail Gudang */}
      <div className="border p-4 rounded">
        <h2 className="font-bold text-lg mb-4">Detail Gudang</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm">Nama Gudang</p>
            <p className="font-bold">{gudang?.name}</p>
          </div>
          <div>
            <p className="text-sm">Lokasi Gudang</p>
            <p className="font-bold">{gudang?.location?.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-4 py-2 rounded"
            onClick={handleEditGudang}
          >
            Edit Gudang
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded"
            onClick={handleDeleteGudang}
          >
            Hapus Gudang
          </button>
        </div>
      </div>

      {/* Pegawai */}
      <div className="border p-4 rounded">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Pegawai</h2>
          <button
            className="bg-orange-500 hover:bg-orange-700 cursor-pointer px-4 py-2 rounded"
            onClick={handleAddEmployee}
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
                  <td className="px-4 py-2">{emp.role}</td>
                  <td className="px-4 py-2">{emp.phone}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-3 py-1 rounded"
                      onClick={() => handleViewProfile(emp.id)}
                    >
                      Lihat Profil
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteEmployee(emp.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailGudang;
