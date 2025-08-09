import React, { useEffect, useState, useRef } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UploadQuestion from "./UploadQuestion"; // Import the upload question page

interface Subject {
  id: number;
  name: string;
  class_name: string;
}

interface Question {
  id: number;
  topic_id: number;
  question: string;
  type: string;
  options: string;
  correct_ans: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  // Add more fields as needed
}

const AdminDashboard: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("Class 1");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [section, setSection] = useState<"add" | "upload" | "questions" | "users">("add"); // Add "users" to section type
  const [users, setUsers] = useState<User[]>([]);
  const usersDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Fetch subjects for the selected class on mount and when className changes
  useEffect(() => {
    if (user?.role !== "admin") {
      setError("Access denied: Admins only.");
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([fetchSubjects(className), fetchQuestions(), fetchUsers()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    // eslint-disable-next-line
  }, [className]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get<User[]>("/users");
      setUsers(res.data);
    } catch {
      // Optionally handle error
    }
  };

  // Fetch subjects for a class
  const fetchSubjects = (cls?: string) => {
    const classToFetch = (cls || className || "Class 1").replace("Class ", "");
    return api
      .get<Subject[]>(`/subjects/${classToFetch}`)
      .then((res) => setSubjects(res.data))
      .catch(() => console.error("❌ Failed to load subjects"));
  };

  const fetchQuestions = () => {
    return api
      .get<Question[]>("/questions/all")
      .then((res) => setQuestions(res.data));
  };

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !className) return;

    await api
      .post("/subjects", {
        name: subjectName,
        class_name: className.replace("Class ", ""),
      })
      .then(() => {
        setSubjectName("");
        // Don't clear className so user can add more for same class
        fetchSubjects(className);
      })
      .catch(() => {
        setError("❌ Failed to add subject.");
        setTimeout(() => setError(""), 3000);
      });
  };

  const handleDeleteSubject = (id: number) => {
    api
      .delete(`/subjects/${id}`)
      .then(() => {
        setSubjects(subjects.filter((s) => s.id !== id));
      })
      .catch(() => {
        setError("❌ Failed to delete subject.");
        setTimeout(() => setError(""), 3000);
      });
  };

  // Edit subject handler (simple prompt for demo)
  const handleEditSubject = async (subject: Subject) => {
    const newName = window.prompt("Edit subject name:", subject.name);
    if (!newName || newName.trim() === subject.name) return;
    try {
      await api.put(`/subjects/${subject.id}`, {
        ...subject,
        name: newName.trim(),
      });
      fetchSubjects(className);
    } catch {
      setError("❌ Failed to edit subject.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteQuestion = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    api
      .delete(`/questions/${id}`)
      .then(() => {
        alert("🗑️ Question deleted.");
        fetchQuestions();
      })
      .catch(() => alert("❌ Failed to delete."));
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        usersDropdownRef.current &&
        !usersDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUsers(false);
      }
    }
    if (showUsers) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUsers]);

  const showNavbar = user?.role !== "admin";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-800 dark:text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900">
        <p className="text-lg font-semibold text-red-700 dark:text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative p-0 overflow-x-hidden flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(120deg, #f6d365 0%, #fda085 50%, #fbc2eb 100%)",
        minHeight: "100vh",
      }}
    >
      {showNavbar && <Navbar />}
      <div
        className="absolute inset-0 z-0 animate-gradient-x"
        style={{
          background: "linear-gradient(120deg, #f6d365 0%, #fda085 50%, #fbc2eb 100%)",
          opacity: 0.85,
          filter: "blur(2px)",
        }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto py-10 px-2 sm:px-4 md:px-8 flex flex-col items-center">

        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-indigo-600 to-green-500 drop-shadow-lg tracking-tight flex items-center gap-3">
            <span className="animate-pulse">👑</span> Admin Dashboard
          </h1>
          {/* Section Dropdown */}
          <div className="flex items-center gap-4">
            {/* Modern class selector */}
            <select
              className="p-2 rounded-xl border-2 border-indigo-300 bg-white font-semibold shadow focus:ring-2 focus:ring-indigo-300 transition text-indigo-700"
              value={className}
              onChange={e => setClassName(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            {/* Modern section selector */}
            <select
              className="p-2 rounded-xl border-2 border-pink-300 bg-white font-semibold shadow focus:ring-2 focus:ring-pink-300 transition text-pink-700"
              value={section}
              onChange={e => setSection(e.target.value as "add" | "upload" | "questions" | "users")}
            >
              <option value="add">Add New Subject</option>
              <option value="upload">Upload New Question</option>
              <option value="questions">All Uploaded Questions</option>
              <option value="users">Registered Users</option>
            </select>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-10 mb-10">
          {/* Section content */}
          <div className={`w-full ${section === "questions" || section === "users" ? "" : "md:w-1/2"}`}>
            <div className="rounded-3xl shadow-2xl border-2 border-pink-200 dark:border-pink-700 bg-white/90 dark:bg-gray-900/90 p-0 overflow-hidden">
              {section === "add" && (
                <div className="relative bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-8 md:p-10 flex flex-col group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-400 via-indigo-400 to-yellow-300 opacity-30 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform"></div>
                  <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                    <span role="img" aria-label="book">📘</span> Add New Subject
                  </h2>
                  <form onSubmit={handleAddSubject} className="flex flex-col gap-4 mb-8 relative z-10">
                    <input
                      type="text"
                      placeholder="Subject Name (e.g. Math)"
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      className="p-3 rounded-lg border-2 border-pink-300 dark:border-pink-600 w-full dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-pink-400 transition bg-white/80 shadow-inner"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-indigo-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
                    >
                      Add
                    </button>
                  </form>
                  <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                    Existing Subjects:
                  </h3>
                  <div className="overflow-x-auto relative z-10">
                    <table className="w-full border border-gray-300 dark:border-gray-600 text-sm rounded-lg overflow-hidden bg-white/70 dark:bg-gray-900/70">
                      <thead className="bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
                        <tr>
                          <th className="p-2 border">ID</th>
                          <th className="p-2 border">Name</th>
                          <th className="p-2 border">Class</th>
                          <th className="p-2 border">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects.map((subj) => (
                          <tr
                            key={subj.id}
                            className="text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-50 hover:via-orange-50 hover:to-yellow-50 dark:hover:from-gray-800 dark:hover:via-gray-900 dark:hover:to-gray-800 transition"
                          >
                            <td className="p-2 border">{subj.id}</td>
                            <td className="p-2 border">{subj.name}</td>
                            <td className="p-2 border">{subj.class_name}</td>
                            <td className="p-2 border text-center space-x-2">
                              <button
                                onClick={() => handleEditSubject(subj)}
                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-3 py-1 rounded shadow text-sm transition-all duration-200 transform hover:scale-105"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteSubject(subj.id)}
                                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-600 hover:to-red-600 text-white px-3 py-1 rounded shadow text-sm transition-all duration-200 transform hover:scale-105"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                        {subjects.length === 0 && (
                          <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-500 dark:text-gray-400">
                              No subjects available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {section === "upload" && (
                <div className="relative bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-4 md:p-6 rounded-3xl shadow-2xl border-2 border-pink-200 dark:border-pink-700 overflow-hidden group">
                  <UploadQuestion />
                </div>
              )}
              {section === "questions" && (
                <div className="w-full max-w-2xl rounded-2xl shadow-xl p-0 mb-8 border border-pink-200 dark:border-pink-700 bg-white/95 dark:bg-gray-900/95 flex flex-col">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-extrabold text-pink-700 dark:text-pink-200 tracking-wide">
                      All Uploaded Questions
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                      Total: {questions.length}
                    </span>
                  </div>
                  <div className="overflow-x-auto w-full p-4">
                    {questions.length === 0 ? (
                      <div className="w-full flex flex-col items-center justify-center py-10">
                        <span className="text-gray-600 dark:text-gray-300 text-lg">
                          ⚠️ No questions available. Please upload some.
                        </span>
                      </div>
                    ) : (
                      <table className="w-full table-auto border border-gray-300 dark:border-gray-700 text-sm rounded-lg overflow-hidden">
                        <thead>
                          <tr className="bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Question</th>
                            <th className="p-3 border">Type</th>
                            <th className="p-3 border">Correct Answer</th>
                            <th className="p-3 border text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-800 dark:text-gray-200">
                          {questions.map((q, idx) => (
                            <tr
                              key={q.id}
                              className={`${
                                idx % 2 === 0
                                  ? "bg-white dark:bg-gray-900"
                                  : "bg-gray-50 dark:bg-gray-800"
                              } hover:bg-gradient-to-r hover:from-pink-50 hover:via-orange-50 hover:to-yellow-50 dark:hover:from-gray-800 dark:hover:via-gray-900 dark:hover:to-gray-800 transition duration-200`}
                            >
                              <td className="p-3 border text-center">{q.id}</td>
                              <td className="p-3 border">{q.question}</td>
                              <td className="p-3 border text-center">{q.type}</td>
                              <td className="p-3 border text-center">{q.correct_ans}</td>
                              <td className="p-3 border text-center space-x-3">
                                <button
                                  onClick={() => navigate(`/edit-question/${q.id}`)}
                                  className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-500 transition text-white font-semibold rounded-xl shadow-md"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteQuestion(q.id)}
                                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 transition text-white font-semibold rounded-xl shadow-md"
                                >
                                  🗑️ Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
              {section === "users" && (
                <div className="w-full max-w-2xl rounded-2xl shadow-xl p-0 mb-8 border border-pink-200 dark:border-pink-700 bg-white/95 dark:bg-gray-900/95 flex flex-col">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-200 tracking-wide flex items-center gap-2">
                      <span>👥</span> Registered Users
                    </h2>
                    <span className="text-sm text-pink-600 dark:text-pink-300 font-semibold">
                      Total: {users.length}
                    </span>
                  </div>
                  <div className="overflow-x-auto w-full p-4">
                    <table className="min-w-[300px] w-full text-sm border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
                          <th className="px-2 py-1 text-left border">ID</th>
                          <th className="px-2 py-1 text-left border">Username</th>
                          <th className="px-2 py-1 text-left border">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-2 py-1 border">{u.id}</td>
                            <td className="px-2 py-1 border">{u.username}</td>
                            <td className="px-2 py-1 border">{u.email}</td>
                          </tr>
                        ))}
                        {users.length === 0 && (
                          <tr>
                            <td colSpan={3} className="text-center text-gray-500 py-2">No users found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Remove the right side panel, as all sections are now in the dropdown */}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;