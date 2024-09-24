import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useCreateRazorpayOrderMutation,
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useVerifyRazorpayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { useRazorpay } from "react-razorpay";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayOrder] = useVerifyRazorpayOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { Razorpay } = useRazorpay();

  const handlePayment = async () => {
    const orderAmount = order.totalPrice;

    try {
      const { data: razorpayOrder } = await createRazorpayOrder({
        amount: orderAmount,
        currency: "INR",
      });

      const options = {
        key: "rzp_test_JFOkLyufLxjOSZ", // Replace with your Razorpay key
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Thrifty",
        description: "Order Description",
        order_id: razorpayOrder.orderId,
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          try {
            const verificationResponse = await verifyRazorpayOrder({
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              razorpaySignature: razorpay_signature,
            }).unwrap();

            if (verificationResponse.success) {
              const details = {
                id: order._id,
                status: "success",
                update_time: Date.now(),
                payer: userInfo,
              };
              await payOrder({ orderId, details });
              toast.success("Payment done successfully.");
              refetch();
            } else {
              toast.error("Payment failed. Please try again.");
            }
          } catch (error) {
            toast.error("Payment failed. Please try again.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#1D4ED8",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment creation failed", error);
      toast.error("Failed to create payment. Please try again.");
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Items Section */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-center">Quantity</th>
                    <th className="p-4 text-right">Unit Price</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
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

                      <td className="p-4 text-center">{item.qty}</td>
                      <td className="p-4 text-right">
                        ₹ {item.price.toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        ₹ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-600">Order ID:</span>{" "}
              {order._id}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Name:</span>{" "}
              {order.user.username}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Email:</span>{" "}
              {order.user.email}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Address:</span>{" "}
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <p>
              <span className="font-semibold text-gray-600">
                Payment Method:
              </span>{" "}
              {order.paymentMethod}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Total:</span> ₹{" "}
              {order.totalPrice}
            </p>
            {order.isPaid ? (
              <Messsage variant="success">Paid on {order.paidAt}</Messsage>
            ) : (
              <Messsage variant="danger">Not paid</Messsage>
            )}
          </div>

          {/* Payment and Delivery Section */}
          {!order.isPaid && (
            <div className="mt-6">
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>
          )}

          {loadingDeliver && <Loader />}
          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <div className="mt-6">
                <button
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Order;
