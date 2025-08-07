import React from "react";
import { Link } from "react-router-dom";

const Error404: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
      <div className="relative bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl px-10 py-14 flex flex-col items-center animate-pop border-2 border-yellow-300 dark:border-yellow-600">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 via-pink-400 to-indigo-400 rounded-full blur-2xl opacity-40 z-0"></div>
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-indigo-500 drop-shadow-lg mb-4 z-10 animate-bounce">
          404
        </h1>
        <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 z-10">
          😕 Oops! Page not found.
        </p>
        <Link
          to="/dashboard"
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg text-lg transition-all duration-300 transform hover:scale-105 z-10"
        >
          Back to Dashboard
        </Link>
      </div>
      <style>
        {`
          .animate-pop {
            animation: popIn404 0.6s cubic-bezier(.68,-0.55,.27,1.55);
          }
          @keyframes popIn404 {
            0% { transform: scale(0.7) translateY(40px); opacity: 0; }
            80% { transform: scale(1.05) translateY(-10px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Error404;
