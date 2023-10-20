import React from "react";
import Navbar from "../../Components/Navbar";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { dummyAttendence } from "../../Temp/TempAttendence";
import "../../CSS/StudentPage.css";

const StudentPage = () => {
  // const [loggedUser, setLoggedUser]= useState();

  // useEffect(()=>{
  //   getLoggedUser();
  // },[])

  return (
    <>
      <Navbar currentUser={"student"} />

      <div className="student_page_container font-overpass flex 2xl:gap-9 xl:gap-9 lg:gap-9 md:gap-9 gap-4 items-center mx-auto w-full 2xl:w-min xl:w-min lg:w-min md:px-9 md:py-10 p-5">
        <div className="left_part md:px-5 2xl:min-w-[16rem] xl:min-w-[16rem] lg:min-w-[16rem] w-full bg-[#f2f2f2] flex flex-col md:py-10 py-5 md:min-h-[45rem]">
          {/* profile picture and name */}
          <div className="profile flex flex-col gap-3 items-center">
            <img
              className="h-32 w-32 rounded-full"
              src="./Images/lokeshwar1.jpg"
              alt=""
            />
            <h1 className="text-xl font-semibold text-center">
              Lokeshwar Prasad Dewangan
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
              <h3>RSR Rungta College of Engineering College Bhilai</h3>
            </div>
            <div className="student_detail flex flex-wrap gap-1 items-center">
              <h2 className="font-semibold min-w-fit">Course : </h2>
              <h3>BTech</h3>
            </div>
            <div className="student_detail flex flex-wrap gap-1 items-center ">
              <h2 className="font-semibold min-w-fit">Branch : </h2>
              <h3 className="max-w-full overflow-hidden">
                Computer Science Engineering
              </h3>
            </div>
            <div className="student_detail flex flex-wrap gap-1 items-center">
              <h2 className="font-semibold min-w-fit">Sem : </h2>
              <h3>5th Regular</h3>
            </div>
            <div className="student_combine flex flex-wrap items-center gap-2">
              <div className="student_detail flex gap-1 items-center">
                <h2 className="font-semibold min-w-fit">Total Attedence : </h2>
                <h3>10</h3>
              </div>
              <div className="student_detail flex flex-wrap gap-1 items-center">
                <h2 className="font-semibold min-w-fit">Total Classess : </h2>
                <h3>20</h3>
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
                  <h3>12/20</h3>
                </div>
              </div>

              {/* show output of buttons */}
              <div className="attendence_output_table md:min-w-[50vw] md:max-w-[56vw] overflow-x-auto ">
                <table className="border-collapse ">
                  <tbody className="flex w-min ">
                    {dummyAttendence.map((user, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr className="flex flex-col px-[1px] border-[1px] border-slate-800">
                            <td className="border-b-[1px]">
                              {new Date().toLocaleDateString()}
                            </td>
                            <td className="w-full text-center">P</td>
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
