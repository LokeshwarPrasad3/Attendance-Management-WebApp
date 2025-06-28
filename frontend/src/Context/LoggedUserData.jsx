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
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Fetch user data from cookies and the API
  useEffect(() => {
    const getLoggedUserData = async () => {
      const token = Cookie.get("_secure_user_");
      const _id = Cookie.get("unique_key");
      const type = Cookie.get("user_type");

      if (!token || !_id || !type) {
        // console.log("You are not Logged-in!!");
        setIsLoading(false);
        navigate("/");
        return;
      }

      try {
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${host}/${type}`, config);
        setLoggedUser(data);
      } catch (error) {
        console.error("Error getting context API data:", error);
        setLoggedUser(null);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    getLoggedUserData();
  }, [navigate]);

  if (isLoading) {
    return null; // Or return a loading spinner component
  }

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

// Custom hook to retrieve user data from the context
const GetLoggedUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("GetLoggedUser must be used within a LoggedUserData provider");
  }
  return context;
};

export default LoggedUserData;
export { GetLoggedUser };
