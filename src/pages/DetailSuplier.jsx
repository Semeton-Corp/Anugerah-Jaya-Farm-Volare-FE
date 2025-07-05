import React, { useState } from "react";

const DetailSupplier = () => {
  const [showModal, setShowModal] = useState(false);

  const supplier = {
    name: "Super Jagung",
    address: "JL. AJF 2",
    phone: "0812345678",
    items: ["Jagung"],
  };

  const handleDelete = () => {
    console.log("Supplier deleted!");
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Detail Supplier</h1>

      <div className="bg-white border rounded p-4">
        <p className="text-sm text-gray-600">Nama Supplier</p>
        <p className="font-bold">{supplier.name}</p>

        <p className="text-sm text-gray-600 mt-4">Alamat Supplier</p>
        <p className="font-bold">{supplier.address}</p>

        <p className="text-sm text-gray-600 mt-4">Nomor Telepon Supplier</p>
        <p className="font-bold">{supplier.phone}</p>
      </div>

      <div className="bg-white border rounded p-4">
        <p className="text-sm font-semibold">Daftar barang yang disupply</p>
        {supplier.items.map((item, index) => (
          <p key={index} className="font-bold">
            {item}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="bg-teal-700 hover:bg-teal-900 text-white px-4 py-2 rounded">
          Edit Supplier
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Hapus Supplier
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-center text-lg font-semibold mb-4">
              Apakah anda yakin untuk pengadaan barang ini?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-semibold"
              >
                Tidak
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailSupplier;
