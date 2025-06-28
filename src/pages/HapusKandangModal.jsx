import React from "react";
import { MdWarning, MdDelete } from "react-icons/md";

const HapusKandangModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-center mb-4">Hapus Kandang</h2>
        <p className="text-center mb-6">
          Apakah anda yakin menghapus <strong>Kandang</strong> ini dari Daftar
          Kandang?
        </p>

        <div className="bg-red-100 text-red-800 border border-red-300 rounded p-4 mb-6">
          <div className="flex items-center gap-2 mb-1 font-semibold">
            <MdWarning size={20} />
            Peringatan
          </div>
          <p className="text-sm">
            Menghapus kandang ini akan menghilangkan dan menghapus data kandang,
            ayam, dan telur dari semua tabel terkait. Tindakan ini tidak dapat
            dipulihkan.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded font-medium cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded font-medium flex items-center gap-2 hover:bg-red-700 cursor-pointer"
          >
            <MdDelete size={18} />
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default HapusKandangModal;
