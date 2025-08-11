import React, { useState } from "react";
import {
  createAfkirCustomer,
  getAfkirCustomer,
  updateAfkirCustomer,
} from "../services/chickenMonitorings";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function TambahPelangganAyam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi.";
    if (!form.phoneNumber.trim()) e.phone = "Nomor telepon wajib diisi.";
    if (!form.phoneNumber.startsWith("08")) {
      e.phone = "Nomor telepon harus diawali dengan 08.";
    }
    if (!form.address.trim()) e.address = "Alamat wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fetchDetailData = async () => {
    try {
      const detailResponse = await getAfkirCustomer(id);
      console.log("detailResponse: ", detailResponse);
      if (detailResponse.status == 200) {
        const data = detailResponse.data.data;
        setForm({
          name: data.name,
          phoneNumber: data.phoneNumber,
          address: data.address,
        });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    if (id) {
      try {
        const updateResponse = await updateAfkirCustomer(form, id);
        if (updateResponse.status == 200) {
          navigate(-1, { state: { refetch: true } });
        }
      } catch (error) {
        console.log("error :", error);
      }
    } else {
      try {
        const addResponse = await createAfkirCustomer(form);
        if (addResponse.status == 201) {
          navigate(-1, { state: { refetch: true } });
        }
      } catch (error) {
        alert(
          "❌ Gagal menambahkan pelanggan baru, periksa input kembali! ",
          error.message
        );
        console.log("error :", error);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailData();
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Data Pelanggan" : "Tambah Pelanggan Baru"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full border rounded p-6 bg-white"
      >
        <label className="block mb-2 font-medium">Nama Pelanggan</label>
        <input
          type="text"
          value={form.name}
          onChange={update("name")}
          placeholder="Tuliskan nama pelanggan"
          className="w-full mb-1 rounded-md border px-4 py-3 bg-gray-100 "
        />
        {errors.name && (
          <p className="text-sm text-red-600 mb-4">{errors.name}</p>
        )}

        <label className="block mb-2 font-medium mt-2">Nomor Telepon</label>
        <input
          type="tel"
          value={form.phoneNumber}
          onChange={update("phoneNumber")}
          placeholder="Tuliskan nomor telepon pelanggan"
          className="w-full mb-1 rounded-md border px-4 py-3 bg-gray-100 "
        />
        {errors.phone && (
          <p className="text-sm text-red-600 mb-4">{errors.phone}</p>
        )}

        <label className="block mb-2 font-medium mt-2">Alamat</label>
        <textarea
          rows={3}
          value={form.address}
          onChange={update("address")}
          placeholder="Tuliskan alamat pelanggan"
          className="w-full rounded-md border px-4 py-3 bg-gray-100 "
        />
        {errors.address && (
          <p className="text-sm text-red-600 mt-1">{errors.address}</p>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="rounded-md bg-green-700 px-5 py-2 text-white hover:bg-green-900 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
