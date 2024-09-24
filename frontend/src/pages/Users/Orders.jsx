import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { Loader } from "lucide-react";
import Message from "../../components/Message";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto py-6 text-gray-300">
      <h2 className="text-center text-xl font-bold tracking-wider bg-black py-4 mb-4">
        MY ORDERS{" "}
        <span className="text-xl mx-2 px-2 py-1 font-bold text-[black] bg-[#F9F5FF] border border-[#E4E7EC] rounded-xl">
          {orders?.length}
        </span>
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin h-8 w-8 text-indigo-500" />
        </div>
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : orders.length === 0 ? (
        <div className="text-center text-xl my-4 font-semibold tracking-wide">
          <span>No Orders. Go to&nbsp;</span>
          <span>
            <Link to="/shop" className="text-pink-500 underline">
              shop!
            </Link>
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr className="text-gray-400">
                <th className="py-4 px-6">IMAGE</th>
                <th className="py-4 px-6">NAME</th>
                <th className="py-4 px-6">DATE</th>
                <th className="py-4 px-6">TOTAL</th>
                <th className="py-4 px-6">PAID</th>
                <th className="py-4 px-6">DELIVERED</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="text-gray-200 border-b border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <div className="relative w-16 h-16">
                        {order.orderItems.map((item, index) => (
                          <img
                            key={index}
                            src={item.image}
                            alt={item.name}
                            className={`absolute top-0 left-0 w-16 h-16 object-cover rounded-full border-2 border-gray-300 shadow-md`}
                            style={{
                              transform: `translate(${index * 10}px, ${index * 10}px)`, // Slight offset for each image
                              zIndex: order.orderItems.length - index,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    {order.orderItems.map((item, index) => (
                      <p key={index} className="mt-2">
                        {item.name}
                      </p>
                    ))}
                  </td>
                  <td className="py-4 px-6">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-4 px-6">₹ {order.totalPrice.toFixed(2)}</td>

                  <td className="py-4 px-6">
                    {order.isPaid ? (
                      <span className="inline-block bg-green-500 text-white py-1 px-3 rounded-full text-sm">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-block bg-red-500 text-white py-1 px-3 rounded-full text-sm">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    {order.isDelivered ? (
                      <span className="inline-block bg-green-500 text-white py-1 px-3 rounded-full text-sm">
                        Delivered
                      </span>
                    ) : (
                      <span className="inline-block bg-red-500 text-white py-1 px-3 rounded-full text-sm">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition-colors">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
