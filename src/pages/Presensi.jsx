import React, { useEffect, useState } from "react";
import { getTodayDateInBahasa } from "../utils/dateFormat";
import { PiCalendarBlank } from "react-icons/pi";
import {
  getCurrentPresence,
  arrivalPresence,
  departurePresence,
  getAllPresence,
} from "../services/presence";

const Presensi = () => {
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
        setAttendanceData();
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
  }, []);
  // const attendanceData = [
  //   {
  //     date: "25 Maret 2025",
  //     in: "07:00",
  //     out: "17:00",
  //     overtime: "2 Jam",
  //     status: "Hadir",
  //   },
  //   {
  //     date: "24 Maret 2025",
  //     in: "07:00",
  //     out: "12:00",
  //     overtime: "-",
  //     status: "Hadir",
  //   },
  //   {
  //     date: "23 Maret 2025",
  //     in: "-",
  //     out: "-",
  //     overtime: "-",
  //     status: "Tidak Hadir",
  //   },
  //   {
  //     date: "22 Maret 2025",
  //     in: "-",
  //     out: "-",
  //     overtime: "-",
  //     status: "Tidak Hadir",
  //   },
  // ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Presensi</h1>

      {/* Presensi Harian */}
      <div className="bg-white rounded border border-black-6 p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-lg">Presensi Harian</h2>
          <p className="text-sm">{getTodayDateInBahasa()}</p>
        </div>
        <div
          onClick={isPresence ? departureHandlePresence : arrivalHandlePresence}
          className={`text-center py-2 rounded text-lg font-semibold ${
            isGoHome
              ? "bg-black-5  text-black-8"
              : isPresence
              ? "bg-kritis-box-surface-color hover:bg-[#C34747] text-kritis-text-color cursor-pointer hover:text-white "
              : "bg-aman-box-surface-color hover:bg-[#1D7E20] text-aman-text-color cursor-pointer hover:text-white "
          }`}
        >
          {isGoHome
            ? "Anda sudah melakukan presensi hari ini"
            : isPresence
            ? "Pulang"
            : "Hadir"}
        </div>
      </div>

      {/* Tabel Presensi */}
      <div className="bg-white rounded border border-black-6 p-6">
        <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
          <div></div>
          <div className="flex items-center rounded-lg px-4 py-2 bg-orange-300 hover:bg-orange-500 cursor-pointer">
            <PiCalendarBlank size={18} />
            <div className="text-base font-medium ms-2">
              Hari ini ({getTodayDateInBahasa()})
            </div>
          </div>
        </div>

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
                <td className="p-2">{row.in}</td>
                <td className="p-2">{row.out}</td>
                <td className="p-2">{row.overtime}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded ${
                      row.status === "Hadir"
                        ? "bg-aman-box-surface-color text-aman-text-color"
                        : "bg-kritis-box-surface-color text-kritis-text-color"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Presensi;
