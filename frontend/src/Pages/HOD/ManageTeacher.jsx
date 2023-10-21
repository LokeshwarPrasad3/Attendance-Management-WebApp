import { useState } from "react";
// used react-material components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Navbar from "../../Components/Navbar";
import AssignTeacher from "../../Components/HOD/AssignTeacher";
import CreateTeacher from "../../Components/HOD/CreateTeacher";
// My pages or componenets
// import Login from "../Components/Login";
// import Signup from "../Components/SignUp";
import "../../CSS/Style.css";


const ManageTeacher = () => {
  // Show login and create user when user toggle
  const [toggleMode, setToggleMode] = useState(true);

  //PreDefine Material-UI Component code to changing tabs of login and create user
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar currentUser={"admin"} />

      <div className="login_container font-overpass flex flex-col justify-center items-center pt-7 gap-4  ">
        {/* this includes heading part */}
        <div className="login_contenet bg-[#f2f2f2] rounded-sm  lg:w-[35rem] md:w-[34rem] w-[23rem]  py-3 flex justify-center items-center flex-col ">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            <Tab
              icon={<LockOpenIcon />}
              label="ASSIGN-TEACHER"
              onClick={() => setToggleMode(true)}
            />
            <Tab
              icon={<PersonPinIcon />}
              label="CREATE-ACCOUNT"
              onClick={() => setToggleMode(false)}
            />
          </Tabs>

          {/*👉 LOGIN FOROM of login user */}
          {
            toggleMode && <AssignTeacher /> // if true then login mode
          }
          {/*👉 CREATE ACCOUNT FOROM */}
          {
            !toggleMode && <CreateTeacher /> // if false then signup mode
          }
        </div>
      </div>
    </>
  );
}

export default ManageTeacher
