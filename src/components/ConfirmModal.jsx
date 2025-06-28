import React from "react";

const ConfirmUpdateModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/15 bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow p-6 w-[480px] text-center">
        <p className="text-lg font-semibold mb-6">
          Apakah anda yakin untuk memperbaharui stok ini?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-black px-4 py-2 rounded font-semibold"
          >
            Tidak
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-700 hover:bg-green-900 cursor-pointer text-white px-4 py-2 rounded font-semibold "
          >
            Ya, Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpdateModal;
