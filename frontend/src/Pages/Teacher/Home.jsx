import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { host } from "../../API/API";
import { Box, CircularProgress } from "@mui/material";

const Home = ({ setShowHomePage, takeSem, takeBranch, takeSubject }) => {
  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
 const customGetDay = (no) => {
   return days[no]; // Use square brackets to access the property based on the variable 'no'
 };


  const [loading, setLoading] = useState(false);

  // Store that particular sem and branch list when entered page
  const [AllStudents, setAllStudents] = useState([]);

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

  // save attendence to db when clicked to save changes
  const saveAllStudentAttendence = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // get token from cookie
      const token = Cookies.get("_secure_user_");
      console.log("here is alltecher access token " + token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      // Post requrest
      const { data } = await axios.post(
        `${host}/student`,
        {
          sem: takeSem,
          branch: takeBranch,
          presentStudentsIds: presentStudentsIds,
          subject: takeSubject,
          date: new Date().toLocaleDateString(),
          day: customGetDay(new Date().getDay()),
        },
        config
      );
      // If data is not gettd
      if (!data) {
        console.log("Not data");
        toast.warn("Not get data", { autoClose: 1000 });
        setLoading(false);
        return;
      }
      toast.success("Successfully Saved!", { autoClose: 1000 });
      setLoading(false);

      // RESET all data
      setIsPresent({});
      setPresentStudentsIds([]);
    } catch (error) {
      console.log("Student data not saved", error);
      toast.error("Student data not getted", { autoClose: 1000 });
      setLoading(false);
      return;
    }
  };

  // Get that particular semester and branch student list
  const getAllStudents = useCallback(async () => {
    try {
      // Get token must teacher logged
      const token = Cookies.get("_secure_user_");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // get student use takeSem takeBranch props
      const { data } = await axios.post(
        `${host}/student/all-attedence`,
        { sem: takeSem, branch: takeBranch },
        config
      );
      if (data.status === 400) {
        console.log("Data not getted");
        toast.error("Students Not getted!", { autoClose: 1000 });
        return;
      }
      // If data is successfully fouond then store in state
      setAllStudents(data);
    } catch (error) {
      console.log("Error occured during fetching students", error);
      toast.error("Student Not Found!", { autoClose: 1000 });
      return;
    }
  }, [takeSem, takeBranch]);

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
          <h2 className=" font-semibold">Today Attendence : </h2>
          <h3 className="font-signika">{new Date().toLocaleDateString()}</h3>
        </div>
        <div className="today text-xl flex justify-center items-center gap-1">
          <h2 className=" font-semibold">Subject : </h2>
          <h3 className="">Discrete Matematics</h3>
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
      <div className="set_leave_container w-10/12 flex justify-end items-center pt-4 gap-3">
        <button
          onClick={() => setShowHomePage(false)}
          className="home_set_leave cursor-pointer font-normal px-2 py-1 text-lg leading-none bg-green-700 hover:bg-green-500 custom-transition text-white font-signika rounded-md"
        >
          GoBack
        </button>
        <button
          onClick={saveAllStudentAttendence}
          className="home_set_leave cursor-pointer font-normal px-2 py-1 text-lg leading-none bg-green-700 hover:bg-green-500 custom-transition text-white font-signika rounded-md"
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="inherit" size={28} />
            </Box>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {/* Main part where table is visible */}
      <div className="take_attendence_table font-overpass 2xl:w-[50%] lg:w-[70%] md:w-full sm:w-full  max-w-full overflow-x-auto flex justify-center items-center m-auto py-4">
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
                  <span className="">{new Date().toLocaleDateString()}</span>
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
                            isPresent[index] ? "bg-[#038327]" : "bg-[#F20101]"
                          } font-normal w-fit h-6 px-1 py-[2px] text-lg leading-none custom-transition text-white font-signika rounded-md`}
                        >
                          {isPresent[index] ? "Present" : "Absent"}
                        </button>
                      </td>
                      <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                        0
                      </td>
                      <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                        {isPresent[index]
                          ? user?.all_attendence.length + 1
                          : user?.all_attendence.length}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;
