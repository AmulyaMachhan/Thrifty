import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import { FaCartShopping, FaUsers } from "react-icons/fa6";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers } = useGetUsersQuery();
  const { data: orders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "light",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales?.toFixed(2),
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          {
            name: "Sales",
            data: formattedSalesDate.map((item) => item.y),
          },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="py-4">
      <h2 className="w-full text-center text-xl font-bold tracking-wider bg-black py-4 mb-4">
        ADMIN DASHBOARD
      </h2>

      <section className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-10">
          {/* Sales Card */}
          <div className="bg-black text-gray-100 rounded-lg p-6 w-64 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="flex items-center justify-center bg-pink-600 rounded-full w-12 h-12">
              <span className="text-white text-2xl font-bold">$</span>
            </div>
            <p className="text-gray-400 mt-4">Sales</p>
            <h2 className="text-3xl font-bold mt-2">
              {isLoading ? <Loader /> : `$ ${sales?.toFixed(2)}`}
            </h2>
          </div>

          {/* Customers Card */}
          <div className="bg-black text-gray-100 rounded-lg p-6 w-64 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="flex items-center justify-center bg-pink-600 rounded-full w-12 h-12">
              <span className="text-white text-2xl font-bold">
                <FaUsers />
              </span>
            </div>
            <p className="text-gray-400 mt-4">Customers</p>
            <h2 className="text-3xl font-bold mt-2">
              {isLoading ? <Loader /> : customers?.length}
            </h2>
          </div>

          {/* Orders Card */}
          <div className="bg-black text-gray-100 rounded-lg p-6 w-64 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="flex items-center justify-center bg-pink-600 rounded-full w-12 h-12">
              <span className="text-white text-2xl font-bold">
                <FaCartShopping />
              </span>
            </div>
            <p className="text-gray-400 mt-4">All Orders</p>
            <h2 className="text-3xl font-bold mt-2">
              {isLoading ? <Loader /> : orders}
            </h2>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-10 flex justify-center">
          <div className="w-full">
            <h2 className="text-center text-white text-3xl font-semibold mb-6 tracking-wide">
              Sales Overview
            </h2>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="100%"
            />
          </div>
        </div>

        {/* Order List */}
        <div className="mt-5">
          <OrderList />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
