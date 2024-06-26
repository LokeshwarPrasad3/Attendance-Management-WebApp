import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import "../../CSS/StudentPage.css";
import { GetLoggedUser } from "../../Context/LoggedUserData";
import axios from "axios";
import { host } from "../../API/API";
import Cookies from "js-cookie";
import { subjectsMap } from "../../Utils/SubjectList";
import MenuBar from "../../Components/MenuBar";
import { Box, CircularProgress } from "@mui/material";
import { greetMessage } from "../../Utils/GreetingMessage";

const StudentPage = () => {
  // Context-ApI data
  const { loggedUser } = GetLoggedUser();

  // when picture is loading then load
  const [picLoading, setPicLoading] = useState(false);

  // My Current Component Store data
  const [currentUser, setCurrentUser] = useState({});
  // If user student then store their all attendence
  // eslint-disable-next-line
  const [studentAttendence, setStudentAttedence] = useState({});

  const [presentDay, setPresentDay] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const getPresentDays = useCallback(() => {
    let countDay = 0;
    studentAttendence?.all_attendence?.map((att) => {
      if (att.status) countDay++;
    });
    setPresentDay(countDay);
    // eslint-disable-next-line
  }, []);

  // Load student all attendence
  const loadStudentAllAttendence = useCallback(async () => {
    try {
      const token = Cookies.get("_secure_user_");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const _id = currentUser?._id;

      const { data } = await axios.post(
        `${host}/student/logged-student-attendance`,
        { _id },
        config
      );

      // check data is right
      if (!data) {
        console.log("Student Attendance is not found!!");
        return;
      }

      // if data is successfully getted then set in state
      setStudentAttedence(data);

      // Set present count value
      let countDay = 0;
      data?.all_attendence?.map((att) => {
        if (att.status) countDay++;
      });
      setPresentDay(countDay);
      // set percentage
      setPercentage(
        (presentDay / studentAttendence?.all_attendence?.length) * 100
      );
    } catch (error) {
      console.log("Error during fetching attendence react", error);
      return;
    }
  }, [currentUser, studentAttendence?.all_attendence?.length, presentDay]);

  useEffect(() => {
    setCurrentUser(loggedUser);
    
    // Load student all attendence
    if (currentUser?.type === "student") {
      loadStudentAllAttendence();
    }
    // Get present Day
    getPresentDays();
    document.title = `${currentUser?.name} • Attendance Page `;
  }, [
    loggedUser,
    currentUser,
    setCurrentUser,
    loadStudentAllAttendence,
    getPresentDays,
  ]);

  return (
    <>
      <Navbar currentUser={"student"} />
      <h2 className="text-xl font-semibold text-center py-2 "> {greetMessage()} {currentUser?.name} </h2>
      <div className="student_page_container font-overpass flex 2xl:gap-9 xl:gap-9 lg:gap-9 md:gap-9 gap-4 items-center mx-auto w-full 2xl:w-min xl:w-min lg:w-min md:px-9 md:py-4 p-5">
        <div className="left_part md:px-5 2xl:min-w-[16rem] xl:min-w-[16rem] lg:min-w-[16rem] w-full bg-[#f2f2f2] flex flex-col md:py-10 py-5 md:min-h-[45rem]">
          {/* profile picture and name */}
          <div className="profile flex flex-col gap-3 items-center">
            <div className="image-container border-2 border-indigo-100 rounded-full">
              {picLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "8rem",
                    height: "8rem",
                  }}
                >
                  <CircularProgress color="inherit" size={32} />
                </Box>
              ) : (
                <img
                  className="h-32 w-32 rounded-full"
                  // src="./Images/lokeshwar1.jpg"
                  src={currentUser?.pic}
                  alt={currentUser?.name}
                />
              )}
            </div>

            <h1 className="text-xl font-semibold text-center">
              {currentUser?.name}
            </h1>
          </div>
          {/* Menu Bar Navigator component */}
          <MenuBar
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setPicLoading={setPicLoading}
          />
        </div>

        <div className="right_part 2xl:min-w-[60vw] xl:min-w-[60vw] lg:min-w-[60vw] md:min-w-[60vw] w-full bg-[#f2f2f2] min-h-[45rem] 2xl:px-9 xl:px-9 md:px-9 md:py-9 p-5">
          {/* student basic details show */}
          <div className="student_basic_details bg-white md:px-5 px-3 md:py-5 py-3 w-full">
            <div className="student_detail flex flex-wrap gap-1 items-center">
              <h2 className="font-semibold min-w-fit">Institute : </h2>
              <h3>{currentUser?.college}</h3>
            </div>
            <div className="student_detail flex flex-wrap gap-1 items-center">
              <h2 className="font-semibold min-w-fit">Course : </h2>
              <h3>{currentUser?.course}</h3>
            </div>
            <div className="student_detail flex flex-wrap gap-1 items-center ">
              <h2 className="font-semibold min-w-fit">Branch : </h2>
              <h3 className="max-w-full overflow-hidden">
                {currentUser?.branch === "AIML"
                  ? "Artificial Intelligence & Machine Learning"
                  : ""}
                {currentUser?.branch === "CSE"
                  ? "Computer Science & Engineering"
                  : ""}
              </h3>
            </div>
            <div className="student_detail flex flex-wrap gap-1 items-center">
              <h2 className="font-semibold min-w-fit">Sem : </h2>
              <h3>{currentUser?.sem}th Regular</h3>
            </div>
            <div className="student_combine flex flex-wrap items-center gap-2">
              <div className="student_detail flex gap-1 items-center">
                <h2 className="font-semibold min-w-fit">Total Attedence : </h2>
                <h3>{presentDay}</h3>
              </div>
              <div className="student_detail flex flex-wrap gap-1 items-center">
                <h2 className="font-semibold min-w-fit">Total Classess : </h2>
                <h3>{studentAttendence?.all_attendence?.length}</h3>
              </div>
            </div>
          </div>

          {/* Here student can see their attendence */}
          <div className="student_attendence py-5">
            {/* user can search by subjects */}
            <div className="search_bar flex justify-center items-center gap-3 ">
              <h2 className="font-semibold">SELECT SUBJECT : </h2>
              <select
                name=""
                id=""
                className="cursor-pointer px-1 font-semibold bg-white w-[45%] md:w-[8rem]"
              >
                <option value="Select_Subject">Select_Subject</option>
                {currentUser &&
                  subjectsMap &&
                  subjectsMap[`${currentUser?.branch}${currentUser?.sem}`] &&
                  subjectsMap[`${currentUser?.branch}${currentUser?.sem}`].map(
                    (sub, index) => {
                      return (
                        <React.Fragment key={index}>
                          <option value={sub}>{sub}</option>
                        </React.Fragment>
                      );
                    }
                  )}
              </select>
            </div>
            {/* show table attendence */}
            <div className="show_table_attendence flex flex-col pt-5 gap-3 ">
              {/* category */}
              <div className="attendence_category flex flex-wrap items-center justify-center gap-2 md:px-1">
                <div className="category_buttons flex items-center md:gap-5 gap-2">
                  <button className="hover:bg-white custom-transition px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer">
                    Daily
                  </button>
                  <button className="hover:bg-white custom-transition px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer">
                    Week
                  </button>
                  <button className="hover:bg-white custom-transition px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer">
                    Month
                  </button>
                </div>
                <div className="total_attendence flex items-center justify-center">
                  <h2>Attendence : </h2>
                  <h3>
                    <b>
                      {" "}
                      {presentDay}/{studentAttendence?.all_attendence?.length}{" "}
                    </b>
                  </h3>
                  &nbsp;| &nbsp;
                  <h3>
                    Per : <b>{Math.floor(percentage ? percentage : 0)}%</b>{" "}
                  </h3>
                </div>
              </div>

              {/* show output of buttons */}
              <div className="attendence_output_table md:min-w-[50vw] md:max-w-[56vw] overflow-x-auto ">
                <table className="border-collapse ">
                  <tbody className="flex w-min ">
                    {studentAttendence?.all_attendence?.map(
                      (attendence, index) => {
                        return (
                          <React.Fragment key={index}>
                            <tr className="flex flex-col px-[1px] border-[1px] border-slate-800 min-w-[5.9rem]">
                              <td className="border-b-[1px]">
                                {attendence.date.slice(0, 10)}
                              </td>
                              <td className="w-full text-center">
                                {attendence?.status ? "P" : "A"}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
