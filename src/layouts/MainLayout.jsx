import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideNavbar from "../components/SideNavBar";
import { useState } from "react";

const MainLayout = ({ role }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Sidebar absolute to sit behind TopBar */}
      <div className="absolute top-0 left-0 h-full z-10">
        <SideNavbar
          role={role}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </div>

      {/* Main content shifted right */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* TopBar on top with higher z-index */}
        <div className="z-20 w-full">
          <TopBar />
        </div>

        {/* Page Content */}
        <main className="ml-28 mt-4 me-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
