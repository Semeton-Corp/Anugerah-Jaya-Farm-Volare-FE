import React from "react";
import logo from "../assets/logo_ajf.svg";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  function backHandle() {
    navigate("/auth/login");
  }

  function nextHandle() {
    navigate("/auth/verification");
  }

  return (
    <div className="flex h-screen justify-center mt-18 md:mt-48  px-4">
      <div className="w-full max-w-[720px] p-4 md:p-0">
        {/* logo and welcoming text */}
        <div className="mb-6">
          <img
            src={logo}
            alt="AJF Logo"
            className=" md:w-24 md:h-24 w-14 h-14"
          />
          <p className="text-xl md:text-3xl font-bold mt-4">
            Mengatur ulang Kata Sandi
          </p>
          <p className="text-base md:text-lg text-gray-600">
            Masukkan email yang terdaftar dalam akun
          </p>
        </div>

        {/* email field */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Masukkan email anda"
            className="w-full p-3 border-2 bg-green-50 border-green-200 placeholder-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => backHandle()}
            className=" bg-green-200 text-base font-medium border-green-400 py-3 px-6 rounded-lg hover:bg-green-300 transition duration-300"
          >
            Kembali
          </button>
          <div></div>
          <button
            onClick={() => nextHandle()}
            className=" bg-green-700 text-green-50 font-medium py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
