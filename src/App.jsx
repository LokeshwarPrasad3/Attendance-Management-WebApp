import "../src/CSS/Style.css";
import { Route, Routes } from "react-router-dom";
import Authentication from "./Pages/Authentication";
import Home from "./Pages/Teacher/Home";
import HistoryAttendence from "./Pages/Teacher/HistoryAttendence";
import StudentPage from "./Pages/Student/StudentPage";
import TeacherPage from "./Pages/Teacher/TeacherPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<HistoryAttendence />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
      </Routes>
    </>
  );
}

export default App;
