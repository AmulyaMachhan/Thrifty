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
            <div className="mt-12 bg-black py-6">
              <div className="flex justify-center gap-5 items-center mb-4">
                <h1 className="text-4xl font-bold text-white tracking-wide">
                  Our Special Products
                </h1>
                <Link
                  to="/shop"
                  className="bg-pink-600 text-white font-semibold rounded-full py-2 px-5 hover:bg-pink-700 transition duration-200"
                >
                  Shop Now
                </Link>
                {/* Subheading */}
              </div>
              <div className="text-center text-gray-400">
                <p className="text-lg tracking-wide">
                  Discover our hand-picked collection of the best products, just
                  for you!
                </p>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mx-10">
              {data?.products?.map((product) => (
                <div key={product._id} className="p-4">
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
