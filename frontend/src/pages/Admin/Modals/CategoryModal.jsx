import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-90  flex justify-center items-center z-50">
        <div className="rounded-lg shadow-xl p-6 w-full max-w-md transition-transform transform-gpu">
          <button
            className="absolute top-3 right-0 text-white text-2xl hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default Modal;
