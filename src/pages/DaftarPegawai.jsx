import React from "react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarBlank } from "react-icons/pi";
import profileAvatar from "../assets/profile_avatar.svg";
import { useEffect } from "react";
import { getListStaff } from "../services/staff";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getListUser, getUserOverviewList } from "../services/user";
import { getRoles } from "../services/roles";
import { MdStore } from "react-icons/md";

const DaftarPegawai = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);

  const detailPages = ["tambah-pegawai", "profil"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const [pegawaiAktifData, setPegawaiAktifData] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const fetchPegawaiAktifData = async () => {
    try {
      const fetchResponse = await getUserOverviewList();
      console.log("fetchResponse:", fetchResponse);
      // console.log("fetchResponse: ", fetchResponse);
      if (fetchResponse.status == 200) {
        setPegawaiAktifData(fetchResponse.data.data.users);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const roleResponse = await getRoles();
      // console.log("roleResponse: ", roleResponse);
      if (roleResponse.status == 200) {
        setPegawaiAktifData(roleResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleDetail = (userId) => {
    navigate(`${location.pathname}/profil/${userId}`);
  };

  const tambahPegawaiHandle = () => {
    navigate(`${location.pathname}/tambah-pegawai`);
  };

  useEffect(() => {
    fetchPegawaiAktifData();
    fetchRoles();
    if (location.state?.refetch) {
      fetchPegawaiAktifData();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    fetchPegawaiAktifData();
  }, [query]);

  if (isDetailPage) {
    return <Outlet />;
  }
  return (
    <div className="flex flex-col px-4 py-3 gap-4 ">
      {/* header */}
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Daftar Pegawai</h1>
      </div>

      {/* entire box */}
      <div className=" rounded-[4px] border border-black-6">
        <div className="px-6 pt-8 pb-4 flex items-center justify-between border-b ">
          <p className="text-lg font-bold">Pegawai Aktif</p>
          <div
            onClick={tambahPegawaiHandle}
            className="rounded-[4px] py-2 px-6 bg-green-700 flex items-center justify-center text-white text-base font-medium hover:bg-green-900 cursor-pointer"
          >
            + Tambah pegawai
          </div>
        </div>

        {/* search & filters */}
        <div className="flex py-2 px-6 w-full justify-between">
          {/* search bar */}
          <div className="flex w-1/2  ">
            <div className="w-full flex border py-1 px-4 me-4 border-black-6 rounded-[4px]">
              <IoSearch size={24} className="me-2" />
              <input
                type="text"
                placeholder="Cari Pegawai...."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full focus:outline-none"
              />
            </div>
            <div className="rounded-[4px] py-2 px-4 bg-orange-400 flex items-center justify-center text-black text-base font-medium hover:bg-orange-500 cursor-pointer">
              Cari
            </div>
          </div>

          {/* filters */}
          <div className="flex gap-3">
            <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
              <MdStore size={18} />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="ml-2 bg-transparent text-base font-medium outline-none"
              >
                <option value="">Semua Site</option>
                {roleOptions.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-[4px] py-2 px-6 bg-orange-400 flex items-center justify-center text-black text-base font-medium hover:bg-orange-500 cursor-pointer">
              <PiCalendarBlank size={24} />
              <p>Bulan ini</p>
            </div>
          </div>
        </div>

        {/* pegawai table */}
        <div className="px-6 py-2">
          <table className="w-full ">
            <thead className="px-8 rounded-[4px] bg-green-700 text-white text-left">
              <tr>
                <th className="py-2 px-4">Pegawai</th>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Jabatan</th>
                <th className="py-2 px-4">Status Kinerja</th>
                <th className="py-2 px-4"></th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody className="">
              {pegawaiAktifData?.map((item, index) => (
                <tr key={index} className="border-b border-black-6">
                  <td className="py-3 px-4">
                    <div className="flex gap-6">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img src={item?.photoProfile} alt="Profile Avatar" />
                      </div>

                      <div className="">
                        <p className="text-base font-me leading-tight">
                          {item?.name}
                        </p>
                        <p className="text-sm text-gray-500">{item?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4">{item?.id}</td>
                  <td className="py-2 px-4">{item?.role?.name}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-block px-6 py-2 rounded-lg font-medium text-center
                        ${
                          ((item.kpiStatus || "").toLowerCase() === "baik" &&
                            "bg-[#87FF8B] text-black") ||
                          ((item.kpiStatus || "").toLowerCase() === "buruk" &&
                            "bg-[#FF5E5E] text-black") ||
                          "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {item.kpiStatus ?? "-"}
                    </span>
                  </td>
                  <td className="py-2 px-4">{item.salary}</td>
                  <td
                    onClick={() => {
                      handleDetail(item.id);
                    }}
                    className="py-2 px-4 underline text-black hover:text-black-6 cursor-pointer"
                  >
                    Detail
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* footer */}
          <div className="flex justify-between mt-16 px-6">
            <p className="text-sm text-[#CCCCCC]">Menampilkan 1-7 data</p>
            <div className="flex gap-3">
              <div className="rounded-[4px] py-2 px-6 bg-green-100 flex items-center justify-center text-black text-base font-medium hover:bg-green-200 cursor-pointer">
                <p>Previous </p>
              </div>
              <div className="rounded-[4px] py-2 px-6 bg-green-700 flex items-center justify-center text-white text-base font-medium hover:bg-green-800 cursor-pointer">
                <p>Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarPegawai;
