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
    <div className="">
      {/* Sidebar and Main content layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="max-w-28 xs:max-w-48 sm:max-w-xs bg-black p-2 sm:p-4">
          {/* Categories Filter */}
          <h2 className="text-sm sm:text-lg font-semibold text-center py-2 mt-2">
            Filter by Categories
          </h2>
          <div className="px-1 sm:px-2 py-4 w-full  ">
            {categories?.map((c) => (
              <div key={c._id} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id={`checkbox-${c._id}`}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4 text-pink-500 rounded bg-gray-100 border-gray-300 focus:ring-pink-600 focus:outline-none transition-all duration-200 "
                />

                <label
                  htmlFor={`checkbox-${c._id}`}
                  className="ml-2 text-xs sm:text-sm font-normal"
                >
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          {/* Brands Filter */}
          <h2 className="sm:text-lg font-semibold text-center py-2">
            Filter by Brands
          </h2>
          <div className="px-1 sm:px-2 py-4 rounded-lg">
            {uniqueBrands.map((brand) => (
              <div className="flex items-center mb-3" key={brand}>
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-3 h-3 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500"
                />
                <label
                  htmlFor={`radio-${brand}`}
                  className="ml-2 text-xs sm:text-sm font-normal"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>

          {/* Price Filter */}
          <h2 className="text-lg font-semibold text-center py-2">
            Filter by Price
          </h2>
          <div className="py-4">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full placeholder-gray-400"
            />
          </div>

          {/* Reset Button */}
          <div className="py-4">
            <button
              className="w-full py-2 bg-pink-600 hover:bg-pink-500 transition duration-200"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <h2 className="text-center text-2xl font-bold tracking-wide text-black bg-white py-4 my-4 shadow-md">
            PRODUCTS ({products?.length})
          </h2>
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 justify-items-center">
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

          {/* Load More Button */}
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
    </div>
  );
};

export default Shop;
