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

  // Mutation to fetch filtered products
  const [fetchFilteredProducts, { data: filteredProductsData, isLoading }] =
    useGetFilteredProductsMutation();

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    // Fetch filtered products whenever checked categories, radio filters, or priceFilter changes
    fetchFilteredProducts({ checked, radio });
  }, [checked, radio, fetchFilteredProducts]);

  useEffect(() => {
    if (filteredProductsData) {
      // Filter products based on price filter
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

  return (
    <>
      <div className="container w-full mx-auto lg:pl-[4rem]">
        <div className="flex flex-wrap">
          <div className="bg-[#151515] p-3 mt-2 mb-2 w-full md:w-1/5">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Categories
            </h2>

            <div className="p-5 w-full">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={`checkbox-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-${c._id}`}
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Brands
            </h2>

            <div className="p-5">
              {uniqueBrands.map((brand) => (
                <div className="flex items-center mr-4 mb-5" key={brand}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`radio-${brand}`}
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Price
            </h2>

            <div className="p-5 w-full">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3 w-full md:w-4/5">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <Loader />
              ) : products.length === 0 ? (
                <div>No products found</div>
              ) : (
                products?.map((p) => <ProductCard key={p._id} p={p} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
