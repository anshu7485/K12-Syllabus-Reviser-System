import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";

// Environment-based API URL fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const UploadQuestion: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("mcq");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSubjectsList([]);
    setSubject("");
    if (className) {
      // Fetch subjects for the selected class from your backend
      fetch(`http://localhost:8000/subjects/${className.replace("Class ", "")}`)
        .then((res) => res.json())
        .then((data) => {
          // Support both array and object response
          if (Array.isArray(data)) {
            setSubjectsList(data.map((s: any) => s.name || s));
          } else if (data.subjects) {
            setSubjectsList(data.subjects);
          } else {
            setSubjectsList([]);
          }
        })
        .catch(() => setSubjectsList([]));
    }
  }, [className]);

  useEffect(() => {
    if (type !== "mcq") {
      setOptions(["", "", "", ""]);
    }
    setCorrectAnswer("");
  }, [type]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const trimmedQuestion = question.trim();
    const trimmedTopic = topic.trim();
    const trimmedCorrectAnswer = correctAnswer.trim();
    const trimmedOptions = options.map((opt) => opt.trim());

    if (
      !trimmedQuestion ||
      !className ||
      !subject ||
      !trimmedTopic ||
      (type === "mcq" && trimmedOptions.some((opt) => !opt)) ||
      !trimmedCorrectAnswer ||
      !type
    ) {
      setMessage("❌ Please fill in all fields correctly.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/questions`, {
        question: trimmedQuestion,
        options: type === "mcq" ? trimmedOptions : [],
        correctAnswer: trimmedCorrectAnswer,
        className,
        subject,
        type,
        topic: trimmedTopic,
      });

      // Additional POST request as per user instruction
      await axios.post("http://localhost:8000/api/questions/upload", {
        className,
        subject,
        topic: trimmedTopic,
        type,
        question: trimmedQuestion,
        options: type === "mcq" ? trimmedOptions : [],
        correctAnswer: trimmedCorrectAnswer,
        uploaded_by: 1, // If you track which teacher uploads
      });

      setMessage("✅ Question uploaded successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setClassName("");
      setSubject("");
      setType("mcq");
      setTopic("");
    } catch (error) {
      setMessage("❌ Failed to upload question. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-700 to-pink-400 py-10 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-yellow-300 via-pink-400 to-indigo-400 opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-indigo-400 via-pink-400 to-yellow-300 opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-6 justify-center">
            <FaUpload className="text-4xl text-indigo-500 animate-bounce mr-3" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-500">
              Upload New Question
            </h2>
          </div>

          {message && (
            <div
              className={`mb-4 px-4 py-2 rounded text-base font-semibold shadow ${
                message.includes("✅")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="questionType" className="block font-semibold text-indigo-700 mb-1">
                  Question Type
                </label>
                <select
                  id="questionType"
                  className="w-full border border-indigo-300 rounded-lg p-2"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="mcq">MCQ</option>
                  <option value="short">Short Answer</option>
                  <option value="fill">Fill in the Blank</option>
                  <option value="truefalse">True/False</option>
                </select>
              </div>
              <div>
                <label htmlFor="topic" className="block font-semibold text-indigo-700 mb-1">
                  Topic
                </label>
                <input
                  id="topic"
                  type="text"
                  className="w-full border border-pink-300 rounded-lg p-2"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter topic name"
                />
              </div>

              <div>
                <label htmlFor="class" className="block font-semibold text-indigo-700 mb-1">
                  Class
                </label>
                <select
                  id="class"
                  className="w-full border border-yellow-300 rounded-lg p-2"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                >
                  <option value="">Select class</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={`Class ${i + 1}`}>
                      Class {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block font-semibold text-indigo-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full border border-yellow-300 rounded-lg p-2"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Select subject</option>
                  {subjectsList.map((subj, idx) => (
                    <option key={idx} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="question" className="block font-semibold text-indigo-700 mb-1">
                Question
              </label>
              <textarea
                id="question"
                className="w-full border border-indigo-300 rounded-lg p-3"
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter the question here..."
              ></textarea>
            </div>

            {type === "mcq" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <div key={index}>
                    <label className="block font-semibold text-indigo-700 mb-1">Option {index + 1}</label>
                    <input
                      type="text"
                      className="w-full border border-pink-300 rounded-lg p-2"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <label htmlFor="correctAnswer" className="block font-semibold text-indigo-700 mb-1">
                Correct Answer
              </label>
              {type === "mcq" || type === "truefalse" ? (
                <select
                  id="correctAnswer"
                  className="w-full border border-indigo-300 rounded-lg p-2"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                >
                  <option value="">Select the correct answer</option>
                  {type === "mcq"
                    ? options.map((option, index) => (
                        <option key={index} value={option}>
                          {option || `Option ${index + 1}`}
                        </option>
                      ))
                    : ["True", "False"].map((val) => (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      ))}
                </select>
              ) : (
                <input
                  id="correctAnswer"
                  type="text"
                  className="w-full border border-indigo-300 rounded-lg p-2"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  placeholder="Enter correct answer"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 text-white font-bold px-6 py-3 rounded-lg shadow hover:shadow-xl transition duration-300 hover:scale-105 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit Question"}
            </button>
          </form>
        </div>
      </div>
      <style>
        {`
          .animate-bounce {
            animation: bounce 1.5s infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default UploadQuestion;
