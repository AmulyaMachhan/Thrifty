import PropTypes from "prop-types";
import { createPortal } from "react-dom";

export const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-95  z-50 flex justify-center items-center p-4">
      <div className="w-[70%] overflow-auto g-gradient-to-r from-gray-900 via-gray-800 to-black h-screen rounded-lg p-4">
        <img
          src={imageSrc}
          alt="Full size product"
          className="h-full w-full object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
};
