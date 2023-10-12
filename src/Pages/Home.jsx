import { useState } from "react";
import Navbar from "../Components/Navbar";
import { Users } from "../Temp/Users";

const Home = () => {
  // state which manage present/absent
  const [isPresent, setIsPresent] = useState({});
  // when clicked to present/absent button
  const handleIsPresent = (sno) => {
    setIsPresent((prev) => ({
      ...prev,
      [sno]: !isPresent[sno],
    }));
  };

  return (
    <>
      {/* Navbar components */}
      <Navbar />

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
        <button className="home_see_history w-28 text-lg bg-[#314EB5] hover:bg-blue-700 custom-transition text-white font-signika rounded-md">
          SEE HISTORY
        </button>
      </div>
      <hr className="text-gray-400 bg-gray-400" />

      {/* Set Leave Today Button part */}
      <div className="set_leave_container w-full flex justify-center items-center pt-4">
        <button className="home_set_leave cursor-pointer font-normal px-2 py-1 text-lg leading-none bg-red-500 hover:red-blue-700 custom-transition text-white font-signika rounded-md">
          Set Leave Today
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
            {Users.map((user) => {
              return (
                <>
                  <tr key={user.sno} className="text-lg h-10">
                    <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                      {user.sno}
                    </td>
                    <td className=" border-[2px] border-gray-900 text-xl min-w-[11rem] overflow-hidden text-center">
                      {user.name.slice(0, 15)}
                    </td>
                  </tr>
                </>
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
                  Today
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
              {Users.map((user) => {
                return (
                  <>
                    <tr key={user.sno} className="text-lg h-10">
                      <td className=" text-center border-[2px] border-gray-900">
                        <button
                          onClick={() => handleIsPresent(user.sno)}
                          className={`home_set_leave ${
                            isPresent[user.sno]
                              ? "bg-[#038327]"
                              : "bg-[#F20101]"
                          } font-normal w-fit h-6 px-1 py-[2px] text-lg leading-none custom-transition text-white font-signika rounded-md`}
                        >
                          {isPresent[user.sno] ? "Present" : "Absent"}
                        </button>
                      </td>
                      <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                        {isPresent[user.sno] ? "1" : "0"}
                      </td>
                      <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                        0
                      </td>
                      <td className=" border-[2px] border-gray-900 text-xl min-w-fit text-center">
                        {isPresent[user.sno] ? "1" : "0"}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
