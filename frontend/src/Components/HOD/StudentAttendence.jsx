import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { host } from "../../API/API";
import { Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const StudentAttendence = (props) => {
  const {
    setShowStudentAttedenceComponent,
    setSearchedStudentAttedence,
    showDate,
    showSem,
    showBranch,
  } = props;

  const [loading, setLoading] = useState(false);

  // Store that particular sem and branch list when entered page
  const [AllStudents, setAllStudents] = useState([]);

  // Get that particular semester and branch student list
  const getAllStudents = useCallback(async () => {
    try {
      setLoading(true);
      // Get token must teacher logged
      const token = Cookies.get("_secure_user_");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // get student use takeSem takeBranch props
      const { data } = await axios.post(
        `${host}/student/get-attendance-by-hod`,
        { sem: showSem, branch: showBranch, date: showDate },
        config
      );
      if (data.status === 400) {
        toast.error("Students Not getted!", { autoClose: 1000 });
        setLoading(false);
        return;
      }
      // If data is successfully fouond then store in state
      setAllStudents(data);
      setLoading(false);
    } catch (error) {
      setSearchedStudentAttedence([]);
      console.log("Error occured during fetching students", error);
      toast.error("Student Not Found!", { autoClose: 1000 });
      setLoading(false);
      return;
    }
    // eslint-disable-next-line
  }, [showSem, showBranch, setSearchedStudentAttedence]);

  // When page is Opened then render all students
  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  return (
    <>
      {/* Another part of page */}
      <div className="home_heading font-overpass flex justify-center py-4 gap-4 flex-wrap items-center">
        {/* Heading Part */}
        <div className="today text-xl flex justify-center items-center gap-1">
          {/* <h2 className=" font-semibold">Today Attendence : </h2> */}
          <h3 className="font-signika">
            {AllStudents[0]?.all_attendence[0]?.date}
          </h3>
        </div>
        <div className="today text-xl flex justify-center items-center gap-1">
          <h2 className=" font-semibold">Subject : </h2>
          <h3 className="">{AllStudents[0]?.all_attendence[0]?.subject}</h3>
        </div>
        <button
          onClick={() => {
            setShowStudentAttedenceComponent(false);
            setAllStudents([]);
          }}
          className="home_set_leave cursor-pointer font-normal px-2 py-1 text-lg leading-none bg-green-700 hover:bg-green-500 custom-transition text-white font-signika rounded-md"
        >
          GoBack
        </button>
      </div>
      <hr className="text-gray-400 bg-gray-400" />

      {/* Main part where table is visible */}
      <div className="take_attendence_table font-overpass 2xl:w-[50%] lg:w-[70%] md:w-full sm:w-full  max-w-full overflow-x-auto flex justify-center items-center m-auto py-4">
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
            {/* Left part of table including sno,name */}
            <table className="border-collapse w-full">
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
                {AllStudents?.map((user, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className="text-lg h-10">
                        <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                          {index}
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
                    <th className="font-signika border-[2px] border-gray-900 px-2">
                      <span className="">{showDate.split("T")[0]}</span>
                    </th>
                  </tr>
                </thead>
                {/* Right-Table body part here */}
                <tbody>
                  {/* Getting data from Users Array */}
                  {AllStudents?.map((user, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="text-lg h-10 ">
                          <td className="w-full  border-[2px] border-gray-900">
                            <p
                              className={`home_set_leave ${
                                user?.all_attendence[0]?.status === true
                                  ? "text-green-800"
                                  : "text-red-800"
                              } 
                              font-semibold h-6 px-1 py-[2px] text-center text-lg leading-none custom-transition font-signika rounded-md`}
                            >
                              {user?.all_attendence[0]?.status === true
                                ? "Present"
                                : "Absent"}
                            </p>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

// Validating props what is their types
StudentAttendence.propTypes = {
  setShowStudentAttedenceComponent: PropTypes.func,
  setSearchedStudentAttedence: PropTypes.func,
  showSem: PropTypes.number,
  showBranch: PropTypes.string,
  showDate: PropTypes.string,
};

export default StudentAttendence;
