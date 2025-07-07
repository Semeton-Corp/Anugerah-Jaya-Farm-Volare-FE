import React from "react";

const TambahPekerjaModal = ({
  isOpen,
  onClose,
  onSave,
  jabatanOptions = [],
  pekerjaOptions = [],
  selectedJabatan,
  setSelectedJabatan,
  selectedPekerja,
  setSelectedPekerja,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md relative shadow-lg">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Tambah Pekerja</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Jabatan</label>
            <select
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={selectedJabatan}
              onChange={(e) => setSelectedJabatan(e.target.value)}
            >
              <option value="">Pilih Jabatan</option>
              {jabatanOptions.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Nama Pekerja</label>
            <select
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={selectedPekerja}
              onChange={(e) => setSelectedPekerja(e.target.value)}
            >
              <option value="">Pilih Pekerja</option>
              {pekerjaOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onSave}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahPekerjaModal;
