import { ORDER_URL, RAZORPAY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: order,
      }),
    }),

    getAllOrders: builder.query({
      query: () => `${ORDER_URL}`,
    }),

    getMyOrders: builder.query({
      query: () => `${ORDER_URL}/mine`,
      keepUnusedDataFor: 5,
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),

    getTotalOrders: builder.query({
      query: () => `${ORDER_URL}/total-orders`,
    }),

    getTotalSales: builder.query({
      query: () => `${ORDER_URL}/total-sales`,
    }),

    getTotalSalesByDate: builder.query({
      query: () => `${ORDER_URL}/total-sales-by-date`,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),

    createRazorpayOrder: builder.mutation({
      query: ({ amount, currency }) => ({
        url: `${RAZORPAY_URL}/create-order`,
        method: "POST",
        body: { amount, currency },
      }),
    }),

    verifyRazorpayOrder: builder.mutation({
      query: (data) => ({
        url: `${RAZORPAY_URL}/verify-order`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayOrderMutation,
} = orderApiSlice;
