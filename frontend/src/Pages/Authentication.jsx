// used react-material components
import Tab from "@mui/material/Tab";
import LockOpenIcon from "@mui/icons-material/LockOpen";
// others Components
import Login from "../Components/Login";
// import Navbar from '../Components/Navbar';

const Authentication = () => {
  return (
    <>
      {/* <Navbar isLogged={true} /> */}
      <div className="login_container  font-overpass flex flex-col justify-center items-center mt-20 pt-7 gap-4  ">
        {/* this includes heading part */}
        {/* <div className="login_heading bg-white rounded-md w-[35rem]  py-3 flex justify-center items-center ">
                    <h1 className=' text-3xl font-semibold  opacity-80 tracking-wide' >Your-Login-Page</h1>
                </div> */}

        {/*  this includes login content part */}
        <div
          className="login_contenet bg-slate-100 shadow-sm shadow-blue-400 border-[1px] rounded-md border-gray-300
                  xl:w-[35rem] md:w-[30rem] pt-5 py-3 flex justify-center items-center flex-col"
        >
          <Tab
            icon={<LockOpenIcon />}
            className="w-full"
            label="LOGIN - ACCOUNT"
          />

          <Login />
        </div>
      </div>
    </>
  );
};

export default Authentication;
