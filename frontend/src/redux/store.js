import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import { getFavouritesFromLocalStorage } from "../utils/localStorage";
import authReducer from "./features/authSlice";
import favouritesReducer from "./features/favoritesSlice";
import cartReducer from "./features/cartSlice";
import shopReducer from "./features/shopSlice";

const initialFavourites = getFavouritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favourites: favouritesReducer,
    cart: cartReducer,
    shop: shopReducer,
  },

  preloadedState: {
    favourites: initialFavourites,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});

setupListeners(store.dispatch);

export default store;
