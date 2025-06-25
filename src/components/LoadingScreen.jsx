import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black/10  flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingScreen;
