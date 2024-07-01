import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import ProductTabs from "./ProductTabs";
import {
  useCreateReviewMutation,
  useGetProductByIdQuery,
} from "../../redux/api/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cartSlice";
import HeartIcon from "../Favourites/HeartIcon";

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
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message || "Error while submitting the review");
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added To Cart");
    navigate("/cart");
  };

  return (
    <>
      <Link
        to="/"
        className="text-white font-semibold hover:underline ml-[10rem]"
      >
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-wrap justify-center w-full gap-4 relative mt-[2rem]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full xl:w-[35rem] lg:w-[40rem] md:w-[35rem] sm:w-[15rem]"
          />
          <HeartIcon product={product} />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className=" xl:w-[30rem] lg:w-[25rem] md:w-[20rem] text-[#B0B0B0]">
              {product.description}
            </p>
            <p className="text-3xl font-extrabold">$ {product.price}</p>
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

      <section className="w-full xl:pl-[5rem] lg:pl-[4rem] md:pl-[3rem]">
        <div className="mt-[5rem]">
          <ProductTabs
            loadingProductReview={loadingProductReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            product={product}
          />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
