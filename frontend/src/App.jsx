import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation.jsx";
import "react-toastify/dist/ReactToastify.css";
import Brand from "./components/Brand.jsx";

function App() {
  return (
    <>
      <ToastContainer />
      <Brand />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
