import React, { useEffect, useState } from "react";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { PiCalendarBlank } from "react-icons/pi";
import {
  getCurrentPresence,
  arrivalPresence,
  departurePresence,
  getAllPresence,
} from "../services/presence";
const DetailAbsensi = () => {
  const [presenceId, setPresenceId] = useState(0);
  const [isPresence, setIsPresence] = useState(false);
  const [isGoHome, setIsGoHome] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  const monthNamesBahasa = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const today = new Date();
  const monthIndex = today.getMonth();
  const year = today.getFullYear();

  const monthName = monthNamesBahasa[monthIndex];
  const monthNumber = monthIndex + 1;

  const getTodayPresence = async (id) => {
    try {
      const presenceResponse = await getCurrentPresence();
      console.log("currentPresenceResponse: ", presenceResponse);
      if (presenceResponse.status == 200) {
        setPresenceId(presenceResponse.data.data.id);
        setIsPresence(presenceResponse.data.data.isPresent);
        if (presenceResponse.data.data.endTime != "-") {
          setIsGoHome(true);
        }
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const getAttandanceData = async () => {
    try {
      console.log("monthName: ", monthName);
      console.log("year: ", year);

      const allPresenceResponse = await getAllPresence(monthName, year);
      console.log("allPresenceResponse: ", allPresenceResponse);
      if (allPresenceResponse.status == 200) {
        setAttendanceData(allPresenceResponse.data.data.presences);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const arrivalHandlePresence = async () => {
    try {
      const presenceResponse = await arrivalPresence(presenceId);
      console.log("presenceResponse: ", presenceResponse);
      if (presenceResponse.status == 200) {
        setIsPresence(presenceResponse.data.data.isPresent);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const departureHandlePresence = async () => {
    try {
      const presenceResponse = await departurePresence(presenceId);
      console.log("presenceResponse: ", presenceResponse);
      if (presenceResponse.status == 200) {
        setIsGoHome(true);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    getTodayPresence();
    getAttandanceData();
  }, [isPresence, isGoHome]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h1 className="text-2xl font-bold mb-4">Detail Absensi</h1>
        <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-2">Bulan Ini</div>
        </div>
      </div>
      {/* Tabel Presensi */}
      <div className="bg-white rounded border border-black-6 p-6">
        <table className="w-full border-collapse ">
          <thead className="bg-green-700 text-white text-sm">
            <tr>
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-left">Jam masuk</th>
              <th className="p-2 text-left">Jam pulang</th>
              <th className="p-2 text-left">Jumlah Lembur</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{row.date}</td>
                <td className="p-2">{row.startTime}</td>
                <td className="p-2">{row.endTime}</td>
                <td className="p-2">{row.overTime}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded ${
                      row.startTime !== ""
                        ? "bg-aman-box-surface-color text-aman-text-color"
                        : "bg-kritis-box-surface-color text-kritis-text-color"
                    }`}
                  >
                    {row.startTime !== "" ? "Hadir" : "Tidak hadir"}
                  </span>
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
  );
};

export default DetailAbsensi;
