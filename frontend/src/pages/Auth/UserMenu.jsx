import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  AiOutlineShopping,
  AiOutlineOrderedList,
  AiOutlineUser,
} from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
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
            <div className="border-b py-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 py-2 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <MdSpaceDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/productlist"
                  className="flex items-center gap-2 py-2 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <AiOutlineShopping size={20} />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categorylist"
                  className="flex items-center gap-2 py-2 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <BiSolidCategoryAlt size={20} />
                  <span>Category</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orderlist"
                  className="flex items-center gap-2 py-2 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <AiOutlineOrderedList size={20} />
                  <span>Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/userlist"
                  className="flex items-center gap-2 py-2 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  <FaUsers size={20} />
                  <span>Users</span>
                </Link>
              </li>
            </div>
          </div>
        )}

        <li>
          <Link
            to="/profile"
            className="flex items-center gap-2 py-2 hover:bg-gray-100"
            onClick={handleLinkClick}
          >
            <AiOutlineUser size={20} />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              logoutHandler();
              handleLinkClick();
            }}
            className="flex items-center gap-2 py-2 text-red-500 hover:bg-gray-100"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
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
