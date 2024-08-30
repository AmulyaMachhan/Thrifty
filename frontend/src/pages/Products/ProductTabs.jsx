import PropTypes from "prop-types";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import { useState } from "react";
import Ratings from "./Ratings";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import SmallProduct from "./SmallProduct";
import { FaArrowCircleRight } from "react-icons/fa";

function ProductTabs({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTabs] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTabs(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
        <div
          className={`flex flex-1 items-center justify-between p-4 cursor-pointer text-lg border border-gray-400 rounded-md mb-2 ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          <span className="mr-4">Write Your Review</span>
          <FaArrowCircleRight />
        </div>
        <div
          className={`flex flex-1 items-center justify-between p-4 cursor-pointer text-lg border border-gray-400 rounded-md mb-2 ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          <span className="mr-4">All Reviews</span>
          <FaArrowCircleRight />
        </div>
        <div
          className={`flex flex-1 items-center justify-between p-4 cursor-pointer text-lg border border-gray-400 rounded-md mb-2 ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          <span className="mr-4">Related Products</span>
          <FaArrowCircleRight />
        </div>
      </section>

      {/* Second Part */}
      <section className="flex-1">
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            activeTab === 1 ? "opacity-100" : "opacity-0 h-0"
          }`}
        >
          {activeTab === 1 && (
            <div className="mt-4 transition-transform duration-300 ease-in-out transform">
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className="my-2">
                    <label htmlFor="rating" className="block text-xl mb-2">
                      Rating
                    </label>

                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="p-2 border rounded-lg xl:w-[40rem] text-black"
                    >
                      <option value="">Select</option>
                      <option value="1">Inferior</option>
                      <option value="2">Decent</option>
                      <option value="3">Great</option>
                      <option value="4">Excellent</option>
                      <option value="5">Exceptional</option>
                    </select>
                  </div>

                  <div className="my-2">
                    <label htmlFor="comment" className="block text-xl mb-2">
                      Comment
                    </label>

                    <textarea
                      id="comment"
                      rows="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="p-2 border rounded-lg xl:w-[40rem] text-black"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loadingProductReview}
                    className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <p>
                  Please <Link to="/login">sign in</Link> to write a review
                </p>
              )}
            </div>
          )}
        </div>

        <div
          className={`transition-opacity duration-300 ease-in-out ${
            activeTab === 2 ? "opacity-100" : "opacity-0 h-0"
          }`}
        >
          {activeTab === 2 && (
            <>
              <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>

              <div>
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-[#1A1A1A] p-4 rounded-lg sm:ml-[0rem] xl:w-[55rem] sm:w-[24rem] mb-5"
                  >
                    <div className="flex justify-between">
                      <strong className="text-[#B0B0B0]">{review.name}</strong>
                      <p className="text-[#B0B0B0]">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>

                    <p className="my-4">{review.comment}</p>
                    <Ratings value={review.rating} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div
          className={`transition-opacity duration-300 ease-in-out ${
            activeTab === 3 ? "opacity-100" : "opacity-0 h-0"
          }`}
        >
          {activeTab === 3 && (
            <section className="flex flex-wrap xl:w-[55rem]">
              {isLoading ? (
                <Loader />
              ) : (
                data.map((product) => (
                  <div key={product._id}>
                    <SmallProduct product={product} />
                  </div>
                ))
              )}
            </section>
          )}
        </div>
      </section>
    </div>
  );
}

ProductTabs.propTypes = {
  loadingProductReview: PropTypes.bool,
  userInfo: PropTypes.object,
  submitHandler: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  setComment: PropTypes.func.isRequired,
  product: PropTypes.object,
};

export default ProductTabs;
