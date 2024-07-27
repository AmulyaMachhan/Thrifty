import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation.jsx";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
    </>
  );
}

export default App;
