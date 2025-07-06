import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteChickenHealthItem,
  getChickenHealthItemById,
} from "../services/chickenMonitorings";
import DeleteModal from "../components/DeleteModal";

const DetailVaksinObatItem = () => {
  const [detailData, setDetailData] = useState({
    name: "Vaksin DOC",
    type: "Vaksin Rutin",
    chickenAge: 1,
    chickenCategory: "DOC",
    note: "Vaksin disimpan pada tempat yang dingin dan diberikan sebanyak 5 ml pada setiap ayam DOC",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    const newPath = location.pathname.replace(
      "detail-vaksin-obat",
      "tambah-vaksin"
    );
    navigate(newPath);
  };

  const handleDelete = async () => {
    try {
      const deleteResponse = await deleteChickenHealthItem(id);
      console.log("deleteResponse: ", deleteResponse);
      if (deleteResponse.status === 204) {
        setShowDeleteModal(false);
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  const fetchDetailData = async () => {
    try {
      const detailResponse = await getChickenHealthItemById(id);
      //   console.log("detailResponse: ", detailResponse);
      if (detailResponse.status === 200) {
        setDetailData(detailResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchDetailData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 mt-10">Detail Vaksin / Obat</h1>

      <div className="mx-auto  p-8 bg-white border rounded ">
        <div className="mb-4">
          <p className="font-medium">Nama vaksin / obat</p>
          <p className="text-lg font-bold">{detailData.name}</p>
        </div>

        <div className="mb-4">
          <p className="font-medium">Kategori vaksin</p>
          <p className="text-lg font-bold">{detailData.type}</p>
        </div>

        <hr className="my-6" />

        {/* Instruksi */}
        <h2 className="text-lg  mb-2">Instruksi Pemberian</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-medium">Kategori ayam</p>
            <p className="text-lg font-bold">
              {detailData.chickenCategory || "-"}
            </p>
          </div>
          <div>
            <p className="font-medium">Usia Ayam</p>
            <p className="text-lg font-bold">
              {detailData.chickenAge ? `${detailData.chickenAge} Minggu` : "-"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-medium">Catatan</p>
          <textarea
            value={detailData.note || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleEdit}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer"
          >
            Edit Vaksin / Obat
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={() => {
          setShowDeleteModal(false);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default DetailVaksinObatItem;
