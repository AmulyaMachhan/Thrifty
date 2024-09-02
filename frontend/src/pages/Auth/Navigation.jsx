import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice.js";
import { logout } from "../../redux/features/authSlice.js";
import CartCount from "../Cart/CartCount.jsx";
import FavoritesCount from "../Favourites/FavouritesCount.jsx";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-black text-white fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div>
          <span className="text-white text-4xl font-abril font-semibold">
            thrifty!
          </span>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <Link to="/" className="flex items-center" onClick={handleLinkClick}>
            <AiOutlineHome className="text-white" size={16} />
            <span className="ml-2">HOME</span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center"
            onClick={handleLinkClick}
          >
            <AiOutlineShopping className="text-white" size={16} />
            <span className="ml-2">SHOP</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center"
            onClick={handleLinkClick}
          >
            <AiOutlineShoppingCart className="text-white" size={16} />
            <span className="ml-2">CART</span>
            <CartCount />
          </Link>
          <Link
            to="/favourites"
            className="flex items-center"
            onClick={handleLinkClick}
          >
            <FaHeart className="text-white" size={16} />
            <span className="ml-2">FAVOURITES</span>
            <FavoritesCount />
          </Link>
        </div>

        <div className="relative">
          <button
            className="flex items-center text-gray-200 focus:outline-none"
            onClick={toggleDropdown}
          >
            {userInfo ? (
              <span className="mr-2">{userInfo.username}</span>
            ) : (
              <></>
            )}
            {userInfo && (
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
            )}
          </button>

          {isDropdownOpen && userInfo && (
            <ul className="absolute right-0 mt-2 bg-white text-gray-600 rounded shadow-lg w-48">
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
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
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="flex gap-3 text-white text-md">
              <li>
                <Link
                  to="/login"
                  className="flex items-center hover:text-pink-500"
                  onClick={handleLinkClick}
                >
                  <AiOutlineLogin size={16} />
                  <span className="ml-2">LOGIN</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center hover:text-pink-500"
                  onClick={handleLinkClick}
                >
                  <AiOutlineUserAdd size={16} />
                  <span className="ml-2">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
