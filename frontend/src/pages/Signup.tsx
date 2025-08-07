import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserGraduate, FaUsers, FaUserPlus, FaCheckCircle, FaTimes } from "react-icons/fa";

interface SignupResponse {
  message: string;
  user_id: number;
}

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [studentClass, setStudentClass] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate(); // ✅ hook

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<SignupResponse>("http://localhost:8000/signup", {
        name,
        email,
        password,
        role,
        student_class: role === "student" ? studentClass : null,
      });

      setMessage(`✅ ${res.data.message} (User ID: ${res.data.user_id})`);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        // ✅ Redirect based on role
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/dashboard");
        }
      }, 1800);

    } catch (err: any) {
      setMessage("❌ Signup failed. Try another email.");
      setShowSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-blue-300 to-green-300 relative overflow-hidden">
      {/* Animated Blobs */}
      <svg className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] opacity-30 animate-float z-0" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="signupBlob1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
        <path
          fill="url(#signupBlob1)"
          d="M44.8,-61.7C58.6,-54.2,69.7,-43.2,74.7,-29.9C79.7,-16.6,78.7,-0.9,73.1,12.7C67.5,26.3,57.3,37.8,45.6,47.2C33.9,56.6,20.7,63.8,6.1,66.6C-8.5,69.4,-23.5,67.8,-36.2,61.1C-48.9,54.4,-59.3,42.6,-65.7,28.7C-72.1,14.8,-74.5,-1.2,-70.7,-15.7C-66.9,-30.2,-57,-43.2,-44.6,-51.5C-32.2,-59.8,-16.1,-63.4,-0.2,-63.2C15.7,-63,31.4,-59.2,44.8,-61.7Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] opacity-20 animate-float2 z-0" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="signupBlob2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#signupBlob2)"
          d="M39.3,-59.6C52.6,-51.6,65.3,-43.1,70.2,-31.2C75.1,-19.3,72.2,-4,66.6,10.2C61,24.4,52.6,37.5,41.1,46.7C29.6,55.9,14.8,61.2,0.2,61C-14.4,60.8,-28.8,55.1,-41.2,46.2C-53.6,37.3,-64,25.2,-68.2,11.3C-72.4,-2.6,-70.3,-18.3,-62.8,-31.2C-55.3,-44.1,-42.4,-54.2,-28.1,-61.2C-13.8,-68.2,2,-72.1,16.7,-68.7C31.4,-65.3,44.1,-54.7,39.3,-59.6Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="relative z-10 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-8 w-full max-w-md border-2 border-white/60 transition-all duration-300 flex flex-col items-center">
        <h2 className="flex flex-col items-center justify-center gap-1 text-center mb-8 drop-shadow-xl">
          <span className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-700 via-red-500 to-yellow-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-red-400 dark:to-yellow-400">
            <FaUserPlus className="text-red-500 text-4xl md:text-5xl" />
            Join
          </span>
          <span className="text-xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-700 via-red-500 to-yellow-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-red-400 dark:to-yellow-400">
            the Learning Revolution
          </span>
        </h2>

        {message && (
          <div
            className={`mb-5 text-center text-sm font-semibold ${message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6 w-full">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold mb-1 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-yellow-400">
              <FaUser className="text-red-500" /> Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold mb-1 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-yellow-400">
              <FaEnvelope className="text-red-500" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white transition"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold mb-1 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-yellow-400">
              <FaLock className="text-red-500" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white transition"
              placeholder="********"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold mb-1 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-yellow-400">
              <FaUsers className="text-red-500" /> Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none"
            >
              <option value="student">
                &#x1F393; Student
              </option>
              <option value="teacher">
                &#x1F3EB; Teacher
              </option>
              <option value="admin">
                &#x1F512; Admin
              </option>
            </select>
          </div>

          {role === "student" && (
            <div>
              <label className="flex items-center gap-2 text-sm font-bold mb-1 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-yellow-400">
                <FaUserGraduate className="text-red-500" /> Class
              </label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white transition"
                placeholder="e.g. 10th A"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold hover:from-purple-600 hover:via-pink-500 hover:to-red-500 transition duration-500 shadow-lg transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center flex items-center justify-center gap-2">
          <span className="flex items-center gap-2 font-bold bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-yellow-400">
            <FaUser className="text-red-500" /> Already have an account?
          </span>
          <Link
            to="/login"
            className="ml-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Modern Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-8 flex flex-col items-center animate-pop">
            <FaCheckCircle className="text-green-500 text-5xl mb-3 animate-bounce" />
            <div className="text-lg font-bold text-green-700 mb-2">Signup Successful!</div>
            <div className="text-gray-700 text-center mb-2">
              Your account has been created.<br />Redirecting...
            </div>
            <button
              className="mt-2 px-6 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition"
              onClick={() => setShowSuccess(false)}
            >
              <span className="flex items-center gap-2"><FaTimes /> Close</span>
            </button>
          </div>
          <style>
            {`
              .animate-pop {
                animation: popIn 0.25s cubic-bezier(.4,2,.6,1) both;
              }
              @keyframes popIn {
                0% { transform: scale(0.7); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
            `}
          </style>
        </div>
      )}

      {/* Tailwind custom animation styles */}
      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default Signup;
