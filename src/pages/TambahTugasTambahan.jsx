import React, { useState } from "react";

const TambahTugasTambahan = () => {
  const [taskName, setTaskName] = useState("");
  const [site, setSite] = useState("");
  const [location, setLocation] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slot, setSlot] = useState(1);
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const [workers, setWorkers] = useState([{ role: "", name: "" }]);

  const handleAddWorker = () => {
    setWorkers([...workers, { role: "", name: "" }]);
  };

  const handleRemoveWorker = (index) => {
    const newWorkers = [...workers];
    newWorkers.splice(index, 1);
    setWorkers(newWorkers);
  };

  const handleWorkerChange = (index, field, value) => {
    const newWorkers = [...workers];
    newWorkers[index][field] = value;
    setWorkers(newWorkers);
  };

  const handleSubmit = () => {
    const payload = {
      taskName,
      site,
      location,
      specificLocation,
      date,
      time,
      slot,
      salary,
      description,
      workers,
    };
    console.log("Submitted data:", payload);
  };

  return (
    <div className="mx-6 p-6 bg-white rounded border space-y-4">
      <h1 className="text-2xl font-bold">Tambah Tugas Tambahan</h1>

      <div>
        <label className="block font-medium">Nama Tugas Tambahan</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Site</label>
          <select
            className="w-full border rounded p-2"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          >
            <option value="">Pilih Site</option>
            <option value="Sidodadi">Sidodadi</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Lokasi</label>
          <select
            className="w-full border rounded p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Pilih Lokasi</option>
            <option value="Kandang">Kandang</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Lokasi Spesifik</label>
          <select
            className="w-full border rounded p-2"
            value={specificLocation}
            onChange={(e) => setSpecificLocation(e.target.value)}
          >
            <option value="">Pilih Lokasi Spesifik</option>
            <option value="Sidodadi 01">Sidodadi 01</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Tanggal Pelaksanaan</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Waktu Pelaksanaan</label>
          <input
            type="time"
            className="w-full border rounded p-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Slot Pekerja</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">Pilih Pekerja (optional)</label>
        {workers.map((worker, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              className="flex-1 border rounded p-2"
              value={worker.role}
              onChange={(e) =>
                handleWorkerChange(index, "role", e.target.value)
              }
            >
              <option value="">Pilih Jabatan Pekerja</option>
              <option value="Mandor">Mandor</option>
              <option value="Pekerja">Pekerja</option>
            </select>
            <select
              className="flex-1 border rounded p-2"
              value={worker.name}
              onChange={(e) =>
                handleWorkerChange(index, "name", e.target.value)
              }
            >
              <option value="">Pilih Nama Pekerja</option>
              <option value="Budi">Budi</option>
              <option value="Siti">Siti</option>
            </select>
            <button
              onClick={() => handleRemoveWorker(index)}
              className="text-red-600 hover:text-red-800"
            >
              🗑️
            </button>
          </div>
        ))}
        <button
          onClick={handleAddWorker}
          className="mt-2 bg-yellow-500 text-black py-1 px-4 rounded hover:bg-yellow-600"
        >
          Tambah pekerja
        </button>
      </div>

      <div>
        <label className="block font-medium">Gaji Tambahan / Pekerja</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Rp 300.000"
        />
      </div>

      <div>
        <label className="block font-medium">Deskripsi Pekerjaan</label>
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-900"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default TambahTugasTambahan;
