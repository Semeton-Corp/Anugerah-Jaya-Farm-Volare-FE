import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { sidebarMenus } from "../data/SidebarMenus";
import { useLocation, useNavigate } from "react-router-dom";

const SideNavbar = ({ role, isExpanded, setIsExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const menuItems = sidebarMenus[role] || [];

  const currentPath = location.pathname;

  return (
    <div
      className={`bg-green-700 text-shadow-black-13 h-screen transition-all flex flex-col duration-100 justify-between ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="mt-[122px] space-y-[24px]">
        {menuItems.map((item, idx) => {
          const rolePath = role.toLowerCase().replace(/\s+/g, "-");
          const tabPath = item.tabName.toLowerCase().replace(/\s+/g, "-");
          const fullPath = `/${rolePath}/${tabPath}`;
          const isSelected = currentPath === fullPath;

          return (
            <SidebarItem
              key={idx}
              icon={item.icon}
              tabName={item.tabName}
              isExpanded={isExpanded}
              isSelected={isSelected}
              onClick={() => navigate(fullPath)}
            />
          );
        })}
      </nav>
      <div className="flex items-center justify-center p-4">
        <button
          onClick={toggleSidebar}
          className={`${isExpanded ? "ml-auto" : ""}`}
        >
          {isExpanded ? (
            <MdKeyboardDoubleArrowLeft className="text-black-1 w-8 h-8 hover:text-black-7 cursor-pointer" />
          ) : (
            <MdKeyboardDoubleArrowRight className="text-black-1 w-8 h-8 hover:text-black-7 cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, tabName, isExpanded, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center mx-4 py-4 rounded-[6px] cursor-pointer transition
        ${isExpanded ? "justify-start px-6" : "justify-center"}
        ${isSelected ? "bg-orange-500" : "bg-orange-50 hover:bg-green-600"}
      `}
    >
      <div>{icon}</div>
      {isExpanded && (
        <span className="text-black-13 mx-4 font-semibold">{tabName}</span>
      )}
    </div>
  );
};

export default SideNavbar;
