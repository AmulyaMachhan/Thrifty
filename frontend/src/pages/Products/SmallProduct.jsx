import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[18rem] p-2 shadow-md rounded-lg">
      <div className="relative overflow-hidden h-[12rem] w-full rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover rounded-xl"
        />
      </div>

      <div className="p-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-base font-semibold text-white flex justify-between items-center">
            <span className="truncate">{product.name}</span>
            <span className="bg-pink-600 text-white text-sm font-medium px-2 py-0.5 rounded-full">
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
