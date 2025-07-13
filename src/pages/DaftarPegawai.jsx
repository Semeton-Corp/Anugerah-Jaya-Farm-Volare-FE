import React from "react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiCalendarBlank } from "react-icons/pi";
import profileAvatar from "../assets/profile_avatar.svg";
import { useEffect } from "react";
import { getListStaff } from "../services/staff";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getListUser } from "../services/user";

const pegawaiAktif = [
  {
    nama: "Budi Santoso",
    email: "budi.s@company.com",
    id: "ID12345",
    jabatan: "Kepala Kandang",
    gaji: 5200000,
  },
  {
    nama: "Gede Indra",
    email: "indra@company.com",
    id: "ID123456",
    jabatan: "Pekerja Gudang",
    gaji: 2500000,
  },
  {
    nama: "Siti Rahayu",
    email: "siti@company.com",
    id: "ID1234567",
    jabatan: "Pekerja Toko",
    gaji: 1500000,
  },
  {
    nama: "Siti Rahayu",
    email: "siti@company.com",
    id: "ID1234567",
    jabatan: "Kepala Gudang",
    gaji: 4500000,
  },
  {
    nama: "Siti Rahayu",
    email: "siti@company.com",
    id: "ID1234567",
    jabatan: "Kepala Gudang",
    gaji: 4500000,
  },
  {
    nama: "Siti Rahayu",
    email: "siti@company.com",
    id: "ID1234567",
    jabatan: "Kepala Gudang",
    gaji: 4500000,
  },
  {
    nama: "Siti Rahayu",
    email: "siti@company.com",
    id: "ID1234567",
    jabatan: "Kepala Gudang",
    gaji: 4500000,
  },
  {
    nama: "Budi Santoso",
    email: "budi.s@company.com",
    id: "ID12345",
    jabatan: "Kepala Kandang",
    gaji: 5200000,
  },
  {
    nama: "Gede Indra",
    email: "indra@company.com",
    id: "ID123456",
    jabatan: "Pekerja Gudang",
    gaji: 2500000,
  },
  {
    nama: "Siti Rahayu",
    email: "siti@company.com",
    id: "ID1234567",
    jabatan: "Pekerja Toko",
    gaji: 1500000,
  },
];

const DaftarPegawai = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);

  const detailPages = ["tambah-pegawai"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const [pegawaiAktifData, setPegawaiAktifData] = useState([]);

  const fectPegawaiAktifData = async () => {
    try {
      console.log("page: ", page);
      const fetchResponse = await getListUser({ page: page });
      console.log("fetchResponse: ", fetchResponse);
      if (fetchResponse.status == 200) {
        setPegawaiAktifData(fetchResponse.data.data.users);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call parent function with search input
  };

  const tambahPegawaiHandle = () => {
    navigate(`${location.pathname}/tambah-pegawai`);
  };

  useEffect(() => {
    fectPegawaiAktifData();
    if (location.state?.refetch) {
      fectPegawaiAktifData();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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
            <div className="rounded-[4px] py-2 px-6 bg-orange-400 flex items-center justify-center text-black text-base font-medium hover:bg-orange-500 cursor-pointer">
              <p>Semua jabatan</p>
              <IoIosArrowDown size={24} />
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
                <th className="py-2 px-4">Gaji</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody className="">
              {pegawaiAktifData?.map((item, index) => (
                <tr key={index} className="border-b border-black-6">
                  <td className="py-3 px-4">
                    <div className="flex gap-6">
                      {/* profile picture */}
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img src={item.photoProfile} alt="Profile Avatar" />
                      </div>

                      {/* user name + role */}
                      <div className="">
                        <p className="text-base font-me leading-tight">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.role.name}</td>
                  <td className="py-2 px-4">{item.salary}</td>
                  <td className="py-2 px-4 underline text-black hover:text-black-6 cursor-pointer">
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
