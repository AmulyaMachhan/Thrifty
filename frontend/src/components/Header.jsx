import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="">
      <div className="py-2 px-2 md:py-4 bg-white">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-black tracking-wide mb-1">
          Featured Products
        </h1>
        <p className="text-xs md:text-lg text-center text-gray-700 font-semibold tracking-wide">
          Discover our top picks for this season, handpicked just for you!
        </p>
      </div>
      <div className="flex flex-wrap justify-evenly items-center py-8">
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
        <div>
          <h2 className="text-2xl font-semibold text-gray-200 text-center mt-6 mb-6 sm:mt-0">
            Browse Our Product Carousel
          </h2>
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;
