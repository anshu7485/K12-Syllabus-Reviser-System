import React, { useEffect, useState } from "react";
import api from "../services/api";
import { FaUserGraduate, FaClock, FaChartPie } from "react-icons/fa";

interface StudentProgress {
  student_id: number;
  student_name: string;
  class: string;
  subject: string;
  topic: string;
  accuracy: number;
  time_spent: number;
}

const TeacherStudentProgress: React.FC = () => {
  const [progressData, setProgressData] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<StudentProgress[]>("/performance/all-progress")
      .then((res) => {
        setProgressData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Failed to load student progress data.");
        setLoading(false);
      });
  }, []);

  const groupedByStudent = progressData.reduce((acc: any, entry) => {
    if (!acc[entry.student_id]) acc[entry.student_id] = { name: entry.student_name, class: entry.class, records: [] };
    acc[entry.student_id].records.push(entry);
    return acc;
  }, {});

  if (loading) {
    return <div className="p-8 text-lg text-center">⏳ Loading student progress...</div>;
  }

  if (error) {
    return <div className="p-8 text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-indigo-100 to-yellow-50 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent mb-10">
        📊 Student Progress Overview
      </h1>

      <div className="space-y-10">
        {Object.entries(groupedByStudent).map(([id, student]: any) => (
          <div
            key={id}
            className="bg-white/90 shadow-xl rounded-3xl p-6 border-l-8 border-pink-400"
          >
            <h2 className="text-2xl font-bold text-indigo-600 mb-3 flex items-center gap-2">
              <FaUserGraduate className="text-pink-500" />
              {student.name} (Class {student.class}) — ID: {id}
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden text-sm bg-white">
                <thead className="bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100">
                  <tr>
                    <th className="p-2 border">Subject</th>
                    <th className="p-2 border">Topic</th>
                    <th className="p-2 border">Accuracy</th>
                    <th className="p-2 border">Time Spent (sec)</th>
                  </tr>
                </thead>
                <tbody>
                  {student.records.map((record: StudentProgress, index: number) => (
                    <tr
                      key={index}
                      className="text-gray-800 hover:bg-gradient-to-r hover:from-pink-50 hover:via-indigo-50 hover:to-yellow-50 transition"
                    >
                      <td className="p-2 border">{record.subject}</td>
                      <td className="p-2 border">{record.topic}</td>
                      <td className="p-2 border">
                        <span className="flex items-center gap-1">
                          <FaChartPie className="text-green-500" />
                          {record.accuracy.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-2 border">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-blue-500" />
                          {record.time_spent}s
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherStudentProgress;
