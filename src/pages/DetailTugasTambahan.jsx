import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAdditionalWorkById,
  deleteAdditionalWorkById,
} from "../services/dailyWorks";

const DetailTugasTambahan = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const { id } = useParams();

  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const response = await getAdditionalWorkById(id);
      console.log("response: ", response);
      if (response.status === 200) {
        setDetailData(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch detail: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Yakin hapus tugas tambahan ini?")) {
      try {
        await deleteAdditionalWorkById(id);
        navigate(-1);
      } catch (err) {
        console.error("Gagal hapus: ", err);
      }
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!detailData) {
    return <div className="p-6">Data tidak ditemukan</div>;
  }

  return (
    <div className="mx-6 p-6 bg-white rounded border">
      <h1 className="text-2xl font-bold">Detail Tugas Tambahan</h1>

      <div className="grid gap-2 mt-6">
        <div>
          <span className="font-medium">Nama Tugas Tambahan</span>
          <div className="text-lg font-semibold">{detailData.name}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="font-medium">Site</div>
            <div className="font-bold">{detailData.location?.site || "-"}</div>
          </div>
          <div>
            <div className="font-medium">Lokasi</div>
            <div className="font-bold">{detailData.locationType}</div>
          </div>
          <div>
            <div className="font-medium">Lokasi Spesifik</div>
            <div className="font-bold">{detailData.place || "-"}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <div className="font-medium">Tanggal Pelaksanaan</div>
            <div className="font-bold">{detailData.date}</div>
          </div>
          <div>
            <div className="font-medium">Waktu Pelaksanaan</div>
            <div className="font-bold">{detailData.time}</div>
          </div>
          <div>
            <div className="font-medium">Slot Pekerja</div>
            <div className="font-bold">{detailData.slot} Orang</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="font-medium">Gaji Tambahan / Pekerja</div>
          <div className="font-bold text-lg">{`RP ${detailData.salary}`}</div>
        </div>

        <div className="mt-6">
          <div className="font-medium">Deskripsi Pekerjaan</div>
          <div className="bg-gray-100 p-2 rounded">
            {detailData.description}
          </div>
        </div>

        <div>
          <div className="font-medium mb-2 mt-6">
            Pegawai yang mengambil pekerjaan
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="px-4 py-2 text-left">Nama Pegawai</th>
                <th className="px-4 py-2 text-left">Jabatan</th>
              </tr>
            </thead>
            <tbody>
              {detailData.additionalWorkUserInformation?.map(
                (worker, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{worker.userName || "-"}</td>
                    <td className="px-4 py-2">{worker.roleName || "-"}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      {userRole == "Owner" && (
        <div className="text-right">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-700"
          >
            Hapus Tugas Tambahan
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailTugasTambahan;
