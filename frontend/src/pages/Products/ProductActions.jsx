/* eslint-disable react/prop-types */
const ProductActions = ({ product, qty, setQty, addToCartHandler }) => (
  <div className="mt-2">
    {product.countInStock > 0 && (
      <select
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="p-2 w-[6rem] rounded-lg text-black"
      >
        {[...Array(product.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
    )}

    <button
      onClick={addToCartHandler}
      disabled={product.countInStock === 0}
      className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
    >
      Add To Cart
    </button>
  </div>
);

export default ProductActions;
