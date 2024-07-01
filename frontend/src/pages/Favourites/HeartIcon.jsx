/* eslint-disable react-hooks/exhaustive-deps */
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  addFavouriteToLocalStorage,
  getFavouritesFromLocalStorage,
  removeFavouriteFromLocalStorage,
} from "../../utils/localStorage";
import {
  addToFavourites,
  removeFromFavourites,
  setFavourites,
} from "../../redux/features/favoritesSlice";

function HeartIcon({ product }) {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites) || [];
  const isFavourite = favourites.some((p) => p._id === product?._id);

  useEffect(() => {
    const favouritesFromLocalStorage = getFavouritesFromLocalStorage();

    dispatch(setFavourites(favouritesFromLocalStorage));
  }, []);

  const toggleFavourites = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(product));
      // remove the product from the localStorage as well
      removeFavouriteFromLocalStorage(product?._id);
    } else {
      dispatch(addToFavourites(product));
      // add the product to localStorage as well
      addFavouriteToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavourites}
    >
      {isFavourite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
}

HeartIcon.propTypes = {
  product: PropTypes.object.isRequired,
};

export default HeartIcon;
