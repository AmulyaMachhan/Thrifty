import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[15rem] ml-[1rem] p-2">
      <div className="relative overflow-hidden h-[10rem] w-full">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain rounded"
        />
      </div>

      <div className="p-2">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-sm flex justify-between items-center">
            <div className="truncate">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-1 px-1.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
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
