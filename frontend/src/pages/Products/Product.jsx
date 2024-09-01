/* eslint-disable react/display-name */
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Ratings from "./Ratings";
import HeartIcon from "../Favourites/HeartIcon";
import { ImageModal } from "../Admin/Modals/ImageModal";

const Product = memo(({ product }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[20rem] my-6">
      {/* Card container */}
      <div className="w-full bg-gradient-to-r from-black to-gray-600 shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
        {/* Card Header with Image */}
        <div
          className="relative w-full cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-60 object-cover transition-opacity duration-500 rounded-t-lg ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
          <div className="absolute top-4 right-4 z-10">
            <HeartIcon product={product} />
          </div>
        </div>

        {/* Card Body */}
        <div className="py-4 px-3">
          <h5 className="text-lg font-bold text-white leading-tight mb-2">
            {product.name}
          </h5>
          <Ratings value={product.rating} className="mb-4" />
          <p className="text-sm text-gray-300 leading-relaxed">
            {product.description?.substring(0, 25)}...
          </p>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between px-3 pb-6 text-pink-300">
          <div className="flex flex-col">
            <span className="text-xl font-bold">${product.price}</span>
            <span className="text-xs text-gray-400">Free Shipping</span>
          </div>

          <Link to={`/product/${product._id}`}>
            <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-pink-800 text-white hover:bg-pink-700 transition duration-200">
              View Product
            </button>
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={product.image}
      />
    </div>
  );
});

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default Product;
