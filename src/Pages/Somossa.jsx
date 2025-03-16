import React from "react";
import { Link } from "react-router";

const Somossa = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative">
        <img
          className="w-full mx-auto border-4 border-red-300 rounded-3xl"
          src="https://cdn.dribbble.com/userupload/32577238/file/still-adaa9b21a20d3cd67becb8f08d87ce96.png?format=webp&resize=640x480&vertical=center"
          alt="404 page"
        />

        <div className="absolute top-50 left-12">
          <Link
            to="/"
            className="bg-red-400 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition font-bold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Somossa;
