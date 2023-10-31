import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from "@mui/icons-material/School";

// include css of navbar
import "../CSS/Navbar.css";
import Cookies from "js-cookie";
import { GetLoggedUser } from "../Context/LoggedUserData";
import { ToastContainer, toast } from "react-toastify";

// eslint-disable-next-line
const Navbar = ({ currentUser }) => {
  // store navbar user-data
  const [getUser, setGetUser] = useState({});

  // GETTING CONTEXT-API TO SET LoggedUser
  // eslint-disable-next-line
  const { loggedUser } = GetLoggedUser();

  const navigate = useNavigate();

  // HERE NEED LOGIC FOR if teacher navbar then what visible and student what visible , HOD what visible

  // When mobile size then toggle navbar using menu_bar button
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    // e.preventDefault();
    setShowMenu(!showMenu);
  };

  // need state : when mobile size then convert menu icons to texts
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  useEffect(() => {
    // set current user
    setGetUser(loggedUser);
    // Update the isMobile state when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1100);
    };
    // when window resize then call handleResize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [loggedUser]);

  const handleLogout = async () => {
    try {
      // Get Cookie and then remove it
      Cookies.remove("user_type");
      Cookies.remove("unique_key");
      Cookies.remove("_secure_user_");

      toast.success("Logout successfully!", { autoClose: 1000 });
      // Update the loggedUser state and execute further actions in the callback
      // setLoggedUser(null); // must make null
      // Code to execute after state update
      console.log("Logout successfully");
      setTimeout(() => {
        toggleMenu();
        navigate("/");
      }, 500);
    } catch (error) {
      console.log("Getting eeror to logut");
      // setLoggedUser(null); // must make null
    }
  };

  return (
    <>
      {/* navbar container */}
      <nav
        id="navbar"
        className={`nav_container flex items-center justify-between px-60 h-16 bg-slate-100 min-w-full `}
      >
        {/* header section left part */}
        <div className="header flex items-center justify-center relative md:left-0 left-[-0.6rem] md:gap-4 gap-1">
          <Link
            to={`/${getUser?.type}`}
            className="menu_link flex rounded-full justify-center items-center custom-transition relative top-[-2px]"
          >
            <SchoolIcon className="" style={{ fontSize: "2rem" }} />
          </Link>
          <Link
            to={`/${getUser?.type}`}
            className="user_name font-overpass text-[#113C7C] font-semibold text-2xl hover:opacity-90 flex justify-center items-center custom-transition "
          >
            Attendence Management
          </Link>
        </div>
        {/* right part */}
        <ul
          style={{ left: showMenu ? "0%" : "100%" }}
          className="menu_links flex lg:justify-center lg:items-center gap-1 font-overpass"
        >
          {/* if current user is admin then only show */}
          {getUser?.type === "hod" && (
            <>
              <li>
                <Link
                  to="/manage-teacher"
                  className="menu_link flex font-medium text-lg items-center justify-center hover:bg-blue-200 px-3 py-1 custom-transition rounded-2xl "
                >
                  Manage-Teacher
                </Link>
              </li>
              <li>
                <Link
                  to="/manage-student"
                  className="menu_link flex font-medium text-lg items-center justify-center hover:bg-blue-200 px-3 py-1 custom-transition rounded-2xl "
                >
                  Manage-Student
                </Link>
              </li>
            </>
          )}

          {/* upload project menu link */}
          {/* if current user is teacher then only show */}
          {getUser?.type === "teacher" && (
            <>
              <li>
                <Link
                  to="/history"
                  className="menu_link flex font-medium text-lg items-center justify-center hover:bg-blue-200 px-3 py-1 custom-transition rounded-2xl "
                >
                  See-History
                </Link>
              </li>
            </>
          )}

          {/* if user is student then only show */}
          {getUser?.type === "student" && <></>}

          <li onClick={handleLogout}>
            <h2 className="menu_link w-fit flex selection:bg-none font-semibold ml-1 cursor-pointer text-lg items-center justify-start hover:bg-blue-200 px-3 py-1 custom-transition rounded-2xl ">
              Logout
            </h2>
          </li>

          {/* menu button which is visible when mobile screen */}
          <li onClick={() => setShowMenu(!showMenu)}>
            <Link
              to={`/${getUser?.type}`}
              // className={`menu_bar rounded-md flex custom-transtion relative left-1`}
              className={`menu_link flex font-semibold ml-1 cursor-pointer text-lg items-center justify-center ${
                !isMobile ? "p-1" : "px-3 py-1"
              } hover:bg-blue-200 custom-transition rounded-2xl `}
            >
              {!isMobile ? (
                <img
                  src={`${
                    getUser ? getUser?.pic : "./Images/default_user.jpg"
                  }`}
                  alt="user"
                  className="w-9 h-9 rounded-full border-[1px] border-gray-400"
                  srcSet=""
                />
              ) : (
                "Profile"
              )}
            </Link>
          </li>
        </ul>
        {/* when mobile size then show menu button which show menus */}
        {isMobile && (
          <div className="mobile_menu cursor-pointer">
            <MenuIcon
              onClick={toggleMenu}
              className="hover:opacity-80 custom-transition hover:bg-blue-200 rounded-md"
              style={{
                fontSize: "2.5rem",
                display: showMenu ? "none" : "block",
              }}
            />
            <CloseIcon
              onClick={toggleMenu}
              className="hover:opacity-80 custom-transition hover:bg-blue-200 rounded-md"
              style={{
                fontSize: "2.5rem",
                display: showMenu ? "block" : "none",
              }}
            />
          </div>
        )}
      </nav>

      <ToastContainer />
    </>
  );
};

export default Navbar;
