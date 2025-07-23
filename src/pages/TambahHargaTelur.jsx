import React, { useEffect, useState } from "react";
import {
  createItemPrice,
  getItemPrices,
  getItemPricesById,
  getItems,
  updateItemPrice,
} from "../services/item";
import { useNavigate, useParams } from "react-router-dom";

const TambahHargaTelur = () => {
  const navigate = useNavigate();

  const [kategori, setKategori] = useState("");
  const [barang, setBarang] = useState("");
  const [harga, setHarga] = useState("");

  const [items, setItems] = useState([]);

  const { id } = useParams();

  const handleSubmit = async () => {
    const payload = {
      itemId: parseInt(barang),
      category: kategori,
      price: harga,
    };

    if (id) {
      try {
        const updateResponse = await updateItemPrice(payload, id);
        console.log("updateResponse: ", updateResponse);
        if (updateResponse.status == 200) {
          navigate(-1, { state: { refetch: true } });
        }
      } catch (error) {
        console.log("error :", error);
      }
    } else {
      try {
        const tambahResponse = await createItemPrice(payload);
        // console.log("tambahResponse: ", tambahResponse);
        if (tambahResponse.status == 201) {
          navigate(-1, { state: { refetch: true } });
        }
      } catch (error) {
        console.alert("error :", error);
      }
      // console.log("Submitted:", payload);
    }
  };

  const fetchItemsData = async (storeId) => {
    try {
      const response = await getItems("Telur", {
        // storeId
      });
      console.log("response fetch item data", response);

      if (response.status == 200) {
        setItems(response.data.data);
        setSelectedItem(response.data.data[0].id);
      }
    } catch (error) {}
  };

  const fetchDetailData = async () => {
    try {
      const detailResponse = await getItemPricesById(id);
      console.log("detailResponse: ", detailResponse);
      if (detailResponse.status == 200) {
        const data = detailResponse.data.data;
        setKategori(data.category);
        setBarang(data.item.id);
        setHarga(data.price);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailData();
    }
    fetchItemsData();
  }, []);

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      <h1 className="text-2xl font-bold">Tambah Harga Telur</h1>

      <div className="bg-white border rounded shadow p-6 w-full ">
        <div className="mb-4">
          <label className="block font-medium mb-1">Nama Kategori Harga</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 bg-gray-100"
            placeholder="Tuliskan nama kategori harga"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Pilih Barang</label>
          <select
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value={barang}
            onChange={(e) => setBarang(e.target.value)}
          >
            <option value="">Pilih barang</option>
            {items.map((item) => (
              <option value={item.id} key={item.id}>
                {`${item.name} (${item.unit})`}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="mb-4">
          <label className="block font-medium mb-1">Satuan</label>
          <select
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value={satuan}
            onChange={(e) => setSatuan(e.target.value)}
          >
            <option value="">Pilih satuan</option>
            {satuanOptions.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div> */}

        <div className="mb-4">
          <label className="block font-medium mb-1">Harga</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 bg-gray-100"
            placeholder="Rp (Masukkan Harga Barang)"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button
            onClick={() => {
              console.log("kategori: ", kategori);
              console.log("barang: ", barang);
              console.log("harga: ", harga);
            }}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer"
          >
            Check
          </button>

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

export default TambahHargaTelur;
//
