import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditQuestion: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [type, setType] = useState("mcq");
  const [options, setOptions] = useState("");
  const [correctAns, setCorrectAns] = useState("");
  const [topicId, setTopicId] = useState<number>(1);
  const [message, setMessage] = useState("");

  interface Question {
  id: number;
  question: string;
  type: string;
  options: string;
  correct_ans: string;
  topic_id: number;
}


useEffect(() => {
  api
    .get<Question[]>(`/questions`)
    .then((res) => {
      const q = res.data.find((q) => q.id === Number(id));
      if (!q) {
        setMessage("❌ Question not found.");
        return;
      }

      setQuestion(q.question);
      setType(q.type);
      setOptions(q.options);
      setCorrectAns(q.correct_ans);
      setTopicId(q.topic_id);
    })
    .catch(() => setMessage("❌ Failed to load question."));
}, [id]);


  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .put(`/questions/${id}`, {
        question,
        type,
        options,
        correct_ans: correctAns,
        topic_id: topicId,
      })
      .then(() => {
        setMessage("✅ Question updated!");
        setTimeout(() => navigate("/admin/questions"), 1000);
      })
      .catch(() => setMessage("❌ Failed to update."));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
          ✏️ Edit Question #{id}
        </h2>

        {message && (
          <p
            className={`mb-4 text-center font-semibold ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            >
              <option value="mcq">MCQ</option>
              <option value="truefalse">True/False</option>
              <option value="fill">Fill in the Blank</option>
              <option value="short">Short Answer</option>
            </select>
          </div>

          {(type === "mcq" || type === "truefalse") && (
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Options (comma-separated)
              </label>
              <input
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Correct Answer
            </label>
            <input
              value={correctAns}
              onChange={(e) => setCorrectAns(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow"
          >
            Update Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
