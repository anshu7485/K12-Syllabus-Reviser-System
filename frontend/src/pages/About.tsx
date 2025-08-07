import React from "react";
import { FaGraduationCap, FaLightbulb, FaGlobeAsia } from "react-icons/fa";

const About: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-400 text-white px-2 sm:px-4 md:px-6 py-8 sm:py-12 overflow-hidden flex flex-col items-center">
      {/* Decorative SVG & AI/Education Icon */}
      <svg
        className="absolute top-[-60px] left-[-60px] w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px] opacity-20 animate-float z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M41.3,-72.5C52.5,-64.4,60.7,-52.1,66.7,-39.3C72.7,-26.5,76.6,-13.3,78.7,1.2C80.8,15.7,81,31.3,72.5,42.8C64.1,54.2,46.9,61.4,30.7,65.9C14.6,70.3,-0.6,72.1,-15.1,68.8C-29.6,65.5,-43.3,57,-54.1,45.8C-64.8,34.6,-72.5,20.8,-75.2,6.2C-77.8,-8.4,-75.3,-23.9,-67.2,-36.3C-59.1,-48.6,-45.4,-57.9,-31.4,-64.7C-17.3,-71.5,-3,-75.8,11.6,-79.1C26.2,-82.3,41.3,-84.6,41.3,-72.5Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg
        className="absolute bottom-[-60px] right-[-60px] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px] opacity-10 animate-float2 z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="100" fill="#fbbf24" />
      </svg>

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
        <div className="flex flex-col items-center gap-2 mb-6">
          <span className="flex items-center gap-3 justify-center">
            <FaGraduationCap className="text-yellow-300 text-3xl sm:text-4xl md:text-5xl animate-bounce" />
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-2 drop-shadow-md bg-gradient-to-r from-yellow-300 via-pink-200 to-indigo-200 bg-clip-text text-transparent tracking-tight">
            About Us
          </h1>
        </div>
        <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-10 font-medium">
          Welcome to{" "}
          <span className="font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-yellow-400 transition-all duration-300">
            K12 Syllabus Reviser
          </span>
          {" "}— your intelligent partner in self-learning, revision, and academic excellence. Powered by{" "}
          <span className="font-bold bg-gradient-to-r from-indigo-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
            AI
          </span>
          , our platform makes studying smarter, not harder.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left text-white/90">
          <div className="bg-white/10 p-5 sm:p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 hover:scale-105 hover:bg-gradient-to-br hover:from-indigo-500 hover:via-pink-400 hover:to-yellow-300 transition-all duration-300 group">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              🚀 Our Mission
            </h2>
            <p className="group-hover:text-white transition-all duration-300 text-sm sm:text-base">
              To revolutionize the way students revise and self-assess their learning using cutting-edge technology and personalized insights.
            </p>
          </div>
          <div className="bg-white/10 p-5 sm:p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 hover:scale-105 hover:bg-gradient-to-br hover:from-pink-400 hover:via-yellow-300 hover:to-indigo-400 transition-all duration-300 group">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2 bg-gradient-to-r from-pink-400 via-yellow-300 to-indigo-400 bg-clip-text text-transparent">
              <FaLightbulb className="text-yellow-300" /> Key Features
            </h2>
            <ul className="list-disc ml-4 space-y-1 group-hover:text-white transition-all duration-300 text-sm sm:text-base">
              <li>
                <span className="bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent font-bold">AI-Powered Revision Assistance</span>
              </li>
              <li>
                <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-indigo-400 bg-clip-text text-transparent font-bold">Real-Time Self Evaluation</span>
              </li>
              <li>
                <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent font-bold">Gamified Learning Analytics</span>
              </li>
              <li>
                <span className="bg-gradient-to-r from-indigo-400 via-yellow-300 to-pink-400 bg-clip-text text-transparent font-bold">Multi-Language Support</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/10 p-5 sm:p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 hover:scale-105 hover:bg-gradient-to-br hover:from-yellow-300 hover:via-indigo-400 hover:to-pink-400 transition-all duration-300 group">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
              <FaGlobeAsia className="text-indigo-300" /> Why Choose Us?
            </h2>
            <p className="group-hover:text-white transition-all duration-300 text-sm sm:text-base">
              Because we blend education with AI to create a fun, engaging, and data-driven platform that boosts academic performance for students of all levels.
            </p>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <p className="text-base sm:text-lg text-white/80">
            Built with <span className="text-pink-300 animate-pulse">❤️</span> by a team passionate about{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent font-bold hover:from-pink-400 hover:to-yellow-400 transition-all duration-300">
              education, technology, and innovation
            </span>
            .
          </p>
        </div>
      </div>

      {/* Custom animation for float */}
      <style>
        {`
          .animate-float {
            animation: floatY 7s ease-in-out infinite;
          }
          .animate-float2 {
            animation: floatY2 10s ease-in-out infinite;
          }
          @keyframes floatY {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes floatY2 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(30px); }
          }
          .animate-spin-slow {
            animation: spin 2.5s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};

export default About;
