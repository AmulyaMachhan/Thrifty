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
        key: "rzp_test_JFOkLyufLxjOSZ",
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

  if (isLoading) return <Loader />;
  if (error) return <Messsage variant="danger">{error.data.message}</Messsage>;

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Order Items Section */}
          <div className=" space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Order Details
                </h2>
                {order.orderItems.length === 0 ? (
                  <Messsage>Order is empty</Messsage>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-sm text-gray-400 border-b border-gray-700">
                          <th className="pb-3 font-medium text-left">
                            Product
                          </th>
                          <th className="pb-3 font-medium text-center">
                            Quantity
                          </th>
                          <th className="pb-3 font-medium text-right">Price</th>
                          <th className="pb-3 font-medium text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {order.orderItems.map((item, index) => (
                          <tr key={index} className="text-gray-300">
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 rounded-lg object-cover mr-4"
                                />
                                <Link
                                  to={`/product/${item.product}`}
                                  className="hover:text-indigo-400 transition"
                                >
                                  {item.name}
                                </Link>
                              </div>
                            </td>
                            <td className="py-4 text-center">{item.qty}</td>
                            <td className="py-4 text-right">
                              ₹{item.price.toFixed(2)}
                            </td>
                            <td className="py-4 text-right font-medium">
                              ₹{(item.qty * item.price).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Order ID</span>
                  <span className="text-white">{order._id}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Name</span>
                  <span className="text-white">{order.user.username}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Email</span>
                  <span className="text-white">{order.user.email}</span>
                </div>
                <div className="text-gray-400">
                  <span className="block mb-1">Shipping Address</span>
                  <span className="text-white">
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Payment Method</span>
                  <span className="text-white">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-gray-400 pt-4 border-t border-gray-700">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-white font-bold">
                    ₹{order.totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Payment Status
              </h3>
              {order.isPaid ? (
                <div className="bg-green-900/50 text-green-400 p-4 rounded-lg">
                  Paid on {new Date(order.paidAt).toLocaleDateString()}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-red-900/50 text-red-400 p-4 rounded-lg">
                    Payment Pending
                  </div>
                  <button
                    onClick={handlePayment}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
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
                  <button
                    onClick={deliverHandler}
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                  >
                    Mark As Delivered
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
