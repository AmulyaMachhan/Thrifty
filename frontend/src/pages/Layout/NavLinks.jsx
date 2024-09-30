import { FaHeart } from "react-icons/fa";
import FavoritesCount from "../Favourites/FavouritesCount";
import { Link, useLocation } from "react-router-dom";
import CartCount from "../Cart/CartCount";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import PropTypes from "prop-types";

function NavLinks({ handleLinkClick }) {
  const location = useLocation();
  return (
    <div className="w-full flex justify-around space-x-6 text-sm ">
      <Link to="/" className="flex items-center" onClick={handleLinkClick}>
        <AiOutlineHome
          className="text-white"
          size={16}
          color={location.pathname === "/" ? "pink" : "white"}
        />
        <span
          className={`hidden md:block ml-2 tracking-wider ${location.pathname === "/" ? "text-[#ffc0cb]" : "text-white"}`}
        >
          HOME
        </span>
      </Link>
      <Link to="/shop" className="flex items-center" onClick={handleLinkClick}>
        <AiOutlineShopping
          className="text-white"
          size={16}
          color={location.pathname === "/shop" ? "pink" : "white"}
        />
        <span
          className={`hidden md:block ml-2 tracking-wider ${location.pathname === "/shop" ? "text-[#ffc0cb]" : "text-white"}`}
        >
          SHOP
        </span>
      </Link>
      <Link
        to="/cart"
        className="flex items-center relative"
        onClick={handleLinkClick}
      >
        <AiOutlineShoppingCart
          className="text-white"
          size={16}
          color={location.pathname === "/cart" ? "pink" : "white"}
        />
        <span
          className={`hidden md:block ml-2 tracking-wider ${location.pathname === "/cart" ? "text-[#ffc0cb]" : "text-white"}`}
        >
          CART
        </span>
        <CartCount />
      </Link>
      <Link
        to="/favourites"
        className="flex items-center relative"
        onClick={handleLinkClick}
      >
        <FaHeart
          className="text-white"
          size={16}
          color={location.pathname === "/favourites" ? "pink" : "white"}
        />
        <span
          className={`hidden md:block ml-2 tracking-wider ${location.pathname === "/favourites" ? "text-[#ffc0cb]" : "text-white"}`}
        >
          FAVOURITES
        </span>
        <FavoritesCount />
      </Link>
    </div>
  );
}

NavLinks.propTypes = {
  handleLinkClick: PropTypes.func,
};
export default NavLinks;
