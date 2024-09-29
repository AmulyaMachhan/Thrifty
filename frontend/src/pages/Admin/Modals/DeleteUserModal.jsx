import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

const DeleteUserModal = ({ user, isOpen, onClose, onDelete }) => {
  return isOpen
    ? createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-tr from-red-600 to-pink-600 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Delete User</h2>
              <button onClick={onClose} className="text-white">
                <FaTimes />
              </button>
            </div>
            <p className="text-white mb-4">
              Are you sure you want to delete user:{" "}
              <strong>{user.username}</strong>?
            </p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="mr-2 bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

DeleteUserModal.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteUserModal;
