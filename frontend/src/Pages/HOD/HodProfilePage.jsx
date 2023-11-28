import { useCallback, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { GetLoggedUser } from "../../Context/LoggedUserData";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { host } from "../../API/API";
import { ToastContainer, toast } from "react-toastify";

const HodProfilePage = () => {
  // Get Current user by Context-api
  const { loggedUser } = GetLoggedUser();

  // set user for that component
  const [currentUser, setCurrentUser] = useState();

  // Store all teachers for assign
  const [allTeachers, setAllTeachers] = useState([]);
  const [allClassAttedence, setAllClassAttedence] = useState([]);

  const getAllClassAttendance = async () => {
    const branchWiseData = [
      { sem: 1, branch: "CSE" },
      { sem: 3, branch: "CSE" },
      { sem: 5, branch: "CSE" },
      { sem: 5, branch: "AIML" },
    ];

    const date = new Date().toLocaleDateString();
    // Split the date string by '/'
    let parts = date.split("/");
    // Rearrange the date parts in the desired format (dd/mm/yyyy)
    let newDateFormat = parts[1] + "/" + parts[0] + "/" + parts[2];

    // const date = "29/10/2023";

    // Get token from cookie
    const token = Cookies.get("_secure_user_");
    console.log("Here is the teacher access token: " + token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promises = branchWiseData.map(async (cls, index) => {
      const { data } = await axios.post(
        `${host}/hod/class-wise-attendance`,
        { sem: cls.sem, branch: cls.branch, date: newDateFormat }, // Fix: Use cls.branch instead of cls.sem for branch
        config
      );
      console.log(index + " data ", data);
      cls.total = data[0]?.total === undefined ? "null" : data[0].total;
      return cls;
    });

    // Use Promise.all to wait for all promises to resolve
    Promise.all(promises)
      .then((updatedData) => {
        // 'updatedData' will contain the updated branchWiseData
        setAllClassAttedence(updatedData);
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error updating branchWiseData:", error);
      });
  };

  const getAllTeachers = useCallback(async () => {
    // get token from cookie
    const token = Cookies.get("_secure_user_");
    console.log("here is alltecher access token " + token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${host}/teacher/get-all-teachers`,
      config
    );
    if (!data) {
      console.log("Not get all teachers");
      toast.warn("Teacher not fetched!");
      return;
    }
    getAllClassAttendance(data);
    setAllTeachers(data);
  }, []);

  useEffect(() => {
    setCurrentUser(loggedUser);
    getAllTeachers();
    console.log(currentUser);
  }, [loggedUser, currentUser, getAllTeachers]);

  return (
    <>
      <Navbar currentUser={"teacher"} />
      <div className="teacher_page_container font-overpass flex flex-col 2xl:gap-6 xl:gap-6 lg:gap-6 md:gap-6 gap-4 items-center mx-auto w-full 2xl:w-min xl:w-min lg:w-min md:p-7 p-3">
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

        <div className="right_part 2xl:min-w-[60vw] xl:min-w-[60vw] lg:min-w-[60vw] md:min-w-[60vw] w-full bg-[#f2f2f2] min-h-[45rem] 2xl:px-9 xl:px-9 md:px-9 md:py-9 p-3">
          {/* teacher basic details show */}
          <div className="teacher_basic_details bg-white md:px-5 px-3 md:py-2 py-3 w-full flex flex-col gap-2">
            <h1 className="font-semibold text-xl pl-1 flex items-center justify-between">
              {currentUser?.branch === "CSE" ? "DEPARTEMENT OF CSE" : ""}
              <Link
                to="/data"
                className="home_set_leave cursor-pointer min-w-fit font-normal px-2 py-1 text-lg text-slate-900 leading-none bg-blue-400 hover:bg-blue-200 custom-transition font-signika rounded-md text-center"
              >
                HISTORY
              </Link>
            </h1>

            <div className="set_leave_container w-full flex justify-center items-center pt-4">
              <h1 className="home_set_leave cursor-pointer font-semibold px-2 py-1 text-xl text-black leading-none custom-transition rounded-md font-overpass">
                Attedence done Class : 5
              </h1>
            </div>

            {/* Main part where table is visible */}
            <div className="take_attendence_table font-overpass 2xl:w-[70%] lg:w-[80%] md:w-full sm:w-full  max-w-full overflow-x-auto flex justify-center items-center m-auto py-3">
              {/* Left part of table including sno,name */}
              <table className="border-collapse w-full border-[1px] border-gray-300">
                {/* Left-Table heading part */}
                <thead>
                  <tr className="text-xl h-12">
                    <th className=" border-[2px] border-gray-900  text-center px-1">
                      Sno
                    </th>
                    <th className=" border-[2px] border-gray-900 text-center px-1">
                      Teacher
                    </th>
                  </tr>
                </thead>
                {/* Left-Table body part */}
                <tbody>
                  {/* Getting data from Users Array */}
                  {allTeachers?.map((teacher, index) =>
                    teacher.teach.map((cls, clsIndex) => (
                      <tr key={`${index}-${clsIndex}`} className="text-lg h-10">
                        <td className="border-[2px] border-gray-900 text-xl min-w-fit text-center">
                          {clsIndex + 1}
                        </td>
                        <td className="border-[2px] border-gray-900 text-lg overflow-hidden text-center">
                          {teacher.name.slice(0, 9)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Right part of Table which is create scroll */}
              <div className="scroll_table w-full max-w-full overflow-x-auto">
                <table className="border-collapse ml-[-2px] w-full">
                  {/* Right-Table heading part */}
                  <thead>
                    <tr className="text-xl h-12">
                      <th className="border-[2px] font-signika min-w-[11rem] border-gray-900 text-center px-2">
                        Subject
                      </th>
                      <th className="border-[2px] font-signika border-gray-900 text-center px-2">
                        Sem
                      </th>
                      <th className="border-[2px] font-signika border-gray-900 text-center px-2">
                        Branch
                      </th>
                      <th className="border-[2px] font-signika border-gray-900 text-center px-2">
                        Total
                      </th>
                    </tr>
                  </thead>
                  {/* Right-Table body part here */}
                  <tbody>
                    {/* Getting data from Users Array */}

                    {allTeachers?.map((teacher, index) =>
                      teacher.teach.map((cls, clsIndex) => (
                        <tr
                          key={`${index}-${clsIndex}`}
                          className="text-lg h-10"
                        >
                          <td
                            className={`font-signika border-[2px] border-gray-900 text-lg min-w-fit text-center`}
                          >
                            {cls.subject.slice(0, 19)}..
                          </td>
                          <td
                            className={`font-signika border-[2px] border-gray-900 text-xl min-w-fit text-center`}
                          >
                            {cls.sem}
                          </td>
                          <td
                            className={`font-signika border-[2px] border-gray-900 text-xl min-w-fit text-center`}
                          >
                            {cls.branch}
                          </td>
                          <td
                            className={`font-signika border-[2px] border-gray-900 text-xl min-w-fit text-center`}
                          >
                            {allClassAttedence &&
                              (() => {
                                const newClassSchedule = allClassAttedence.find(
                                  (att) =>
                                    att.sem === cls.sem &&
                                    att.branch === cls.branch
                                );
                                return newClassSchedule
                                  ? newClassSchedule.total
                                  : null;
                              })()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Here teacher can see their attendence */}
          <div className="teacher_attendence py-5">
            {/* user can search by subjects */}
            <div className="search_bar flex justify-center items-center gap-3">
              <h2 className="font-semibold">SELECT SUBJECT : </h2>
              <select
                name=""
                id=""
                className="cursor-pointer px-1 font-semibold bg-white"
              >
                <option value="Select_Subject">Select_Sem</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default HodProfilePage;
