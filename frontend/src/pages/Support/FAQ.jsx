import { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept PayPal, Stripe, and all major credit cards for secure payments.",
    },
    {
      question: "How can I track my order?",
      answer:
        "After placing an order, you can track it under 'Order History' in your profile.",
    },
    // Add more FAQs as needed
  ];

  return (
    <div className="text-white p-8">
      <h2 className="text-3xl font-bold mb-6">Help & FAQs</h2>
      {faqData.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full text-left focus:outline-none"
            onClick={() => toggleFAQ(index)}
          >
            <div className="py-4 px-6 bg-gray-800 hover:bg-gray-700 rounded-lg flex justify-between items-center">
              <span className="font-medium">{faq.question}</span>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
          >
            <p className="py-4 px-6 bg-gray-700 rounded-lg">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQ;
