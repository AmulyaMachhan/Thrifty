import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/features/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

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
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.log(error);
      toast.error("Error while ordering the cart products");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty!</Message>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-semibold">Image</th>
                  <th className="px-4 py-2 text-left font-semibold">Product</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">Price</th>
                  <th className="px-4 py-2 text-left font-semibold">Total</th>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </td>

                    <td className="p-4">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-4">{item.qty}</td>
                    <td className="p-4">${item.price}</td>
                    <td className="p-4">$ {item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="shadow-lg rounded-lg bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="text-lg space-y-2">
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
              <li className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>$ {cart.totalPrice}</span>
              </li>
            </ul>
          </div>

          <div className="shadow-lg rounded-lg bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Shipping Address</h3>
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <p>{cart.paymentMethod}</p>
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
