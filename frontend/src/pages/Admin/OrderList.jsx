import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  return (
    <div className="container mx-auto ">
      <h2 className="w-full text-center text-xl font-bold tracking-wider bg-black py-4 my-4">
        ORDERS ({orders?.length !== 0 && orders?.length})
      </h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : orders?.length === 0 ? (
        <div className="text-center text-xl my-4 font-semibold tracking-wide">
          <span>No Orders Yet. Go to&nbsp;</span>
          <span>
            <Link to="/shop" className="text-pink-500 underline">
              Shop!
            </Link>
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-black rounded-lg shadow-xl m-4">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-black">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-6 text-left text-sm font-semibold text-gray-300"
                >
                  ITEMS
                </th>
                <th
                  scope="col"
                  className="px-4 py-6 text-left text-sm font-semibold text-gray-300"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-4 py-6 text-left text-sm font-semibold text-gray-300"
                >
                  USER
                </th>
                <th
                  scope="col"
                  className="px-4 py-6 text-left text-sm font-semibold text-gray-300"
                >
                  DATE
                </th>
                <th
                  scope="col"
                  className="px-4 py-6 text-left text-sm font-semibold text-gray-300"
                >
                  TOTAL
                </th>
                <th
                  scope="col"
                  className="px-4 py-6 text-left text-sm font-semibold text-gray-300"
                >
                  PAID
                </th>
                <th
                  scope="col"
                  className="px-4 py-6 text-left text-sm font-semibold text-gray-300"
                >
                  DELIVERED
                </th>
                <th
                  scope="col"
                  className="px-4 py-6 text-left text-sm font-semibold text-gray-300"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-900 transition-colors"
                >
                  <td className="px-4 py-6 whitespace-nowrap">
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap text-sm text-gray-300">
                    {order._id}
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap text-sm text-gray-300">
                    {order.user ? order.user.username : "N/A"}
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap text-sm text-gray-300">
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap text-sm text-gray-300">
                    $ {order.totalPrice}
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap">
                    {order.isPaid ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-200">
                        Completed
                      </span>
                    ) : (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900 text-red-200">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap">
                    {order.isDelivered ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-200">
                        Completed
                      </span>
                    ) : (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900 text-red-200">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/order/${order._id}`}>
                      <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                        Details
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

export default OrderList;
