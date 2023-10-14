import Navbar from "../Components/Navbar";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
const Student = () => {
  return (
    <>
      <Navbar />

      <div className="student_page_container font-overpass">
        <div className="left_part">
          {/* profile picture and name */}
          <div className="profile">
            <img
              className="h-32 w-32 rounded-full"
              src="./Images/lokeshwar1.jpg"
              alt=""
            />
            <h1 className="text-xl font-semibold">Lokeshwar Prasad</h1>
          </div>
          {/* menu bar type */}
          <div className="student_show_menu flex flex-col gap-2">
            <div className="student_menu flex items-center bg-green-200 py-2 gap-1">
              <AssignmentTurnedInIcon className="text-green-500" />
              <h3 className="font-semibold text-green-500 font-signika">
                Attendence
              </h3>
            </div>
            <div className="student_menu flex items-center py-2 gap-1">
              <PersonOutlineIcon className="text-gray-700" />
              <h3 className="font-semibold text-gray-700 font-signika">
                Profile
              </h3>
            </div>
          </div>
        </div>

        <div className="right_part">
          {/* student basic details show */}
          <div className="student_basic_details">
            <div className="student_detail flex gap-1 items-center">
              <h2 className="font-semibold">Institute : </h2>
              <h3>RSR Rungta College of Engineering College Bhilai</h3>
            </div>
            <div className="student_detail flex gap-1 items-center">
              <h2 className="font-semibold">Course : </h2>
              <h3>BTech</h3>
            </div>
            <div className="student_detail flex gap-1 items-center">
              <h2 className="font-semibold">Branch : </h2>
              <h3>Computer Science Engineering</h3>
            </div>
            <div className="student_detail flex gap-1 items-center">
              <h2 className="font-semibold">Sem : </h2>
              <h3>5th Regular</h3>
            </div>
            <div className="student_combine flex items-center gap-2">
              <div className="student_detail flex gap-1 items-center">
                <h2 className="font-semibold">Attedence : </h2>
                <h3>10</h3>
              </div>
              |
              <div className="student_detail flex gap-1 items-center">
                <h2 className="font-semibold">Total Classess : </h2>
                <h3>20</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Here student can see their attendence */}
        <div className="student_attendence">
          {/* user can search by subjects */}
          <div className="search_bar">
            <h2>SELECT SUBJECT : </h2>
            <select name="" id="" className="bg-[#f2f2f2] cursor-pointer px-1">
              <option value="Select_Subject">Select_Subject</option>
              <option value="Select_Subject">Maths</option>
              <option value="Select_Subject">DAA</option>
            </select>
          </div>
          {/* show table attendence */}
          <div className="show_table_attendence">
            {/* category */}
            <div className="attendence_category flex items-center justify-between px-10">
              <div className="category_buttons flex items-center gap-5">
                <h2 className="px-2 py-1 border-[2px] border-gray-550 w-fit">
                  Daily
                </h2>
                <h2 className="px-2 py-1 border-[2px] border-gray-550 w-fit">
                  Week
                </h2>
                <h2 className="px-2 py-1 border-[2px] border-gray-550 w-fit">
                  Month
                </h2>
              </div>
              <div className="total_attendence flex items-center justify-center">
                <h2>Attendence : </h2>
                <h3>12/20</h3>
              </div>
            </div>

            {/* show output of buttons */}
            <div className="attendenc_output_table w-full overflow-x-auto ">
              <table className="border-collapse" >
                <tbody className="flex" >
                  <tr className="flex flex-col border-[2px] rounded" >
                    <td className="border-b-[1px]" >{new Date().toLocaleDateString()}</td>
                    <td className="w-full text-center" >P</td>
                  </tr>
                  <tr className="flex flex-col border-[2px] rounded" >
                    <td className="border-b-[1px]" >{new Date().toLocaleDateString()}</td>
                    <td className="w-full text-center" >P</td>
                  </tr>
                  <tr className="flex flex-col border-[2px] rounded" >
                    <td className="border-b-[1px]" >{new Date().toLocaleDateString()}</td>
                    <td className="w-full text-center" >P</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
