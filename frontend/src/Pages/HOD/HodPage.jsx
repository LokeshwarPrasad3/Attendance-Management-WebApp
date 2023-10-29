import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";

import { GetLoggedUser } from "../../Context/LoggedUserData";
import ClassAttendence from "../../Components/HOD/ClassAttendence";
import StudentAttendence from "../../Components/HOD/StudentAttendence";

const HodPage = () => {
  const { loggedUser } = GetLoggedUser;

  useEffect(() => {}, [loggedUser]);

  // Main HOD page list of classess store in cache
  const [searchedStudentAttendence, setSearchedStudentAttedence] = useState([]);

  const [showStudentAttedenceComponent, setShowStudentAttedenceComponent] =
    useState(false);
  const [showSem, setShowSem] = useState(null);
  const [showBranch, setShowBranch] = useState(null);
  const [showDate, setShowDate] = useState(null);

  return (
    <>
      {/* need pass what visible admin, student, teacher */}
      <Navbar />
      {showStudentAttedenceComponent ? (
        <>
          <StudentAttendence
            showSem={showSem}
            showBranch={showBranch}
            setSearchedStudentAttedence={setSearchedStudentAttedence}
            showDate={showDate}
            setShowStudentAttedenceComponent={setShowStudentAttedenceComponent}
          />
        </>
      ) : (
        <>
          <ClassAttendence
            searchedStudentAttendence={searchedStudentAttendence}
            setSearchedStudentAttedence={setSearchedStudentAttedence}
            setShowStudentAttedenceComponent={setShowStudentAttedenceComponent}
            setShowSem={setShowSem}
            setShowDate={setShowDate}
            setShowBranch={setShowBranch}
          />
        </>
      )}
    </>
  );
};

export default HodPage;
