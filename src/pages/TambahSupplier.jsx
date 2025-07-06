import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCage } from "../services/cages";
import { inputTelur } from "../services/eggs";
import { getEggMonitoringById } from "../services/eggs";
import { useParams } from "react-router-dom";
import { updateEggMonitoring } from "../services/eggs";
import { getWarehouses } from "../services/warehouses";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { use } from "react";
import { getWarehouseItems } from "../services/warehouses";
import {
  createSupplier,
  getSupplierById,
  updateSuppliers,
  deleteSupplier,
} from "../services/supplier";
import { MdDelete } from "react-icons/md";
import { getItems } from "../services/item";

const TambahSupplier = () => {
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItems, setSelectedItems] = useState([0]);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchWarehouseItems = async () => {
    try {
      const itemsResponse = await getItems();
      //   console.log("itemsResponse: ", itemsResponse);
      if (itemsResponse.status == 200) {
        setWarehouseItems(itemsResponse.data.data);
        setSelectedItem(itemsResponse.data.data[0].id);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchSupplierById = async (id) => {
    try {
      const supplierDetailResponse = await getSupplierById(id);
      console.log("supplierDetailResponse: ", supplierDetailResponse);
      if (supplierDetailResponse.status == 200) {
        setName(supplierDetailResponse.data.data.name);
        setSelectedItem(supplierDetailResponse.data.data.warehouseItem.id);
        setAddress(supplierDetailResponse.data.data.address);
        setPhoneNumber(supplierDetailResponse.data.data.phoneNumber);
      }
      //   console.log("itemsResponse: ", itemsResponse);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchWarehouseItems();

    if (id) {
      fetchSupplierById(id);
    }
  }, []);

  const handleSubmit = async () => {
    const payload = {
      warehouseItemId: selectedItem,
      itemIds: selectedItems,
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    };

    if (id) {
      try {
        const updateResponse = await updateSuppliers(payload, id);
        // console.log("updateResponse: ", updateResponse);
        if (updateResponse.status == 200) {
          navigate(-1, { state: { refetch: true } });
        }
      } catch (error) {
        console.log("error :", error);
      }
    } else {
      try {
        const createResponse = await createSupplier(payload);
        console.log("createResponse: ", createResponse);
        if (createResponse.status == 201) {
          navigate(-1, { state: { refetch: true } });
        }
      } catch (error) {
        console.log("error :", error);
      }
    }
  };

  const hapusHandle = async (id) => {
    try {
      const deleteResponse = await deleteSupplier(id);
      if (deleteResponse.status == 204) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const getDisplayValue = (val) =>
    val === "" ? "Pilih nama barang yang di supply" : val;

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      <h1 className="text-3xl font-bold">Tambah Supplier</h1>

      <div className="w-full mx-auto p-6 bg-white shadow rounded border">
        <h2 className="text-lg font-semibold mb-1">Input data barang</h2>

        <div>
          <label className="block font-medium mb-1">Nama Supplier</label>
          <input
            type="text"
            className="w-full border rounded p-2 mb-6 bg-black-4"
            placeholder="Masukkan nama supplier..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Alamat Supplier</label>
          <input
            type="text"
            className="w-full border rounded p-2 mb-6 bg-black-4"
            placeholder="Masukkan alamat supplier..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Nomor Telepon Supplier
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 mb-6 bg-black-4"
            placeholder="Masukkan alamat supplier..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mt-6 border rounded p-4">
          <h3 className="font-semibold mb-2">Daftar barang yang disupply</h3>

          {selectedItems.map((itemId, index) => (
            <div key={index} className="flex gap-2 items-center mb-2">
              <select
                className="w-full border bg-black-4 cursor-pointer rounded p-2"
                value={itemId}
                onChange={(e) => {
                  const updatedItems = [...selectedItems];
                  updatedItems[index] = Number(e.target.value);
                  setSelectedItems(updatedItems);
                }}
              >
                {warehouseItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {selectedItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedItems(
                      selectedItems.filter((_, i) => i !== index)
                    );
                  }}
                  className="text-red-500 hover:text-red-300 cursor-pointer"
                >
                  <MdDelete size={32} />
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                setSelectedItems([...selectedItems, warehouseItems[0]?.id || 0])
              }
              className="bg-orange-300 hover:bg-orange-500  text-sm px-4 py-2 rounded cursor-pointer"
            >
              + Tambah Barang
            </button>
          </div>
        </div>

        <div className="mt-6 text-right">
          <div>
            {id ? (
              <button
                onClick={() => {
                  hapusHandle(id);
                }}
                className="bg-kritis-box-surface-color text-white py-2 px-6 me-4 rounded hover:bg-kritis-text-color cursor-pointer"
              >
                Hapus Supplier
              </button>
            ) : (
              <></>
            )}

            <button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900 cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          const payload = {
            itemIds: selectedItems,
            name: name,
            phoneNumber: phoneNumber,
            address: address,
          };
          console.log("payload: ", payload);
          // console.log("name: ", name);
          // console.log("selectedItems: ", selectedItems);
          // console.log("address: ", address);
          // console.log("phoneNumber: ", phoneNumber);
          // console.log("warehouseItems: ", warehouseItems);
        }}
      >
        Check
      </button>
    </div>
  );
};

export default TambahSupplier;
