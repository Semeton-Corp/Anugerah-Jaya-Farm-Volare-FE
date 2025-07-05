import React, { useState } from "react";
import {
  createItemPriceDiscount,
  getItemPricesDiscountById,
  updateItemPricesDiscount,
} from "../services/item";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const TambahDiskon = () => {
  const navigate = useNavigate();

  const [namaDiskon, setNamaDiskon] = useState("");
  const [minTransaksi, setMinTransaksi] = useState("");
  const [satuan, setSatuan] = useState("");
  const [besarDiskon, setBesarDiskon] = useState("");

  const { id } = useParams();

  const handleSubmit = async () => {
    const payload = {
      name: namaDiskon,
      minimumTransactionUser: parseInt(minTransaksi),
      totalDiscount: parseFloat(besarDiskon),
    };
    // console.log("payload: ", payload);

    if (id) {
      try {
        const updateResponse = await updateItemPricesDiscount(payload, id);
        console.log("updateResponse: ", updateResponse);
        if (updateResponse.status == 200) {
          navigate(-1, { state: { refetch: true } });
        }
      } catch (error) {
        console.log("error :", error);
      }
    } else {
      try {
        const tambahResponse = await createItemPriceDiscount(payload);
        console.log("tambahResponse: ", tambahResponse);

        if (tambahResponse.status == 201) {
          navigate(-1, { state: { refetch: true } });
        }
      } catch (error) {
        console.log("error :", error);
      }
    }

    // TODO: send to API
  };

  const fetchDetailData = async () => {
    try {
      const detailResponse = await getItemPricesDiscountById(id);
      console.log("detailResponse: ", detailResponse);
      if (detailResponse.status == 200) {
        const data = detailResponse.data.data;
        setNamaDiskon(data.name);
        setMinTransaksi(data.minimumTransactionUser);
        setBesarDiskon(data.totalDiscount);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailData();
    }
  }, []);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      <h1 className="text-2xl font-bold">Tambah Diskon</h1>

      <div className="bg-white border rounded shadow p-6 w-full ">
        <div className="mb-4">
          <label className="block font-medium mb-1">Nama Diskon</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 bg-gray-100"
            placeholder="Tuliskan nama diskon"
            value={namaDiskon}
            onChange={(e) => setNamaDiskon(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Minimum Transaksi User
          </label>
          <div className="mb-4">
            <div className="flex">
              <input
                type="number"
                value={minTransaksi}
                onChange={(e) => setMinTransaksi(e.target.value)}
                className="w-1/8 border rounded px-3 py-2 bg-gray-100"
              />
              <p className="flex items-center px-3 py-1 text-lg font-bold">
                Kali
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Persentase Diskon</label>
          <div className="flex">
            <input
              type="number"
              value={besarDiskon}
              onChange={(e) => setBesarDiskon(e.target.value)}
              className="w-1/8 border rounded px-3 py-2 bg-gray-100"
            />
            <p className="flex items-center px-3 py-1 text-lg font-bold">%</p>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahDiskon;
