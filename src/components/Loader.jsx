import React from "react";

const Loader = ({ message = "Chargement..." }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin mx-auto mb-4" />
        <p className="font-black text-gray-700 dark:text-gray-200">{message}</p>
      </div>
    </div>
  );
};

export default Loader;