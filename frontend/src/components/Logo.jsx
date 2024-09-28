import { Link } from "react-router-dom";

const Logo = () => (
  <div>
    <Link to="/">
      <span className="text-white text-2xl md:text-4xl font-abril font-semibold">
        thrifty!
      </span>
    </Link>
  </div>
);

export default Logo;
