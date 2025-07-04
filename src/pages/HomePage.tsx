import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="w-full bg-orange-500 flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-4">
          <img
            src="/vcubelogo.png"
            alt="V Cube Logo"
            className="h-20 w-auto rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-black text-3xl md:text-5xl font-extrabold">
            V Cube <span className="text-white font-bold">Software Solutions</span>
          </h1>
        </div>
        <img
          src="/aws.png"
          alt="AWS Logo"
          className="h-20 w-auto rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-10">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col items-start justify-center space-y-4">
          <img
            src="/aws.png"
            alt="AWS Robot"
            className="w-72 h-48 object-contain rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <h2 className="text-2xl font-semibold text-gray-700">Empowering Students with</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-black">Smart </span>
            <span className="text-orange-500">Registration</span>
            <span className="text-black"> & </span>
            <span className="text-blue-600">QR Attendance</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Register, Track, and Grow with <span className="font-bold text-black">V Cube’s</span> Digital Learning Portal
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/login-student">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300">
                Student Login
              </button>
            </Link>
            <Link to="/login-admin">
              <button className="bg-yellow-400 text-gray-900 border border-gray-300 px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-yellow-500 hover:text-white transition duration-300">
                Admin Login
              </button>
            </Link>
            {/* VCube Logo added */}
            <div className="flex items-center pl-4">
              
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 mt-10 md:mt-0 md:pl-12">
          <img
            src="/MC (1).jpg"
            alt="Multicloud DevSecOps"
            className="w-full max-w-md object-cover rounded-3xl shadow-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
