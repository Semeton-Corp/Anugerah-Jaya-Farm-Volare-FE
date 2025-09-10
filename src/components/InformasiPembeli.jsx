import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const InformasiPembeli = ({
  id,
  phone,
  setPhone,
  name,
  setName,
  customerType,
  setCustomerType,
  customers = [],
  setTransactionCount,
  setSelectedCustomerId,
}) => {
  const [mode, setMode] = useState("registered");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    const matched = customers.find((c) => c.phoneNumber === phone);
    if (matched) {
      setName(matched.name);
    } else {
      setName("-");
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    setPhone(input);

    if (mode === "registered") {
      const filtered = customers.filter((c) => c.phoneNumber.startsWith(input));
      setSuggestions(filtered);

      const matched = customers.find((c) => c.phoneNumber === phone);
      if (matched) {
        setName(matched.name);
        setTransactionCount(customer.totalTransaction);
        setSelectedCustomerId(costumer.id);
      } else {
        setName("");
        setTransactionCount(0);
        setSelectedCustomerId(0);
      }
    }
  };

  const handleSelectSuggestion = (customer) => {
    setPhone(customer.phoneNumber);
    setName(customer.name);
    setTransactionCount(customer.totalTransaction);
    setSelectedCustomerId(customer.id);
    setSuggestions([]);
  };

  return (
    <div className="border p-4 rounded">
      <div className="mb-3">
        <span className="font-semibold ">Informasi Pembeli</span>
      </div>
      {!id && (
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMode("registered");
                setCustomerType("Pelanggan Lama");
                setTransactionCount(0);
              }}
              className={`px-3 py-1 rounded border text-sm cursor-pointer ${
                mode === "registered"
                  ? "bg-green-100 border-green-600"
                  : "bg-white border-gray-300"
              }`}
            >
              Pelanggan terdaftar
            </button>
            <button
              onClick={() => {
                setMode("new");
                setCustomerType("Pelanggan Baru");
                setPhone("");
                setName("");
                setTransactionCount(0);
              }}
              className={`px-3 py-1 rounded border text-sm cursor-pointer ${
                mode === "new"
                  ? "bg-green-100 border-green-600"
                  : "bg-white border-gray-300"
              }`}
            >
              Pelanggan baru
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 items-start">
        <div>
          <label className="block mb-1 text-sm">Nomor Telepon</label>
          {id ? (
            <>
              <p className="text-lg font-bold">{phone}</p>
            </>
          ) : mode === "registered" ? (
            <div className="relative w-full">
              <div className="flex items-center border border-black rounded overflow-hidden w-full">
                <input
                  type="number"
                  placeholder="Masukkan nomor telepon"
                  className="flex-grow px-3 py-2 outline-none bg-gray-100"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                <button
                  onClick={handleSearch}
                  className="px-3 h-full bg-gray-100 border-l border-black text-gray-600 hover:text-black"
                >
                  <FaSearch />
                </button>
              </div>

              {/* dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded shadow-md z-50 mt-1 max-h-40 overflow-y-auto">
                  {suggestions.map((cust) => (
                    <div
                      key={cust.id}
                      onClick={() => handleSelectSuggestion(cust)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {cust.phoneNumber} - {cust.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <input
              type="number"
              className="w-full border bg-gray-100 p-2 rounded"
              placeholder="Masukkan nomor telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm">Nama Pelanggan</label>
          {id ? (
            <>
              <p className="text-lg font-bold">{name}</p>
            </>
          ) : mode === "registered" ? (
            <p className="pt-2 text-black">{name || "-"}</p>
          ) : (
            <input
              type="text"
              className="w-full bg-gray-100 p-2 rounded border"
              placeholder="Masukkan nama pelanggan"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
      </div>
      {/* <button
        onClick={() => {
          console.log("suggestions: ", suggestions);
        }}
      >
        CHECK
      </button> */}
    </div>
  );
};

export default InformasiPembeli;
