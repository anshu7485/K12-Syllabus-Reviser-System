import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import ConnectionCheck from "./pages/ConnectionCheck";
import AdminDashboard from "./pages/AdminDashboard";
import EditQuestion from "./pages/EditQuestion";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import TeacherDashboard from "./pages/TeacherDashboard";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";
import Syllabus from "./pages/Syllabus";
import About from "./pages/About";
import UploadQuestion from "./pages/UploadQuestion";
import TeacherStudentProgress from "./pages/TeacherStudentProgress";

import Cube from "./pages/Cube";




import Navbar from "./components/Navbar";
import BulkUpload from "./components/BulkUpload";



import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

function App() {
  return (
    <Router>
      {/* Show Header only on Landing, Login, Signup, Syllabus */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Landing />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />
        <Route
          path="/syllabus"
          element={
            <>
              <Header />
              <Syllabus />
            </>
          }
        />
        <Route path="/self-evaluation" element={<Cube />} />

        <Route
          path="/teacher-student-progress"
          element={
            <>
              <Header />
              <TeacherStudentProgress />
            </>
          }
        />
        <Route
          path="/UploadQuestion"
          element={
            <>
              <Header />
              <UploadQuestion />
            </>
          }
        />


        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Header />
              <Signup />
            </>
          }
        />
        {/* 🔓 Public Routes */}
        <Route path="/check" element={<ConnectionCheck />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/bulk-upload" element={<BulkUpload />} />

        {/* 🔒 Protected Routes */}

        {/* 🔐 Role-Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
              <>
                <Navbar />
                <Dashboard />
              </>
            </RoleProtectedRoute>
          }
        />
        <Route path="/403" element={<Error403 />} />
        <Route path="*" element={<Error404 />} />

        <Route
          path="/student"
          element={
            <RoleProtectedRoute allowedRoles={["student"]}>
              <>
                <Navbar />
                <StudentDashboard />
              </>
            </RoleProtectedRoute>
          }
        />


        <Route
          path="/edit-question/:id"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "teacher"]}>
              <>
                <Navbar />
                <EditQuestion />
              </>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <RoleProtectedRoute allowedRoles={["teacher"]}>
              <>
                <Navbar />
                <TeacherDashboard />
              </>
            </RoleProtectedRoute>
          }
        />



        <Route
          path="/admin/questions"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar />

              </>
            </RoleProtectedRoute>
          }
        />


        <Route
          path="/quiz/:topicId"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Quiz />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Progress />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-question"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "teacher"]}>
              <>
                <Navbar />
              </>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar />
                <AdminDashboard />
              </>
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
