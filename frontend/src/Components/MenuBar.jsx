import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAvatarURL } from "../Utils/ChangeAvatar";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { host } from "../API/API";
import Cookies from "js-cookie";
import { GetLoggedUser } from "../Context/LoggedUserData";

const MenuBar = ({ currentUser, setPicLoading }) => {
  // Context-ApI data
  const { setLoggedUser } = GetLoggedUser();

  // use for loading when req is send
  const [loading, setLoading] = useState(false);

  // change avatar of student to db when clicked to avatar
  const ChangeAvatar = async (filePic) => {
    setLoading(true);
    try {
      if (filePic === undefined) {
        setLoading(false);
        return; // no move forward
      }
      // file type must be in jpeg and png only
      if (filePic.type !== "image/jpeg" && filePic.type !== "image/png") {
        toast.warn("File is not image format", { autoClose: 1000 });
        console.log("File is not image format");
        setLoading(false);
        return;
      }
      // Get status and url from my created returning function object
      const { status, avatarURL } = await getAvatarURL(filePic);
      // Status is true mean not get any error by cloudinary
      if (status !== true) {
        toast.warn("Something went wrong!!", { autoClose: 1000 });
        console.log("Error during Change Avatar!");
        setLoading(false);
        return;
      }

      // Get token by Cookies
      const token = Cookies.get("_secure_user_");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      // change url to db must go body (_id, type, avatarURL)
      const _id = currentUser?._id;
      const type = currentUser?.type;
      const { data } = await axios.put(
        `${host}/student/change-avatar`,
        {
          _id,
          type,
          avatarURL,
        },
        config
      );
      setPicLoading(true); // if any reason getting late to load image
      setLoggedUser(data);
      setPicLoading(false);
      setLoading(false);
      toast.success("Avatar Successfully Updated!!", { autoClose: 1000 });
    } catch (error) {
      toast.warn("Error during changing avatar!", { autoClose: 1000 });
      console.log("Error during changing profile picture", error);
      setLoading(false);
      return;
    }
  };

  return (
    <>
      {/* menu bar type */}
      <div className="student_show_menu flex flex-col gap-2 md:gap-2 md:py-12 md:pt-20 pt-4 px-8">
        <button className="student_menu flex items-center bg-green-300 hover:bg-green-400 py-2 cursor-pointer px-5 gap-2">
          <input
            onChange={(e) => ChangeAvatar(e.target.files[0])}
            type="file"
            name=""
            id="change-avatar"
            className="hidden"
          />
          {/* button content is changing when upload image */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
                width: "100%",
              }}
            >
              <CircularProgress color="inherit" size={20} />
            </Box>
          ) : (
            <>
              <ChangeCircleIcon className="text-gray-500" />
              <label
                htmlFor="change-avatar"
                className="font-semibold text-gray-500 font-signika selection:bg-none w-full text-left"
              >
                Avatar
              </label>
            </>
          )}
        </button>

        <button className="student_menu flex items-center bg-green-300 hover:bg-green-400 py-2 cursor-pointer px-5 gap-2">
          <AssignmentTurnedInIcon className="text-gray-500" />
          <h3 className="font-semibold text-gray-500 font-signika selection:bg-none">
            Profile
          </h3>
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default MenuBar;
