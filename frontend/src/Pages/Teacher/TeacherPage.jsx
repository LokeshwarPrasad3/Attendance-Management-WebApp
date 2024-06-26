import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { GetLoggedUser } from "../../Context/LoggedUserData";
import TeacherHome from "./TeacherHome";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PreviousClassData from "../../Components/Teacher/PreviousClassData";

const TeacherPage = () => {
  const navigate = useNavigate();

  // Get Current user by Context-api
  const { loggedUser } = GetLoggedUser();

  // set user for that component
  const [currentUser, setCurrentUser] = useState();

  // When clicked to take attendence then show Home page
  const [showHomePage, setShowHomePage] = useState(false);

  // Take attendence Get data what show in attendence
  const [takeSem, setTakeSem] = useState("");
  const [takeBranch, setTakeBranch] = useState("");
  const [takeSubject, setTakeSubject] = useState("");

  const takeAttendence = (sem, branch, subject) => {
    setTakeSem(sem);
    setTakeBranch(branch);
    setTakeSubject(subject);
    setShowHomePage(true);
  };



  useEffect(() => {
    const token = Cookies.get("_secure_user_");
    const _id = Cookies.get("unique_key");
    const type = Cookies.get("user_type");
    if (!token || !_id || !type) {
      navigate("/");
    } else {
      setCurrentUser(loggedUser);
    }
    document.title = `${currentUser?.name} • Profile Page  `;
  }, [loggedUser, currentUser, navigate, showHomePage]);

  return (
    <>
      <Navbar />

      {!showHomePage ? (
        <>
          <div className="teacher_page_container font-overpass flex flex-col 2xl:gap-6 xl:gap-6 lg:gap-6 md:gap-6 gap-4 items-center mx-auto w-full 2xl:w-min xl:w-min lg:w-min md:p-7 p-4">
            {/* upper part of page */}
            <div className="upper_part w-full bg-[#f2f2f2] flex justify-center items-center gap-5 py-2">
              {/* profile picture and name */}
              <img
                className="h-10 w-10 rounded-full"
                // src="./Images/teacher.png"
                src={`${
                  !currentUser ? currentUser?.pic : "./Images/default_user.jpg"
                }`}
                alt=""
              />
              <h1 className="text-xl font-semibold text-center">
                {currentUser?.name}
              </h1>
            </div>

            <div className="right_part 2xl:min-w-[60vw] xl:min-w-[60vw] lg:min-w-[60vw] md:min-w-[60vw] w-full bg-[#f2f2f2] min-h-[45rem] 2xl:px-9 xl:px-9 md:px-9 md:py-9 p-5">
              {/* teacher basic details show */}
              <div className="teacher_basic_details bg-white md:px-5 px-3 md:py-2 py-3 w-full flex flex-col gap-2">
                <div className="options-container w-full flex justify-between px-2">
                  <h1 className="font-semibold text-xl pl-1">
                    Class - Assignment
                  </h1>
                  <Link
                    to="/history"
                    className="home_see_history w-28 text-center bg-[#314EB5] hover:bg-blue-700 h-6 custom-transition text-white font-signika rounded-md"
                  >
                    SEE HISTORY
                  </Link>
                </div>
                <div className="class_assign_table w-full py-2">
                  <table className="w-full">
                    <thead>
                      <tr className="h-10 text-lg">
                        <th className="text-center border-[1px] border-gray-400">
                          Sno
                        </th>
                        <th className="text-center border-[1px] border-gray-400">
                          Class
                        </th>
                        <th className="text-center border-[1px] border-gray-400">
                          Subject
                        </th>
                        <th className="text-center border-[1px] border-gray-400">
                          Attendence
                        </th>
                        <th className="text-center border-[1px] border-gray-400">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUser?.teach?.map((cls, index) => {
                        return (
                          <tr key={index} className="h-9">
                            <td className="text-center border-[1px] border-gray-400">
                              {index + 1}
                            </td>
                            <td className="text-center border-[1px] border-gray-400">
                              {cls.sem}-Sem-
                              {cls.branch}
                            </td>
                            <td className="text-center border-[1px] border-gray-400">
                              {cls.subject}
                            </td>
                            <td className="text-center border-[1px] border-gray-400">
                              <button
                                className="bg-green-200 px-[2px]"
                                onClick={() =>
                                  takeAttendence(
                                    cls.sem,
                                    cls.branch,
                                    cls.subject
                                  )
                                }
                              >
                                Take
                              </button>
                            </td>
                            <td className="text-center border-[1px] border-gray-800">
                              {cls.time}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <PreviousClassData currentUser={currentUser} />
            </div>
          </div>
        </>
      ) : (
        <TeacherHome
          setShowHomePage={setShowHomePage}
          takeSem={takeSem}
          takeBranch={takeBranch}
          takeSubject={takeSubject}
        />
      )}
    </>
  );
};

export default TeacherPage;
