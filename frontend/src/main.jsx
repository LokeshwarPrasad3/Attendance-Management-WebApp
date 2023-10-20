import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// Import the font packages
import "@fontsource/signika-negative";
import "@fontsource/overpass";
import "react-toastify/dist/ReactToastify.css";
import LoggedUserData from "./Context/LoggedUserData";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoggedUserData>
        <App />
      </LoggedUserData>
    </BrowserRouter>
  </React.StrictMode>
);
