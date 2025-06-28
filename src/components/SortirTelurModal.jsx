import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";

const SortirTelurModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultKarpet = 2,
  defaultButirSisa = 4,
  defaultTelurBonyok = 20,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [karpet, setKarpet] = useState(defaultKarpet);
  const [butirSisa, setButirSisa] = useState(defaultButirSisa);
  const [telurBonyok, setTelurBonyok] = useState(defaultTelurBonyok);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit?.({
      karpet,
      butirSisa,
      telurBonyok,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/15 bg-opacity-60 flex justify-center items-center z-[9999] ">
      <div className="bg-white rounded-xl border shadow p-6 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-6">Sortir Telur Retak</h2>

        {/* TELUR RETAK */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg">Telur Retak</span>
            <button
              onClick={() => setEditMode(!editMode)}
              className="hover:text-black-7 cursor-pointer"
            >
              <BiSolidEditAlt size={36} />
            </button>
          </div>

          {!editMode ? (
            <div className="grid grid-cols-2 gap-4 font-medium">
              <div>
                <p className="text-sm text-gray-600">Jumlah Karpet</p>
                <p className="text-lg">{karpet}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Jumlah Telur Butir Sisa</p>
                <p className="text-lg">{butirSisa}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm mb-1">Jumlah Barang</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={karpet}
                    onChange={(e) => setKarpet(e.target.value)}
                    className="w-full bg-gray-100 p-2 rounded"
                  />
                  <span className="font-semibold">Karpet</span>
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-sm mb-1 invisible">label</label>
                <div className="flex items-center gap-2 mt-[7px]">
                  <input
                    type="number"
                    value={butirSisa}
                    onChange={(e) => setButirSisa(e.target.value)}
                    className="w-full bg-gray-100 p-2 rounded"
                  />
                  <span className="font-semibold">Butir</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TELUR BONYOK */}
        <div className="mb-10">
          <span className="font-semibold text-lg block mb-2">Telur Bonyok</span>
          <div>
            <label className="block text-sm mb-1">Jumlah Barang</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={telurBonyok}
                onChange={(e) => setTelurBonyok(e.target.value)}
                className="w-full bg-gray-100 p-2 rounded"
              />
              <span className="font-semibold">Butir</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="bg-green-200 hover:bg-green-500 text-black px-4 py-2 rounded cursor-pointer me-4"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded"
          >
            Sortir
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortirTelurModal;
