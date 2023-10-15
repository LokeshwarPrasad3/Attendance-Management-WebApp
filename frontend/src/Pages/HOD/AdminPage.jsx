import Navbar from "../../Components/Navbar";
import { adminDailyData } from "../../Temp/AdminMonitorData";

const AdminPage = () => {
  return (
    <>
      {/* need pass what visible admin, student, teacher */}
      <Navbar currentUser={"admin"} />

      {/* Another part of page */}
      <div className="home_heading font-overpass flex flex-col justify-center py-4 gap-4 flex-wrap items-center">
        {/* Heading Part */}
        <h2 className=" font-semibold text-xl w-full text-center">
          ATTEDENCE - MONITOR:
        </h2>
        <div className="today text-xl flex justify-center items-center gap-2 font-signika flex-wrap">
          <div className="attendence_category flex items-center justify-between md:px-1">
            <div className="category_buttons flex items-center md:gap-3 gap-2">
              <button className="hover:bg-green-200 custom-transition md:px-4 px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer">
                SEM-1
              </button>
              <button className="hover:bg-green-200 custom-transition md:px-4 px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer">
                SEM-3
              </button>
              <button className="hover:bg-green-200 custom-transition md:px-4 px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer">
                SEM-5
              </button>
              <button className="hover:bg-green-200 custom-transition md:px-4 px-2 py-1 border-[1px] border-gray-300 w-fit font-semibold cursor-pointer">
                SEM-7
              </button>
            </div>
            {/* <div className="total_attendence flex items-center justify-center">
              <h2>Attendence : </h2>
              <h3>12/20</h3>
            </div> */}
          </div>
        </div>
        <hr className="text-gray-400 w-full bg-gray-400" />

        {/* table shows daily attendence */}
        {/* Main part where table is visible */}
      </div>

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
              <th className=" border-[2px] border-gray-900 text-center px-1">
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
            {adminDailyData.map((attendence, index) => {
              return (
                <>
                  <tr key={index} className="text-lg h-10">
                    <td className=" border-[2px] border-gray-900 text-lg min-w-fit text-center">
                      {index + 1}
                    </td>
                    <td className=" border-[2px] border-gray-900 text-lg min-w-fit px-3 overflow-hidden text-center">
                      {attendence.date}
                    </td>
                    <td className=" border-[2px] border-gray-900 text-lg min-w-fit px-3 overflow-hidden text-center">
                      {attendence.day}
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
                <th className="border-[2px] font-signika border-gray-900  text-center px-2">
                  Total(10)
                </th>
                <th className="border-[2px] font-signika border-gray-900  text-center px-2">
                  Details
                </th>
              </tr>
            </thead>
            {/* Right-Table body part here */}
            <tbody>
              {/* Getting data from Users Array */}
              {adminDailyData.map((att, index) => {
                return (
                  <tr key={index} className="text-lg h-10">
                    <td className="font-signika border-[2px] border-gray-900 text-xl min-w-fit text-center">
                      {att.total}
                    </td>
                    <td className="font-signika border-[2px] border-gray-900 text-xl min-w-fit text-center">
                      <button className="bg-green-200 px-[2px]">GO</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
