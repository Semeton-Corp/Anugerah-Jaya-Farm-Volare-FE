import React from "react";

const PindahAyamModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 text-center">
        <p className="text-lg font-semibold mb-6">
          Apakah anda yakin untuk memindahkan ayam ini?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded font-medium"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-teal-800 text-white px-4 py-2 rounded font-medium hover:bg-teal-900"
          >
            Ya, pindahkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PindahAyamModal;
