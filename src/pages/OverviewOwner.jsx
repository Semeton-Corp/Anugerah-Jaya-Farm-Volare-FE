import React from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { MdEgg } from "react-icons/md";

const OverviewOwner = () => {
  return (
    <div>
      {/* header section */}
      <div className="flex justify-between mb-4">
        {/* page name */}
        <h1 className="text-3xl font-bold">Overview</h1>
        <div></div>
        {/* filter field */}
        <div className="flex items-center rounded-[8px] px-[16px] py-[4px] bg-orange-300 hover:bg-orange-500 cursor-pointer">
          <PiCalendarBlank size={18} />
          <div className="text-base font-medium ms-4">
            Hari ini (20 Mar 2025)
          </div>
        </div>
      </div>

      {/* produksi & penjualan section */}
      <div className="flex justify-between ">
        {/* produksi telur */}
        <div className="me-4 p-4 w-full rounded-[4px] border-2 border-black-6 ">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Produksi telur</h2>
            <div></div>
            <div className="p-2 rounded-[12px] bg-green-700">
              <MdEgg size={24} color="white" />
            </div>
          </div>

          {/* 3 items */}
          <div className="flex justify-center">
            {/* item ikat */}
            <div className="mx-2 flex w-36 py-[16px] items-center justify-center bg-green-200 rounded-[4px] ">
              <div>
                <p className="text-[36px] font-bold w-full text-center">50</p>
                <p className="text-[24px] w-full text-center">Ikat</p>
              </div>
            </div>
            {/* item karpet */}
            <div className="mx-2 flex w-36 py-[16px] items-center justify-center bg-green-200 rounded-[4px] ">
              <div>
                <p className="text-[36px] font-bold w-full text-center">100</p>
                <p className="text-[24px] w-full text-center">Karpet</p>
              </div>
            </div>
            {/* item butir */}
            <div className="mx-2 flex w-36 py-[16px] items-center justify-center bg-green-200 rounded-[4px] ">
              <div className="flex flex-col justify-center items-center">
                <p className="text-[36px] font-bold w-full text-center">1000</p>
                <p className="text-[24px] w-full text-center">Butir</p>
              </div>
            </div>
          </div>
        </div>

        {/* penjualan telur */}
        <div className="me-4 p-4 w-full rounded-[4px] border-2 border-black-6 ">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Penjualan telur</h2>
            <div></div>
            <div className="p-2 rounded-[12px] bg-green-700">
              <MdEgg size={24} color="white" />
            </div>
          </div>

          {/* 3 items */}
          <div className="flex justify-center">
            {/* item ikat */}
            <div className="mx-2 flex w-36 py-[16px] items-center justify-center bg-green-200 rounded-[4px] ">
              <div>
                <p className="text-[36px] font-bold w-full text-center">50</p>
                <p className="text-[24px] w-full text-center">Ikat</p>
              </div>
            </div>
            {/* item karpet */}
            <div className="mx-2 flex w-36 py-[16px] items-center justify-center bg-green-200 rounded-[4px] ">
              <div>
                <p className="text-[36px] font-bold w-full text-center">100</p>
                <p className="text-[24px] w-full text-center">Karpet</p>
              </div>
            </div>
            {/* item butir */}
            <div className="mx-2 flex w-36 py-[16px] items-center justify-center bg-green-200 rounded-[4px] ">
              <div className="flex flex-col justify-center items-center">
                <p className="text-[36px] font-bold w-full text-center">1000</p>
                <p className="text-[24px] w-full text-center">Butir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewOwner;
