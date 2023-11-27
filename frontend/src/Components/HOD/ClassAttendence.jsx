import React, { useCallback, useEffect, useState } from "react";
import { GetLoggedUser } from "../../Context/LoggedUserData";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { host } from "../../API/API";
import { Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const ClassAttendence = (props) => {
  const {
    setSearchedStudentAttedence,
    searchedStudentAttendence,
    setShowSem,
    setShowBranch,
    setShowDate,
    setShowStudentAttedenceComponent,
  } = props;

  const { loggedUser } = GetLoggedUser;

  // set semester which hod want to search
  const [searchSem, setSearchSem] = useState(0);
  const [searchBranch, setSearchBranch] = useState("");
  //   const [searchedStudentAttendence, setSearchedStudentAttedence] = useState([]);
  const [loading, setLoading] = useState(false);

  const gotoStudentAttedence = (date, sem, branch) => {
    console.log(sem, branch, date);
    setShowDate(date);
    setShowSem(sem);
    setShowBranch(branch);
    setShowStudentAttedenceComponent(true);
  };

  // Serach when clicked
  const handleSearchAttendence = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        setLoading(true);
        if (!searchBranch || !searchSem) {
          toast.warn("Enter Sem & Branch!", { autoClose: 700 });
          setLoading(false);
          return;
        }
        const token = Cookies.get("_secure_user_");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(
          `${host}/hod/hod-access`,
          { sem: searchSem, branch: searchBranch },
          config
        );
        if (data.length === 0) {
          console.log("Student Empty");
          setSearchedStudentAttedence([]);
          toast.warn("Attedendence Empty!", { autoClose: 1000 });
          setLoading(false);
          return;
        }
        console.log(data);
        const reversedData = data.reverse();
        setSearchedStudentAttedence(reversedData);
        setLoading(false);
      } catch (error) {
        setSearchedStudentAttedence([]);
        console.log("Getting error to fetch data", error);
        toast.error("Unable to fetch data!", { autoClose: 1000 });
        setLoading(false);
        return;
      }
    },
    // eslint-disable-next-line
    [searchBranch, searchSem]
  );

  useEffect(() => {}, [loggedUser]);

  return (
    <>
      {/* Another part of page */}
      <div className="home_heading font-overpass flex flex-col justify-center py-4 gap-4 flex-wrap items-center">
        {/* Heading Part */}
        <h2 className=" font-semibold text-xl w-full text-center">
          ATTEDENCE - MONITOR:
        </h2>
        <div className="today text-xl flex justify-center items-center gap-2 font-signika flex-wrap">
          <div className="attendence_category flex items-center justify-between md:px-1">
            <div className="category_buttons flex items-center md:gap-3 gap-2">
              {/* <button
                onClick={() => setSearchSem(1)}
                className="hover:bg-green-200 custom-transition md:px-4 px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer"
              >
                SEM-1
              </button>
              <button
                onClick={() => setSearchSem(3)}
                className="hover:bg-green-200 custom-transition md:px-4 px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer"
              >
                SEM-3
              </button>
              <button
                onClick={() => setSearchSem(5)}
                className="hover:bg-green-200 custom-transition md:px-4 px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer"
              >
                SEM-5
              </button>
              <button
                onClick={() => setSearchSem(7)}
                className="hover:bg-green-200 active:bg-red-500 custom-transition md:px-4 px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer"
              >
                SEM-7
              </button> */}
              <select
                onChange={(e) => setSearchSem(Number(e.target.value))}
                value={searchSem}
                className="h-8 focus:outline-none bg-slate-200 px-2 cursor-pointer"
              >
                <option value="">Semester</option>
                <option value="1">sem-1</option>
                <option value="3">sem-3</option>
                <option value="5">sem-5</option>
                <option value="7">sem-7</option>
              </select>
              <select
                onChange={(e) => setSearchBranch(e.target.value)}
                value={searchBranch}
                className="h-8 focus:outline-none bg-slate-200 px-2 cursor-pointer"
              >
                <option value="">Branch</option>
                <option value="AIML">AIML</option>
                <option value="CSE">CSE</option>
              </select>
              <button
                onClick={handleSearchAttendence}
                className="home_set_leave cursor-pointer min-w-[5rem] font-normal px-2 py-1 text-lg text-black leading-none bg-blue-400 hover:bg-blue-200 custom-transition font-signika rounded-md"
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
                  "SEARCH"
                )}
              </button>
            </div>
          </div>
        </div>
        {/* <div className="total_attendence flex items-center justify-center">
          <h2>Attendence : </h2>
          <h3>12/20</h3>
        </div> */}
        <hr className="text-gray-400 w-full bg-gray-400" />

        {/* table shows daily attendence */}
        {/* Main part where table is visible */}
      </div>

      {loading ? (
        <div className="take_attendence_table font-overpass 2xl:w-[70%] lg:w-[80%] md:w-full sm:w-full min-h-[60vh]  max-w-full overflow-x-auto flex justify-center items-center m-auto pb-4">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="inherit" size={42} />
          </Box>
        </div>
      ) : (
        <>
          {/* Main part where table is visible */}
          <div className="take_attendence_table font-overpass 2xl:w-[70%] lg:w-[80%] md:w-full sm:w-full  max-w-full overflow-x-auto flex justify-center items-center m-auto pb-4">
            {/* Left part of table including sno,name */}
            <table className="border-collapse w-full border-[1px] border-gray-300">
              {/* Left-Table heading part */}
              <thead>
                <tr className="text-xl h-12">
                  <th className=" border-[2px] border-gray-900  text-center px-1">
                    Sno
                  </th>
                  <th className=" border-[2px] border-gray-900 text-center px-1 min-w-[8rem]">
                    Date
                  </th>
                  <th className=" border-[2px] border-gray-900 text-center px-1">
                    Day
                  </th>
                </tr>
              </thead>
              {/* Left-Table body part */}
              <tbody>
                {/* Getting data from Users Array */}
                {searchedStudentAttendence.map((attendence, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className="text-lg h-10">
                        <td className=" border-[2px] border-gray-900 text-lg min-w-fit text-center">
                          {index + 1}
                        </td>
                        <td className=" border-[2px] border-gray-900 text-lg min-w-fit px-3 overflow-hidden text-center">
                          {attendence?.date?.split("T")[0]}
                        </td>
                        <td className=" border-[2px] border-gray-900 text-lg min-w-fit px-3 overflow-hidden text-center">
                          {attendence ? attendence.day : ""}
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
                    <th className="border-[2px] font-signika border-gray-900  text-center px-2">
                      Total
                    </th>
                    <th className="border-[2px] font-signika border-gray-900  text-center px-2">
                      Details
                    </th>
                  </tr>
                </thead>
                {/* Right-Table body part here */}
                <tbody>
                  {/* Getting data from Users Array */}
                  {searchedStudentAttendence &&
                    searchedStudentAttendence.map((attedence, index) => {
                      return (
                        <tr key={index} className="text-lg h-10">
                          <td className="font-signika border-[2px] border-gray-900 text-xl min-w-fit text-center">
                            {attedence.total}
                          </td>
                          <td className="font-signika border-[2px] border-gray-900 text-xl min-w-fit text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                gotoStudentAttedence(
                                  attedence.date,
                                  attedence.sem,
                                  attedence.branch
                                );
                              }}
                              className="bg-green-200 px-[2px]"
                            >
                              GO
                            </button>
                          </td>
                        </tr>
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

ClassAttendence.propTypes = {
  setShowSem: PropTypes.func,
  setShowBranch: PropTypes.func,
  setShowDate: PropTypes.func,
  setShowStudentAttedenceComponent: PropTypes.func,
  setSearchedStudentAttedence: PropTypes.func,
  searchedStudentAttendence: PropTypes.array,
};

export default ClassAttendence;
