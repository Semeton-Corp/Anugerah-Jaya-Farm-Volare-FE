import React from "react";
import { useEffect } from "react";
import { getListStaff } from "../services/staff";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaChartLine, FaClock, FaLocationDot, FaMoneyBillWave } from "react-icons/fa6";
import { GiBirdCage, GiChicken } from "react-icons/gi";
import { PiCalendarBlank } from "react-icons/pi";
import { LuWheat } from "react-icons/lu";
import { MdEgg } from "react-icons/md";

const Profile = () => {
  const photoProfile = localStorage.getItem("photoProfile");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("role");

  const [myData, setMyData] = useState([]);

  const fetchMyData = async () => {
    try {
      const allStaffResponse = await getListStaff();
      console.log("allStaffResponse: ", allStaffResponse);
      if (allStaffResponse.status == 200) {
        const selectedData = allStaffResponse.data.data.staffs.find(
          (staff) => staff.name === userName
        );
        setMyData(selectedData);
        console.log("selectedData: ", selectedData);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    fetchMyData();
  }, []);
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
                <p className="max-w-60 text-base text-[#565656] break-words text-right">
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
                      <p className="text-3xl font-semibold pe-2">Rp 5.200.000</p>
                    </div>
                  </div>
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
