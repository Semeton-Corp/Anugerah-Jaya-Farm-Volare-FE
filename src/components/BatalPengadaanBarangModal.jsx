export default function BatalPengadaanBarangModal({
  isOpen,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/15 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        <h3 className="text-lg font-semibold mb-4">
          Apakah anda yakin untuk pengadaan barang ini?
        </h3>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-black font-semibold cursor-pointer"
          >
            Tidak
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold cursor-pointer"
          >
            Ya, Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
