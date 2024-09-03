import { useSelector } from "react-redux";
import Product from "../Products/Product";
import { selectFavouriteProduct } from "../../redux/features/favoritesSlice";
import { Link } from "react-router-dom";

const Favourites = () => {
  const favorites = useSelector(selectFavouriteProduct);

  return (
    <div className="flex flex-col items-center">
      {favorites.length === 0 ? (
        <div className="text-center text-xl my-4 font-semibold tracking-wide">
          <span>No favorites added. Go to&nbsp;</span>
          <span>
            <Link to="/" className="text-pink-500 underline">
              Home!
            </Link>
          </span>
        </div>
      ) : (
        <>
          <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
            FAVOURITE PRODUCTS
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favourites;
