import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Layout/Navigation.jsx";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./pages/Layout/Footer.jsx";
import BottomNav from "./pages/Layout/BottomNav.jsx";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="pt-[4.5rem] min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
      <Footer />
    </>
  );
}

export default App;
