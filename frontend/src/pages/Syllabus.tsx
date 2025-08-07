import { useState } from "react";
import { Book, ChevronDown, GraduationCap, School, BookOpen, FileText } from "lucide-react";

const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

const subjectsPerClass: Record<string, string[]> = {
  "Class 1": ["Math", "EVS", "English"],
  "Class 2": ["Math", "EVS", "English", "Hindi"],
  "Class 3": ["Math", "Science", "English", "Hindi", "Social Science"],
  "Class 4": ["Math", "Science", "English", "Hindi", "Social Science"],
  "Class 5": ["Math", "Science", "English", "Hindi", "Social Science"],
  "Class 6": ["Math", "Science", "English", "Hindi", "Social Science", "Computer"],
  "Class 7": ["Math", "Science", "English", "Hindi", "Social Science", "Computer"],
  "Class 8": ["Math", "Science", "English", "Hindi", "Social Science", "Computer"],
  "Class 9": ["Math", "Science", "English", "Hindi", "Social Science", "Computer"],
  "Class 10": ["Math", "Science", "English", "Hindi", "Social Science", "Computer"],
  "Class 11": ["Math", "Physics", "Chemistry", "Biology", "English", "Computer Science", "Economics"],
  "Class 12": ["Math", "Physics", "Chemistry", "Biology", "English", "Computer Science", "Economics"],
};

export default function Syllabus() {
  const [selectedClass, setSelectedClass] = useState<string>("Class 1");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-400 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Decorative SVG AI/Education Illustration */}
      <svg
        className="absolute top-0 left-0 w-[350px] h-[350px] opacity-20 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <ellipse cx="200" cy="200" rx="180" ry="120" fill="url(#aiGradient)" />
        <defs>
          <linearGradient id="aiGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-10 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <rect x="80" y="80" width="240" height="240" rx="80" fill="url(#aiGradient2)" />
        <defs>
          <linearGradient id="aiGradient2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mt-16 p-6 w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <GraduationCap className="text-yellow-300 text-4xl drop-shadow-lg animate-bounce" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
              Syllabus Explorer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <School className="text-indigo-400 text-3xl md:text-4xl" />
            <span className="text-xl md:text-2xl font-semibold text-white bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              AI-Powered Education Portal
            </span>
          </div>
        </div>

        {/* Class Selector */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
          <label className="block text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-green-400 bg-clip-text text-transparent mb-2 md:mb-0">
            Select Class
          </label>
          <div className="relative w-64">
            <select
              className="w-full px-4 py-3 border-2 border-indigo-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-lg md:text-xl font-semibold transition"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-4 text-indigo-400 pointer-events-none text-2xl md:text-3xl" />
          </div>
        </div>

        {/* Subject List */}
        <div className="mt-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent flex items-center gap-3">
            <BookOpen className="text-indigo-400 text-2xl md:text-3xl" /> Subjects in {selectedClass}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectsPerClass[selectedClass]?.map((subject) => (
              <li
                key={subject}
                className="p-6 rounded-2xl bg-white/90 shadow-xl border-l-8 border-indigo-400 flex flex-col gap-2 hover:scale-105 hover:shadow-2xl transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-bold text-indigo-700 flex items-center gap-2">
                    <Book className="text-pink-400 text-xl md:text-2xl group-hover:animate-bounce" /> {subject}
                  </span>
                  <button className="flex items-center gap-1 text-sm md:text-base font-semibold text-pink-600 hover:text-indigo-700 hover:underline transition">
                    <FileText className="text-indigo-400 text-lg md:text-xl" /> View Syllabus
                  </button>
                </div>
                <div className="mt-2 text-xs md:text-sm text-gray-500 italic">
                  <span className="bg-gradient-to-r from-yellow-200 via-pink-100 to-indigo-100 bg-clip-text text-transparent">
                    Recommended by AI for {subject}
                  </span>
                </div>
              </li>
            )) || (
              <p className="col-span-3 text-center text-gray-300">
                No subjects available for {selectedClass}.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
