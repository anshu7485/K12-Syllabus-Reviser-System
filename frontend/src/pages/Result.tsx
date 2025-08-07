import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface ResponseItem {
    question_id: number;
    answer: string;
    score: number;
}

interface Question {
    id: number;
    question: string;
    correct_ans: string;
    type: string;
    options?: string;
}

const Result: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { topicId, studentId } = location.state || {};

    const [responses, setResponses] = useState<ResponseItem[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!topicId || !studentId) {
            navigate("/dashboard");
            return;
        }

        const fetchResults = async () => {
            try {
                const [respRes, quesRes] = await Promise.all([
                    axios.get<ResponseItem[]>(
                        `http://localhost:8000/responses/${studentId}/${topicId}`
                    ),
                    axios.get<Question[]>(`http://localhost:8000/quiz/${topicId}`)
                ]);

                setResponses(respRes.data);
                setQuestions(quesRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error loading results:", error);
                setLoading(false);
            }
        };

        fetchResults();
    }, [studentId, topicId, navigate]);

    const getFeedback = (score: number): string => {
        if (score >= 0.8) return "✅ Excellent!";
        if (score >= 0.5) return "⚠️ Review this.";
        return "❌ Needs Improvement";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <p className="text-lg text-gray-700 dark:text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    📊 Quiz Results
                </h2>

                {questions.map((q, idx) => {
                    const response = responses.find((r) => r.question_id === q.id);

                    return (
                        <div key={q.id} className="mb-6 p-4 border rounded-md dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Q{idx + 1}: {q.question}
                            </h3>

                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                <strong>Your Answer:</strong> {response?.answer || "N/A"}
                            </p>

                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <strong>Correct Answer:</strong> {q.correct_ans}
                            </p>

                            <p
                                className={`mt-1 text-sm font-medium ${(response?.score ?? 0) >= 0.8
                                    ? "text-green-600"
                                    : (response?.score ?? 0) >= 0.5
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                    }`}
                            >
                                Score: {(response?.score ?? 0).toFixed(2)} / 1
                            </p>

                            <p className="text-sm italic text-gray-500 dark:text-gray-400">
                                {getFeedback(response?.score ?? 0)}
                            </p>
                        </div>
                    );
                })}

                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                    >
                        🔙 Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result;
