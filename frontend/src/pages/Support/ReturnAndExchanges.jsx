import { useState } from "react";

const ReturnsAndExchanges = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const returnsData = [
    {
      title: "What is your return policy?",
      content:
        "We accept returns within 30 days of purchase. Items must be in their original condition and packaging. Some products may be subject to a restocking fee.",
    },
    {
      title: "How do I initiate a return?",
      content:
        "To initiate a return, log in to your account, navigate to 'Order History,' and select the item you wish to return. Follow the return instructions provided.",
    },
    {
      title: "Can I exchange an item?",
      content:
        "Yes, you can exchange items within 30 days of purchase. To exchange, please follow the return process and place a new order for the desired item.",
    },
    {
      title: "Are there any non-returnable items?",
      content:
        "Certain items, such as gift cards, downloadable software, and personal care items, are non-returnable. Please check the product description for return eligibility.",
    },
    // Add more sections as needed
  ];

  return (
    <div className="text-white p-8">
      <h2 className="text-3xl font-bold mb-6">Returns & Exchanges</h2>
      {returnsData.map((section, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full text-left focus:outline-none"
            onClick={() => toggleSection(index)}
          >
            <div className="py-4 px-6 bg-gray-800 hover:bg-gray-700 rounded-lg flex justify-between items-center">
              <span className="font-medium">{section.title}</span>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
          >
            <p className="py-4 px-6 bg-gray-700 rounded-lg">
              {section.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReturnsAndExchanges;
