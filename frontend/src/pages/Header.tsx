import {
  FaUserGraduate,
  FaHome,
  FaBookOpen,
  FaClipboardCheck,
  FaInfoCircle,
  FaSignInAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-700 to-pink-500 px-2 sm:px-4 md:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between shadow-2xl rounded-b-x border-b-4 border-red-400 gap-2 sm:gap-0">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
        <FaUserGraduate className="text-yellow-300 text-2xl sm:text-3xl drop-shadow-lg animate-bounce" />
        <span className="text-white text-xl sm:text-2xl font-extrabold tracking-wider drop-shadow-lg bg-gradient-to-r from-yellow-300 via-pink-200 to-indigo-200 bg-clip-text text-transparent">
          K12 Syllabus Reviser
        </span>
      </div>
      <ul className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 justify-center">
        <li>
          <Link
            to="/"
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg font-bold text-sm sm:text-base bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-300 hover:text-indigo-900 shadow transition-all duration-200"
          >
            <FaHome className="text-lg sm:text-xl" /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/syllabus"
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg font-bold text-sm sm:text-base bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-300 hover:text-indigo-900 shadow transition-all duration-200"
          >
            <FaBookOpen className="text-lg sm:text-xl" /> Syllabus
          </Link>
        </li>
        <li>
          <Link
            to="/self-evaluation"
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg font-bold text-sm sm:text-base bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-300 hover:text-indigo-900 shadow transition-all duration-200"
          >
            <FaClipboardCheck className="text-lg sm:text-xl" /> Self-Evaluation
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg font-bold text-sm sm:text-base bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-300 hover:text-indigo-900 shadow transition-all duration-200"
          >
            <FaInfoCircle className="text-lg sm:text-xl" /> About
          </Link>
        </li>
      </ul>
      <div className="mt-2 sm:mt-0">
        <Link
          to="/login"
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-pink-300 to-indigo-300 hover:from-pink-400 hover:to-yellow-400 text-indigo-900 font-extrabold px-4 sm:px-6 py-2 rounded-xl shadow-lg transition-all duration-300 text-sm sm:text-base border-2 border-yellow-300 hover:text-white"
        >
          <FaSignInAlt className="text-lg sm:text-xl" /> Login
        </Link>
      </div>
    </nav>
  );
};

export default Header;
