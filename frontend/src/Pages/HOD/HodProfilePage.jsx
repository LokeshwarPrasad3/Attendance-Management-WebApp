import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { GetLoggedUser } from "../../Context/LoggedUserData";
import { Link } from "react-router-dom";

const HodProfilePage = () => {
  // Get Current user by Context-api
  const { loggedUser } = GetLoggedUser();

  // set user for that component
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(loggedUser);
    console.log(currentUser);
  }, [loggedUser, currentUser]);

  return (
    <>
      <Navbar currentUser={"teacher"} />
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
            <h1 className="font-semibold text-xl pl-1 flex items-center justify-between">
              {currentUser?.branch === "CSE" ? "DEPARTEMENT OF CSE" : ""}
              <Link to="/data"
                className="home_set_leave cursor-pointer min-w-fit font-normal px-2 py-1 text-lg text-slate-900 leading-none bg-blue-400 hover:bg-blue-200 custom-transition font-signika rounded-md text-center"
              >
                HOME
              </Link>
            </h1>
            <div className="class_assign_table w-full py-2">
              <table className="w-full">
                <thead>
                  <tr className="h-10 text-lg">
                    <th className="text-center border-[1px] border-gray-400">
                      Sno
                    </th>
                    <th className="text-center border-[1px] border-gray-400">
                      Sem
                    </th>
                    <th className="text-center border-[1px] border-gray-400">
                      Branch
                    </th>
                    <th className="text-center border-[1px] border-gray-400">
                      Attendence
                    </th>
                    <th className="text-center border-[1px] border-gray-400">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
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
    </>
  );
};

export default HodProfilePage;
