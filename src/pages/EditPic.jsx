import React, { useState } from "react";

const EditPic = () => {
  const [form, setForm] = useState({
    picKandang: "Siti Rahayu",
    picTelur: "Budi Santoso",
  });

  const picOptions = ["Siti Rahayu", "Yono", "Budi Santoso", "Abdi"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("PIC Updated:", form);
  };

  return (
    <div className=" m-8 p-8 border rounded shadow bg-white">
      <h2 className="text-lg font-bold mb-6">Edit PIC</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">PIC Kandang</label>
          <select
            name="picKandang"
            value={form.picKandang}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-gray-100"
          >
            {picOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">PIC Telur</label>
          <select
            name="picTelur"
            value={form.picTelur}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-gray-100"
          >
            {picOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPic;
