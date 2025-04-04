import React from "react";
import logo from "../assets/logo_ajf.svg";

const Login = () => {
  function forgotPasswordHandle() {
    console.log("LUPA PASWORDD HANDLE");
  }

  function loginHandle() {
    console.log("LOGIN BUTTON CLICKED");
  }

  return (
    <div className="relative flex h-screen w-screen">
      {/* left login item */}
      <div className="w-1/2 h-full flex flex-col justify-center p-28">
        {/* logo & company name */}
        <div className="flex items-center mb-8">
          <img src={logo} alt="AJF Logo" className="w-24 h-24 mr-4" />
          <h1 className="text-2xl font-bold w-60">Anugerah Jaya Farm</h1>
        </div>
        {/* welcoming text */}
        <div className="mb-8">
          <p className="text-3xl font-bold">Masuk ke akun anda</p>
          <p className="text-lg">Platform Monitoring Digital Terintegrasi</p>
        </div>

        {/* email field */}
        <div className="mb-4">
          <p className="text-lg font-medium">Email</p>
          <input
            type="email"
            id="email"
            placeholder="Masukkan email anda"
            className="w-full p-3 border-2 bg-green-50 border-green-200 placeholder-normal rounded-lg focus:outline-none focus:ring-2 focus:green-400"
          />
        </div>

        {/* email field */}
        <div className="mb-4">
          <p className="text-lg font-medium">Kata Sandi</p>
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
            className="text-base underline text-dark-active cursor-pointer hover:text-light-hover"
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
      <div className="w-1/2 h-full">
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
