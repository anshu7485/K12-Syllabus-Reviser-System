import React, { useEffect, useState } from "react";
import api from "../services/api";
import { FaChalkboardTeacher, FaClipboardList, FaChartBar,} from "react-icons/fa";
import UploadQuestion from "../pages/UploadQuestion";
import Navbar from "../components/Navbar";
import TeacherStudentProgress from "../pages/TeacherStudentProgress";

interface Question {
  id: number;
  question: string;
  type: string;
  options: string;
  correct_ans: string;
  topic_id: number;
}

interface StudentPerformance {
  student_id: number;
  subject_name: string;
  topic_name: string;
  accuracy: number;
  time_spent: number;
}

const TeacherDashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [performance, setPerformance] = useState<StudentPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Dropdown state for section selection
  const [section, setSection] = useState<"questions" | "performance" | "upload" | "studentProgress">("questions");

  useEffect(() => {
    if (!user || user.role !== "teacher") {
      setMessage("❌ Access Denied: Teachers only.");
      setLoading(false);
      return;
    }

    Promise.all([
      api.get<Question[]>(`/questions/uploaded-by/${user.id}`),
      api.get<StudentPerformance[]>(`/performance/summary`)
    ])
      .then(([qRes, pRes]) => {
        setQuestions(qRes.data);
        setPerformance(pRes.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("❌ Failed to load data.");
        setLoading(false);
      });
  }, [user]);

  // Only render Navbar if NOT teacher
  const showNavbar = user?.role !== "teacher";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-800 dark:text-white">Loading...</p>
      </div>
    );
  }

  if (message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900">
        <p className="text-lg font-semibold text-red-700 dark:text-red-300">{message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-400 dark:from-indigo-900 dark:via-purple-700 dark:to-pink-400 p-0 relative overflow-x-hidden">
      {/* Only show Navbar for non-teachers */}
      {showNavbar && <Navbar />}
      {/* Decorative gradient blobs for background effect */}
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-yellow-300 via-pink-400 to-indigo-400 opacity-20 blur-2xl z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-indigo-400 via-pink-400 to-yellow-300 opacity-20 blur-2xl z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto py-10 px-2 sm:px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h1 className="text-4xl font-extrabold text-center md:text-left bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-3 drop-shadow-lg">
            <FaChalkboardTeacher className="text-yellow-300 text-4xl animate-bounce" />
            Teacher Dashboard
          </h1>
          {/* Dropdown for section navigation */}
          <div className="flex gap-4">
            <select
              className="p-2 rounded-xl border-2 border-indigo-200 bg-white font-semibold shadow focus:ring-2 focus:ring-pink-300 transition"
              value={section}
              onChange={e => setSection(e.target.value as "questions" | "performance" | "upload" | "studentProgress")}
            >
              <option value="questions">View Uploaded Questions</option>
              <option value="performance">Student Performance</option>
              <option value="upload">Upload New Question</option>
              <option value="studentProgress">Student Progress Details</option>
            </select>
          </div>
        </div>

        {/* Section rendering based on dropdown */}
        {section === "questions" && (
          <div className="bg-white/90 rounded-3xl shadow-2xl p-8 border-2 border-indigo-200 hover:shadow-[0_0_40px_0_rgba(236,72,153,0.15)] transition-shadow duration-300 mb-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              <FaClipboardList className="text-indigo-400" /> Your Uploaded Questions ({questions.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm rounded-lg overflow-hidden bg-white/80">
                <thead className="bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100">
                  <tr>
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Question</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Options</th>
                    <th className="p-2 border">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q) => (
                    <tr
                      key={q.id}
                      className="text-gray-700 hover:bg-gradient-to-r hover:from-yellow-100 hover:via-pink-100 hover:to-indigo-100 transition"
                    >
                      <td className="p-2 border">{q.id}</td>
                      <td className="p-2 border">{q.question}</td>
                      <td className="p-2 border">{q.type}</td>
                      <td className="p-2 border">{q.options || "-"}</td>
                      <td className="p-2 border">{q.correct_ans}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {section === "performance" && (
          <div className="bg-white/90 rounded-3xl shadow-2xl p-8 border-2 border-indigo-200 hover:shadow-[0_0_40px_0_rgba(139,92,246,0.15)] transition-shadow duration-300 mb-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              <FaChartBar className="text-pink-400" /> Student Performance Summary
            </h2>
            {performance.length === 0 ? (
              <p className="text-gray-600">No performance data yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm rounded-lg overflow-hidden bg-white/80">
                  <thead className="bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100">
                    <tr>
                      <th className="p-2 border">Student ID</th>
                      <th className="p-2 border">Subject</th>
                      <th className="p-2 border">Topic</th>
                      <th className="p-2 border">Accuracy</th>
                      <th className="p-2 border">Time Spent (sec)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performance.map((p, i) => (
                      <tr
                        key={i}
                        className="text-gray-700 hover:bg-gradient-to-r hover:from-yellow-100 hover:via-pink-100 hover:to-indigo-100 transition"
                      >
                        <td className="p-2 border">{p.student_id}</td>
                        <td className="p-2 border">{p.subject_name}</td>
                        <td className="p-2 border">{p.topic_name}</td>
                        <td className="p-2 border">{p.accuracy.toFixed(1)}%</td>
                        <td className="p-2 border">{p.time_spent}s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {section === "upload" && <UploadQuestion />}

        {section === "studentProgress" && <TeacherStudentProgress />}

      </div>
    </div>
  );
};

export default TeacherDashboard;
