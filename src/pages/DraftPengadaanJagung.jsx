import { useEffect } from "react";
import { useState } from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { getWarehouseItemCornProcurementDrafts } from "../services/warehouses";

const DraftPengadaanJagung = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [daftarDrafts, setDaftarDrafts] = useState([]);

  const detailPages = ["input-draft-pengadaan-jagung"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const fetchDraftsData = async () => {
    try {
      const dataResponse = await getWarehouseItemCornProcurementDrafts();
      //   console.log("dataResponse: ", dataResponse);
      
      if (dataResponse.status === 200) {
        setDaftarDrafts(dataResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching draft data:", error);
    }
  };

  useEffect(() => {
    fetchDraftsData();
    if (location.state?.refetch) {
      fetchDraftsData();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handlePesan = (item) => {
    console.log("Pesan clicked for:", item);
  };

  const handleEdit = (item) => {
    console.log("Edit clicked for:", item);
  };

  const handleBatalkan = (item) => {
    console.log("Batalkan clicked for:", item);
  };

  const handleTambahDraft = () => {
    navigate(`${location.pathname}/input-draft-pengadaan-jagung`);
    // console.log("Tambah Draft clicked");
  };

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col px-4 py-3 gap-6">
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Draft Pengadaan Jagung</h1>
        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">
            Hari ini ({getTodayDateInBahasa()})
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white p-4 border rounded-lg w-full border-black-6">
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={handleTambahDraft}
            className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer text-black font-medium"
          >
            + Tambah Draft Pengadaan Jagung
          </button>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="px-4 py-3">Tanggal Input</th>
                <th className="px-4 py-3">Nama barang</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Satuan</th>
                <th className="px-4 py-3">Supplier</th>
                <th className="px-4 py-3">Harga Total</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftarDrafts?.map((item, idx) => (
                <tr key={item.id || idx} className="border-b last:border-b-0">
                  <td className="px-4 py-3">{item.inputDate}</td>
                  <td className="px-4 py-3">{item.item.name}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{item.item.unit}</td>
                  <td className="px-4 py-3">{item.supplier.name}</td>
                  <td className="px-4 py-3">
                    Rp {parseInt(item.totalPrice).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePesan(item)}
                        className="bg-orange-300 hover:bg-orange-500 text-black px-3 py-1 rounded"
                      >
                        Pesan
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleBatalkan(item)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Batalkan
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {daftarDrafts?.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Tidak ada data draft.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DraftPengadaanJagung;
