import { Link } from "react-router-dom";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import PropTypes from "prop-types";

const AuthLinks = ({ location, handleLinkClick }) => (
  <ul className="flex gap-3 text-white text-md">
    <li>
      <Link
        to="/login"
        className="flex items-center hover:text-pink-500"
        onClick={handleLinkClick}
      >
        <AiOutlineLogin
          size={16}
          color={location.pathname === "/login" ? "pink" : "white"}
        />
        <span
          className={`text-xs md:block ml-1 tracking-wider ${location.pathname === "/login" ? "text-[#ffc0cb]" : "text-white"}`}
        >
          LOGIN
        </span>
      </Link>
    </li>
    <li>
      <Link
        to="/register"
        className="flex items-center hover:text-pink-500"
        onClick={handleLinkClick}
      >
        <AiOutlineUserAdd
          size={16}
          color={location.pathname === "/register" ? "pink" : "white"}
        />
        <span
          className={`text-xs md:block ml-1 tracking-wider ${location.pathname === "/register" ? "text-[#ffc0cb]" : "text-white"}`}
        >
          REGISTER
        </span>
      </Link>
    </li>
  </ul>
);

AuthLinks.propTypes = {
  handleLinkClick: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
export default AuthLinks;
