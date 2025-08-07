import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Hook for redirection

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    console.log("Login attempt with:", { email, password });

    try {
      const res = await axios.post<LoginResponse>("http://localhost:8000/login", {
        email,
        password,
      }, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Login response:", res.data);
      const token = res.data.access_token;
      const user = res.data.user;

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      // ✅ Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Saved to localStorage:", { token, user });

      setMessage(`✅ Welcome, ${user.name} (${user.role})`);
      setShowSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        setShowSuccess(false);
        // ✅ Redirect based on role
        console.log("Redirecting user based on role:", user.role);
        if (user.role === "admin") {
          console.log("Navigating to /admin");
          navigate("/admin", { replace: true });
        } else if (user.role === "teacher") {
          console.log("Navigating to /teacher");
          navigate("/teacher", { replace: true });
        } else {
          console.log("Navigating to /dashboard");
          navigate("/dashboard", { replace: true });
        }
      }, 1500);
    } catch (err: any) {
      setIsLoading(false);
      console.error("Login error:", err);
      
      let errorMessage = "❌ Login failed. Please check your credentials.";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "❌ Connection timeout. Please check your internet connection.";
      } else if (err.response) {
        // Server responded with error status
        errorMessage = `❌ ${err.response.data?.message || 'Login failed'}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = "❌ Cannot connect to server. Please ensure backend is running.";
      }
      
      setMessage(errorMessage);
      setShowSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400 relative overflow-hidden">
      {/* Animated Blobs */}
      <svg
        className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] opacity-30 animate-float z-0"
        viewBox="0 0 200 200"
      >
        <defs>
          <linearGradient id="loginBlob1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
        <path
          fill="url(#loginBlob1)"
          d="M44.8,-61.7C58.6,-54.2,69.7,-43.2,74.7,-29.9C79.7,-16.6,78.7,-0.9,73.1,12.7C67.5,26.3,57.3,37.8,45.6,47.2C33.9,56.6,20.7,63.8,6.1,66.6C-8.5,69.4,-23.5,67.8,-36.2,61.1C-48.9,54.4,-59.3,42.6,-65.7,28.7C-72.1,14.8,-74.5,-1.2,-70.7,-15.7C-66.9,-30.2,-57,-43.2,-44.6,-51.5C-32.2,-59.8,-16.1,-63.4,-0.2,-63.2C15.7,-63,31.4,-59.2,44.8,-61.7Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg
        className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] opacity-20 animate-float2 z-0"
        viewBox="0 0 200 200"
      >
        <defs>
          <linearGradient id="loginBlob2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#loginBlob2)"
          d="M39.3,-59.6C52.6,-51.6,65.3,-43.1,70.2,-31.2C75.1,-19.3,72.2,-4,66.6,10.2C61,24.4,52.6,37.5,41.1,46.7C29.6,55.9,14.8,61.2,0.2,61C-14.4,60.8,-28.8,55.1,-41.2,46.2C-53.6,37.3,-64,25.2,-68.2,11.3C-72.4,-2.6,-70.3,-18.3,-62.8,-31.2C-55.3,-44.1,-42.4,-54.2,-28.1,-61.2C-13.8,-68.2,2,-72.1,16.7,-68.7C31.4,-65.3,44.1,-54.7,39.3,-59.6Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="relative z-10 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/40 transition-all duration-300 group cursor-pointer hover:scale-[1.025] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-extrabold text-center mb-6 drop-shadow-xl bg-gradient-to-r from-purple-700 via-red-500 to-yellow-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-red-400 dark:to-yellow-400 relative transition-all duration-300
          group-hover:animate-wiggle">
          <FaUser className="text-red-500" /> Login
        </h2>

        {message && (
          <div
            className={`mb-4 text-sm text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative group cursor-pointer">
            <label className="flex items-center gap-2 text-sm font-bold mb-1 bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent dark:from-black dark:via-red-400 dark:to-black transition-all duration-300 relative z-10 group-hover:animate-wiggle">
              <FaEnvelope className="text-red-500" /> Email
            </label>
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 pointer-events-none bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 -z-10"></span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-white dark:border-gray-600 bg-white/70"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative group cursor-pointer">
            <label className="flex items-center gap-2 text-sm font-bold mb-1 bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent dark:from-black dark:via-red-400 dark:to-black transition-all duration-300 relative z-10 group-hover:animate-wiggle">
              <FaLock className="text-red-500" /> Password
            </label>
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 pointer-events-none bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 -z-10"></span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-white dark:border-gray-600 bg-white/70"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 text-lg relative overflow-hidden group cursor-pointer hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="relative z-10">
              {isLoading ? "Logging in..." : "Login"}
            </span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-300 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></span>
          </button>
        </form>

        <div className="mt-6 text-center flex items-center justify-center gap-2 group relative cursor-pointer">
          <span className="flex items-center gap-2 font-bold bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent dark:from-black dark:via-red-400 dark:to-black relative z-10 group-hover:animate-wiggle">
            <FaUser className="text-red-500" /> Don't have an account?
          </span>
          <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 pointer-events-none bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 -z-10"></span>
          <Link
            to="/signup"
            className="ml-2 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition relative group cursor-pointer hover:scale-105"
          >
            <span className="relative z-10">Sign Up</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-300 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-lg"></span>
          </Link>
        </div>
      </div>

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
          .animate-wiggle {
            animation: wiggle 0.4s ease-in-out;
          }
          @keyframes wiggle {
            0% { transform: rotate(-2deg) scale(1); }
            20% { transform: rotate(2deg) scale(1.03);}
            40% { transform: rotate(-2deg) scale(1.04);}
            60% { transform: rotate(2deg) scale(1.03);}
            80% { transform: rotate(-1deg) scale(1.01);}
            100% { transform: rotate(0deg) scale(1);}
          }
        `}
      </style>

      {/* Modern Multi-Color Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="relative flex flex-col items-center px-10 py-10 rounded-3xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 40%, #fbbf24 100%)",
              boxShadow: "0 8px 40px 0 rgba(31,38,135,0.37)",
              minWidth: 340,
              overflow: "hidden"
            }}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <radialGradient id="popGlow" cx="50%" cy="50%" r="80%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#f472b6" stopOpacity="0.1" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#popGlow)" />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <span className="mb-2 animate-bounce">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="28" fill="url(#popCircle)" />
                  <defs>
                    <radialGradient id="popCircle" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="60%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </radialGradient>
                  </defs>
                  <path d="M20 32l7 7 13-13" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent text-center drop-shadow-lg">
                Login Successful!
              </div>
              <div className="text-base font-semibold mb-2 bg-gradient-to-r from-indigo-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent text-center">
                Welcome back! Redirecting...
              </div>
              <button
                className="mt-3 px-6 py-2 rounded-lg font-bold shadow transition bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 text-white hover:from-yellow-400 hover:to-indigo-500"
                onClick={() => setShowSuccess(false)}
              >
                <span className="flex items-center gap-2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Close
                </span>
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
        </div>
      )}
    </div>
  );
};

export default Login;
