// used react-material components
import Tab from "@mui/material/Tab";
import LockOpenIcon from "@mui/icons-material/LockOpen";
// others Components
import Login from "../Components/Login";

const Authentication = () => {
  return (
    <>
      <div className="login_container  font-overpass flex flex-col justify-center items-center mt-20 pt-7 gap-4  ">
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
