import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { sidebarMenus } from "../data/SidebarMenus";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const SideNavbar = ({ role, isExpanded, setIsExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const menuItems = sidebarMenus[role] || [];

  const currentPath = location.pathname;
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSubmenu = (tabName) => {
    setExpandedMenu(expandedMenu === tabName ? null : tabName);
  };

  return (
    <div
      className={`bg-green-700 text-shadow-black-13 h-full transition-all flex flex-col duration-100 justify-between ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="mt-[122px] space-y-[24px]">
        {menuItems.map((item, idx) => {
          const rolePath = role.toLowerCase().replace(/\s+/g, "-");
          const tabPath = item.tabName.toLowerCase().replace(/\s+/g, "-");
          const fullPath = `/${rolePath}/${tabPath}`;

          const currentPathStr = Array.isArray(currentPath)
            ? currentPath[0]
            : currentPath;
          const fullPathStr = Array.isArray(fullPath) ? fullPath[0] : fullPath;

          const hasSubTabs =
            Array.isArray(item.subTabs) && item.subTabs.length > 0;
          const isExpandedMenu = expandedMenu === item.tabName;

          // Determine if any subTab is selected
          const isAnySubTabSelected =
            hasSubTabs &&
            item.subTabs.some((subTab) => {
              const subLabel =
                typeof subTab === "string" ? subTab : subTab?.tabName || "";
              const subPath = subLabel
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "-");
              const fullSubPath = `/${rolePath}/${tabPath}/${subPath}`;
              return currentPath === fullSubPath;
            });

          const isSelected =
            currentPathStr === fullPathStr ||
            currentPathStr.startsWith(fullPathStr + "/") ||
            isAnySubTabSelected;

          return (
            <div key={idx}>
              <SidebarItem
                icon={item.icon}
                tabName={item.tabName}
                isExpanded={isExpanded}
                isSelected={isSelected}
                onClick={() => {
                  if (hasSubTabs) {
                    toggleSubmenu(item.tabName);
                    if (!isExpanded) {
                      toggleSidebar();
                    }
                  } else {
                    navigate(fullPath);
                  }
                }}
                showArrow={hasSubTabs}
                isArrowDown={isExpandedMenu}
              />

              {hasSubTabs && isExpandedMenu && (
                <div className="ml-8 mt-3 me-4 space-y-3">
                  {item.subTabs.map((subTab, sIdx) => {
                    const subLabel =
                      typeof subTab === "string"
                        ? subTab
                        : subTab?.tabName || "";
                    const subPath = subLabel
                      .toString()
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    const fullSubPath = `/${rolePath}/${tabPath}/${subPath}`;
                    const isSubSelected =
                      currentPath === fullSubPath ||
                      currentPath.startsWith(fullSubPath + "/");
                    console.log("==================");

                    console.log("fullSubPath: ", fullSubPath);
                    console.log("currentPath", currentPath);
                    console.log("isSubSelected", isSubSelected);

                    return (
                      <div
                        key={sIdx}
                        onClick={() => navigate(fullSubPath)}
                        className={`text-sm rounded-md py-3 px-3 cursor-pointer font-medium ${
                          isSubSelected
                            ? "bg-orange-500"
                            : "bg-orange-50 hover:bg-green-600"
                        }`}
                      >
                        {subLabel}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="flex items-center justify-center p-4">
        <button
          onClick={() => {
            if (expandedMenu) {
              toggleSubmenu();
            }
            toggleSidebar();
          }}
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

const SidebarItem = ({
  icon,
  tabName,
  isExpanded,
  isSelected,
  onClick,
  showArrow,
  isArrowDown,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center mx-4 py-4 rounded-[6px] cursor-pointer transition
        ${isExpanded ? "justify-between px-6" : "justify-center"}
        ${isSelected ? "bg-orange-500" : "bg-orange-50 hover:bg-green-600"}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        {isExpanded && (
          <span className="text-black-13 font-semibold">{tabName}</span>
        )}
      </div>
      {isExpanded &&
        showArrow &&
        (isArrowDown ? <IoIosArrowDown /> : <IoIosArrowForward />)}
    </div>
  );
};

export default SideNavbar;
