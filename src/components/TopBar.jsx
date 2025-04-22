import logo from "../assets/logo_ajf.svg";
import { IoIosNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import profileAvatar from "../assets/profile_avatar.svg";
import { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");
  const photoProfile = localStorage.getItem("photoProfile");

  const [isOptionExpanded, setIsOptionExpanded] = useState(false);
  const profileHandle = () => {
    setIsOptionExpanded(!isOptionExpanded);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/auth/login", { replace: true });
  };

  return (
    <div>
      <nav className="bg-white p-4 shadow-sm">
        <div className="px-6 lg:px-16 flex justify-between items-center flex-wrap gap-4">
          {/* logo & company name */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="AJF Logo"
              className="w-12 h-12 sm:w-14 sm:h-14"
            />
            <div>
              <h1 className="text-base sm:text-lg font-bold whitespace-nowrap">
                Anugerah Jaya Farm
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Platform Monitoring Digital
              </p>
            </div>
          </div>

          {/* profile section */}
          <div className="flex items-center gap-4">
            <IoIosNotificationsOutline
              size={28}
              className="text-black cursor-pointer"
            />
            <div className="h-6 w-[1px] bg-gray-400 rounded-full" />

            <div className="flex items-center gap-6">
              {/* profile picture */}
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden">
                <img src={photoProfile} alt="Profile Avatar" />
              </div>

              {/* user name + role */}
              <div className="">
                <p className="text-base font-bold leading-tight">{userName}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>

              {/* dropdown arrow */}
              <div className="">
                <div
                  onClick={profileHandle}
                  className="h-8 w-8 border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-200 cursor-pointer"
                >
                  <IoIosArrowDown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dropdown Content */}
      {isOptionExpanded && (
        <div className="absolute right-18 mt-4 z-50 ">
          {/* Triangle */}
          <div className="absolute -top-2 right-4">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
          </div>

          <div className="bg-white rounded-lg shadow-lg w-48 px-3 py-4">
            {/* Profil */}
            <button
              onClick={() => {
                onProfile?.();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 mb-2 border rounded-md hover:bg-gray-100 font-semibold cursor-pointer"
            >
              <FiUser /> Profil
            </button>

            {/* Keluar */}
            <button
              onClick={() => {
                onLogout?.();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 font-semibold cursor-pointer"
            >
              <FiLogOut /> Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
