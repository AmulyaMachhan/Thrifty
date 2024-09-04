import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserMenu = ({
  userInfo,
  isDropdownOpen,
  toggleDropdown,
  handleLinkClick,
  logoutHandler,
}) => (
  <>
    <button
      className="flex items-center text-gray-200 focus:outline-none"
      onClick={toggleDropdown}
    >
      <div className="flex justify-center items-center border border-white py-2 pr-2 rounded-lg space-x-2">
        <span className="tracking-wide font-semibold px-2 border-r">
          @{userInfo?.username}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>

    {isDropdownOpen && (
      <ul className="absolute right-0 max-w-sm px-4 py-2 mt-4 text-white bg-black bg-opacity-50 rounded-lg shadow-lg backdrop-blur-xl">
        {userInfo.isAdmin && (
          <div>
            <li className="font-semibold text-blue-400 pb-2 border-b">
              <p>Signed in as</p>
              <p>{userInfo.email}</p>
            </li>
            <li>
              <Link
                to="/admin/dashboard"
                className="block py-2 hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/productlist"
                className="block py-2 hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categorylist"
                className="block py-2 hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orderlist"
                className="block py-2 hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/userlist"
                className="block py-2 hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                Users
              </Link>
            </li>
          </div>
        )}

        <li>
          <Link
            to="/profile"
            className="block py-2 hover:bg-gray-100"
            onClick={handleLinkClick}
          >
            Profile
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              logoutHandler();
              handleLinkClick();
            }}
            className="block w-full py-2 text-left hover:bg-gray-100"
          >
            Logout
          </button>
        </li>
      </ul>
    )}
  </>
);

UserMenu.propTypes = {
  userInfo: PropTypes.object,
  isDropdownOpen: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  logoutHandler: PropTypes.func.isRequired,
};
export default UserMenu;
