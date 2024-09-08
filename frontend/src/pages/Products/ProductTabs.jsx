import PropTypes from "prop-types";
import {
  useCreateReviewMutation,
  useGetTopProductsQuery,
} from "../../redux/api/productApiSlice";
import { useState } from "react";
import Ratings from "./Ratings";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import SmallProduct from "./SmallProduct";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { toast } from "react-toastify";

function ProductTabs({
  productId,
  refetch,
  userInfo,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTabs] = useState(1);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success(res.message);
      setActiveTabs(2);
    } catch (error) {
      toast.error(error.data.error || "Error while submitting the review");
    }
  };

  const handleTabClick = (tabNumber) => {
    setActiveTabs(tabNumber);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-6 py-14 rounded-xl shadow-2xl">
      {/* Left-side Tabs */}
      <section className="lg:w-1/4 space-y-4">
        {[
          { id: 1, label: "Write Your Review" },
          { id: 2, label: "All Reviews" },
          { id: 3, label: "Related Products" },
        ].map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center justify-between p-4 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
              activeTab === tab.id
                ? "bg-pink-600 text-white font-semibold shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className="text-lg">{tab.label}</span>
            {activeTab === tab.id ? (
              <FaArrowCircleRight className="text-xl" />
            ) : (
              <FaArrowCircleLeft className="text-xl" />
            )}
          </div>
        ))}
      </section>

      {/* Right-side Tab Content */}
      <section className="lg:w-3/4 bg-gray-800 p-6 rounded-lg shadow-xl">
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeTab === 1 ? "opacity-100 h-auto" : "opacity-0 h-0 hidden"
          }`}
        >
          {userInfo ? (
            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label
                  htmlFor="rating"
                  className="block text-xl font-semibold mb-2 text-gray-200"
                >
                  Rating
                </label>
                <select
                  id="rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="1">Inferior</option>
                  <option value="2">Decent</option>
                  <option value="3">Great</option>
                  <option value="4">Excellent</option>
                  <option value="5">Exceptional</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-xl font-semibold mb-2 text-gray-200"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loadingProductReview}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-bold transition-all duration-300 disabled:opacity-50"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <p className="text-gray-300 text-lg">
              Please{" "}
              <Link
                to="/login"
                className="text-pink-500 font-bold hover:underline"
              >
                sign in
              </Link>{" "}
              to write a review.
            </p>
          )}
        </div>

        <div
          className={`transition-all duration-500 ease-in-out ${
            activeTab === 2 ? "opacity-100 h-auto" : "opacity-0 h-0 hidden"
          }`}
        >
          {product?.reviews.length === 0 ? (
            <p className="text-gray-400 text-lg">No Reviews Yet</p>
          ) : (
            <div className="space-y-6">
              {product?.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-900 p-5 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-3">
                    <strong className="text-pink-500">@{review.name}</strong>
                    <p className="text-gray-400 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-300 mb-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`transition-all duration-500 ease-in-out ${
            activeTab === 3 ? "opacity-100 h-auto" : "opacity-0 h-0 hidden"
          }`}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

ProductTabs.propTypes = {
  productId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  setComment: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

export default ProductTabs;
