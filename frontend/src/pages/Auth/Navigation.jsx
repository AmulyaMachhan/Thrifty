import { useState, useRef } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

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

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed transition-all duration-500 ease-in-out`} // Added smooth transition
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <button
          className="xl:hidden lg:hidden md:block"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <AiOutlineMenu className="mr-2 mt-[1rem]" size={22} />
        </button>

        <Link to="/" className="flex relative" onClick={handleLinkClick}>
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2 duration-300 ease-in-out">
            <AiOutlineHome className="mt-[3rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">HOME</span>
          </div>
        </Link>

        <Link to="/shop" className="flex relative" onClick={handleLinkClick}>
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2 duration-300 ease-in-out">
            <AiOutlineShopping className="mt-[3rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </div>
        </Link>

        <Link to="/cart" className="flex relative" onClick={handleLinkClick}>
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2 duration-300 ease-in-out">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">CART</span>
            <CartCount />
          </div>
        </Link>

        <Link
          to="/favourites"
          className="flex relative"
          onClick={handleLinkClick}
        >
          <div className="flex justify-center items-center relative transition-transform transform hover:translate-x-2 duration-300 ease-in-out">
            <FaHeart className="mt-[3rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">FAVOURITES</span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div
        className="relative"
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center text-gray-800 focus:outline-none transition-transform transform hover:scale-105 duration-300 ease-in-out">
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              } transition-transform duration-300 ease-in-out`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute bottom-0 mt-2 mr-14 pb-4 space-y-2 bg-white text-gray-600 transition-opacity duration-300 ease-in-out opacity-0 ${
              dropdownOpen ? "opacity-100" : "opacity-0"
            } ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}
          >
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
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2 duration-300 ease-in-out"
                onClick={handleLinkClick}
              >
                <AiOutlineLogin size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2 duration-300 ease-in-out"
                onClick={handleLinkClick}
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
