import logo from "../assets/logo_ajf.svg";
import { IoIosNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import profileAvatar from "../assets/profile_avatar.svg";

export default function TopBar() {
  const profileHandle = () => {
    console.log("Profile dropdown clicked!");
  };

  return (
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
              <img src={profileAvatar} alt="Profile Avatar" />
            </div>

            {/* user name + role */}
            <div className="">
              <p className="text-base font-bold leading-tight">Jaya Mandiri</p>
              <p className="text-sm text-gray-500">Owner</p>
            </div>

            {/* dropdown arrow */}
            <div
              onClick={profileHandle}
              className="h-8 w-8 border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-200 cursor-pointer"
            >
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
