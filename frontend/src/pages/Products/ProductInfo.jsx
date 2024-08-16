/* eslint-disable react/prop-types */
import {
  FaStore,
  FaClock,
  FaStar,
  FaShoppingCart,
  FaBox,
} from "react-icons/fa";
import moment from "moment";

const ProductInfo = ({ product, rating }) => (
  <div className="flex items-center justify-between">
    <div className="one">
      <h1 className="flex items-center mb-6">
        <FaStore className="mr-2 text-white" /> Brand: {product.brand}
      </h1>
      <h1 className="flex items-center mb-6 w-[20rem]">
        <FaClock className="mr-2 text-white" /> Added:{" "}
        {moment(product.createdAt).fromNow()}
      </h1>
      <h1 className="flex items-center mb-6">
        <FaStar className="mr-2 text-white" /> Reviews: {product.numReviews}
      </h1>
    </div>

    <div className="two">
      <h1 className="flex items-center mb-6">
        <FaStar className="mr-2 text-white" /> Ratings: {rating}
      </h1>
      <h1 className="flex items-center mb-6">
        <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
        {product.quantity}
      </h1>
      <h1 className="flex items-center mb-6 w-[10rem]">
        <FaBox className="mr-2 text-white" /> In Stock: {product.countInStock}
      </h1>
    </div>
  </div>
);

export default ProductInfo;
