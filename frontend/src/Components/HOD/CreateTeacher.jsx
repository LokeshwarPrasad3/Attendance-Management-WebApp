import { useState } from "react";
// we need component and css
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// circular progress
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CreateTeacher = () => {

  // getting name
  const [name, setName] = useState("");
  // getting  email
  const [email, setEmail] = useState("");
  // getting  password
  const [password, setPassword] = useState("");
  // // getting  cpassword
  // for picture data from cloudinary link
  const [pic, setPic] = useState();

  // new state for loading to upload picture of user
  const [loading, setLoading] = useState(false);

  // when clicked to choose file for image then handle that
  const postDetail = (pic) => {
    // pics have all info of image (name,size,type)
    // when upload picture then load button
    setLoading(true); // when loading starts
    // if pics is undefined then popup error
    if (pic === undefined) {
      toast.warn("Please Select an Image",{autoClose:1000});
      return; // no move forward
    }
    // if type is jpeg and png only
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      // we need data to send on cloudinary api using formData
      const data = new FormData();

      // FormData JS object used for data format when sending body in HTTP requests,
      // often used in web applications for tasks like file uploads.

      data.append("file", pic);
      data.append("upload_preset", "mern-chat-app");
      data.append("cloud_name", "mernchatappcloud");
      data.append("api_key", "488695261785225");
      data.append("api_secret", "cWM3uWmnthOo0WXWk5-Ajz4cfVQ");

      // upload that data in cloudinary api using post method
      fetch("https://api.cloudinary.com/v1_1/mernchatappcloud/image/upload", {
        //adding body method in headers
        method: "post",
        body: data,
      })
        .then((res) => res.json()) //data fetched
        .then((data) => {
          let picUrl = data.url.toString();
          // Check if the URL starts with 'http://'
          if (picUrl.startsWith("http://")) {
            // Replace 'http://' with 'https://'
            picUrl = picUrl.replace(/^http:\/\//i, "https://");
          }

          setPic(picUrl);
          console.log("Uploaded Image url : " + data.url.toString());
          // console.log(data);
          setLoading(false);
          toast.success("Image Uploaded Successfully!", { autoClose: 1000 });
        })
        .catch((err) => {
          console.log("Error during uploading Picture", err);
          setLoading(false);
        });
    } else {
      toast.warn("Please select image", { autoClose: 1000 });
      setLoading(false);
      return;
    }
  };

  // toggle password value
  const [showPass, setShowPass] = useState(false);
  const toggleShow = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  // when clicked to sign up then handle
  const handleSignup = async (e) => {
    e.preventDefault();
    // set loading is true
    setLoading(true);

    // check all is valid  or not
    if (!name || !email || !password || !pic) {
      toast.warn("Please Fill All Fields!");
      setLoading(false);
      return;
    }

  };

  return (
    <>
      {/*👉 CREATE ACCOUNT FOROM */}

      <form
        action=""
        className="create_form  w-[35rem]  px-16 flex flex-col gap-5 pt-7"
      >
        {/* for input name */}
        <div className="name_box flex flex-col gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)} // set value when change
            type="text"
            name="create_input_name"
            id="create_input_name"
            className="py-1 px-3 w-full bg-gray-200"
            placeholder="Teacher Name"
          />
        </div>

        {/* for input type email */}
        <div className="email_box flex flex-col gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)} // set value when change
            type="email"
            name="create_input_email"
            id="create_input_email"
            className="py-1 px-3 w-full bg-gray-200"
            placeholder="Teacher Email "
            autoComplete="on"
          />
        </div>

        {/* for input date (dob) */}
        <div className="email_box flex flex-col gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)} // set value when change
            type="date"
            name="create_input_email"
            id="create_input_email"
            className="py-1 px-3 w-full bg-gray-200"
            placeholder="Teacher Email "
            autoComplete="on"
          />
        </div>

        {/* for input type email */}
        <div className="email_box flex flex-col gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)} // set value when change
            type="text"
            name="create_input_email"
            id="create_input_email"
            className="py-1 px-3 w-full bg-gray-200"
            placeholder="Specilization"
            autoComplete="on"
          />
        </div>

        {/* for input type password */}
        <div className="password_box flex flex-col gap-2">
          <div className="password flex items-center ">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)} // set value when change
              type={showPass ? "text" : "password"}
              name="create_input_password"
              id="create_input_password"
              className="py-1 px-3 w-full bg-gray-200"
              placeholder="Enter Password"
              autoComplete="new-password"
            />
            <button
              tabIndex="-1"
              onClick={toggleShow}
              className="show_button bg-gray-200 py-1 px-2 rounded-md"
            >
              {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
        </div>

        {/* upload your picture */}
        <div className="password_box flex flex-col gap-2">
          {/* only accept image */}
          <input
            type="file"
            accept="image/*"
            // send image to db using cloudinary
            onChange={(e) => postDetail(e.target.files[0])}
            name="create_input_picture"
            id="create_input_picture"
            className="py-1 px-3 w-full bg-gray-100"
            placeholder="Confirm Password"
          />
        </div>

        {/* input button which is login */}
        <div className="button_box flex flex-col justify-center pb-4 items-center gap-4">
          <button
            // signup button
            onClick={handleSignup}
            disabled={loading}
            className="bg-blue-600 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-blue-700 text-opacity-90 "
          >
            {/* button content is changing when upload image */}
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
              "Create-Account"
            )}
          </button>
        </div>
      </form>

      {/* the toastify alert is added here */}
      <ToastContainer />
    </>
  );
};

export default CreateTeacher;
