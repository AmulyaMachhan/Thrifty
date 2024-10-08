import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Header from "../../components/Header";
import Product from "../Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="flex justify-center">
      <div
        className={`${isLoading ? "h-[100vh] w-full flex flex-col items-center justify-around" : ""}`}
      >
        {/* Hero Section */}
        {!keyword && <Header />}

        {/* Product Section */}
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError?.error}
          </Message>
        ) : (
          <>
            {/* Main Heading */}
            <div className="py-3 sm:mt-12 sm:py-6 bg-black">
              <div className="mb-2 sm:mb-4 flex justify-center gap-5 items-center">
                <h1 className="text-2xl sm:text-4xl font-bold text-white sm:tracking-wide">
                  Our Special Products
                </h1>
                <Link
                  to="/shop"
                  className="px-3 py-1 text-xs sm:text-md sm:px-5 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition duration-200"
                >
                  Shop Now
                </Link>
                {/* Subheading */}
              </div>
              <div className="text-center text-gray-400">
                <p className="text-xs sm:text-lg tracking-wide">
                  Discover our hand-picked collection of the best products, just
                  for you!
                </p>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-items-center sm:mx-10">
              {data?.products?.map((product) => (
                <div key={product._id} className="sm:p-4">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
