import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    addToFavourites: (state, action) => {
      //To check if the item is already in the favouries
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },

    removeFromFavourites: (state, action) => {
      //To remove from favourites using product ID
      return state.filter((product) => product._id !== action.payload._id);
    },

    setFavourites: (state, action) => {
      //Set the favourites from local storage
      return action.payload;
    },
  },
});

export const { addToFavourites, removeFromFavourites, setFavourites } =
  favouriteSlice.actions;

export const selectFavouriteProduct = (state) => state.favourites;

export default favouriteSlice.reducer;
