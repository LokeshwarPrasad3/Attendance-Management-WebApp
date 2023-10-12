import '../src/CSS/Style.css';
import { Route, Routes } from 'react-router-dom';
import Authentication from './Pages/Authentication';
import Home from './Pages/Home';
import HistoryAttendence from './Pages/HistoryAttendence';
// import StudentPage from './Pages/StudentPage';



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<HistoryAttendence />} />
        {/* <Route path="/student" element={<StudentPage />} /> */}

      </Routes>
    </>
  )
}

export default App
