import "../src/CSS/Style.css";
import { Route, Routes } from "react-router-dom";
import Authentication from "./Pages/Authentication";
import Home from "./Pages/Teacher/Home";
import HistoryAttendence from "./Pages/Teacher/HistoryAttendence";
import StudentPage from "./Pages/Student/StudentPage";
import TeacherPage from "./Pages/Teacher/TeacherPage";
import AdminPage from "./Pages/HOD/AdminPage";
import ManageTeacher from "./Pages/HOD/ManageTeacher";
import ManageStudent from "./Pages/HOD/ManageStudent";

function App() {
  return (
    <>
      <Routes>
        {/* student, teacher login page */}
        <Route path="/" element={<Authentication />} />
        {/* Teacher access page */}
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<HistoryAttendence />} />
        <Route path="/teacher" element={<TeacherPage />} />
        {/* Student Access Page */}
        <Route path="/student" element={<StudentPage />} />
        {/* Admin page */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/manage-teacher" element={<ManageTeacher />} />
        <Route path="/manage-student" element={<ManageStudent />} />
      </Routes>
    </>
  );
}

export default App;
