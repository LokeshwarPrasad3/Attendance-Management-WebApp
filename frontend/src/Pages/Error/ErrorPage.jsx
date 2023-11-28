import "./ErrorPage.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const ErrorPage = () => {
  return (
    <>
      <div id="error-container">
        <h1>404</h1>
        <h2>There is nothing Here</h2>
        <p>Sorry, the page you were looking for in this blog does not exist.</p>
        <HomeIcon className="bi bi-house" />
        <Link class="homepage" to="/">
          Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
