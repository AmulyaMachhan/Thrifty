import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../../redux/features/shopSlice";
import Loader from "../../components/Loader";
import ProductCard from "../Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [fetchFilteredProducts, { data: filteredProductsData, isLoading }] =
    useGetFilteredProductsMutation();

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    fetchFilteredProducts({ checked, radio });
  }, [checked, radio, fetchFilteredProducts]);

  useEffect(() => {
    if (filteredProductsData) {
      const filteredProducts = filteredProductsData.filter((product) =>
        product.price.toString().includes(priceFilter)
      );
      dispatch(setProducts(filteredProducts));
    }
  }, [filteredProductsData, priceFilter, dispatch]);

  const handleBrandClick = (brand) => {
    if (filteredProductsData) {
      const productsByBrand = filteredProductsData.filter(
        (product) => product.brand === brand
      );
      dispatch(setProducts(productsByBrand));
    }
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = filteredProductsData
    ? Array.from(
        new Set(
          filteredProductsData
            .map((product) => product.brand)
            .filter((brand) => brand !== undefined)
        )
      )
    : [];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const loadMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold tracking-wide text-black bg-white py-4 my-4 shadow-md">
        PRODUCTS ({products?.length})
      </h2>
      <div className="flex flex-wrap px-5 py-4">
        <div className="mb-2 w-full md:w-1/4 px-2">
          <h2 className="text-lg font-semibold text-center py-2 bg-gray-200 text-gray-700 rounded-lg mb-4 shadow-md">
            Filter by Categories
          </h2>

          <div className="p-5 w-full bg-gray-800 rounded-lg">
            {categories?.map((c) => (
              <div key={c._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`checkbox-${c._id}`}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                />
                <label
                  htmlFor={`checkbox-${c._id}`}
                  className="ml-2 text-sm font-medium text-gray-300"
                >
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-center mt-4 py-2 bg-gray-200 text-gray-700 rounded-lg mb-4 shadow-md">
            Filter by Brands
          </h2>

          <div className="p-5 bg-gray-800 rounded-lg">
            {uniqueBrands.map((brand) => (
              <div className="flex items-center mb-5" key={brand}>
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor={`radio-${brand}`}
                  className="ml-2 text-sm font-medium text-gray-300"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-semibold mt-4 text-center py-2 bg-gray-200 text-gray-700 rounded-lg mb-4 shadow-md">
            Filter by Price
          </h2>

          <div className="p-5 w-full bg-gray-800 rounded-lg">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-pink-300"
            />
          </div>

          <div className="p-5 mt-4">
            <button
              className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition duration-200"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="px-2 w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <Loader />
            ) : products.length === 0 ? (
              <div className="text-center text-gray-400">No products found</div>
            ) : (
              products
                .slice(0, visibleCount)
                .map((p) => <ProductCard key={p._id} p={p} />)
            )}
          </div>
          {visibleCount < products.length && (
            <div className="text-center my-4">
              <button
                onClick={loadMoreProducts}
                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-lg hover:bg-pink-500 transition duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
