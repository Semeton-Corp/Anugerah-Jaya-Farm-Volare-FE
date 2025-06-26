// Update on CalculatorInput.jsx
import React, { useState } from "react";
import { PiCalculator } from "react-icons/pi";
import CalculatorModal from "./CalculatorModal";

const CalculatorInput = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCalculatorResult = (result) => {
    console.log("[Calculator Result]", result);
    onChange(result);
    setIsOpen(false);
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <div className="flex items-center border rounded p-2 bg-black-4 cursor-pointer">
        <input
          type="number"
          value={value}
          className="flex-grow bg-transparent focus:outline-none"
          placeholder={`Masukkan ${label}`}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <PiCalculator
          onClick={() => setIsOpen(true)}
          size={20}
          className="ml-2 text-black hover:text-gray-500"
        />
      </div>

      {isOpen && (
        <CalculatorModal
          label={label}
          onClose={() => setIsOpen(false)}
          onApply={handleCalculatorResult}
        />
      )}
    </div>
  );
};

export default CalculatorInput;
