import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from "@mui/icons-material/School";

// include css of navbar
import "../CSS/Navbar.css";

// eslint-disable-next-line
const Navbar = ({ currentUser }) => {
  // HERE NEED LOGIC FOR if teacher navbar then what visible and student what visible , HOD what visible

  // When mobile size then toggle navbar using menu_bar button
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  // need state : when mobile size then convert menu icons to texts
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  useEffect(() => {
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
  }, []);

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
            to="/home"
            className="menu_link flex rounded-full justify-center items-center custom-transition relative top-[-2px]"
          >
            <SchoolIcon className="" style={{ fontSize: "2rem" }} />
          </Link>
          <Link
            to="/home"
            className="user_name font-overpass text-[#113C7C] font-semibold text-2xl hover:opacity-90 flex justify-center items-center custom-transition "
          >
            Attendence Management
          </Link>
        </div>
        {/* right part */}
        <ul
          style={{ left: showMenu ? "0%" : "100%" }}
          className="menu_links flex gap-1 font-overpass"
        >
          {/* if current user is admin then only show */}
          {currentUser === "admin" && (
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
              <li>
                  <Link
                    to="/"
                    className="menu_link flex font-medium text-lg items-center justify-center hover:bg-blue-200 px-3 py-1 custom-transition rounded-2xl "
                  >
                    Logout
                  </Link>
              </li>
            </>
          )}

          {/* upload project menu link */}
          {/* if current user is teacher then only show */}
          {currentUser === "teacher" && (
            <>
              <li>
                  <Link
                    to="/history"
                    className="menu_link flex font-medium text-lg items-center justify-center hover:bg-blue-200 px-3 py-1 custom-transition rounded-2xl "
                  >
                    See-History
                  </Link>
              </li>

              {/* Logout icon menu link */}
              <li>
                  <Link
                    to="/"
                    className="menu_link flex font-medium text-lg items-center justify-center hover:bg-blue-200 px-3 py-1 custom-transition rounded-2xl "
                  >
                    Logout
                  </Link>
              </li>
            </>
          )}

          {/* if user is student then only show */}
          {currentUser === "student" && (
            <>
              <li>
                  <Link
                    to="/"
                    className="menu_link flex font-medium text-lg items-center justify-center hover:bg-blue-200 px-3 py-1 custom-transition rounded-2xl "
                  >
                    Logout
                  </Link>
              </li>
            </>
          )}

          {/* menu button which is visible when mobile screen */}
          <li>
            <Link
              to="/teacher"
              className={`menu_bar rounded-md flex custom-transtion relative left-1`}
            >
              {!isMobile ? (
                <img
                  src={`./Images/lokeshwar1.jpg`}
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
    </>
  );
};

export default Navbar;