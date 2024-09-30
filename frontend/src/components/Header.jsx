import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import Message from "./Message";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="flex flex-wrap justify-evenly items-center py-8">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          <Message variant={error}>Error</Message>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl text-center font-semibold text-gray-200 mb-6">
            Top Picks for You
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <h2 className="text-2xl font-semibold text-gray-200 text-center mt-6 mb-6 sm:mt-0">
          Browse Our Product Carousel
        </h2>
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
