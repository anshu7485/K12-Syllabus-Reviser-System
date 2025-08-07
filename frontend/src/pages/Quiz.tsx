import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [timer, setTimer] = useState<number>(300); // 5 minutes for practice quiz
  const [submitted, setSubmitted] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [chapterInfo, setChapterInfo] = useState<any>(null);

  useEffect(() => {
    const quizData = localStorage.getItem("quizQuestions");
    const chapterData = localStorage.getItem("currentChapter");
    
    if (quizData) {
      setQuestions(JSON.parse(quizData));
    } else {
      alert("No quiz data found. Please start from syllabus page.");
      navigate("/syllabus");
    }
    
    if (chapterData) {
      setChapterInfo(JSON.parse(chapterData));
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
    // For practice quiz, calculate score locally without API call
    const mockResponses: SubmitResponseItem[] = questions.map((q) => {
      const userAnswer = answers[q.id] || "";
      let score = 0;
      
      // Simple scoring logic for practice quiz
      if (userAnswer.trim() !== "") {
        // If user answered, give partial credit
        score = Math.random() * 0.5 + 0.5; // Random score between 0.5 and 1 for demo
        if (q.type === 'mcq' && userAnswer.includes('A')) score = 1; // Demo: Option A is always correct
        if (q.type === 'true-false' && userAnswer === 'True') score = 1; // Demo: True is always correct
      }
      
      return {
        question_id: q.id,
        answer: userAnswer,
        score: score
      };
    });

    setResponses(mockResponses);
    const total = mockResponses.length;
    const sum = mockResponses.reduce((acc, r) => acc + r.score, 0);
    setAccuracy((sum / total) * 100);
    setSubmitted(true);
    
    // Save practice quiz result to localStorage
    const practiceResult = {
      chapterInfo,
      questions: questions.length,
      score: (sum / total) * 100,
      completedAt: new Date().toISOString()
    };
    
    const practiceHistory = JSON.parse(localStorage.getItem("practiceHistory") || "[]");
    practiceHistory.push(practiceResult);
    localStorage.setItem("practiceHistory", JSON.stringify(practiceHistory));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-300 to-indigo-300 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        {/* Chapter Info Header */}
        {chapterInfo && (
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-800 dark:to-purple-800 rounded-lg">
            <h1 className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
              📚 {chapterInfo.className} - {chapterInfo.subjectName}
            </h1>
            <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
              📖 Chapter: {chapterInfo.chapterName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {chapterInfo.description}
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            📝 Practice Quiz {chapterInfo ? `(${questions.length} Questions)` : ''}
          </h2>
          {!submitted && (
            <div className="text-md font-medium text-red-600 dark:text-red-400">
              ⏳ Time Left: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
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
                🚀 Submit Practice Quiz
              </button>
            ) : (
              <div className="text-center mt-6">
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  🎉 Practice Complete! You scored {accuracy?.toFixed(1)}%
                </h2>
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-200">
                    📊 Practice Summary
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Chapter: {chapterInfo?.chapterName} | Subject: {chapterInfo?.subjectName}
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    Questions Attempted: {Object.keys(answers).length} / {questions.length}
                  </p>
                </div>
                <div className="flex gap-4 justify-center mt-4">
                  <button
                    onClick={() => navigate("/syllabus")}
                    className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition"
                  >
                    📚 Back to Syllabus
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
                  >
                    🏠 Dashboard
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Quiz;
