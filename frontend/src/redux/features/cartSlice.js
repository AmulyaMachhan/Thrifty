import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, review, ...item } = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item_.id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existingItem._id ? item : x
        );
      } else {
        state.cartItems = [state.cartItems, ...item];
      }

      return updateCart(state, item);
    },
  },
});
