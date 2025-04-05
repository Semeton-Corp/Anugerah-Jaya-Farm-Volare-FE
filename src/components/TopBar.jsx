import logo from "../assets/logo_ajf.svg";
import { IoIosNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import profileAvatar from "../assets/profile_avatar.svg";

export default function TopBar() {
  const profileHandle = () => {
    console.log("Profile dropdown clicked!");
  };
  return (
    <nav className="bg-white p-4 shadow-lg ">
      <div className="px-16 flex justify-between">
        {/* logo & company name */}
        <div className="flex">
          <img
            src={logo}
            alt="AJF Logo"
            className="md:w-14 md:h-14 w-14 h-14 mr-4"
          />
          <div>
            <h1 className="md:text-lg text-base font-bold md:w-60 w-35">
              Anugerah Jaya Farm
            </h1>
            <p className="text-base md:text-lg">Platform Monitoring Digital</p>
          </div>
        </div>

        {/* profile section */}
        <div className="flex items-center">
          <IoIosNotificationsOutline size={36} className="mx-4" />
          <div className="h-full w-[2px] bg-black-7 rounded-full" />
          <div className="flex">
            {/* profile picture */}
            <div className="mx-4 h-14 w-14 rounded-full">
              <img src={profileAvatar} alt="Profile Avatar" />
            </div>
            <div>
              {/* user name */}
              <p className="text-lg font-bold">Jaya Mandiri</p>
              <p className="text-base">Owner</p>
            </div>
          </div>

          {/* arrow down */}
          <div
            onClick={profileHandle}
            className="mx-4 rounded-full border-black-10 border-1 h-8 w-8 flex justify-center items-center hover:bg-black-6 cursor-pointer"
          >
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </nav>
  );
}
