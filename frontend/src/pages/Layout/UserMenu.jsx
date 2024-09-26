import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  AiOutlineShopping,
  AiOutlineOrderedList,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHeart, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";
import { FaBagShopping } from "react-icons/fa6";
import FavoritesCount from "../Favourites/FavouritesCount";

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

    <div
      className={`absolute right-0 mt-4 transition-all duration-700 smooth ${isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"} origin-top`}
    >
      <ul className="max-w-sm px-4 py-2 text-white bg-black bg-opacity-70 rounded-lg shadow-lg backdrop-blur-xl">
        <li className="font-semibold text-pink-300 hover:text-pink-500 pb-2 border-b">
          <p>Signed in as</p>
          <p>{userInfo.email}</p>
        </li>
        {userInfo.isAdmin && (
          <div className="border-b py-2">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 py-2 hover:text-pink-500"
                onClick={handleLinkClick}
              >
                <MdSpaceDashboard size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/allproductslist"
                className="flex items-center gap-2 py-2 hover:text-pink-500"
                onClick={handleLinkClick}
              >
                <AiOutlineShopping size={20} />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categorylist"
                className="flex items-center gap-2 py-2 hover:text-pink-500"
                onClick={handleLinkClick}
              >
                <BiSolidCategoryAlt size={20} />
                <span>Category</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orderlist"
                className="flex items-center gap-2 py-2 hover:text-pink-500"
                onClick={handleLinkClick}
              >
                <AiOutlineOrderedList size={20} />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/userlist"
                className="flex items-center gap-2 py-2 hover:text-pink-500"
                onClick={handleLinkClick}
              >
                <FaUsers size={20} />
                <span>Users</span>
              </Link>
            </li>
          </div>
        )}

        <li>
          <Link
            to="/profile"
            className="flex items-center gap-2 py-2 hover:text-pink-500"
            onClick={handleLinkClick}
          >
            <AiOutlineUser size={20} />
            <span>Account Details</span>
          </Link>
        </li>
        <li>
          <Link
            to="/user-orders"
            className="flex items-center gap-2 py-2 hover:text-pink-500"
            onClick={handleLinkClick}
          >
            <FaBagShopping size={20} />
            <span>My Orders</span>
          </Link>
        </li>
        <li>
          <Link
            to="/favourites"
            className="flex items-center gap-2 py-2 hover:text-pink-500 relative"
            onClick={handleLinkClick}
          >
            <FaHeart size={20} />
            <span>Wishlist</span>
            <FavoritesCount />
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              logoutHandler();
              handleLinkClick();
            }}
            className="flex items-center gap-2 py-2 text-red-500 hover:text-red-900"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
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
