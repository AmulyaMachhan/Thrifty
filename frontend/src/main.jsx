import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}></Route>)
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
