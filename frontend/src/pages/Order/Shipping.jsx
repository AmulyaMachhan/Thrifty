import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center gap-5 pt-5">
        <ProgressSteps step1 step2 />
        <form
          onSubmit={submitHandler}
          className="bg-gray-900 shadow-lg rounded-lg p-4 md:p-6 w-full max-w-3xl"
        >
          <h1 className="text-2xl font-semibold text-white mb-4 text-center">
            Shipping Information
          </h1>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Address</label>
            <input
              type="text"
              className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">City</label>
            <input
              type="text"
              className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="md:flex md:space-x-4">
            <div className="mb-4 md:mb-0 md:w-1/2">
              <label className="block text-gray-300 text-sm mb-1">
                Postal Code
              </label>
              <input
                type="text"
                className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="mb-4 md:w-1/2">
              <label className="block text-gray-300 text-sm mb-1">
                Country
              </label>
              <input
                type="text"
                className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">
              Payment Method
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                className="form-radio text-pink-500 focus:ring-2 focus:ring-pink-500"
                name="paymentMethod"
                value="Razorpay"
                checked={paymentMethod === "Razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2 text-sm text-white">Razorpay</span>
            </div>
          </div>

          <button
            className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-sm text-white font-bold rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
