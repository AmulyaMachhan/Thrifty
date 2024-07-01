import { Link } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import PropTypes from "prop-types";
import Ratings from "./Ratings";
import HeartIcon from "../Favourites/HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="max-w-xs mx-4 my-4">
      <Card
        renderImage={() => (
          <img
            className="w-full h-[12rem] object-cover rounded-t-lg"
            src={product.image}
            alt={product.name}
          />
        )}
        className="max-w-xs relative bg-gray-900"
      >
        <div className="absolute top-4 right-4">
          <HeartIcon product={product} />
        </div>

        <h5 className="text-md font-semibold tracking-tight text-white">
          {product.name}
        </h5>

        <Ratings value={product.rating} />

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">${product.price}</span>
          <Link
            to={`/product/${product._id}`}
            className="rounded-lg px-2 text-center text-md font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-800"
          >
            <Button color="primary">View Product</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
