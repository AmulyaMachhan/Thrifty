import { useGetNewProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Loader from "../../components/Loader";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetNewProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 max-w-xs sm:max-w-md">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings}>
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-2">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[10rem] sm:h-[20rem]"
                />

                <div className="mt-2 flex flex-col gap-2">
                  <h2 className="text-sm font-semibold">{name}</h2>
                  <p className="text-md font-bold">${price}</p>
                  <p className="text-sm truncate">{description}</p>

                  <div className="flex justify-between text-xs">
                    <div className="flex flex-col">
                      <h1 className="flex items-center">
                        <FaStore className="mr-1 text-gray-600" /> {brand}
                      </h1>
                      <h1 className="flex items-center">
                        <FaClock className="mr-1 text-gray-600" />{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center">
                        <FaStar className="mr-1 text-gray-600" /> Reviews:{" "}
                        {numReviews}
                      </h1>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="flex items-center">
                        <FaStar className="mr-1 text-gray-600" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center">
                        <FaShoppingCart className="mr-1 text-gray-600" />{" "}
                        Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center">
                        <FaBox className="mr-1 text-gray-600" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
