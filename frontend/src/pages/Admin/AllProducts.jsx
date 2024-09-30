import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import { FaPlus } from "react-icons/fa";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400 text-xl">
        Error loading products
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-100">
                All Products ({products.length})
              </h2>
              <Link
                to="/admin/productlist"
                className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg tracking-wide font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
              >
                <FaPlus />
                Create New Product
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="group bg-[#0f0f17] rounded-xl overflow-hidden hover:shadow-lg transition duration-300 ease-in-out outline outline-[#1a1a28] hover:outline-2 hover:outline-[#27273b]"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-100 truncate">
                        {product?.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {moment(product.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {product?.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">
                        ${product?.price.toFixed(2)}
                      </span>
                      <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-pink-500/50">
                        Update
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
