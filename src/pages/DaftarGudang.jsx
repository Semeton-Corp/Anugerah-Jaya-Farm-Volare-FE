import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getWarehouses } from "../services/warehouses";
import { MdStore } from "react-icons/md";
import { getLocations } from "../services/location";

const DaftarGudang = () => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const [gudangList, setGudangList] = useState([]);

  const [siteOptions, setSiteOptions] = useState([]);
  const [selectedSite, setSelectedSite] = useState(
    userRole === "Owner" ? 0 : localStorage.getItem("locationId")
  );

  const detailPage = ["tambah-gudang", "detail-gudang"];

  const isDetailPage = detailPage.some((segment) =>
    location.pathname.includes(segment)
  );

  const handleTambahGudang = () => {
    navigate(`${location.pathname}/tambah-gudang`);
  };

  const handleLihatDetail = (id, locationId) => {
    navigate(`${location.pathname}/detail-gudang/${id}/${locationId}`);
  };

  const fetchGudangList = async () => {
    try {
      const gudangResponse = await getWarehouses(selectedSite);
      if (gudangResponse.status == 200) {
        const allGudang = gudangResponse.data.data;
        setGudangList(allGudang);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchSites = async () => {
    try {
      const res = await getLocations();
      if (res.status === 200) {
        setSiteOptions(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch sites", err);
    }
  };

  useEffect(() => {
    fetchSites();
    fetchGudangList();

    if (location.state?.refetch) {
      fetchGudangList();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    fetchGudangList();
  }, [selectedSite]);

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="p-6 mx-auto ">
      <h1 className="text-3xl font-bold mb-4">Gudang</h1>

      <div className="bg-white border rounded p-4">
        <div className="flex justify-end mb-4 gap-4">
          {userRole == "Owner" && (
            <div className="flex items-center rounded px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
              <MdStore size={18} />
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="ml-2 bg-transparent text-base font-medium outline-none"
              >
                <option value="">Semua Site</option>
                {siteOptions.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={handleTambahGudang}
            className="bg-orange-300  px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
          >
            + Tambah Gudang
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-4 py-2 text-left">Nama Gudang</th>
              <th className="px-4 py-2 text-left">Lokasi</th>
              <th className="px-4 py-2 text-left">Jumlah Pekerja</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {gudangList.map((gudang, index) => (
              <tr key={gudang.id} className={`${index !== 0 && "border-t"}`}>
                <td className="px-4 py-2">{gudang?.name}</td>
                <td className="px-4 py-2">{gudang?.location?.name}</td>
                <td className="px-4 py-2">{gudang?.totalEmployee}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      handleLihatDetail(gudang.id, gudang.location.id)
                    }
                    className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-900 cursor-pointer"
                  >
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          console.log("gudangList: ", gudangList);
        }}
      >
        Check
      </button>
    </div>
  );
};

export default DaftarGudang;
