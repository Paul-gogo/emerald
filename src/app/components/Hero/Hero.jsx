import React from 'react';
import { CiLocationOn } from 'react-icons/ci';

const Hero = () => {
  return (
    <div className="relative w-full h-[600px] sm:h-[500px]">
      {/* Background Image */}
      <img
        src="/images/hero.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#296A50]/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-white text-4xl sm:text-5xl font-bold mb-3 leading-tight">
          Find Your Dream Home
        </h1>

        <p className="text-white text-lg sm:text-xl mb-6 max-w-2xl">
          Discover the perfect property from thousands of listings across the country
        </p>

        {/* Search Bar (Always horizontal) */}
        <div className="w-full max-w-xl">
          <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-md shadow-md p-2 items-stretch">
            {/* Input with Icon */}
            <div className="flex flex-1 items-center bg-white rounded-md">
              <div className="flex items-center pl-2">
                <CiLocationOn className="text-gray-500 text-xl" />
              </div>
              <input
                type="text"
                placeholder="Enter location, property type, or keywords..."
                className="flex-grow px-2 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                required
              />
            </div>
            {/* Button */}
            <button className="bg-[#296A50] hover:bg-[#1F513D] text-white text-sm font-semibold px-5 py-2 rounded-md transition-all whitespace-nowrap w-full sm:w-auto">
              Search Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;



