import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import Ratings from "./Ratings";
import HeartIcon from "../Favourites/HeartIcon";
import { useState } from "react";

const Product = ({ product }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="max-w-[20rem] my-6">
      <Card className="w-full bg-gradient-to-r from-[#000000] to-[#434343]  shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
        <CardHeader className="w-full p-0 relative">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-[15rem] rounded-t-lg object-cover"
            width="100%"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute top-4 right-4 z-10">
            <HeartIcon product={product} />
          </div>
        </CardHeader>

        <CardBody className="py-4 px-3">
          <h5 className="text-lg font-bold tracking-wide leading-tight mb-2">
            {product.name}
          </h5>
          <Ratings value={product.rating} className="mb-4" />
          <p className="text-sm text-gray-300 leading-relaxed">
            {product.description?.substring(0, 25)}...
          </p>
        </CardBody>

        <CardFooter className="flex items-center justify-between px-3 pb-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold">${product.price}</span>
            <span className="text-xs text-gray-400">Free Shipping</span>
          </div>

          <Link to={`/product/${product._id}`}>
            <Button
              size="sm"
              color="gradient"
              className="bg-black text-sm font-semibold rounded-lg py-2"
            >
              View Product
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string, // Optional: Description can be included
  }).isRequired,
};

export default Product;
