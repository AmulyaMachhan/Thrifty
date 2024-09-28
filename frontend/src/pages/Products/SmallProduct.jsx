import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeartIcon from "../Favourites/HeartIcon";
import { useState } from "react";

const SmallProduct = ({ product }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-[9rem] sm:w-[18rem] rounded-lg">
      <div className="relative overflow-hidden h-[5rem] sm:h-[12rem] w-full rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover rounded-xl"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
          onLoad={() => setIsLoaded(true)}
        />
        <HeartIcon product={product} />
      </div>

      <div className="py-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-base font-semibold text-white flex justify-between items-center">
            <span className="truncate text-xs md:text-md">{product.name}</span>
            <span className="bg-pink-600 text-white text-xs md:text-sm font-medium px-2 py-0.5 rounded-full">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

SmallProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default SmallProduct;
