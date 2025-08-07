import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaQuestionCircle,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2 text-2xl font-extrabold tracking-wide hover:opacity-90 transition-opacity">
            <FaGraduationCap className="text-yellow-300 animate-bounce" />
            <Link
              to="/"
              className="bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent"
            >
              K12 Dashboard
            </Link>
          </div>

          {/* Nav Links */}
          <div className="flex space-x-4 md:space-x-6 items-center text-base font-semibold">
            {user?.role === "student" && (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-300 hover:text-indigo-900 transition-all duration-200"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>

                <Link
                  to="/progress"
                  className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-300 hover:text-indigo-900 transition-all duration-200"
                >
                  <FaChartLine /> Progress
                </Link>

                <Link
                  to="/quiz/1"
                  className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-300 hover:text-indigo-900 transition-all duration-200"
                >
                  <FaQuestionCircle /> Start Quiz
                </Link>
              </>
            )}

            {/* Logout - for all */}
            {user && (
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-300 text-indigo-900 font-bold rounded-lg shadow hover:from-pink-400 hover:to-yellow-400 hover:text-white transition-all duration-300"
              >
                <FaSignOutAlt /> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
