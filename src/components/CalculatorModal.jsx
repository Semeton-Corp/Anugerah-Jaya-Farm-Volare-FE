import React, { useState } from "react";
import { create, all } from "mathjs";

const math = create(all);

const CalculatorModal = ({ onClose, onApply }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInput = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const handleEvaluate = () => {
    try {
      const evaluated = math.evaluate(input);
      setResult(evaluated);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleApply = () => {
    if (result !== "") {
      onApply(result);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[360px] max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Kalkulator</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 text-xl font-bold hover:bg-black-6 rounded-full cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Jumlah Karpet</label>
          <input
            type="text"
            className="w-full border rounded p-2 bg-black-4"
            value={input}
            placeholder="Masukkan jumlah telur Karpet"
            readOnly
          />
          <div className="mt-2 text-right text-lg font-bold">
            {input && result ? `${input} = ${result}` : null}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            "7",
            "8",
            "9",
            "+",
            "4",
            "5",
            "6",
            "-",
            "1",
            "2",
            "3",
            "*",
            "0",
            ".",
            "C",
            "/",
          ].map((btn) => (
            <button
              key={btn}
              className="py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => {
                if (btn === "C") clearInput();
                else handleInput(btn);
              }}
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleEvaluate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            =
          </button>
          <button
            onClick={handleApply}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            Masukkan hasil ke kolom
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorModal;
