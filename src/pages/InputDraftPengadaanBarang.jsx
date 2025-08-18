// src/pages/InputDraftPengadaanBarang.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  createWarehouseItemProcurementDraft,
  getWarehouses,
} from "../services/warehouses";
import { getItems } from "../services/item";
import { getSuppliers } from "../services/supplier";
import { useNavigate } from "react-router-dom";

const fmtIDR = (n) =>
  n == null || n === "" ? "-" : `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

// ----- dummy data -----
const GUDANGS = [
  { id: 1, name: "Gudang Utama" },
  { id: 2, name: "Gudang Timur" },
];
const BARANGS = [
  { id: 10, name: "Dedak", unit: "Kg", dailyNeed: 100 }, // 100 Kg / day
  { id: 11, name: "Konsentrat", unit: "Kg", dailyNeed: 80 },
  { id: 12, name: "Karpet", unit: "Pcs", dailyNeed: 0 }, // non-feed item
];
const SUPPLIERS = [
  { id: 100, name: "Dagang Dedak" },
  { id: 101, name: "Super Jagung" },
];

export default function InputDraftPengadaanBarang() {
  const userRole = localStorage.getItem("role");
  const locationId = localStorage.getItem("locationId");
  const navigate = useNavigate();

  const allowedCategories = ["Pakan Jadi", "Barang", "Bahan Baku Adukan"];

  // selections
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [warehouse, setWarehouse] = useState(null);

  const [dailySpending, setDailySpending] = useState(5);

  const [itemOptions, setItemOptions] = useState([]);
  const [item, setItem] = useState(null);

  const [supplierOptions, setSupplierOptions] = useState([]);
  const [supplier, setSupplier] = useState(null);

  // inputs
  const [days, setDays] = useState(""); // kebutuhan (hari)
  const [pricePerUnit, setPricePerUnit] = useState(""); // harga / unit

  // derived
  const perHari = useMemo(() => Number(item?.dailyNeed || 0), [item]);
  const totalOrder = useMemo(() => {
    const d = Number(days || 0);
    return dailySpending * d;
  }, [perHari, days]);
  const totalPrice = useMemo(() => {
    const p = Number(pricePerUnit || 0);
    return totalOrder * p;
  }, [totalOrder, pricePerUnit]);

  // today (pretty)
  const todayLabel = useMemo(() => {
    const d = new Date("2025-03-20"); // keep like screenshot; replace with new Date() for real today
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }, []);

  const saveDraft = async () => {
    const payload = {
      warehouseId: warehouse?.id,
      itemId: item?.id,
      supplierId: supplier?.id,
      dailySpending: dailySpending,
      daysNeed: Number(days || 0),
      price: String(pricePerUnit || "0"),
    };

    console.log("payload: ", payload);

    try {
      const createResponse = await createWarehouseItemProcurementDraft(payload);
      if (createResponse.status == 201) {
        navigate(-1, { state: { refetch: true } });
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const warehousesResponse = await getWarehouses();
      if (warehousesResponse.status == 200) {
        const warehousesData = warehousesResponse.data.data;
        let filteredWarehouses;
        if (userRole != "Owner") {
          filteredWarehouses = warehousesData.filter(
            (item) => item.location.id == locationId
          );
        } else {
          filteredWarehouses = warehousesData;
        }
        // console.log("filteredWarehouses: ", filteredWarehouses);
        setWarehouseOptions(filteredWarehouses);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchItems = async () => {
    try {
      const itemResponse = await getItems();
      console.log("itemResponse: ", itemResponse);
      if (itemResponse.status == 200) {
        const itemsData = itemResponse.data.data;
        const filteredItem = (itemsData ?? []).filter((item) =>
          allowedCategories.includes(item.category)
        );
        setItemOptions(filteredItem);
        console.log("filteredItem: ", filteredItem);
        console.log("itemsData: ", itemsData);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchSupplier = async () => {
    try {
      const supplierResponse = await getSuppliers("Barang");
      console.log("supplierResponse: ", supplierResponse);
      if (supplierResponse.status == 200) {
        setSupplierOptions(supplierResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
    fetchItems();
    fetchSupplier();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Input Draft Pengadaan Barang</h1>

      <div className="bg-white border rounded p-6 space-y-6">
        {/* Tanggal Input */}
        <div>
          <p className="text-sm text-gray-600">Tanggal Input</p>
          <p className="font-semibold">{todayLabel}</p>
        </div>

        {/* Gudang */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Gudang Penyimpanan
          </label>
          <select
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value={warehouse?.id || ""}
            onChange={(e) =>
              setWarehouse(
                warehouseOptions.find((g) => g.id === Number(e.target.value))
              )
            }
          >
            <option value="" disabled>
              Pilih gudang tempat penyimpanan barang
            </option>
            {warehouseOptions.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Nama Barang */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Nama Barang
          </label>
          <select
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value={item?.id || ""}
            onChange={(e) =>
              setItem(itemOptions.find((b) => b.id === Number(e.target.value)))
            }
          >
            <option value="" disabled>
              Pilih barang...
            </option>
            {itemOptions.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Supplier */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Supplier</label>
          <select
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value={supplier?.id || ""}
            onChange={(e) =>
              setSupplier(
                supplierOptions.find((s) => s.id === Number(e.target.value))
              )
            }
          >
            <option value="" disabled>
              Pilih nama supplier
            </option>
            {supplierOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Kebutuhan per-hari */}
        <div>
          <p className="text-sm text-gray-600">Kebutuhan per-hari</p>
          <p className="font-semibold">
            {dailySpending
              ? `${dailySpending.toLocaleString("id-ID")} ${item?.unit || "-"}`
              : "-"}
          </p>
        </div>

        {/* Kebutuhan (Hari) + Total Pesan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Kebutuhan (Hari)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                className="w-full border rounded px-3 py-2 bg-gray-100"
                placeholder="Masukkan untuk kebutuhan berapa hari akan dipesan"
                value={days}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "") return setDays("");
                  const num = Math.max(0, Number(v));
                  setDays(num);
                }}
              />
              <span className="font-medium">Hari</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Total Pesan</p>
            <p className="font-semibold">
              {totalOrder
                ? `${totalOrder.toLocaleString("id-ID")} ${item?.unit || "-"}`
                : "-"}
            </p>
          </div>
        </div>

        {/* Harga / unit & Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Harga Beli / Unit
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                className="w-full border rounded px-3 py-2 bg-gray-100"
                value={pricePerUnit}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "") return setPricePerUnit("");
                  setPricePerUnit(Math.max(0, Number(v)));
                }}
                placeholder="Rp 0"
              />
              <span className="font-medium">/ {item?.unit || "-"}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Harga Beli Total</p>
            <p className="font-semibold">
              {totalPrice ? fmtIDR(totalPrice) : "Rp -"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={saveDraft}
            className="bg-green-700 hover:bg-green-900 text-white px-6 py-2 rounded cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          console.log("item: ", item);
        }}
      >
        CHECK
      </button>
    </div>
  );
}
