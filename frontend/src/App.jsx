import "../src/CSS/Style.css";
import { Route, Routes } from "react-router-dom";
import Authentication from "./Pages/Authentication";
import TeacherHome from "./Pages/Teacher/TeacherHome";
import HistoryAttendence from "./Pages/Teacher/HistoryAttendence";
import StudentPage from "./Pages/Student/StudentPage";
import TeacherPage from "./Pages/Teacher/TeacherPage";
import ManageTeacher from "./Pages/HOD/ManageTeacher";
import ManageStudent from "./Pages/HOD/ManageStudent";
import HodPage from "./Pages/HOD/HodPage";
import HodProfilePage from "./Pages/HOD/HodProfilePage";

function App() {
  return (
    <>
      <Routes>
        {/* student, teacher login page */}
        <Route path="/" element={<Authentication />} />
        {/* Teacher access page */}
        <Route path="/home" element={<TeacherHome />} />
        <Route path="/history" element={<HistoryAttendence />} />
        <Route path="/teacher" element={<TeacherPage />} />
        {/* Student Access Page */}
        <Route path="/student" element={<StudentPage />} />
        {/* HOD access page */}
        <Route path="/hod" element={<HodProfilePage />} />
        <Route path="/data" element={<HodPage />} />
        <Route path="/manage-teacher" element={<ManageTeacher />} />
        <Route path="/manage-student" element={<ManageStudent />} />

        <Route path="*" element={<Authentication />} />
      </Routes>
    </>
  );
}

export default App;
