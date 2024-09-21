import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../../redux/features/cartSlice";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import ProgressSteps from "../../components/ProgressSteps";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

function PlaceOrder() {
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading: creatingOrder, error }] =
    useCreateOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      toast.success("Order Place Successfully!!");
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.log(error);
      toast.error("Error while ordering the cart products");
    }
  };

  return (
    <div className="min-h-screen p-8 text-gray-200">
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty!</Message>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg mb-8">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800 text-left text-gray-300 font-semibold uppercase">
                  <th className="px-4 py-5">Image</th>
                  <th className="px-4 py-5">Product</th>
                  <th className="px-4 py-5">Quantity</th>
                  <th className="px-4 py-5">Price</th>
                  <th className="px-4 py-5">Total</th>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-700 ${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    } hover:bg-gray-700 transition-colors duration-200 text-pink-500 font-semibold tracking-wide`}
                  >
                    <td className="p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                    </td>

                    <td className="p-4">
                      <Link
                        to={`/product/${item._id}`}
                        className="hover:underline text-blue-400"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-4">{item.qty}</td>
                    <td className="p-4">$ {item.price.toFixed(2)}</td>
                    <td className="p-4">
                      $ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="shadow-lg rounded-lg bg-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">
              Order Summary
            </h2>
            <ul className="text-lg space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span className="font-semibold">Items:</span>
                <span>$ {cart.itemsPrice}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Shipping:</span>
                <span>$ {cart.shippingPrice}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Tax:</span>
                <span>$ {cart.taxPrice}</span>
              </li>
              <li className="flex justify-between text-lg font-bold text-white">
                <span>Total:</span>
                <span>$ {cart.totalPrice}</span>
              </li>
            </ul>
          </div>

          <div className="shadow-lg rounded-lg bg-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">
              Shipping & Payment
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-100">
                Shipping Address
              </h3>
              <p className="text-gray-300">
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100">
                Payment Method
              </h3>
              <p className="text-gray-300">{cart.paymentMethod}</p>
            </div>
          </div>
        </div>

        {error && <Message variant="danger">{error.data.message}</Message>}

        <button
          type="button"
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-full text-lg w-full mt-8 shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
          disabled={cart.cartItems.length === 0}
          onClick={placeOrderHandler}
        >
          {creatingOrder ? <Loader /> : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default PlaceOrder;
