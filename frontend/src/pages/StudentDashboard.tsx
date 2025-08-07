import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface Subject {
  id: number;
  name: string;
  class_name: string;
}

interface Topic {
  id: number;
  name: string;
  subject_id: number;
}

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [studentClass, setStudentClass] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [questionType, setQuestionType] = useState<string>("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.role === "student" && user.student_class) {
      setStudentClass(user.student_class);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (studentClass) {
      api
        .get(`/subjects/${studentClass}`)
        .then((res) => setSubjects(res.data as Subject[]))
        .catch(() => console.error("Failed to load subjects"));
    }
  }, [studentClass]);

  const fetchTopics = (subjectId: number) => {
    setSelectedSubjectId(subjectId);
    setTopics([]); // reset before fetch
    api
      .get(`/topics/${subjectId}`)
      .then((res) => setTopics(res.data as Topic[]))
      .catch(() => console.error("Failed to load topics"));
  };

  const handleStartQuiz = () => {
    if (!selectedSubjectId || !selectedTopicId || !studentClass || !questionType) {
      alert("Please select subject, topic, and question type.");
      return;
    }

    api
      .get(`/questions`, {
        params: {
          class: studentClass,
          subject_id: selectedSubjectId,
          topic_id: selectedTopicId,
          type: questionType,
        },
      })
      .then((res) => {
        const questions = (res.data as { questions?: any[] }).questions || [];
        if (questions.length === 0) {
          alert("No questions found for this selection.");
        } else {
          localStorage.setItem("quizQuestions", JSON.stringify(questions));
          navigate("/quiz");
        }
      })
      .catch(() => alert("Failed to load questions."));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 p-0 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-10 border-2 border-indigo-200 dark:border-indigo-700 backdrop-blur-lg mt-16 mb-10">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-yellow-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          🎓 Student Dashboard
        </h1>

        {/* Subject Selection */}
        <div className="mb-6">
          <label className="block font-bold bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent mb-2">
            Select Subject
          </label>
          <select
            onChange={(e) => fetchTopics(parseInt(e.target.value))}
            className="w-full p-3 rounded-lg border-2 border-indigo-300 dark:border-indigo-600 bg-white/80 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 transition shadow-inner"
            defaultValue=""
          >
            <option value="" disabled>
              -- Choose Subject --
            </option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Selection */}
        {selectedSubjectId && (
          <div className="mb-6">
            <label className="block font-bold bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent mb-2">
              Select Topic
            </label>
            <select
              onChange={(e) => setSelectedTopicId(parseInt(e.target.value))}
              className="w-full p-3 rounded-lg border-2 border-indigo-300 dark:border-indigo-600 bg-white/80 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 transition shadow-inner"
              defaultValue=""
            >
              <option value="" disabled>
                -- Choose Topic --
              </option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Question Type Selection */}
        <div className="mb-8">
          <label className="block font-bold bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent mb-2">
            Select Question Type
          </label>
          <select
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-indigo-300 dark:border-indigo-600 bg-white/80 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 transition shadow-inner"
            defaultValue=""
          >
            <option value="" disabled>
              -- Choose Type --
            </option>
            <option value="mcq">Multiple Choice (MCQ)</option>
            <option value="fill-in-the-blanks">Fill in the Blanks</option>
            <option value="true-false">True / False</option>
          </select>
        </div>

        <button
          onClick={handleStartQuiz}
          className="w-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 text-lg hover:scale-105"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
