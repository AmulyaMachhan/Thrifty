import PropTypes from "prop-types";
import { AiOutlineShoppingCart } from "react-icons/ai";
const ProductActions = ({ product, qty, setQty, addToCartHandler }) => (
  <div className="mt-4 flex gap-5 items-center">
    {product.countInStock > 0 && (
      <select
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="p-3 bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 hover:bg-gray-100 transition duration-300 ease-in-out"
      >
        {[...Array(product.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1} className="text-black">
            {x + 1}
          </option>
        ))}
      </select>
    )}

    <button
      onClick={addToCartHandler}
      disabled={product.countInStock === 0}
      className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold text-white ${
        product.countInStock > 0
          ? "bg-pink-600 hover:bg-pink-700 transition duration-300 ease-in-out"
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      <AiOutlineShoppingCart size={20} />
      Add To Cart
    </button>
  </div>
);

ProductActions.propTypes = {
  product: PropTypes.shape({
    countInStock: PropTypes.number.isRequired,
  }).isRequired,
  qty: PropTypes.number.isRequired,
  setQty: PropTypes.func.isRequired,
  addToCartHandler: PropTypes.func.isRequired,
};

export default ProductActions;
