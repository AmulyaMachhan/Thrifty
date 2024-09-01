import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";

import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Shop from "./pages/Shop/Shop.jsx";

//Authentication Routes
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

//Registered User imports
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/Users/Profile.jsx";
import Shipping from "./pages/Order/Shipping.jsx";
import PlaceOrder from "./pages/Order/PlaceOrder.jsx";
import Order from "./pages/Order/Order.jsx";
import Orders from "./pages/Users/Orders.jsx";

//Admin imports
import AdminRoutes from "./pages/Admin/AdminRoutes.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import Favourites from "./pages/Favourites/Favourites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

import FAQ from "./pages/Support/FAQ.jsx";
import ReturnsAndExchanges from "./pages/Support/ReturnAndExchanges.jsx";
import ContactUs from "./pages/Support/ContactUs.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Customer Support Routes */}
      <Route path="/help" element={<FAQ />} />
      <Route path="/returns" element={<ReturnsAndExchanges />} />
      <Route path="/contact" element={<ContactUs />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Registered User Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/user-orders" element={<Orders />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="product/update/:id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
