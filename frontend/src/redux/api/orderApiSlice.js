import { ORDER_URL } from "../constants";
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
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
} = orderApiSlice;
