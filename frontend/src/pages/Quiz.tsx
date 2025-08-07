import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Question {
  id: number;
  question: string;
  type: string;
  options?: string;
}

interface SubmitResponseItem {
  question_id: number;
  answer: string;
  score: number;
}

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [responses, setResponses] = useState<SubmitResponseItem[]>([]);
  const [timer, setTimer] = useState<number>(60);
  const [submitted, setSubmitted] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const studentId = user?.id;

  useEffect(() => {
    const quizData = localStorage.getItem("quizQuestions");
    if (quizData) {
      setQuestions(JSON.parse(quizData));
    } else {
      alert("No quiz data found. Please start from dashboard.");
      navigate("/dashboard");
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (submitted) return;
    if (timer === 0) handleSubmit();
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, submitted]);

  const handleOptionChange = (qid: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      student_id: studentId,
      answers: Object.entries(answers).map(([question_id, answer]) => ({
        question_id: Number(question_id),
        answer,
      })),
    };

    api
      .post<SubmitResponseItem[]>("/submit-answers", payload)
      .then((res) => {
        setResponses(res.data);
        const total = res.data.length;
        const sum = res.data.reduce((acc, r) => acc + r.score, 0);
        setAccuracy((sum / total) * 100);
        setSubmitted(true);
      })
      .catch(() => alert("Submission failed"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-300 to-indigo-300 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">📝 Quiz</h2>
          {!submitted && (
            <div className="text-md font-medium text-red-600 dark:text-red-400">
              ⏳ Time Left: {timer}s
            </div>
          )}
        </div>

        {questions.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Loading questions...</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {questions.map((q, idx) => (
              <div key={q.id} className="mb-6">
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Q{idx + 1}: {q.question}
                </h3>

                {/* Objective (MCQ or True/False) */}
                {(q.type === "mcq" || q.type === "true-false") &&
                  q.options?.split(",").map((opt, i) => (
                    <div key={i} className="mb-1">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={opt.trim()}
                          checked={answers[q.id] === opt.trim()}
                          onChange={() => handleOptionChange(q.id, opt.trim())}
                          className="mr-2"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                      </label>
                    </div>
                  ))}

                {/* Subjective or Fill-in-the-Blank */}
                {(q.type === "fill" || q.type === "short") && (
                  <textarea
                    value={answers[q.id] || ""}
                    onChange={(e) => handleOptionChange(q.id, e.target.value)}
                    rows={q.type === "short" ? 4 : 1}
                    placeholder={q.type === "short" ? "Write your answer..." : "Fill the blank..."}
                    className="w-full mt-2 p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  />
                )}

                {/* Score Feedback */}
                {submitted && (() => {
                  const response = responses.find((r) => r.question_id === q.id);
                  if (!response) return null;
                  const score = response.score;
                  const color =
                    score >= 0.8
                      ? "text-green-600"
                      : score >= 0.5
                      ? "text-yellow-600"
                      : "text-red-600";

                  return (
                    <p className={`mt-1 text-sm font-medium ${color}`}>
                      Score: {score} / 1
                    </p>
                  );
                })()}
              </div>
            ))}

            {/* Submit or Result */}
            {!submitted ? (
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition"
              >
                🚀 Submit Quiz
              </button>
            ) : (
              <div className="text-center mt-6">
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  🎉 You scored {accuracy?.toFixed(2)}%
                </h2>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="mt-4 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Back to Dashboard
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Quiz;
