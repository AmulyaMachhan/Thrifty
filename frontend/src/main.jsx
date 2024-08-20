import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";

import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Home from "./pages/Home.jsx";

//Registered User imports
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/Users/Profile.jsx";

//Admin imports
import AdminRoutes from "./pages/Admin/AdminRoutes.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import Favourites from "./pages/Products/Favourites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Registered User Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="product/update/:id" element={<ProductUpdate />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
