import { useCallback, useEffect, useState } from "react";
// we need component and css
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// circular progress
import CircularProgress from "@mui/material/CircularProgress"; // button which round when process
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { host } from "../API/API";
import Cookie from "js-cookie";
import { GetLoggedUser } from "../Context/LoggedUserData";

const SLogin = () => {
  const [user, setUser] = useState(null);

  // used for navigation page
  const navigate = useNavigate();

  // GETTING LOGIN DETAILS INPUTS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentLoggedUser, setCurrentLoggedUer] = useState(""); //store who is user

  // new state for loading circle visible
  const [loading, setLoading] = useState(false);

  // toggle show/hide password value
  const [showPass, setShowPass] = useState(false);
  const toggleShow = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  useEffect(() => {
    const token = Cookie.get("_secure_user_");
    const _id = Cookie.get("unique_key");
    const type = Cookie.get("user_type");

    if (token && _id && type) {
      // Method to get current user data
      const getLoggedUserData = async (token, _id, type) => {
        try {
          const config = {
            headers: {
              authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.get(`${host}/${type}`, config);
          // console.log("User Context API data", data);
          const { type: currentUserType } = data;
          navigate(`/${currentUserType}`);
        } catch (error) {
          console.log(`Error getting context API data: ${error}`);
          navigate("/");
        }
      };

      getLoggedUserData(token, _id, type); // Call the function with correct arguments
    } else {
      console.log("You are not Logged-in!!");
      navigate("/"); // Redirect to the home page if cookies are missing
    }
  }, [navigate]);

  // handle login when clicked login button
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(email, password, currentLoggedUser);
    // check values cannot have empty
    if (!email || !password || !currentLoggedUser) {
      toast.warn("Please fill All Inputs", { autoClose: 1000 });
      setLoading(false);
      return;
    }
    // If all values is filled
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let data;
      // HANDLE LOGIN WHEN USER : HOD
      if (currentLoggedUser === "hod") {
        const response = await axios.post(
          `${host}/hod/login`,
          { email, password },
          config
        );
        data = response.data; // Assuming the data you want is under the 'data' property of the response
        navigate("/hod");
      }

      // HANDLE LOGIN WHEN USER : TEACHER
      else if (currentLoggedUser === "teacher") {
        const response = await axios.post(
          `${host}/teacher/login`,
          { email, password },
          config
        );
        data = response.data;
        navigate("/teacher");
      }
      // HANDLE LOGIN WHEN USER : STUDENT
      else if (currentLoggedUser === "student") {
        const response = await axios.post(
          `${host}/student/login`,
          { email, password },
          config
        );
        data = response.data;
        navigate("/student");
      }

      if(!data) {
        toast.error("Invalid User", { autoClose: 1000 });
        setLoading(false);
        return;
      }

      // get details from data
      const { token, _id, type, name } = data;
      toast.success(`${type} Successfully Login!`, {
        autoClose: 1000,
      });
      Cookie.set("_secure_user_", token, { expires: 2 });
      Cookie.set("unique_key", _id, { expires: 2 });
      Cookie.set("user_type", type, { expires: 2 });
      console.log(name, " is successfully Loggeed in");
      // do empty inputs now
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      toast.error("Invalid User", { autoClose: 1000 });
      setLoading(false);
    }
  };

  return (
    <>
      {/*👉 LOGIN FOROM of login user */}
      <form
        action=""
        className="login_form xl:w-[30rem] w-[24rem] sm:px-16 px-10 flex flex-col gap-5 py-9 mt-[-2rem]"
      >
        {/* for input type email */}
        <div className="email_box flex flex-col gap-2">
          <label
            htmlFor="login_input_email"
            className="text-xl  font-[600] opacity-70"
          >
            Email Address *
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="login_input_email"
            id="login_input_email"
            className="py-1 px-3 w-full bg-gray-200"
            placeholder="Enter Your Email Address"
            autoComplete="on"
          />
        </div>
        {/* for input type password */}
        <div className="password_box flex flex-col gap-2">
          <label
            htmlFor="login_input_password"
            className="text-xl  font-[600] opacity-70"
          >
            Password *
          </label>
          <div className="password flex items-center ">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              name="login_input_password"
              id="login_input_password"
              className="py-1 px-3 w-full bg-gray-200"
              placeholder="Enter Password"
              autoComplete="new-password"
            />
            <button
              tabIndex="-1"
              onClick={toggleShow}
              className="show_button bg-gray-200 py-1 px-2 rounded-br-md rounded-tr-md "
            >
              {!showPass ? (
                <VisibilityOffIcon className="text-gray-700" />
              ) : (
                <VisibilityIcon className="text-gray-700" />
              )}
            </button>
          </div>
          {/* Checkbox  if student/teacher */}
          <div className="who_is flex items-center justify-start gap-6 pl-1 my-2 ">
            {/* tick for student */}
            <div className="is_student flex justify-center items-center gap-1">
              <input
                type="radio"
                className="relative top-[-2px]"
                id="is_student_checkbox"
                name="who_is"
                value={currentLoggedUser}
              />
              <label
                htmlFor="is_student_checkbox"
                className="text-[1rem] selection:bg-white font-[600] opacity-70 cursor-pointer"
                onClick={() => setCurrentLoggedUer("student")}
              >
                Student
              </label>
            </div>
            {/* tick for teacher */}
            <div className="is_teacher flex justify-center items-center gap-1">
              <input
                type="radio"
                className="relative top-[-2px]"
                id="is_teacher_checkbox"
                name="who_is"
                value={currentLoggedUser}
              />
              <label
                htmlFor="is_teacher_checkbox"
                className="text-[1rem] selection:bg-white font-[600] opacity-70 cursor-pointer"
                onClick={() => setCurrentLoggedUer("teacher")}
              >
                Teacher
              </label>
            </div>
            {/* tick for head of department */}
            <div className="is_hod flex justify-center items-center gap-1">
              <input
                type="radio"
                className="relative top-[-2px]"
                id="is_hod_checkbox"
                name="who_is"
                value={currentLoggedUser}
              />
              <label
                htmlFor="is_hod_checkbox"
                className="text-[1rem] selection:bg-white font-[600] opacity-70 cursor-pointer"
                onClick={() => setCurrentLoggedUer("hod")}
              >
                HOD
              </label>
            </div>
          </div>
        </div>
        {/* input button for login */}
        <div className="button_box flex flex-col justify-center items-center gap-4">
          <button
            onClick={handleLogin}
            className="bg-green-700 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-green-600 hover:text-slate-100 custom-transition text-opacity-90 "
          >
            {/* button content is changing to circular progress when clicked to login */}
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="inherit" size={28} />
              </Box>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>

      {/* the toastify alert is added here */}
      <ToastContainer />
    </>
  );
};

export default SLogin;
