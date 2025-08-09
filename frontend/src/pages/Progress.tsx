import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Subject {
  id: number;
  name: string;
}

interface Topic {
  id: number;
  name: string;
  subject_id: number;
}

interface ProgressData {
  student_id: number;
  total_attempts: number;
  accuracy: number;
}

interface SubjectPerformance {
  subject: string;
  accuracy: number;
  attempts: number;
}

const Progress: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const studentId = user?.id;

  // Dropdown states
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | "">("");
  const [selectedTopic, setSelectedTopic] = useState<number | "">("");
  const [timeRange, setTimeRange] = useState("weekly");
  const [viewType, setViewType] = useState("subject"); // subject, chapter, time, comparison, difficulty, selfeval

  // Data states
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [subjectPerf, setSubjectPerf] = useState<SubjectPerformance[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch subjects for dropdown
  useEffect(() => {
    if (user?.student_class) {
      api
        .get<Subject[]>(`/subjects/${user.student_class}`)
        .then((res) => setSubjects(res.data))
        .catch(() => setSubjects([]));
    }
  }, [user]);

  // Fetch subject-wise performance for the student's actual subjects
  useEffect(() => {
    if (studentId && user?.student_class) {
      api
        .get<SubjectPerformance[]>(`/progress/subject/${studentId}`)
        .then((res) => {
          // Only keep subjects that are in the fetched subjects list
          const allowedSubjects = new Set(subjects.map((s) => s.name));
          setSubjectPerf(res.data.filter((sp) => allowedSubjects.has(sp.subject)));
        })
        .catch(() => setSubjectPerf([]));
    }
  }, [studentId, user?.student_class, subjects]);

  // Fetch topics when subject changes
  useEffect(() => {
    if (selectedSubject) {
      api
        .get<Topic[]>(`/topics/${selectedSubject}`)
        .then((res) => setTopics(res.data))
        .catch(() => setTopics([]));
    } else {
      setTopics([]);
    }
  }, [selectedSubject]);

  // Fetch main progress
  useEffect(() => {
    if (studentId) {
      api
        .get<ProgressData>(`/progress/${studentId}`)
        .then((res) => setProgress(res.data))
        .catch(() => setError("Failed to load progress data."));
    }
  }, [studentId]);

  // Dropdown handlers
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(Number(e.target.value));
    setSelectedTopic("");
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(Number(e.target.value));
  };

  // Chart rendering based on viewType
  const renderChart = () => {
    switch (viewType) {
      case "subject":
        // Filter subjectPerf by selectedSubject if any
        const filteredSubjectPerf = selectedSubject
          ? subjectPerf.filter((sp) => {
              const subj = subjects.find((s) => s.id === selectedSubject);
              return subj && sp.subject === subj.name;
            })
          : subjectPerf;
        return (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={filteredSubjectPerf}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#6366F1" name="Accuracy (%)" />
              <Bar dataKey="attempts" fill="#F59E42" name="Attempts" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-0 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 border-2 border-indigo-200 dark:border-indigo-700 backdrop-blur-lg mt-10 mb-10">
        <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-yellow-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          📊 Your Performance Dashboard
        </h2>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="p-2 rounded-lg border-2 border-indigo-300 dark:border-indigo-600 bg-white/80 dark:bg-gray-800 dark:text-white font-semibold shadow-inner"
          >
            <option value="subject">Subject-wise Performance</option>
            <option value="chapter">Chapter-wise Scores</option>
            <option value="time">Weekly/Monthly Progress</option>
            <option value="comparison">Comparison with Class Average</option>
            <option value="difficulty">Performance by Difficulty</option>
            <option value="selfeval">Self-Eval vs Actual</option>
          </select>
          {viewType === "subject" && (
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="p-2 rounded-lg border-2 border-indigo-300 dark:border-indigo-600 bg-white/80 dark:bg-gray-800 dark:text-white font-semibold shadow-inner"
            >
              <option value="">All Subjects</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.name}
                </option>
              ))}
            </select>
          )}
          {viewType === "chapter" && (
            <select
              value={selectedTopic}
              onChange={handleTopicChange}
              className="p-2 rounded-lg border-2 border-indigo-300 dark:border-indigo-600 bg-white/80 dark:bg-gray-800 dark:text-white font-semibold shadow-inner"
            >
              <option value="">All Chapters</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          )}
          {viewType === "time" && (
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="p-2 rounded-lg border-2 border-indigo-300 dark:border-indigo-600 bg-white/80 dark:bg-gray-800 dark:text-white font-semibold shadow-inner"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          )}
        </div>

        {/* Main Chart */}
        <div className="w-full h-[340px] flex items-center justify-center">
          {error ? (
            <p className="text-red-600 text-center font-medium">{error}</p>
          ) : (
            renderChart()
          )}
        </div>

        {/* Table for quick stats */}
        {progress && (
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-yellow-400 text-center">
              Quick Stats
            </h3>
            <table className="w-full text-left mb-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
                  <th className="p-2 border">Student ID</th>
                  <th className="p-2 border">Total Attempts</th>
                  <th className="p-2 border">Accuracy (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-700 dark:text-gray-300">
                  <td className="p-2 border">{progress.student_id}</td>
                  <td className="p-2 border">{progress.total_attempts}</td>
                  <td className="p-2 border">{progress.accuracy.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
