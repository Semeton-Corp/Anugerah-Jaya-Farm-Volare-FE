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

const TambahSupplier = () => {
  const [cages, setCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(0);

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);

  const [warehouseItems, setWarehouseItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [ok, setOk] = useState("");
  const [retak, setRetak] = useState("");
  const [pecah, setPecah] = useState("");
  const [reject, setReject] = useState("");
  const [weight, setWeight] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchWarehouseItems = async () => {
    try {
      const itemsResponse = await getWarehouseItems();
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

        {/* Pilih barang */}
        <label className="block font-medium mb-1">Nama Barang</label>
        <select
          className="w-full border bg-black-4 cursor-pointer rounded p-2 mb-6"
          value={selectedItem}
          onChange={(e) => {
            const id = Number(e.target.value);
            setSelectedItem(id);
          }}
        >
          {warehouseItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

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

        <div className="mt-6 text-right">
          <div>
            {id ? (
              <button
                onClick={() => {
                  hapusHandle(id);
                  console.log("selectedCage: ", selectedCage);
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
                console.log("selectedCage: ", selectedCage);
              }}
              className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900 cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      {/* <button
        onClick={() => {
          console.log("name: ", name);
          console.log("selectedItem: ", selectedItem);
          console.log("address: ", address);
          console.log("phoneNumber: ", phoneNumber);
        }}
      >
        Check
      </button> */}
    </div>
  );
};

export default TambahSupplier;
