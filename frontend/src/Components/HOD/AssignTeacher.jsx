import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
// we need component and css
import { ToastContainer, toast } from "react-toastify";
// import axios from 'axios';
// circular progress
import Box from "@mui/material/Box";
import axios from "axios";
import { host } from "../../API/API";
import Cookies from "js-cookie";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddTaskIcon from "@mui/icons-material/AddTask";
// PreDefined Subjects
import { subjectsMap } from "../../API/SubjectList";

const AssignTeacher = () => {

  const [sem, setSem] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");

  const [teacherId, setTeacherId] = useState("");
  const [classessList, setClassessList] = useState([]);

  // Store all teachers for assign
  const [allTeachers, setAllTeachers] = useState([]);

  const getAllTeachers = useCallback(async () => {
    // get token from cookie
    const token = Cookies.get("_secure_user_");
    console.log("here is alltecher access token " + token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${host}/teacher/get-all-teachers`,
      config
    );
    if (!data) {
      console.log("Not get all teachers");
      toast.warn("Teacher not fetched!");
      return;
    }
    setAllTeachers(data);
  }, []);

  useEffect(() => {
    getAllTeachers();
  }, [getAllTeachers]);

  // new state for loading to upload picture of user
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  // add new class for teacher
  const addNewClass = (event) => {
    event.preventDefault();
    if (!sem || !branch || !subject) {
      toast.warn("Fill Empty Fields!", { autoClose: 1000 });
      return;
    }
    // if all filled then store in allClassess
    setClassessList((prev) => [
      ...prev,
      { sem: sem, branch: branch, subject: subject },
    ]);

    toast.success("Shedule Added!", { autoClose: 1000 });

    // now blank that input fields
    setSem("");
    setSubject("");
    setBranch("");

    console.log(sem, branch, subject);
  };

  // delete shedule assign by hod
  const deleteShedule = (delIndex) => {
    const filteredShedule = classessList.filter((classess, index) => {
      return delIndex !== index;
    });
    setClassessList(filteredShedule);
  };

  const AssignSubject = async (event) => {
    event.preventDefault();
    try {
      // check teacher id and classesslist not empty
      if (!teacherId || !classessList) {
        console.log("Input filled not empty");
        toast.warn("Input filled is empty", { autoClose: 1000 });
        return;
      }

      setLoading(true);
      // get token from cookie
      const token = Cookies.get("_secure_user_");
      console.log("here is alltecher access token " + token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${host}/teacher/get-all-teachers`,
        { teacherId, teacherTeachClassesData: classessList },
        config
      );
      if (!data) {
        console.log("teacher Subject Not Assigned");
        toast.warn("Subject Not Assigned!", { autoClose: 1000 });
        setLoading(false);
        return;
      }
      toast.success("Teacher Subject Updated!", { autoClose: 1000 });
      setClassessList(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };

  return (
    <div>
      <form
        action=""
        className="login_form xl:w-[35rem] md:w-[30rem] w-[24rem] px-6 md:px-9 flex flex-col gap-2 pt-10 py-5"
      >
        {/* for input type email */}
        <div className="email_box flex flex-col gap-2">
          <select
            onChange={(e) => setTeacherId(e.target.value)}
            value={teacherId}
            className="h-8 text-lg bg-gray-200"
          >
            <option value="_select_teacher">_select_teacher</option>
            {/* All Teachers */}
            {allTeachers?.map((teacher, index) => {
              return (
                <React.Fragment key={index}>
                  <option value={teacher._id}>{teacher.name}</option>
                </React.Fragment>
              );
            })}
          </select>
        </div>
        {/* Show all sheduled class of teacher */}
        <div className="show_teacher_shedule flex flex-col justify-center items-center gap-2 w-full">
          {classessList?.map((classess, index) => {
            return (
              <React.Fragment key={index}>
                <div className="shedule_row flex w-full max-w-full overflow-hidden justify-between items-center gap-2 bg-violet-200 px-1 rounded">
                  {/* show semester */}
                  <div className="show_sem ">
                    <p>{classess.sem} -</p>
                  </div>
                  {/* show branch */}
                  <div className="show_branch ">
                    <p>{classess.branch} -</p>
                  </div>
                  {/* show subject */}
                  <div className="show_branch overflow-hidden ">
                    <p>{classess.subject}</p>
                  </div>
                  {/* button which delete row */}
                  <div className="delete_row">
                    <DeleteForeverIcon
                      onClick={() => deleteShedule(index)}
                      className="cursor-pointer p-[1px] text-red-900 hover:text-red-600 custom-transition"
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          })}{" "}
        </div>
        <div className="password_box flex justify-between items-center gap-4 w-full ">
          {/* Select Semesters */}
          <select
            onChange={(e) => setSem(e.target.value)}
            value={sem}
            className="h-8 md:w-[25%] w-[33%] text-lg bg-gray-200"
          >
            <option value="" className="">
              Sem
            </option>
            <option className="text-center" value="1">
              sem-1
            </option>
            <option className="text-center" value="3">
              sem-3
            </option>
            <option className="text-center" value="5">
              sem-5
            </option>
          </select>
          {/* Select branch */}
          <select
            onChange={(e) => setBranch(e.target.value)}
            value={branch}
            className="h-8 md:w-[25%] w-[33%] text-lg bg-gray-200"
          >
            <option value="">Branch</option>
            <option value="CSE">CSE</option>
            <option value="AIML">AIML</option>
          </select>
          {/* Select Subjects */}
          <select
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            className="h-8 text-lg md:min-w-[50%] w-[33%] bg-gray-200 text-center"
          >
            <option value="">Subject</option>
            {/* <option value="Data Analytics with python">
              Data Analytics with python
            </option>
            <option value="Computer Network">Computer Network</option>
            <option value="Microprocessor & Interface">Microprocessor & Interface</option>
            <option value="FLAT">FLAT</option>
            <option value="Multimedia & VR">Multimedia & VR</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="DAA">DAA</option>
            <option value="Operating System">Operating System</option>
            <option value="Discrete Maths">Discrete Maths</option>
            <option value="PPL">PPL</option>
            <option value="Digital Electronics">Digital Electronics</option>
            <option value="Programming with C">Programming with C</option>
            <option value="Funcdamentals of Computer">Funcdamentals of Computer</option> */}

            {branch &&
              sem &&
              subjectsMap[`${branch}${sem}`].map((subject, index) => (
                <React.Fragment key={index}>
                  <option value={subject}>{subject}</option>
                </React.Fragment>
              ))}
          </select>
        </div>
        {/* add new selection for multiple classess assign */}
        <div className="add_button flex justify-end items-center px-2">
          <button
            onClick={addNewClass}
            className="pr-2 mt-3 pl-1 bg-green-500 flex justify-center items-center font-signika py-0 rounded shadow-sm shadow-blue-500 hover:bg-green-400 custom-transition gap-1 "
          >
            <AddTaskIcon className="p-[3px]" />
            Add
          </button>
        </div>
        {/* input button for login */}
        <div className="button_box flex flex-col py-3 justify-center items-center gap-4">
          <button
            onClick={AssignSubject}
            className="bg-blue-600 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-blue-500 text-opacity-90 custom-transition "
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
