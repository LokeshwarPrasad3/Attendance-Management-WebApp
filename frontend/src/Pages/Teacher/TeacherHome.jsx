import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { host } from "../../API/API";
import { Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as XLSX from "xlsx";
import { getTodayFormattedDate } from "../../Utils/ManageDate";

const TeacherHome = ({ setShowHomePage, takeSem, takeBranch, takeSubject }) => {
  const todayDate = new Date().toLocaleDateString().split("/");
  const formattedDate = todayDate[1] + "/" + todayDate[0] + "/" + todayDate[2];

  const customGetDay = useCallback((no) => {
    const days = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };
    return days[no];
  }, []);

  const [loading, setLoading] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [changeButtonIcon, setChangeButtonIcon] = useState(false);

  // Store that particular sem and branch list when entered page
  const [AllStudents, setAllStudents] = useState([]);
  const [todayTotalAttedenceCount, setTodayTotalAttedenceCount] = useState(0);

  // Submit attendence then push that state in backend contains (_id, name)
  const [presentStudentsIds, setPresentStudentsIds] = useState([]);

  // state which manage present/absent
  const [isPresent, setIsPresent] = useState({});
  // when clicked to present/absent button
  const handleIsPresent = (sno, _id, name) => {
    setIsPresent((prev) => {
      const updatedIsPresent = { ...prev, [sno]: !prev[sno] };

      if (updatedIsPresent[sno]) {
        setPresentStudentsIds((prevPresentStudentsIds) => [
          ...prevPresentStudentsIds,
          { _id: _id, name: name },
        ]);
      } else {
        setPresentStudentsIds((prevPresentStudentsIds) =>
          prevPresentStudentsIds.filter((student) => student._id !== _id)
        );
      }

      return updatedIsPresent;
    });
  };

  // Download Attedence when saved
  const downloadTablesAsXLSX = useCallback(() => {
    setChangeButtonIcon(true);
    const leftTable = document.querySelector(".left-table");
    const rightTable = document.querySelector(".right-table");

    if (leftTable && rightTable) {
      const combinedTable = document.createElement("table");
      const tbody = document.createElement("tbody");

      // First row - Today's Attendance
      const todayAttendanceRow = document.createElement("tr");
      const todayAttendanceCell = document.createElement("td");
      todayAttendanceCell.colSpan = 100;
      todayAttendanceCell.innerHTML = `<h1>Today's Attendance: ${new Date().toLocaleDateString()}</h1>`;
      todayAttendanceRow.appendChild(todayAttendanceCell);
      tbody.appendChild(todayAttendanceRow);

      // Second row - Date and Subject
      const dateAndSubjectRow = document.createElement("tr");
      const dateAndSubjectCell = document.createElement("td");
      dateAndSubjectCell.colSpan = 100;
      dateAndSubjectCell.innerHTML = `<h2>Subject: ${takeSubject} </h2>`;
      dateAndSubjectRow.appendChild(dateAndSubjectCell);
      tbody.appendChild(dateAndSubjectRow);

      // Get rows from both left and right tables
      const leftRows = leftTable.rows;
      const rightRows = rightTable.rows;

      const maxRows = Math.max(leftRows.length, rightRows.length);

      for (let i = 0; i < maxRows; i++) {
        const newRow = document.createElement("tr");

        // Left table row content
        if (i < leftRows.length) {
          const leftCells = leftRows[i].cells;
          for (let j = 0; j < leftCells.length; j++) {
            const newCell = document.createElement("td");
            newCell.innerHTML = leftCells[j].innerHTML;
            newRow.appendChild(newCell);
          }
        }

        // Right table row content
        if (i < rightRows.length) {
          const rightCells = rightRows[i].cells;
          for (let j = 0; j < rightCells.length; j++) {
            const newCell = document.createElement("td");
            newCell.innerHTML = rightCells[j].innerHTML;
            newRow.appendChild(newCell);
          }
        }

        tbody.appendChild(newRow);
      }

      // Append the combined content to the table
      combinedTable.appendChild(tbody);

      // Convert combined HTML content to XLSX
      const wb = XLSX.utils.table_to_book(combinedTable);
      XLSX.writeFile(
        wb,
        `${takeSem}-${takeBranch}-${takeSubject}-${new Date().toLocaleDateString()}.xlsx`
      );

      // Change download iconf or 3s
      setTimeout(() => {
        setChangeButtonIcon(false);
      }, 4000);
    } else {
      console.error("Error during download exel file!");
      return;
    }
  }, [takeBranch, takeSem, takeSubject]);

  // save attendence to db when clicked to save changes
  const saveAllStudentAttendence = useCallback(
    async (e) => {
      // Last confirm
      const takeAttendance = confirm("Confirm Save Attendance?");
      if (takeAttendance) {
        if (presentStudentsIds.length == 0) {
          toast.warn("Oops! Please take Attedence", { autoClose: 2000 });
          return;
        }
        downloadTablesAsXLSX();

        e.preventDefault();
        setLoading(true);

        try {
          // get token from cookie
          const token = Cookies.get("_secure_user_");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          // Post requrest
          const { data } = await axios.post(
            `${host}/student/submit-class-attendance`,
            {
              sem: takeSem,
              branch: takeBranch,
              presentStudentsIds: presentStudentsIds,
              subject: takeSubject,
              date: getTodayFormattedDate(),
              day: customGetDay(new Date().getDay()),
            },
            config
          );
          // If data is not gettd
          if (!data) {
            toast.warn("submit attendance data is not found!", {
              autoClose: 2000,
            });
            setLoading(false);
            return;
          }

          // POST IN HOD - ALL DB
          const HodData = await axios.post(
            `${host}/teacher/save-class-attendance`,
            {
              date: getTodayFormattedDate(),
              day: customGetDay(new Date().getDay()),
              sem: takeSem,
              branch: takeBranch,
              total: presentStudentsIds.length,
              subject: takeSubject,
            },
            config
          );
          console.log(HodData);
          if (!HodData) {
            console.log("HOD Access class Attendance not saved!");
            toast.warn("ClassWise Data not saved!", { autoClose: 1000 });
            setLoading(false);
            return;
          }

          // If successful then saved in hod database

          toast.success("Successfully Saved!", { autoClose: 2000 });
          setLoading(false);
          setShowDownloadButton(true);

          let count = todayTotalAttedenceCount + 1;
          setTodayTotalAttedenceCount(count);

          // RESET all data
          setIsPresent({});
          setPresentStudentsIds([]);
        } catch (error) {
          console.log("Error during saved Attendance ", error);
          toast.error("Student Not Found", { autoClose: 2000 });
          setLoading(false);
          return;
        }
      }
    },
    [
      takeBranch,
      takeSem,
      takeSubject,
      customGetDay,
      presentStudentsIds,
      downloadTablesAsXLSX,
      todayTotalAttedenceCount,
    ]
  );

  // mehthod which return how many days present
  const getPresentDays = (user) => {
    const filtered = user.all_attendence.filter((u) => {
      return u.status === true;
    });
    return filtered.length;
  };

  // get yesterday attedence
  const yesterdayAttedence = (user) => {
    // first get yesterday date
    const today = new Date();
    const yesterday = new Date(today); // copy
    yesterday.setDate(today.getDate() - 1);
    // format date as localeDateString mm/dd/yy
    const formatYesterday = yesterday
      .toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      })
      .split("/");
    const actualYesterday =
      formatYesterday[1].replace(/^0/, "") +
      "/" +
      formatYesterday[0] +
      "/" +
      formatYesterday[2];

    // Get attedence of that date
    let yesterdayCount = 0;
    user.all_attendence.forEach((att) => {
      if (actualYesterday === att.date && att.subject === takeSubject) {
        yesterdayCount++;
      }
    });
    return yesterdayCount;
  };

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
        `${host}/student/get-students-for-attendance`,
        { sem: takeSem, branch: takeBranch },
        config
      );
      if (data.status === 400) {
        // toast.error("Students Not getted!", { autoClose: 2000 });
        setLoading(false);
        return;
      }

      // Logic get number of attedence today already taken
      // Set total Attedence for all students
      let todayTotalAttedenceCount = 0;
      data[0].all_attendence.some((att) => {
        if (getTodayFormattedDate() !== att.date) {
          return true; // Exit the loop if the date doesn't match
        }
        todayTotalAttedenceCount++;
        return false;
      });
      setTodayTotalAttedenceCount(todayTotalAttedenceCount);

      // Get yesterday attedence for all students

      // If data is successfully fouond then store in state
      setAllStudents(data);
      setLoading(false);
    } catch (error) {
      console.log("Error occured during fetching students", error);
      toast.error("Student Not Found!", { autoClose: 2000 });
      setLoading(false);
      return;
    }
    // eslint-disable-next-line
  }, [takeSem, takeBranch]);

  // Method gives today how many attendance already taken

  // When page is Opened then render all students
  useEffect(() => {
    getAllStudents();
    document.title = `${formattedDate} • ${takeSem} ${takeBranch} Attendance  `;
  }, [getAllStudents, formattedDate, takeSem, takeBranch]);

  return (
    <>
      {/* Another part of page */}
      <div
        id="attedence_container"
        className="home_heading font-overpass flex justify-center py-4 gap-4 flex-wrap items-center"
      >
        {/* Heading Part */}
        <div className="today text-xl flex justify-center items-center gap-1">
          <h2 className=" font-semibold">Today Attendence : </h2>
          <h3 className="font-signika">
            {/* {new Date().toLocaleDateString()} */}
            {formattedDate}
          </h3>
        </div>
        <div className="today text-xl flex justify-center items-center gap-1">
          <h2 className=" font-semibold">Subject : </h2>
          <h3 className="">{takeSubject}</h3>
        </div>
        <Link
          to="/history"
          className="home_see_history w-28 text-center text-lg bg-[#314EB5] hover:bg-blue-700 custom-transition text-white font-signika rounded-md"
        >
          SEE HISTORY
        </Link>
      </div>
      <hr className="text-gray-400 bg-gray-400" />

      {/* Set Leave Today Button part */}
      <div className="set_leave_container  flex justify-center items-center pt-4 gap-3">
        <p className="font-lg font-overpass font-semibold bg-pink-200 cursor-pointer px-2 rounded-sm">
          <span className="font-bold text-green-900">
            {todayTotalAttedenceCount}
          </span>
          Attedence Saved
        </p>
        <button
          onClick={saveAllStudentAttendence}
          className="home_set_leave cursor-pointer font-normal px-2 py-1 min-w-[8rem] text-lg leading-none bg-green-700 hover:bg-green-500 custom-transition text-white font-signika rounded-md"
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
            "Save Changes"
          )}
        </button>
        <button
          onClick={() => setShowHomePage(false)}
          className="home_set_leave cursor-pointer font-normal px-1 py-[2px] text-lg leading-none bg-green-700 hover:bg-green-500 custom-transition text-white font-signika rounded-full"
        >
          {/* GoBack */}
          <ArrowBackIcon />
        </button>
        {/* show download button when only saved attedence */}
        {showDownloadButton && (
          <button
            onClick={downloadTablesAsXLSX}
            className="home_set_leave cursor-pointer font-normal px-2 py-[3px] text-lg leading-none bg-green-700 hover:bg-green-600 custom-transition text-white font-signika rounded-md"
          >
            {changeButtonIcon ? (
              <DownloadDoneIcon style={{ fontSize: "1.3rem" }} />
            ) : (
              <FileDownloadIcon style={{ fontSize: "1.3rem" }} />
            )}
          </button>
        )}
      </div>

      {/* Main part where table is visible */}
      <div
        id="parent_div_id"
        className="take_attendence_table font-overpass 2xl:w-[50%] lg:w-[70%] md:w-full sm:w-full  max-w-full overflow-x-auto flex justify-center items-center m-auto py-4"
      >
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
            <table className="left-table table border-collapse w-full">
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
              <table className="right-table table border-collapse ml-[-2px] w-full">
                {/* Right-Table heading part */}
                <thead>
                  <tr className="text-xl h-12">
                    <th className="font-signika border-[2px] border-gray-900 px-2">
                      <span className="">
                        {/* {new Date().toLocaleDateString()} */}
                        {formattedDate}
                      </span>
                    </th>
                    <th className=" border-[2px] border-gray-900  text-center px-2">
                      Yesterday
                    </th>
                    <th className=" border-[2px] border-gray-900  text-center px-2">
                      Total
                    </th>
                  </tr>
                </thead>
                {/* Right-Table body part here */}
                <tbody>
                  {/* Getting data from Users Array */}
                  {AllStudents?.map((user, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="text-lg h-10">
                          <td className=" text-center border-[2px] border-gray-900">
                            <button
                              onClick={() =>
                                handleIsPresent(
                                  index,
                                  user?.studentId,
                                  user?.studentName
                                )
                              }
                              className={`home_set_leave ${
                                isPresent[index]
                                  ? "bg-[#038327]"
                                  : "bg-[#F20101]"
                              } font-normal w-fit h-6 px-1 py-[2px] text-lg leading-none custom-transition text-white font-signika rounded-md`}
                            >
                              {isPresent[index] ? "Present" : "Absent"}
                            </button>
                          </td>
                          <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                            {user && yesterdayAttedence(user) === 0 ? "A" : "P"}
                          </td>
                          <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                            {isPresent[index] && user
                              ? getPresentDays(user) + 1
                              : getPresentDays(user)}
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
TeacherHome.propTypes = {
  setShowHomePage: PropTypes.func,
  takeSem: PropTypes.number,
  takeBranch: PropTypes.string,
  takeSubject: PropTypes.string,
};

export default TeacherHome;
