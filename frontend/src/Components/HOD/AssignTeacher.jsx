import { CircularProgress } from "@mui/material";
import { useState } from "react";
// we need component and css
import { ToastContainer, toast } from "react-toastify";
// import axios from 'axios';
// circular progress
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const AssignTeacher = () => {
  // used for navigation page
  const navigate = useNavigate();

  // getting login email
  const [email, setEmail] = useState("");
  // getting login password
  const [password, setPassword] = useState("");

  // new state for loading to upload picture of user
  const [loading, setLoading] = useState(false);

  // toggle password value
  const [showPass, setShowPass] = useState(false);
  const toggleShow = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  // handle login when clicked login button
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); //Procesing circle
    // check values empty is wrong
    if (!email || !password) {
      toast.warn("Please fill All Inputs", { autoClose: 1000 });
      setLoading(false);
      return;
    }
    // if all values is filled
    try {
      // HERE IS MY POST REQUEST CODE --------------
      // const data = await axios.post(logInStudent, { email, password });
      const data = "";

      // if all done successfully then
      if (data.data.success === true) {
        toast.success("Successfully Login");
        localStorage.setItem("studentId", data.data.student_id);
        navigate("/profile");
      } else toast.error(data.data.msg);
      setLoading(false);
    } catch (error) {
      toast.error("Invalid User");
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        action=""
        className="login_form xl:w-[35rem] md:w-[30rem] w-[24rem] sm:px-16 px-10 flex flex-col gap-5 pt-6"
      >
        {/* for input type email */}
        <div className="email_box flex flex-col gap-2">
          <select name="" id="" className="h-8 text-lg">
            <option value="_select_teacher">_select_teacher</option>
            <option value="teacher1">teacher1</option>
            <option value="teacher2">teacher2</option>
            <option value="teacher3">teacher3</option>
            <option value="teacher4">teacher4</option>
          </select>
        </div>
        {/* for input type password */}
        <div className="password_box flex justify-center items-center gap-4">
          <select name="" id="" className="h-8 text-lg">
            <option value="_select_sem" className="">_select_sem</option>
            <option className="text-center" value="sem-1">sem-1</option>
            <option className="text-center" value="sem-3">sem-3</option>
            <option className="text-center" value="sem-5">sem-5</option>
            <option className="text-center" value="sem-7">sem-7</option>
          </select>
          <select name="" id="" className="h-8 text-lg">
            <option value="_select_branch">_select_branch</option>
            <option value="CSE">CSE</option>
            <option value="AIML">AIML</option>
          </select>
          
        </div>
        {/* input button for login */}
        <div className="button_box flex flex-col py-3 justify-center items-center gap-4">
          <button
            onClick={handleLogin}
            className="bg-blue-600 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-blue-700 text-opacity-90 "
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
              "Assign"
            )}
          </button>
        </div>
      </form>

      {/* the toastify alert is added here */}
      <ToastContainer />
    </div>
  );
};

export default AssignTeacher;
