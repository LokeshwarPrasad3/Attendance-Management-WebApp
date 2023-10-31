// used react-material components
import Tab from "@mui/material/Tab";
import LockOpenIcon from "@mui/icons-material/LockOpen";
// others Components
import Login from "../Components/Login";

const Authentication = () => {
  return (
    <>
      {/* width: 100%; margin: auto; height: 100%; display: flex; justify-content:
      center; align-items: center; height: 100vh; */}
      <div className="login_container bg-slate-800 font-overpass flex flex-col pt-28 items-center w-full m-auto h-screen">
        <div
          className="login_contenet bg-slate-100 shadow-sm shadow-blue-400 border-[1px] rounded-md border-gray-300
                  xl:w-[30rem] pt-5 py-3 flex justify-center items-center flex-col"
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


// {
//   "name":"HOD-1",
//   "email":"hod-1@gmail.com",
//   "branch":"CSE",
//   "password":"12345",
//   "pic" : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
// }
