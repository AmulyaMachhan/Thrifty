import PropTypes from "prop-types";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            id="category"
            className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400 text-gray-800 transition duration-200 ease-in-out"
            placeholder="Enter category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="flex-grow bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 shadow-lg transition-all duration-200"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex-grow bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg transition-all duration-200"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// PropTypes validation
CategoryForm.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  handleDelete: PropTypes.func,
};

export default CategoryForm;
