import React, { useState } from "react";
import Papa from "papaparse";
import type { ParseResult } from "papaparse";
import api from "../services/api";


interface CSVQuestion {
  topic_id: number;
  question: string;
  type: string;
  options: string;
  correct_ans: string;
}

const BulkUpload: React.FC = () => {
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse<CSVQuestion>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: ParseResult<CSVQuestion>) => {
        try {
          await api.post("/bulk-upload", results.data);
          setMessage(`✅ Successfully uploaded ${results.data.length} questions.`);
        } catch (err) {
          console.error(err);
          setMessage("❌ Upload failed. Check CSV format or server.");
        }
      },
      error: (error) => {
        console.error(error);
        setMessage("❌ Error parsing the CSV file.");
      },
    });
  };

  return (
    <div className="my-6 p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
        📥 Bulk Upload Questions via CSV
      </h3>

      <label className="block text-sm mb-2 font-medium text-gray-600 dark:text-gray-300">
        Select CSV File:
      </label>

      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="block w-full text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
      />

      {fileName && (
        <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">📄 {fileName}</p>
      )}

      {message && (
        <div className={`mt-4 text-sm font-medium ${
          message.startsWith("✅") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        }`}>
          {message}
        </div>
      )}

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Make sure the file contains columns: <strong>topic_id</strong>, <strong>question</strong>, <strong>type</strong>, <strong>options</strong>, <strong>correct_ans</strong>
      </p>
    </div>
  );
};

export default BulkUpload;
