import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import ProductTabs from "./ProductTabs";
import { useGetProductByIdQuery } from "../../redux/api/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cartSlice";
import HeartIcon from "../Favourites/HeartIcon";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added To Cart");
    navigate("/cart");
  };

  return (
    <>
      <Link
        to="/"
        className="flex items-center justify-center py-4 px-2 gap-2 bg-white text-black text-xl font-bold tracking-wide hover:bg-gray-200 hover:text-gray-700"
      >
        <FaArrowLeft />
        BACK
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-wrap justify-center items-start lg:items-center w-full gap-8 py-12 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg shadow-lg">
          {/* Product Image Section */}
          <div className="relative w-4/5 lg:w-2/5">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
            <HeartIcon product={product} className="absolute top-4 right-4" />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-4 w-4/5 lg:w-1/2">
            <h2 className="text-3xl font-bold tracking-wide">{product.name}</h2>
            <p className="text-md text-gray-400 leading-relaxed">
              {product.description}
            </p>
            <p className="text-2xl font-extrabold text-yellow-200">
              $ {product.price}
            </p>

            {/* Product Information and Actions */}
            <ProductInfo product={product} rating={rating} />
            <ProductActions
              product={product}
              qty={qty}
              setQty={setQty}
              addToCartHandler={addToCartHandler}
            />
          </div>
        </div>
      )}

      {/* Product Tabs Section */}
      <section className="py-3 bg-gradient-to-r from-gray-800 to-black text-white">
        <div className="flex flex-col items-center">
          <h1 className="text-center py-4 font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300">
            CUSTOMER REVIEWS
          </h1>
          <p className="max-w-3xl text-center text-lg text-gray-400 mt-2 mb-8 ">
            Hear from our customers! Share your experience or check out what
            others are saying about this product.
          </p>
        </div>

        <ProductTabs
          productId={productId}
          refetch={refetch}
          userInfo={userInfo}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          product={product}
        />
      </section>
    </>
  );
};

export default ProductDetails;
