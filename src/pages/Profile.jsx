import React from "react";
import { useEffect } from "react";
import { getListStaff } from "../services/staff";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import {
  FaChartLine,
  FaClock,
  FaLocationDot,
  FaMoneyBillWave,
} from "react-icons/fa6";
import { GiBirdCage, GiChicken } from "react-icons/gi";
import { PiCalendarBlank } from "react-icons/pi";
import { LuWheat } from "react-icons/lu";
import { MdEgg } from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiMaximize2 } from "react-icons/fi";
import { formatRupiah } from "../utils/moneyFormat";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getListUser, getUserById } from "../services/user";

const data = [
  { date: "29 Mar", red: 300, yellow: 20 },
  { date: "30 Mar", red: 200, yellow: 22 },
  { date: "31 Mar", red: 400, yellow: 21 },
  { date: "01 Apr", red: 320, yellow: 18 },
  { date: "02 Apr", red: 250, yellow: 17 },
  { date: "03 Apr", red: 330, yellow: 18 },
  { date: "04 Apr", red: 480, yellow: 19 },
];

const salaryDetails = {
  baseSalary: 4500000,
  overtime: 450000,
  bonus: 250000,
  kasbon: 250000,
};

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const photoProfile = localStorage.getItem("photoProfile");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const detailPages = ["detail-absensi", "detail-penyelesaian-pekerjaan"];

  const isDetailPage = detailPages.some((segment) =>
    location.pathname.includes(segment)
  );

  const [myData, setMyData] = useState([]);

  const total =
    salaryDetails.baseSalary +
    salaryDetails.overtime +
    salaryDetails.bonus -
    salaryDetails.kasbon;

  const fetchMyData = async () => {
    try {
      const userResponse = await getUserById(userId);
      console.log("userResponse: ", userResponse);
      if (userResponse.status == 200) {
        setMyData(userResponse.data.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    fetchMyData();
  }, []);

  const detailAbsensiHandle = () => {
    navigate(`${location.pathname}/detail-absensi`);
  };

  const detailPenyelesaianPekerjaan = () => {
    navigate(`${location.pathname}/detail-penyelesaian-pekerjaan`);
  };

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col px-4 py-3 gap-4">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="flex gap-4">
        <div className="w-3/8">
          <div className="w-full rounded-[4px] border border-black-6 flex flex-col items-center px-4">
            <img
              className="mt-[30px] w-[125px] h-[125px] rounded-full mb-4"
              src={photoProfile}
              alt=""
            />
            <h1 className="text-lg font-bold">{myData.name}</h1>
            <div className="flex gap-3 mb-4">
              <p className="text-base">ID: </p>
              <p className="text-base">{myData.id} </p>
            </div>

            <div className="flex justify-between w-full px-4 mb-2">
              <div>
                <p className="text-base font-medium">Jabatan </p>
              </div>
              <div>
                <p className="text-base text-[#565656]">{myData.role?.name} </p>
              </div>
            </div>

            <div className="flex justify-between w-full px-4 mb-2">
              <div>
                <p className="text-base font-medium">Email </p>
              </div>
              <div>
                <p className=" text-base text-[#565656] break-words text-right">
                  {myData?.email}{" "}
                </p>
              </div>
            </div>

            <div className="flex justify-between w-full px-4 mb-2">
              <div>
                <p className="text-base font-medium">Nomor Telepon </p>
              </div>
              <div>
                <p className="max-w-60 text-base text-[#565656] break-words text-right">
                  {myData?.phoneNumber}{" "}
                </p>
              </div>
            </div>

            <div className="flex justify-between w-full px-4 mb-8">
              <div>
                <p className="text-base font-medium">Alamat Tinggal </p>
              </div>
              <div>
                <p className="max-w-60 text-base text-[#565656] break-words text-right">
                  {myData?.address}{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full">
            <button className="w-full rounded-[4px] cursor-pointer h-[40px] bg-orange-200 hover:bg-orange-500 flex items-center justify-center">
              <div className="flex gap-4">
                <RiEdit2Fill size={24} />
                <p className="text-lg font-medium">Edit Profil</p>
              </div>
            </button>
          </div>
        </div>

        {userRole !== "Owner" && (
          <div className="w-5/8">
            <div className="flex md:grid-cols-2 gap-4 justify-between">
              {/* telur OK */}
              <div className="p-4 w-full rounded-md bg-green-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Total jam kerja</h2>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <div className="p-2 rounded-xl bg-green-700">
                    <FaClock size={24} color="white" />
                  </div>
                  <div className="flex items-center">
                    {/* popuasl */}
                    <p className="text-3xl font-semibold me-3">190</p>
                    <p className="text-lg font-semibold">jam</p>
                  </div>
                </div>
              </div>

              {/* ayam sakit */}
              <div className="p-4 w-full rounded-md bg-green-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Skor KPI</h2>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="p-2 rounded-xl bg-green-700">
                      <FaChartLine size={24} color="white" />
                    </div>
                    <div className="flex items-center">
                      <p className="text-3xl font-semibold pe-2">80</p>
                      <p className="text-xl font-semibold">%</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* penjualan telur */}
              <div className="p-4 w-full rounded-md bg-green-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    Total Gaji Bulan ini
                  </h2>
                </div>

                <div className="flex flex-wrap gap-4">
                  {/* item butir */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="p-2 rounded-xl bg-green-700">
                      <FaMoneyBillWave size={24} color="white" />
                    </div>
                    <div className="flex items-center">
                      <p className="text-3xl font-semibold pe-2">
                        Rp 5.200.000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-black-6 bg-white rounded-md mt-4 ">
              <h2 className="text-lg font-semibold mb-4">Performa KPI</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="red"
                    stroke="#FF0000"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="yellow"
                    stroke="#FFD700"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-4 mt-4">
              {/* stok gudang */}
              <div className="bg-white flex-1 p-4 border border-black-6 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Total Presensi</h2>
                  <button
                    onClick={detailAbsensiHandle}
                    className="px-4 py-2 rounded-[4px] bg-orange-400 hover:bg-orange-600 cursor-pointer"
                  >
                    Detail
                  </button>
                </div>

                {/* the items */}
                <div className="flex w-full gap-4 px-4 justify-center">
                  {/* item 1 */}
                  <div className="border border-black-6 rounded-[4px] bg-white shadow-lg px-[32px] py-[18px]">
                    <div className="flex flex-col justify-center gap-2">
                      <div className="flex flex-col items-center">
                        <p className="text-[40px] font-bold">20</p>
                        <p className="text-xl">Barang</p>
                      </div>
                      <div className="rounded-[4px] bg-[#87FF8B] flex items-center">
                        <p className="w-full text-center">aman</p>
                      </div>
                    </div>
                  </div>
                  {/* item 2 */}
                  <div className="border border-black-6 rounded-[4px] bg-white shadow-lg px-[32px] py-[18px]">
                    <div className="flex flex-col justify-center gap-2">
                      <div className="flex flex-col items-center">
                        <p className="text-[40px] font-bold">5</p>
                        <p className="text-xl">Barang</p>
                      </div>
                      <div className="rounded-[4px] bg-[#FF5E5E] flex items-center">
                        <p className="w-full text-center">kritis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* stok gudang */}
              <div className="bg-white flex-1 p-4 border border-black-6 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Penyelesaian Tugas</h2>
                  <button
                    onClick={detailPenyelesaianPekerjaan}
                    className="px-4 py-2 rounded-[4px] bg-orange-400 hover:bg-orange-600 cursor-pointer"
                  >
                    Detail
                  </button>
                </div>

                {/* the items */}
                <div className="flex w-full gap-4 px-4 justify-center">
                  {/* item 1 */}
                  <div className="border border-black-6 rounded-[4px] bg-white shadow-lg px-[32px] py-[18px]">
                    <div className="flex flex-col justify-center gap-2">
                      <div className="flex flex-col items-center">
                        <p className="text-[40px] font-bold">20</p>
                        <p className="text-xl">Barang</p>
                      </div>
                      <div className="rounded-[4px] bg-[#87FF8B] flex items-center">
                        <p className="w-full text-center">aman</p>
                      </div>
                    </div>
                  </div>
                  {/* item 2 */}
                  <div className="border border-black-6 rounded-[4px] bg-white shadow-lg px-[32px] py-[18px]">
                    <div className="flex flex-col justify-center gap-2">
                      <div className="flex flex-col items-center">
                        <p className="text-[40px] font-bold">5</p>
                        <p className="text-xl">Barang</p>
                      </div>
                      <div className="rounded-[4px] bg-[#FF5E5E] flex items-center">
                        <p className="w-full text-center">kritis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-black-6 mt-4 rounded-[4px] w-full bg-white">
              <h2 className="text-lg font-semibold mb-4">Rincian gaji</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-1">
                  <span>Gaji Pokok</span>
                  <span>{formatRupiah(salaryDetails.baseSalary)}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Lembur (12 jam)</span>
                  <span>{formatRupiah(salaryDetails.overtime)}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Bonus</span>
                  <span>{formatRupiah(salaryDetails.bonus)}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Kasbon</span>
                  <span className="font-semibold text-red-600">
                    -{formatRupiah(salaryDetails.kasbon)}
                  </span>
                </div>
                <div className="flex justify-between font-bold pt-2">
                  <span>Total</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
