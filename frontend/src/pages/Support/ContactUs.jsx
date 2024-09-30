import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., API call)
    setSubmitted(true);
  };

  return (
    <div className="text-white p-8">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      {submitted ? (
        <div className="text-center">
          <h3 className="text-xl mb-4">Thank you for contacting us!</h3>
          <p>We will get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2  text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2  text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </form>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Other Ways to Contact Us</h3>
        <p>
          Email:{" "}
          <a href="mailto:support@thrifty.com" className="text-blue-500">
            support@thrifty.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+123456789" className="text-blue-500">
            +1 (234) 567-89
          </a>
        </p>
        <p>Address: 123 Thrifty St, E-commerce City, EC 45678</p>
      </div>
    </div>
  );
};

export default ContactUs;
