import React from "react";
import Navbar from "../../Components/Navbar";
import { Users } from "../../Temp/Users";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const HistoryAttendence = () => {
  return (
    <>
      {/* Navbar components */}
      <Navbar currentUser={"teacher"} />

      {/* Another part of page */}
      <div className="home_heading font-overpass flex justify-center py-4 gap-4 flex-wrap items-center">
        {/* Heading Part */}
        <div className="today text-xl flex justify-center items-center gap-2 font-signika flex-wrap">
          <h2 className=" font-semibold md:w-fit w-full text-center">
            FILTER - ATTENDENCE :{" "}
          </h2>
          <div className="search_inputs flex justify-center items-center gap-2">
            <div className="input_sem">
              <select className="bg-slate-200 rounded px-1 py-1 text-[1rem]">
                <option value="">_select_Sem</option>
                <option value="1st">1st</option>
                <option value="3rd">3rd</option>
                <option value="5th">5th</option>
                <option value="7th">7th</option>
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
                id="history_date"
                type="date"
                className="bg-slate-200 text-[1rem] md:w-fit w-0 focus:outline-none"
                placeholder="Date"
              />
            </div>
            {/* <div className="custom-date">
                <label
                  htmlFor="history_date"
                  className="rounded text-[1rem] md:w-44 w-24">
                  All Date
                </label>
            </div> */}
          </div>
          <button className="home_set_leave cursor-pointer font-normal px-2 py-1 text-lg text-black leading-none bg-blue-400 hover:bg-blue-200 custom-transition font-signika rounded-md">
            SEARCH
          </button>
        </div>
      </div>
      <hr className="text-gray-400 bg-gray-400" />

      {/* Set Leave Today Button part */}
      <div className="set_leave_container w-full flex justify-center items-center pt-4">
        <h1 className="home_set_leave cursor-pointer font-semibold px-2 py-1 text-xl text-black leading-none custom-transition font-signika rounded-md">
          Present : 10/20
        </h1>
      </div>

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
            {Users.map((user, index) => {
              return (
                <React.Fragment key={index}>
                  <tr className="text-lg h-10">
                    <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                      {user.sno}
                    </td>
                    <td className=" border-[2px] border-gray-900 text-xl min-w-[11rem] overflow-hidden text-center">
                      {user.name.slice(0, 15)}
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
                {Users[0].all_attendence.map((att,index) => {
                  return (
                    <th
                      key={index}
                      className="border-[2px] font-signika border-gray-900  text-center px-2"
                    >
                      {att.date}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {/* Right-Table body part here */}
            <tbody>
              {/* Getting data from Users Array */}
              {Users.flatMap((user,index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="text-lg h-10">
                      {user.all_attendence.map((stu, userIndex) => {
                        return (
                          <React.Fragment key={userIndex}>
                            <td className="font-signika border-[2px] border-gray-900 text-xl min-w-fit text-center">
                              {stu.status}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HistoryAttendence;
