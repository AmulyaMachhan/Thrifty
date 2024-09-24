const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            About Thrifty
          </h2>
          <p className="text-gray-500">
            Thrifty is your go-to store for the latest trends and fashion, all
            at affordable prices.
          </p>
        </div>

        {/* Customer Support Section */}
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            Customer Support
          </h2>
          <ul className="space-y-2">
            <li>
              <a href="/help" className="hover:text-white">
                Help & FAQs
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-white">
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-white">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com" className="hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-gray-700 text-gray-200 focus:outline-none rounded-md"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2024 Thrifty. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy" className="hover:text-white">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="hover:text-white">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
