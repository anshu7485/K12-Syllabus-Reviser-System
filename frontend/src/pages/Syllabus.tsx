import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, ChevronDown, GraduationCap, School, BookOpen, FileText, ChevronRight, Play, ArrowLeft } from "lucide-react";

const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

interface Chapter {
  id: string;
  name: string;
  description: string;
  practiceQuestions: number;
}

interface Subject {
  name: string;
  chapters: Chapter[];
}

const subjectsPerClass: Record<string, Subject[]> = {
  "Class 1": [
    {
      name: "Math",
      chapters: [
        { id: "math-1-1", name: "Numbers 1-10", description: "Basic counting and number recognition", practiceQuestions: 15 },
        { id: "math-1-2", name: "Addition & Subtraction", description: "Simple addition and subtraction within 10", practiceQuestions: 20 },
        { id: "math-1-3", name: "Shapes", description: "Basic shapes recognition", practiceQuestions: 10 }
      ]
    },
    {
      name: "EVS",
      chapters: [
        { id: "evs-1-1", name: "My Family", description: "Understanding family relationships", practiceQuestions: 12 },
        { id: "evs-1-2", name: "My Body", description: "Parts of the body", practiceQuestions: 15 },
        { id: "evs-1-3", name: "Animals Around Us", description: "Common animals and their sounds", practiceQuestions: 18 }
      ]
    },
    {
      name: "English",
      chapters: [
        { id: "eng-1-1", name: "Alphabets", description: "A to Z recognition and writing", practiceQuestions: 26 },
        { id: "eng-1-2", name: "Simple Words", description: "Three letter words", practiceQuestions: 20 },
        { id: "eng-1-3", name: "Rhymes", description: "Simple nursery rhymes", practiceQuestions: 10 }
      ]
    }
  ],
  "Class 10": [
    {
      name: "Math",
      chapters: [
        { id: "math-10-1", name: "Real Numbers", description: "Euclid's division lemma, HCF, LCM", practiceQuestions: 25 },
        { id: "math-10-2", name: "Polynomials", description: "Polynomials and their zeros", practiceQuestions: 30 },
        { id: "math-10-3", name: "Linear Equations", description: "Pair of linear equations in two variables", practiceQuestions: 35 },
        { id: "math-10-4", name: "Quadratic Equations", description: "Solutions of quadratic equations", practiceQuestions: 28 },
        { id: "math-10-5", name: "Arithmetic Progressions", description: "AP and its applications", practiceQuestions: 22 }
      ]
    },
    {
      name: "Science",
      chapters: [
        { id: "sci-10-1", name: "Light - Reflection and Refraction", description: "Laws of reflection and refraction", practiceQuestions: 30 },
        { id: "sci-10-2", name: "Human Eye", description: "Structure and function of human eye", practiceQuestions: 25 },
        { id: "sci-10-3", name: "Electricity", description: "Electric current and its effects", practiceQuestions: 35 },
        { id: "sci-10-4", name: "Carbon and its Compounds", description: "Properties and uses of carbon compounds", practiceQuestions: 40 },
        { id: "sci-10-5", name: "Life Processes", description: "Life processes in living organisms", practiceQuestions: 32 }
      ]
    },
    {
      name: "English",
      chapters: [
        { id: "eng-10-1", name: "First Flight", description: "Prose and poetry collection", practiceQuestions: 20 },
        { id: "eng-10-2", name: "Footprints without Feet", description: "Supplementary reader", practiceQuestions: 18 },
        { id: "eng-10-3", name: "Grammar", description: "Parts of speech, tenses, voice", practiceQuestions: 45 },
        { id: "eng-10-4", name: "Writing Skills", description: "Letter writing, essay writing", practiceQuestions: 15 }
      ]
    },
    {
      name: "Hindi",
      chapters: [
        { id: "hindi-10-1", name: "कृतिका", description: "गद्य संग्रह", practiceQuestions: 20 },
        { id: "hindi-10-2", name: "स्पर्श", description: "काव्य संग्रह", practiceQuestions: 22 },
        { id: "hindi-10-3", name: "व्याकरण", description: "व्याकरण के नियम", practiceQuestions: 35 },
        { id: "hindi-10-4", name: "लेखन कौशल", description: "पत्र लेखन, निबंध लेखन", practiceQuestions: 15 }
      ]
    },
    {
      name: "Social Science",
      chapters: [
        { id: "ss-10-1", name: "History - Nationalism in Europe", description: "Rise of nationalism in 19th century Europe", practiceQuestions: 25 },
        { id: "ss-10-2", name: "Geography - Resources and Development", description: "Resource planning in India", practiceQuestions: 30 },
        { id: "ss-10-3", name: "Political Science - Power Sharing", description: "Need for power sharing", practiceQuestions: 20 },
        { id: "ss-10-4", name: "Economics - Development", description: "Understanding economic development", practiceQuestions: 28 }
      ]
    },
    {
      name: "Computer",
      chapters: [
        { id: "comp-10-1", name: "Programming Fundamentals", description: "Basic programming concepts", practiceQuestions: 25 },
        { id: "comp-10-2", name: "Database Concepts", description: "Introduction to databases", practiceQuestions: 20 },
        { id: "comp-10-3", name: "Web Development", description: "HTML, CSS basics", practiceQuestions: 30 },
        { id: "comp-10-4", name: "IT Applications", description: "Practical applications of IT", practiceQuestions: 22 }
      ]
    }
  ]
};

// For other classes, create basic structure
["Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 11", "Class 12"].forEach(cls => {
  const classNum = parseInt(cls.split(" ")[1]);
  let subjects = ["Math", "Science", "English", "Hindi", "Social Science"];
  
  if (classNum <= 2) {
    subjects = ["Math", "EVS", "English"];
    if (classNum === 2) subjects.push("Hindi");
  }
  if (classNum >= 6) subjects.push("Computer");
  if (classNum >= 11) {
    subjects = ["Math", "Physics", "Chemistry", "Biology", "English", "Computer Science", "Economics"];
  }
  
  subjectsPerClass[cls] = subjects.map(subjectName => ({
    name: subjectName,
    chapters: [
      { 
        id: `${subjectName.toLowerCase()}-${classNum}-1`, 
        name: `${subjectName} Chapter 1`, 
        description: `Fundamental concepts of ${subjectName} for ${cls}`, 
        practiceQuestions: 15 + Math.floor(Math.random() * 10)
      },
      { 
        id: `${subjectName.toLowerCase()}-${classNum}-2`, 
        name: `${subjectName} Chapter 2`, 
        description: `Intermediate concepts of ${subjectName} for ${cls}`, 
        practiceQuestions: 20 + Math.floor(Math.random() * 10)
      },
      { 
        id: `${subjectName.toLowerCase()}-${classNum}-3`, 
        name: `${subjectName} Chapter 3`, 
        description: `Advanced concepts of ${subjectName} for ${cls}`, 
        practiceQuestions: 25 + Math.floor(Math.random() * 10)
      },
      { 
        id: `${subjectName.toLowerCase()}-${classNum}-4`, 
        name: `${subjectName} Chapter 4`, 
        description: `Application-based problems of ${subjectName} for ${cls}`, 
        practiceQuestions: 18 + Math.floor(Math.random() * 12)
      }
    ]
  }));
});

export default function Syllabus() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>("Class 1");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [showPracticeQuestions, setShowPracticeQuestions] = useState<boolean>(false);

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedChapter(null);
    setShowPracticeQuestions(false);
  };

  const handleChapterClick = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setShowPracticeQuestions(true);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedChapter(null);
    setShowPracticeQuestions(false);
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
    setShowPracticeQuestions(false);
  };

  // Generate practice questions for a chapter
  const generatePracticeQuestions = (chapter: Chapter) => {
    const questionTypes = ['mcq', 'true-false', 'fill', 'short'];
    const questions = [];

    for (let i = 0; i < chapter.practiceQuestions; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      let question = {};
      
      switch (type) {
        case 'mcq':
          question = {
            id: i + 1,
            question: `${chapter.name}: MCQ Question ${i + 1} - ${chapter.description}`,
            type: 'mcq',
            options: 'Option A, Option B, Option C, Option D'
          };
          break;
        case 'true-false':
          question = {
            id: i + 1,
            question: `${chapter.name}: True/False Question ${i + 1} - ${chapter.description}`,
            type: 'true-false',
            options: 'True, False'
          };
          break;
        case 'fill':
          question = {
            id: i + 1,
            question: `${chapter.name}: Fill in the blank - ${chapter.description} ________.`,
            type: 'fill'
          };
          break;
        case 'short':
          question = {
            id: i + 1,
            question: `${chapter.name}: Short Answer Question ${i + 1} - Explain ${chapter.description}`,
            type: 'short'
          };
          break;
      }
      questions.push(question);
    }
    
    return questions;
  };

  const startPracticeQuiz = (chapter: Chapter) => {
    // Generate questions for the chapter
    const questions = generatePracticeQuestions(chapter);
    
    // Store questions in localStorage for Quiz component
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
    localStorage.setItem("currentChapter", JSON.stringify({
      chapterName: chapter.name,
      subjectName: selectedSubject?.name,
      className: selectedClass,
      description: chapter.description
    }));
    
    // Navigate to quiz page
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-400 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Decorative SVG AI/Education Illustration */}
      <svg
        className="absolute top-0 left-0 w-[350px] h-[350px] opacity-20 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <ellipse cx="200" cy="200" rx="180" ry="120" fill="url(#aiGradient)" />
        <defs>
          <linearGradient id="aiGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-10 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <rect x="80" y="80" width="240" height="240" rx="80" fill="url(#aiGradient2)" />
        <defs>
          <linearGradient id="aiGradient2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mt-16 p-6 w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <GraduationCap className="text-yellow-300 text-4xl drop-shadow-lg animate-bounce" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
              Syllabus Explorer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <School className="text-indigo-400 text-3xl md:text-4xl" />
            <span className="text-xl md:text-2xl font-semibold text-white bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              AI-Powered Education Portal
            </span>
          </div>
        </div>

        {/* Navigation Breadcrumb */}
        {(selectedSubject || selectedChapter) && (
          <div className="mb-6 flex items-center gap-2 text-white">
            <button 
              onClick={handleBackToSubjects}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition"
            >
              <ArrowLeft className="text-lg" />
              {selectedClass}
            </button>
            {selectedSubject && (
              <>
                <ChevronRight className="text-lg" />
                <span className="px-3 py-1 rounded-lg bg-white/20">
                  {selectedSubject.name}
                </span>
              </>
            )}
            {selectedChapter && (
              <>
                <ChevronRight className="text-lg" />
                <button 
                  onClick={handleBackToChapters}
                  className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition"
                >
                  {selectedChapter.name}
                </button>
              </>
            )}
          </div>
        )}

        {/* Class Selector */}
        {!selectedSubject && (
          <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
            <label className="block text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-green-400 bg-clip-text text-transparent mb-2 md:mb-0">
              Select Class
            </label>
            <div className="relative w-64">
              <select
                className="w-full px-4 py-3 border-2 border-indigo-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-lg md:text-xl font-semibold transition"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-4 text-indigo-400 pointer-events-none text-2xl md:text-3xl" />
            </div>
          </div>
        )}

        {/* Conditional Rendering */}
        {!selectedSubject ? (
          // Subject List
          <div className="mt-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent flex items-center gap-3">
              <BookOpen className="text-indigo-400 text-2xl md:text-3xl" /> Subjects in {selectedClass}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectsPerClass[selectedClass]?.map((subject) => (
                <li
                  key={subject.name}
                  onClick={() => handleSubjectClick(subject)}
                  className="p-6 rounded-2xl bg-white/90 shadow-xl border-l-8 border-indigo-400 flex flex-col gap-2 hover:scale-105 hover:shadow-2xl transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl font-bold text-indigo-700 flex items-center gap-2">
                      <Book className="text-pink-400 text-xl md:text-2xl group-hover:animate-bounce" /> {subject.name}
                    </span>
                    <div className="flex items-center gap-1 text-sm md:text-base font-semibold text-pink-600 hover:text-indigo-700 transition">
                      <FileText className="text-indigo-400 text-lg md:text-xl" />
                      <ChevronRight className="text-lg" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs md:text-sm text-gray-600">
                    <span className="bg-gradient-to-r from-yellow-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                      {subject.chapters.length} Chapters Available
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500 italic">
                    <span className="bg-gradient-to-r from-yellow-200 via-pink-100 to-indigo-100 bg-clip-text text-transparent">
                      AI-Powered Learning for {subject.name}
                    </span>
                  </div>
                </li>
              )) || (
                <p className="col-span-3 text-center text-gray-300">
                  No subjects available for {selectedClass}.
                </p>
              )}
            </ul>
          </div>
        ) : !showPracticeQuestions ? (
          // Chapter List
          <div className="mt-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent flex items-center gap-3">
              <BookOpen className="text-indigo-400 text-2xl md:text-3xl" /> {selectedSubject.name} Chapters
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedSubject.chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter)}
                  className="p-6 rounded-2xl bg-white/90 shadow-xl border-l-8 border-pink-400 flex flex-col gap-3 hover:scale-105 hover:shadow-2xl transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-lg md:text-xl font-bold text-pink-700 flex items-center gap-2">
                        <FileText className="text-indigo-400 text-xl md:text-2xl group-hover:animate-bounce" /> {chapter.name}
                      </span>
                      <p className="text-sm md:text-base text-gray-600 mt-2">
                        {chapter.description}
                      </p>
                    </div>
                    <ChevronRight className="text-pink-400 text-lg mt-1" />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs md:text-sm bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                      {chapter.practiceQuestions} Practice Questions
                    </span>
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <Play className="text-lg" />
                      Start Practice
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Practice Questions Section
          <div className="mt-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent flex items-center gap-3">
              <Play className="text-green-400 text-2xl md:text-3xl" /> Practice Questions: {selectedChapter?.name}
            </h2>
            <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2">
                  {selectedChapter?.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedChapter?.description}
                </p>
                <div className="flex items-center justify-center gap-4 text-sm md:text-base">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                    {selectedChapter?.practiceQuestions} Questions
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                    AI-Generated
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => selectedChapter && startPracticeQuiz(selectedChapter)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                  <Play className="text-xl" />
                  Start Practice Quiz
                </button>
                <p className="text-gray-500 text-sm mt-4">
                  Test your knowledge with AI-generated questions
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
