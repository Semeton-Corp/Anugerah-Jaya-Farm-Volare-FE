import React from "react";
import { FiCheck } from "react-icons/fi";
import {
  getAdditionalWorks,
  getDailyWorkUser,
  takeAdditionalWorks,
  updateAdditionalWorkStaff,
  updateDailyWorkStaff,
} from "../services/dailyWorks";
import { useState, useEffect } from "react";
import {
  getTodayDateInBahasa,
  translateDateToBahasa,
} from "../utils/dateFormat";
import { getCurrentPresence } from "../services/presence";
import { PiCalendarBlank } from "react-icons/pi";

const DetailPenyelesaianPekerjaan = () => {
  const [tugasTambahanData, setTugasTambahanData] = useState([]);

  const [dailyWorks, setDailyWorks] = useState([]);
  const [additionalWorks, setAdditionalWorks] = useState([]);

  const fetchTugasTambahanData = async () => {
    try {
      const response = await getAdditionalWorks();
      console.log("response.data.data: ", response);

      if (response.status == 200) {
        setTugasTambahanData(response.data.data);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat memuat tugas rutin");
      console.log("Error: ", error);
    }
  };

  const fetchAllTugas = async () => {
    try {
      const response = await getDailyWorkUser();
      console.log("response fetch tugas tambahan data: ", response);

      if (response.status == 200) {
        setDailyWorks(response.data.data.dailyWorks);
        setAdditionalWorks(response.data.data.additionalWorks);

        // setTugasTambahanData(response.data.data);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat memuat tugas rutin");
      console.log("Error: ", error);
    }
  };

  const takeAdditionalTaskHandle = async (id) => {
    try {
      const takeResponse = await takeAdditionalWorks(id);
      console.log("takeResponse: ", takeResponse);
      if (takeResponse.status == 201) {
        fetchTugasTambahanData();
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const getTodayPresence = async (id) => {
    try {
      const presenceResponse = await getCurrentPresence();
      console.log("presenceResponse: ", presenceResponse);
      if (presenceResponse.status == 200) {
        setIsPresence(presenceResponse.data.data.isPresent);
        if (presenceResponse.data.data.isPresent) {
          fetchTugasTambahanData();
          fetchAllTugas();
        }
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    getTodayPresence();

    fetchTugasTambahanData();
    fetchAllTugas();
  }, []);

  const finishAdditionalTask = async (taskId) => {
    const payload = {
      isDone: true,
    };

    try {
      const updateResponse = await updateAdditionalWorkStaff(payload, taskId);
      console.log("updateResponse: ", updateResponse);
      if (updateResponse.status == 200) {
        fetchAllTugas();
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const finishDailyTask = async (taskId) => {
    const payload = {
      isDone: true,
    };

    try {
      const updateResponse = await updateDailyWorkStaff(payload, taskId);
      console.log("updateResponse: ", updateResponse);
      if (updateResponse.status == 200) {
        fetchAllTugas();
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Belum Diproses":
        return "bg-[#FF5E5E] text-[#640404]";
      case "Sedang Diproses":
        return "bg-orange-200 text-krisis-text-color";
      case "Selesai":
        return "bg-[#87FF8B] text-[#066000]";
      default:
        return "";
    }
  };

  return (
    <div className="p-4">
      {/* header */}
      <div className="flex justify-between mb-3">
        <div className="text-3xl font-bold mb-4">
          Detail Penyelesaian Pekerjaan
        </div>
        <div className="flex items-center rounded-lg px-4 py-1 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">
            Hari ini ({getTodayDateInBahasa()})
          </div>
        </div>
      </div>

      {/* tugas tambahan  */}
      <div className="border p-4 border-black-6 rounded-lg bg-white mb-3">
        <h2 className="text-xl font-semibold mb-4">Tugas Tambahan</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white text-left">
              <th className="py-2 px-4">Waktu</th>
              <th className="py-2 px-4">Nama Pekerjaan</th>
              <th className="py-2 px-4">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {additionalWorks?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.additionalWork.time}</td>
                <td className="py-2 px-4">{item.additionalWork.description}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      item.isDone
                        ? "bg-aman-box-surface-color text-aman-text-color"
                        : "bg-kritis-box-surface-color text-kritis-text-color"
                    }`}
                  >
                    {item.isDone ? "Selesai" : "Dalam Proses"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tugas hari ini */}
      <div className="border p-4 border-black-6 rounded-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Tugas Rutin</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white text-left">
              <th className="py-2 px-4">Waktu</th>
              <th className="py-2 px-4">Nama Pekerjaan</th>
              <th className="py-2 px-4">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {dailyWorks?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.dailyWork.endTime}</td>
                <td className="py-2 px-4">{item.dailyWork.description}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      item.isDone
                        ? "bg-aman-box-surface-color text-aman-text-color"
                        : "bg-kritis-box-surface-color text-kritis-text-color"
                    }`}
                  >
                    {item.isDone ? "Selesai" : "Tidak Selesai"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button
          onClick={() => {
            console.log("tugasTambahanData: ", tugasTambahanData);
            console.log("additionalWorks: ", additionalWorks);
          }}
        >
          check
        </button> */}
    </div>
  );
};

export default DetailPenyelesaianPekerjaan;
