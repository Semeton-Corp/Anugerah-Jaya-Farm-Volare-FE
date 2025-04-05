import React from "react";
import logo from "../assets/logo_ajf.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  function forgotPasswordHandle() {
    navigate("/auth/forgot-password");
  }

  function loginHandle() {
    console.log("LOGIN BUTTON CLICKED");
  }

  return (
    <div className="relative md:h-screen w-screen">
      {/* left login item */}
      <div className="absolute left-0 w-full md:w-1/2 h-full flex flex-col  md:justify-center md:p-16 pt-8 px-8 z-10 mt-36 md:mt-0 rounded-t-[56px] bg-white">
        {/* logo & company name */}
        <div className="flex items-center mb-8">
          <img
            src={logo}
            alt="AJF Logo"
            className="md:w-24 md:h-24 w-14 h-14 mr-4"
          />
          <h1 className="md:text-2xl text-base font-bold md:w-60 w-35">
            Anugerah Jaya Farm
          </h1>
        </div>
        {/* welcoming text */}
        <div className="mb-8">
          <p className="text-xl md:text-3xl font-bold">Masuk ke akun anda</p>
          <p className="text-base md:text-lg">
            Platform Monitoring Digital Terintegrasi
          </p>
        </div>

        {/* email field */}
        <div className="mb-4">
          <p className="text-base md:text-lg font-medium">Email</p>
          <input
            type="email"
            id="email"
            placeholder="Masukkan email anda"
            className="w-full p-3 border-2 bg-green-50 border-green-200 placeholder-normal rounded-lg focus:outline-none focus:ring-2 focus:green-400"
          />
        </div>

        {/* email field */}
        <div className="mb-4">
          <p className="text-base md:text-lg font-medium">Kata Sandi</p>
          <input
            type="password"
            id="password"
            placeholder="Masukkan kata sandi anda"
            className="w-full p-3 border-2 bg-green-50 border-green-200 placeholder-normal rounded-lg focus:outline-none focus:ring-2 focus:green-400"
          />
        </div>

        {/* lupa password */}
        <div className="flex justify-between mb-4">
          <div></div>
          <p
            onClick={() => {
              forgotPasswordHandle();
            }}
            className="text-sm md:text-base underline text-dark-active cursor-pointer hover:text-light-hover"
          >
            Lupa Password?
          </p>
        </div>

        {/* login button */}
        <div className="">
          <button
            onClick={() => {
              loginHandle();
            }}
            className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition duration-300"
          >
            Masuk
          </button>
        </div>
      </div>
      {/* right login item */}
      <div className="w-full top-0 md:absolute right-0 sm:top-0 md:z-0 md:w-1/2 h-[40%] md:h-full">
        <img
          src="/photo_login_page.png"
          alt="Login Page Photo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
