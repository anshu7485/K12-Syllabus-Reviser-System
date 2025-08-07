import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Subject {
  id: number;
  name: string;
}

const ConnectionCheck: React.FC = () => {
  const [message, setMessage] = useState("⏳ Checking backend...");

  useEffect(() => {
    api.get<Subject[]>("/subjects")
      .then((res) => {
        setMessage(`✅ Connected! Found ${res.data.length} subjects.`);
      })
      .catch(() => {
        setMessage("❌ Backend not reachable or error occurred.");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-xl font-semibold text-gray-800 dark:text-white">
        {message}
      </div>
    </div>
  );
};

export default ConnectionCheck;
