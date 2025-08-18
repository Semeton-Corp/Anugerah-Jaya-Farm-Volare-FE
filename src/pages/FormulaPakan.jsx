import React from "react";

const feedFormulaData = [
  {
    kategori: "DOC",
    usia: "1 Minggu",
    jenis: "Adukan",
    jumlah: "100gr/ayam",
    formula: ["65% Konsentrat", "15 % Premix"],
  },
  {
    kategori: "Grower",
    usia: "1 Minggu",
    jenis: "Adukan",
    jumlah: "100gr/ayam",
    formula: ["50% Konsentrat", "50 % Premix"],
  },
  {
    kategori: "Pre-Layer",
    usia: "1 Minggu",
    jenis: "Jadi",
    jumlah: "100gr/ayam",
    formula: ["50% Konsentrat", "50 % Premix"],
  },
  {
    kategori: "Layer",
    usia: "1 Minggu",
    jenis: "Jadi",
    jumlah: "100gr/ayam",
    formula: ["50% Konsentrat", "50 % Premix"],
  },
];

const FormulaPakan = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Formula Pakan</h1>

      <div className="p-8 bg-white rounded-lg border border-gray-200 w-full  mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-bold text-white  tracking-wider"
                >
                  Kategori Ayam
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left  font-bold text-white  tracking-wider"
                >
                  Usia Ayam
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left  font-bold text-white  tracking-wider"
                >
                  Jenis Pakan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left  font-bold text-white  tracking-wider"
                >
                  Jumlah Pakan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left  font-bold text-white  tracking-wider"
                >
                  Formula Pakan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left  font-bold text-white  tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedFormulaData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap  font-medium text-gray-900">
                    {item.kategori}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-600">
                    {item.usia}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-600">
                    {item.jenis}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-600">
                    {item.jumlah}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-600">
                    {item.formula.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="bg-green-700 hover:bg-green-900 cursor-pointer text-white font-semibold py-2 px-4 rounded transition-colors ">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormulaPakan;
