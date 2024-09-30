import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { addToCart } from "../../redux/features/cartSlice";
import HeartIcon from "../Favourites/HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  return (
    <div className="max-w-[15rem] relative bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-gradient-to-r from-pink-200 to-pink-400 text-pink-800 text-xs font-medium px-3 py-1 rounded-full shadow-md">
            {p.brand}
          </span>
          <img
            className="cursor-pointer rounded-t-lg h-[10rem] w-full object-cover transition-opacity duration-500"
            src={p.image}
            alt={p.name}
            style={{
              opacity: isLoaded ? 1 : 0,
            }}
            onLoad={() => setIsLoaded(true)}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="py-3 px-2">
        <h5 className="mb-2 text-lg font-semibold text-white truncate">
          {p.name}
        </h5>

        <p className="font-semibold text-pink-100 text-lg">
          {p.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>

        <p className="mb-3 font-normal text-gray-300 text-xs">
          {p.description.substring(0, 30)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-pink-600 to-pink-400 rounded-lg shadow transition-all duration-200 hover:from-pink-500 hover:to-pink-300 focus:ring-4 focus:outline-none focus:ring-pink-300"
          >
            Read More
            <svg
              className="w-3 h-3 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 hover:from-pink-500 hover:to-pink-300 transition-all duration-200"
            onClick={() => addToCartHandler(p, 1)}
            aria-label={`Add ${p.name} to cart`}
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </section>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  p: PropTypes.shape({
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(ProductCard);
