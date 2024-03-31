import axios from "axios";
import Cookie from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { host } from "../API/API";
import { useNavigate } from "react-router-dom";

// Create a context to provide user data
const UserContext = createContext();

// Manage user data and provide it through the context
const LoggedUserData = ({ children }) => {
  const navigate = useNavigate(); // Navigator for redirection
  const [loggedUser, setLoggedUser] = useState(null); // User data state

  // Fetch user data from cookies and the API
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
          setLoggedUser(data);
          const { type: currentUserType } = data;
          navigate(`/${currentUserType}`);
        } catch (error) {
          setLoggedUser(null);
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

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Define prop types for LoggedUserData component
LoggedUserData.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a valid React node
};

// Function to retrieve user data from the context
const GetLoggedUser = () => {
  return useContext(UserContext);
};

export default LoggedUserData;
export { GetLoggedUser };
