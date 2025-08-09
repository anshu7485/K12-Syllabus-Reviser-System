import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface Subject {
  id: number;
  name: string;
}

interface Topic {
  id: number;
  name: string;
  subject_id: number;
}

const Dashboard: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const studentClass = user?.student_class;

  useEffect(() => {
    if (!studentClass) {
      setError("❌ Student class not found. Please login again.");
      return;
    }

    api
      .get<Subject[]>(`/subjects/${studentClass}`)
      .then((res) => setSubjects(res.data))
      .catch(() => setError("❌ Failed to load subjects for your class."));
  }, [studentClass]);

  useEffect(() => {
    if (selectedSubject !== null) {
      api
        .get<Topic[]>(`/topics/${selectedSubject}`)
        .then((res) => setTopics(res.data))
        .catch(() => setError("❌ Failed to load topics"));
    }
  }, [selectedSubject]);

  const startQuiz = () => {
    if (selectedTopic) {
      navigate(`/quiz/${selectedTopic}`);
    } else {
      alert("Please select a topic first.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 to-pink-400 dark:from-gray-900 dark:to-gray-800 transition duration-500">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-10 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          🎓 Student Dashboard
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Subject
            </label>
            <select
              onChange={(e) => {
                setSelectedSubject(Number(e.target.value));
                setSelectedTopic(null);
              }}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            >
              <option value="">-- Choose Subject --</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.name}
                </option>
              ))}
            </select>
          </div>

          {topics.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Topic
              </label>
              <select
                onChange={(e) => setSelectedTopic(Number(e.target.value))}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
              >
                <option value="">-- Choose Topic --</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={startQuiz}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition duration-300"
          >
            🚀 Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
