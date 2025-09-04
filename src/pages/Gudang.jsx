import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import { FaClock } from "react-icons/fa6";
import { BiSolidBox } from "react-icons/bi";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { FaPercentage, FaWarehouse, FaTruck } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";
import {
  getWarehouses,
  getWarehousesByLocation,
  getWarehousesOverview,
  updateWarehouses,
} from "../services/warehouses";
import { useEffect } from "react";
import { MdStore } from "react-icons/md";
import { formatDate } from "../utils/dateFormat";
import { useRef } from "react";
import { GoAlertFill } from "react-icons/go";
import { getCurrentUserWarehousePlacement } from "../services/placement";

const Gudang = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  const [selectedSite] = useState(
    userRole === "Owner" ? 0 : localStorage.getItem("locationId")
  );
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const [warehouses, setWarehouses] = useState();
  const [selectedWarehouse, setSelectedWarehouse] = useState();
  const [cornCapacity, setCornCapacity] = useState(0);

  const [isEditCapacityOpen, setIsEditCapacityOpen] = useState(false);
  const [newCornCapacity, setNewCornCapacity] = useState(cornCapacity);

  const [totalDangerStock, setTotalDangerStock] = useState();
  const [totalSafeStock, setTotalSafeStock] = useState();
  const [totalStoreRequest, setTotalStoreRequest] = useState();

  const [eggStocks, setEggStocks] = useState();
  const [cornStocks, setCornStocks] = useState([]);
  const [equipmentStocks, setEquipmentStocks] = useState();
  const [notifications, setNotifications] = useState();

  const detailPages = ["edit-stok-telur", "edit-stok-barang"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const editStokTelurHandle = (item) => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/edit-stok-telur";

    navigate(detailPath, {
      state: {
        warehouseId: selectedWarehouse,
        itemId: item.item.id,
        quantity: item.quantity,
        itemName: item.item.name,
        description: item.description,
      },
    });
  };

  const editStokBarangHandle = (item) => {
    const currentPath = location.pathname;
    const detailPath = currentPath + "/edit-stok-barang";

    navigate(detailPath, {
      state: {
        warehouseId: selectedWarehouse,
        itemId: item.item.id,
        quantity: item.quantity,
        itemName: item.item.name,
        estimationRunOut: item.estimationRunOut,
        description: item.description,
      },
    });
  };

  const fetchWarehouseData = async () => {
    try {
      const warehouseResponse = await getWarehousesByLocation(selectedSite);
      console.log("warehouseResponse: ", warehouseResponse);
      if (warehouseResponse.status == 200) {
        setWarehouses(warehouseResponse.data.data);
        setSelectedWarehouse(warehouseResponse.data.data[0].id);
        setCornCapacity(warehouseResponse.data.data[0].cornCapacity);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchWarehousePlacement = async () => {
    try {
      const placementResponse = await getCurrentUserWarehousePlacement();
      // console.log("placementResponse: ", placementResponse);
      if (placementResponse.status == 200) {
        setSelectedWarehouse(placementResponse?.data?.data?.warehouse?.id);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchOverviewData = async () => {
    try {
      const overviewResponse = await getWarehousesOverview(
        selectedWarehouse,
        selectedDate
      );
      // console.log("selectedWarehouse: ", selectedWarehouse);
      console.log("overviewData: ", overviewResponse);
      if (overviewResponse.status == 200) {
        setEggStocks(overviewResponse.data.data.eggStocks);
        setEquipmentStocks(overviewResponse.data.data.equipmentStocks);
        setNotifications(overviewResponse.data.data.notifications);
        setTotalDangerStock(overviewResponse.data.data.totalDangerStock);
        setTotalSafeStock(overviewResponse.data.data.totalSafeStock);
        setTotalStoreRequest(overviewResponse.data.data.totalStoreRequest);
        setCornStocks(overviewResponse.data.data.cornStocks);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleUpdateCornCapacity = async () => {
    try {
      const selected = warehouses?.find((w) => w.id == selectedWarehouse);
      console.log("selected: ", selected);

      if (!selected) return;
      const payload = {
        name: selected.name,
        locationId: selected.location.id,
        cornCapacity: Number(newCornCapacity),
      };

      const updateResponse = await updateWarehouses(payload, selectedWarehouse);
      console.log("updateResponse: ", updateResponse);
      if (updateResponse.status === 201) {
        setCornCapacity(newCornCapacity);
        setIsEditCapacityOpen(false);
        fetchWarehouseData();
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  useEffect(() => {
    if (userRole == "Pekerja Gudang") {
      fetchWarehousePlacement();
    } else {
      fetchWarehouseData();
    }
  }, []);

  useEffect(() => {
    if (selectedWarehouse) {
      fetchOverviewData();
    }
    if (location?.state?.refresh) {
      fetchOverviewData();
      window.history.replaceState({}, document.title);
    }
  }, [selectedWarehouse, location]);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <>
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="flex flex-col px-4 py-3 gap-4">
          <div className="flex justify-between mb-2 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Stok Gudang</h1>
            <div className="flex gap-2">
              {(userRole === "Owner" || userRole === "Kepala Kandang") && (
                <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
                  <MdStore size={18} />
                  <select
                    value={selectedWarehouse}
                    onChange={(e) => {
                      const warehouseId = e.target.value;
                      setSelectedWarehouse(warehouseId);

                      const selected = warehouses?.find(
                        (w) => w.id == warehouseId
                      );
                      if (selected) {
                        setCornCapacity(selected.cornCapacity);
                      }
                    }}
                    className="ml-2 bg-transparent text-base font-medium outline-none"
                  >
                    {warehouses?.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {!selectedWarehouse && (
            <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 border border-yellow-300">
              <GoAlertFill className="w-5 h-5 mr-2 text-yellow-600" />
              <span>
                Anda tidak memiliki akses ke gudang manapun, silahkan hubungi
                Owner
              </span>
            </div>
          )}
          <div className="flex md:grid-cols-2 gap-4 justify-between">
            {/* <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Total Item</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <BiSolidBox size={24} color="white" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <p className="text-3xl font-semibold me-3">Rp</p>
                  <p className="text-3xl font-semibold">25.000</p>
                </div>
              </div>
            </div> */}

            {/* ayam sakit */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Stok Aman</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <FaCheck size={24} color="white" />
                </div>
              </div>

              <div className="flex  flex-wrap gap-4">
                <div className="flex flex-wrap gap-4">
                  <div>
                    {/* popuasl */}
                    <p className="text-3xl font-semibold">
                      {totalSafeStock ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* penjualan telur */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Stok Kritis</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <HiMiniExclamationTriangle size={24} color="white" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* item butir */}
                <div className="flex flex-wrap gap-4">
                  <div>
                    {/* popuasl */}
                    <p className="text-3xl font-semibold">
                      {totalDangerStock ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* penjualan telur */}
            <div className="p-4 w-full rounded-md bg-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Dalam Pesanan</h2>
                <div className="p-2 rounded-xl bg-green-700">
                  <FaTruck size={24} color="white" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* item butir */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex">
                    {/* popuasl */}
                    <p className="text-3xl font-semibold pe-2">
                      {totalStoreRequest ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* chart, incomes, and history section */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Chart Section (3/4 width on large screens) */}
            <div className="w-full bg-white px-8 py-6 rounded-lg border border-gray-300">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">Stok Telur</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-base">
                  <thead>
                    <tr className="bg-green-700 font-medium text-white text-center">
                      <th className="py-2 px-4">Nama Barang</th>
                      <th className="py-2 px-4">Jumlah</th>
                      <th className="py-2 px-4">Satuan</th>
                      <th className="py-2 px-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eggStocks?.map((item, index) => (
                      <tr key={index} className="border-b text-center">
                        <td className="py-2 px-4">{item.item.name}</td>
                        <td className="py-2 px-4">{item.quantity}</td>
                        <td className="py-2 px-4">{item.item.unit}</td>

                        <td className="py-2 px-4 justify-center gap-4">
                          <span
                            onClick={() => editStokTelurHandle(item)}
                            className="py-1 px-4 rounded bg-green-700 hover:bg-green-900 text-white cursor-pointer"
                          >
                            Edit Stok
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Stok Jagung</h2>
              <div className="flex gap-4 items-center">
                <span className="flex gap-3">
                  Kapasitas Maksimum Gudang : <p>{`${cornCapacity} Kg`}</p>
                </span>

                <div
                  onClick={() => {
                    setNewCornCapacity(cornCapacity);
                    setIsEditCapacityOpen(true);
                  }}
                  className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer"
                >
                  <div className="text-base font-medium ms-2 text-black">
                    Edit Kapasitas Maksimum
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-green-700 text-white font-medium text-center">
                    <th className="py-2 px-4">Nama barang</th>
                    <th className="py-2 px-4">Kategori</th>
                    <th className="py-2 px-4">Jumlah</th>
                    <th className="py-2 px-4">Satuan</th>
                    <th className="py-2 px-4">Kadaluarsa</th>
                    <th className="py-2 px-4">Keterangan</th>
                    <th className="py-2 px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {cornStocks?.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="py-2 px-4">{item.item.name}</td>
                      <td className="py-2 px-4">{item.item.category}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">{item.item.unit}</td>
                      <td className="py-2 px-4">{item.expiredAt}</td>
                      <td className="py-2 px-4 flex justify-center">
                        <span
                          className={`w-24 py-1 flex justify-center rounded text-sm font-semibold ${
                            item.description === "Aman"
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-kritis-box-surface-color text-kritis-text-color"
                          }`}
                        >
                          {item.description}
                        </span>
                      </td>
                      <td className="py-2 px-4 justify-center gap-4">
                        <span
                          onClick={() => {
                            console.log("item: ", item);
                            editStokBarangHandle(item);
                          }}
                          className="py-1 px-4 rounded bg-green-700 hover:bg-green-900  text-white cursor-pointer"
                        >
                          Edit Stok
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* detail penjualan */}
          <div className="bg-white p-4 rounded-lg border border-gray-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Stok Barang</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-green-700 text-white font-medium text-center">
                    <th className="py-2 px-4">Nama barang</th>
                    <th className="py-2 px-4">Kategori</th>
                    <th className="py-2 px-4">Jumlah</th>
                    <th className="py-2 px-4">Satuan</th>
                    <th className="py-2 px-4">Estimasi Habis</th>
                    <th className="py-2 px-4">Keterangan</th>
                    <th className="py-2 px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentStocks?.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="py-2 px-4">{item.item.name}</td>
                      <td className="py-2 px-4">{item.item.category}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">{item.item.unit}</td>
                      <td className="py-2 px-4">
                        {`${parseInt(item.estimationRunOut)} hari`}
                      </td>
                      <td className="py-2 px-4 flex justify-center">
                        <span
                          className={`w-24 py-1 flex justify-center rounded text-sm font-semibold ${
                            item.description === "Aman"
                              ? "bg-aman-box-surface-color text-aman-text-color"
                              : "bg-kritis-box-surface-color text-kritis-text-color"
                          }`}
                        >
                          {item.description}
                        </span>
                      </td>
                      <td className="py-2 px-4 justify-center gap-4">
                        <span
                          onClick={() => {
                            editStokBarangHandle(item);
                          }}
                          className="py-1 px-4 rounded bg-green-700 hover:bg-green-900  text-white cursor-pointer"
                        >
                          Edit Stok
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isEditCapacityOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Edit Kapasitas Maksimum
                </h2>
                <input
                  type="number"
                  value={newCornCapacity}
                  onChange={(e) => setNewCornCapacity(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsEditCapacityOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleUpdateCornCapacity}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-800"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* <button
            onClick={() => {
              console.log("warehouses: ", warehouses);
              console.log("selectedWarehouse: ", selectedWarehouse);
            }}
          >
            CHECK
          </button> */}
        </div>
      )}
    </>
  );
};

export default Gudang;
