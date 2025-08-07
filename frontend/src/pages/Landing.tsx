import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaRobot, FaGraduationCap } from "react-icons/fa";

const TypingEffect: React.FC = () => {
  const words = [
    "Education revision",
    "AI-powered tool",
    "Self-learning",
    "Exam boost",
    "Innovation",
  ];
  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (isTyping) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          setIsTyping(false);
          setTimeout(() => setIsDeleting(true), 900);
        }
      } else if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
        } else {
          setIsTyping(true);
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, wordIndex, isTyping, isDeleting]);

  return (
    <span className="inline-flex items-center gap-2 justify-center bg-gradient-to-r from-yellow-200 via-pink-200 to-indigo-200 bg-clip-text text-transparent font-extrabold text-2xl md:text-4xl tracking-wide drop-shadow-lg">
      <FaRobot className="text-indigo-400 text-2xl md:text-3xl animate-spin-slow" />
      <span className="">{currentText}</span>
      <span className="blink-cursor">|</span>
    </span>
  );
};

const Landing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* 🌐 Animated Background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-400" />

      {/* 🎈 Animated SVG Blobs & AI/Education SVG */}
      <svg
        className="absolute top-[-80px] right-[-80px] w-[180px] h-[180px] md:w-[320px] md:h-[320px] opacity-30 animate-float z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blobGradient1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <path
          fill="url(#blobGradient1)"
          d="M44.8,-61.7C58.6,-54.2,69.7,-43.2,74.7,-29.9C79.7,-16.6,78.7,-0.9,73.1,12.7C67.5,26.3,57.3,37.8,45.6,47.2C33.9,56.6,20.7,63.8,6.1,66.6C-8.5,69.4,-23.5,67.8,-36.2,61.1C-48.9,54.4,-59.3,42.6,-65.7,28.7C-72.1,14.8,-74.5,-1.2,-70.7,-15.7C-66.9,-30.2,-57,-43.2,-44.6,-51.5C-32.2,-59.8,-16.1,-63.4,-0.2,-63.2C15.7,-63,31.4,-59.2,44.8,-61.7Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg
        className="absolute bottom-[-60px] left-[-60px] w-[180px] h-[180px] md:w-[350px] md:h-[350px] opacity-20 animate-float2 z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blobGradient2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <path
          fill="url(#blobGradient2)"
          d="M39.3,-59.6C52.6,-51.6,65.3,-43.1,70.2,-31.2C75.1,-19.3,72.2,-4,66.6,10.2C61,24.4,52.6,37.5,41.1,46.7C29.6,55.9,14.8,61.2,0.2,61C-14.4,60.8,-28.8,55.1,-41.2,46.2C-53.6,37.3,-64,25.2,-68.2,11.3C-72.4,-2.6,-70.3,-18.3,-62.8,-31.2C-55.3,-44.1,-42.4,-54.2,-28.1,-61.2C-13.8,-68.2,2,-72.1,16.7,-68.7C31.4,-65.3,44.1,-54.7,39.3,-59.6Z"
          transform="translate(100 100)"
        />
      </svg>


      {/* ✅ Glassmorphism Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center px-2 sm:px-4 md:px-6 py-8 sm:py-12 relative z-20">
        <div className="flex flex-col items-center gap-2 mb-2">
          <h1 className="flex items-center justify-center gap-3 text-3xl sm:text-5xl md:text-7xl font-extrabold mb-2 drop-shadow-xl bg-gradient-to-r from-yellow-300 via-pink-200 to-red-500 bg-clip-text text-transparent leading-tight tracking-tight">
            <FaGraduationCap className="text-yellow-300 text-3xl sm:text-4xl md:text-6xl animate-bounce" />
            K12 Syllabus Reviser
          </h1>
          <TypingEffect />
        </div>
        <p className="text-base sm:text-lg md:text-2xl text-white/90 font-medium mb-8 mt-2 drop-shadow-lg">
          The ultimate{" "}
          <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-indigo-200 bg-clip-text text-transparent font-bold">
            AI-powered
          </span>{" "}
          platform for self-revision, subject mastery, and exam success.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 flex-wrap">
          <Link
            to="/login"
            className="px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg md:text-xl bg-gradient-to-r from-yellow-400 via-pink-400 to-indigo-400 text-indigo-900 font-bold rounded-xl shadow-lg hover:from-pink-400 hover:to-yellow-400 hover:text-white transition-all duration-300 border-2 border-yellow-300"
          >
            {t("login")}
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg md:text-xl bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:from-yellow-400 hover:to-indigo-400 hover:text-indigo-900 transition-all duration-300 border-2 border-indigo-300"
          >
            {t("signup")}
          </Link>
        </div>

      </div>

      {/* ✨ Tailwind Custom Animations */}
      <style>
        {`
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientMove 8s ease-in-out infinite;
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-float {
            animation: floatY 6s ease-in-out infinite;
          }
          @keyframes floatY {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(30px); }
          }
          .animate-float2 {
            animation: floatY2 9s ease-in-out infinite;
          }
          @keyframes floatY2 {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-25px) scale(1.08); }
          }
          .blink-cursor {
            display: inline-block;
            width: 1px;
            background-color: white;
            margin-left: 3px;
            animation: blink 1s steps(2, start) infinite;
          }
          @keyframes blink {
            to {
              visibility: hidden;
            }
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

export default Landing;
