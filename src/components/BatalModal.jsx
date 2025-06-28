import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const BatalModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-60 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-md p-6 w-[320px] text-center">
        <FaTrashAlt className="text-3xl text-black mx-auto mb-4" />
        <p className="text-lg font-semibold mb-6">
          Apakah anda yakin untuk membatalkan pesanan ini ke gudang?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-black px-5 py-2 rounded font-semibold"
          >
            Tidak
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-5 py-2 rounded font-semibold flex items-center gap-2"
          >
            <FaTrashAlt className="text-sm" />
            Ya, Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatalModal;
