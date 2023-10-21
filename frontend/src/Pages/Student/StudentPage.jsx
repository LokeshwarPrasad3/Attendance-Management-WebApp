import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import { dummyAttendence } from "../../Temp/TempAttendence";
import "../../CSS/StudentPage.css";
import { GetLoggedUser } from "../../Context/LoggedUserData";
import axios from "axios";
import { host } from "../../API/API";
import Cookies from "js-cookie";

const StudentPage = () => {
  // Context-ApI data
  const { loggedUser } = GetLoggedUser();

  // My Current Component Store data
  const [currentUser, setCurrentUser] = useState({});
  // If user student then store their all attendence
  // eslint-disable-next-line
  const [studentAttendence, setStudentAttedence] = useState({});

  // Load student all attendence
  const loadStudentAllAttendence = useCallback(async () => {
    try {
      const token = Cookies.get("_secure_user_");
      console.log(token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const _id = currentUser._id;
      const { data } = await axios.post(
        `${host}/student/my-attendence`,
        { _id },
        config
      );

      // check data is right
      if (!data) {
        return console.log("Getting error to get attendence DAta");
      }
      // if data is successfully getted then set in state
      setStudentAttedence(data);
    } catch (error) {
      console.log("Error during fetching attendence react");
    }
  }, [currentUser]);

  useEffect(() => {
    setCurrentUser(loggedUser);

    // Load student all attendence
    if (currentUser?.type === "student") {
      loadStudentAllAttendence();
    }
  }, [loggedUser, currentUser, loadStudentAllAttendence]);

  return (
    <>
      <Navbar currentUser={"student"} />

      <div className="student_page_container font-overpass flex 2xl:gap-9 xl:gap-9 lg:gap-9 md:gap-9 gap-4 items-center mx-auto w-full 2xl:w-min xl:w-min lg:w-min md:px-9 md:py-10 p-5">
        <div className="left_part md:px-5 2xl:min-w-[16rem] xl:min-w-[16rem] lg:min-w-[16rem] w-full bg-[#f2f2f2] flex flex-col md:py-10 py-5 md:min-h-[45rem]">
          {/* profile picture and name */}
          <div className="profile flex flex-col gap-3 items-center">
            <img
              className="h-32 w-32 rounded-full"
              // src="./Images/lokeshwar1.jpg"
              src={`${currentUser?.pic}`}
              alt=""
            />
            <h1 className="text-xl font-semibold text-center">
              {currentUser?.name}
            </h1>
          </div>
          {/* menu bar type */}
          <div className="student_show_menu flex flex-col md:gap-2 md:py-12 md:pt-20 pt-4 px-8">
            <button className="student_menu flex items-center bg-green-300 hover:bg-green-400 py-2 cursor-pointer px-5 gap-1">
              <AssignmentTurnedInIcon className="text-green-500" />
              <h3 className="text-green-600 font-signika selection:bg-none">
                Attendence
              </h3>
            </button>
            <button className="student_menu flex items-center hover:bg-green-300 py-2 cursor-pointer px-5 gap-1">
              <PersonOutlineIcon className="text-gray-700" />
              <h3 className="font-semibold text-gray-700 font-signika selection:bg-none">
                Profile
              </h3>
            </button>
          </div>
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
                <h3>{studentAttendence?.all_attendence?.length}</h3>
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
            <div className="search_bar flex justify-center items-center gap-3">
              <h2 className="font-semibold">SELECT SUBJECT : </h2>
              <select
                name=""
                id=""
                className="cursor-pointer px-1 font-semibold bg-white"
              >
                <option value="Select_Subject">Select_Subject</option>
                <option value="Select_Subject">Maths</option>
                <option value="Select_Subject">DAA</option>
              </select>
            </div>
            {/* show table attendence */}
            <div className="show_table_attendence flex flex-col pt-5 gap-1 ">
              {/* category */}
              <div className="attendence_category flex items-center justify-between md:px-1">
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
                    {studentAttendence?.all_attendence?.length}/
                    {studentAttendence?.all_attendence?.length}
                  </h3>
                </div>
              </div>

              {/* show output of buttons */}
              <div className="attendence_output_table md:min-w-[50vw] md:max-w-[56vw] overflow-x-auto ">
                <table className="border-collapse ">
                  <tbody className="flex w-min ">
                    {studentAttendence?.all_attendence?.map((attendence, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr className="flex flex-col px-[1px] border-[1px] border-slate-800 min-w-[5.7rem]">
                            <td className="border-b-[1px]">
                              {attendence.date.slice(0,10)}
                            </td>
                            <td className="w-full text-center">{attendence?.status?'P':'A'}</td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
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
