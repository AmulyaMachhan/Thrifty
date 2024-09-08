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
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800 px-4 py-3 rounded-lg shadow-lg w-full">
    {/* Column 1 */}
    <div className="space-y-4 text-gray-300">
      <h1 className="flex items-center  font-medium">
        <FaStore className="mr-2 text-yellow-200" />
        <span className="text-white">Brand: &nbsp;</span> {product.brand}
      </h1>
      <h1 className="flex items-center  font-medium">
        <FaClock className="mr-2 text-yellow-200" />
        <span className="text-white">Added: &nbsp;</span>{" "}
        {moment(product.createdAt).fromNow()}
      </h1>
      <h1 className="flex items-center  font-medium">
        <FaStar className="mr-2 text-yellow-200" />
        <span className="text-white">Reviews: &nbsp;</span> {product.numReviews}
      </h1>
    </div>

    {/* Column 2 */}
    <div className="space-y-4 text-gray-300 mt-6 md:mt-0">
      <h1 className="flex items-center  font-medium">
        <FaStar className="mr-2 text-yellow-200" />
        <span className="text-white">Ratings: &nbsp;</span> {rating}
      </h1>
      <h1 className="flex items-center  font-medium">
        <FaShoppingCart className="mr-2 text-yellow-200" />
        <span className="text-white">Quantity: &nbsp;</span> {product.quantity}
      </h1>
      <h1 className="flex items-center  font-medium">
        <FaBox className="mr-2 text-yellow-200" />
        <span className="text-white">In Stock: &nbsp;</span>{" "}
        {product.countInStock}
      </h1>
    </div>
  </div>
);

export default ProductInfo;
