import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h2 className="text-white text-lg font-bold mb-6">About Thrifty</h2>
            <p className="text-gray-400 leading-relaxed">
              Thrifty is your go-to store for the latest trends and fashion, all
              at affordable prices. We believe style shouldn`t break the bank.
            </p>
          </div>

          {/* Customer Support Section */}
          <div>
            <h2 className="text-white text-lg font-bold mb-6">
              Customer Support
            </h2>
            <ul className="space-y-3">
              {[
                { to: "/help", text: "Help & FAQs" },
                { to: "/shipping", text: "Shipping & Delivery" },
                { to: "/returns", text: "Returns & Exchanges" },
                { to: "/contact", text: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section */}
          <div>
            <h2 className="text-white text-lg font-bold mb-6">Follow Us</h2>
            <div className="flex space-x-5">
              {[
                { href: "https://facebook.com", icon: FaFacebookF },
                { href: "https://instagram.com", icon: FaInstagram },
                { href: "https://twitter.com", icon: FaTwitter },
                { href: "https://youtube.com", icon: FaYoutube },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h2 className="text-white text-lg font-bold mb-6">
              Subscribe to Our Newsletter
            </h2>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800">
          {/* Copyright Section */}
          <div className="py-8 text-center">
            <p className="font-semibold text-gray-400 mb-2 tracking-wide">
              © 2024 Thrifty. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
