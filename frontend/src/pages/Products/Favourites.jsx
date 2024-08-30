import { useSelector } from "react-redux";
import Product from "./Product";
import { selectFavouriteProduct } from "../../redux/features/favoritesSlice";
import { Link } from "react-router-dom";

const Favourites = () => {
  const favorites = useSelector(selectFavouriteProduct);

  return (
    <div className="xl:ml-[10rem] lg:ml-[10rem]">
      {favorites.length === 0 ? (
        <div className="w-full h-[100vh] mr-[10rem] flex justify-center items-center text-2xl">
          No favorites added! Go to
          <Link to="/home" className="text-pink-500 underline">
            {` Home`}
          </Link>
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
