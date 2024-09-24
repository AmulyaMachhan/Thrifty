import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item successfully removed from cart");
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="py-4">
      <h2 className="w-full text-center text-xl font-bold tracking-wider bg-black py-4 mb-4">
        SHOPPING CART
      </h2>
      {cartItems.length === 0 ? (
        <div className="text-center text-xl font-semibold tracking-wide">
          Your cart is empty. Go To{" "}
          <Link
            to="/shop"
            className="underline text-pink-500 hover:text-pink-300"
          >
            Shop!
          </Link>
        </div>
      ) : (
        <div>
          <div className="my-6 w-4/5 mx-auto">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                <div className="w-[5rem] h-[5rem]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1 ml-4">
                  <Link to={`/product/${item._id}`} className="text-pink-500">
                    {item.name}
                  </Link>

                  <div className="mt-2 text-white">{item.brand}</div>
                  <div className="mt-2 text-white font-bold">
                    $ {item.price}
                  </div>
                </div>

                <div className="w-24">
                  <select
                    id="qty"
                    className="w-full p-1 border rounded text-black"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <button
                    className="text-red-500 mr-[5rem]"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="ml-[1rem] mt-[.5rem]" />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8">
              <div className="py-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>

                <div className="text-2xl font-bold">
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>

                <button
                  className="bg-pink-500 mt-4 py-2 px-6 rounded-full text-lg"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
