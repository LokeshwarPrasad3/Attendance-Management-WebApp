import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { host } from "../../API/API";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";

const HistoryAttendence = () => {
  const [searchSem, setSearchSem] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [allSearchedStudents, setAllSearchedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [presentCount, setPresentCount] = useState(0);

  // Calculate the present count based on the students' attendance status
  const calculatePresentCount = useCallback(() => {
    let count = 0;
    allSearchedStudents.forEach((user) => {
      if (user.all_attendence[0] && user.all_attendence[0].status) {
        count++;
      }
    });
    return count;
  }, [allSearchedStudents]);

  useEffect(() => {
    // Update the present count state with the calculated value
    setPresentCount(calculatePresentCount());
  }, [allSearchedStudents, calculatePresentCount]);

  // Search student attendence basis of inputs
  const searchStudentAttendence = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        console.log(searchSem, searchBranch, searchDate);

        setLoading(true);
        if (!searchSem || !searchBranch || !searchDate) {
          toast.warn("Please Fill Inputs", { autoClose: 1000 });
          setLoading(false);
          return;
        }

        // change date to dd/mm/yy
        let formattedDate = searchDate.split("-");
        formattedDate =
          formattedDate[2].replace(/^0/, "") +
          "/" +
          formattedDate[1] +
          "/" +
          formattedDate[0];

        console.log(searchSem, searchBranch, formattedDate);

        // Post requrest to get students
        const token = Cookies.get("_secure_user_");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        console.log("till done");
        const { data } = await axios.post(
          `${host}/student/attendence-model`,
          {
            sem: Number(searchSem),
            branch: searchBranch,
            date: formattedDate,
          },
          config
        );
        if (data.length === 0) {
          console.log("Student Empty");
          toast.warn("Students not found !", {
            autoClose: 2000,
            position: "top-center",
          });
          setAllSearchedStudents([]);
          setLoading(false);
          return;
        }
        // Set in state
        setAllSearchedStudents(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log("Getting error to fetch data", error);
        toast.error("Unable to fetch data!", { autoClose: 1000 });
      }
    },
    [searchSem, searchBranch, searchDate]
  );

  return (
    <>
      {/* Navbar components */}
      <Navbar />

      {/* Another part of page */}
      <div className="home_heading font-overpass flex justify-center py-4 gap-4 flex-wrap items-center">
        {/* Heading Part */}
        <div className="today text-xl flex justify-center items-center gap-2 font-signika flex-wrap">
          <h2 className=" font-semibold md:w-fit w-full text-center">
            FILTER - ATTENDENCE :{" "}
          </h2>
          <div className="search_inputs flex justify-center items-center gap-2">
            <div className="input_sem">
              <select
                onChange={(e) => setSearchSem(e.target.value)}
                className="bg-slate-200 rounded px-1 py-1 text-[1rem]"
              >
                <option value="">_*Sem</option>
                <option value="1">1st</option>
                <option value="3">3rd</option>
                <option value="5">5th</option>
                <option value="7">7th</option>
              </select>
            </div>
            <div className="input_branch">
              <select
                onChange={(e) => setSearchBranch(e.target.value)}
                className="bg-slate-200 rounded px-1 py-1 text-[1rem]"
              >
                <option value="">_*Branch</option>
                <option value="CSE">CSE</option>
                <option value="AIML">AIML</option>
              </select>
            </div>
            <div className="input_date flex md:w-full bg-slate-200 px-2 justify-center md:gap-1 items-center">
              <div className="custom-date">
                <label
                  htmlFor="history_date"
                  className="rounded text-[1rem] md:w-44 w-24"
                >
                  Choose Date :
                </label>
                {/* <CalendarTodayIcon className="" style={{fontSize:'1rem', display:'none'}}/> */}
              </div>
              <input
                onChange={(e) => setSearchDate(e.target.value)}
                id="history_date"
                type="date"
                className="bg-slate-200 text-[1rem] md:w-fit w-0 focus:outline-none"
                placeholder="Date"
                value={searchDate}
              />
            </div>
          </div>
          <button
            onClick={searchStudentAttendence}
            className="home_set_leave cursor-pointer min-w-[3rem] font-normal px-1 py-1 text-lg text-black leading-none bg-blue-400 hover:bg-blue-200 custom-transition font-signika rounded-md"
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="inherit" size={21} />
              </Box>
            ) : (
              // "SEARCH"
              <SearchIcon />
            )}
          </button>
        </div>
      </div>
      <hr className="text-gray-400 bg-gray-400" />

      {/* Set Leave Today Button part */}
      <div className="set_leave_container w-full flex justify-center items-center pt-4">
        <h1 className="home_set_leave cursor-pointer font-semibold px-2 py-1 text-xl text-black leading-none custom-transition font-signika rounded-md">
          {loading
            ? ""
            : `
          Present : ${presentCount}/${allSearchedStudents.length}
          `}
        </h1>
      </div>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <CircularProgress color="inherit" size={42} />
        </Box>
      ) : (
        <>
          {/* Main part where table is visible */}
          <div className="take_attendence_table font-overpass 2xl:w-[70%] lg:w-[80%] md:w-full sm:w-full  max-w-full overflow-x-auto flex justify-center items-center m-auto py-4">
            {/* Left part of table including sno,name */}
            <table className="border-collapse w-full border-[1px] border-gray-300">
              {/* Left-Table heading part */}
              <thead>
                <tr className="text-xl h-12">
                  <th className=" border-[2px] border-gray-900  text-center px-1">
                    Sno
                  </th>
                  <th className=" border-[2px] border-gray-900 text-center px-3">
                    Name
                  </th>
                </tr>
              </thead>
              {/* Left-Table body part */}
              <tbody>
                {/* Getting data from Users Array */}
                {allSearchedStudents?.map((user, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className="text-lg h-10">
                        <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                          {index + 1}
                        </td>
                        <td className=" border-[2px] border-gray-900 text-lg min-w-[11rem] overflow-hidden text-center">
                          {user.studentName}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            {/* Right part of Table which is create scroll */}
            <div className="scroll_table w-full max-w-full overflow-x-auto">
              <table className="border-collapse ml-[-2px] w-full">
                {/* Right-Table heading part */}
                <thead>
                  <tr className="text-xl h-12">
                    <th className="border-[2px] font-signika border-gray-900 text-center px-2">
                      {allSearchedStudents[0]?.all_attendence[0]
                        ? allSearchedStudents[0].all_attendence[0].date.slice(
                            0,
                            10
                          )
                        : "date"}
                    </th>
                  </tr>
                </thead>
                {/* Right-Table body part here */}
                <tbody>
                  {/* Getting data from Users Array */}
                  {allSearchedStudents?.map((user, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="text-lg h-10">
                          <td
                            className={`font-signika font-semibold border-[2px] border-gray-900 text-xl min-w-fit text-center ${
                              user.all_attendence[0].status === true
                                ? "text-green-700"
                                : "text-red-500"
                            }`}
                          >
                            {user.all_attendence[0]
                              ? user.all_attendence[0].status === true
                                ? "P"
                                : "A"
                              : "null"}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default HistoryAttendence;
