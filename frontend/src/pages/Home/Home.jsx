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
        {!keyword && <Header />}

        {isLoading ? (
          <div className="">
            <Loader />
          </div>
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError?.error}
          </Message>
        ) : (
          <>
            <div className="flex justify-center gap-9 items-center mt-12 bg-black py-4">
              <h1 className="text-4xl font-bold">Special Products</h1>
              <Link
                to="/shop"
                className="bg-pink-600 text-white font-bold rounded-full py-2 px-8"
              >
                Shop
              </Link>
            </div>

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
