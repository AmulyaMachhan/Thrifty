import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
      }),
    }),
    keepUnusedDataFor: 5,
    provideTags: ["Product"],
  }),
});
