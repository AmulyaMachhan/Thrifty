import PropTypes from "prop-types";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-8">
      {/* Step 1: Login */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step1 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
          } transition-colors duration-300`}
        >
          {step1 ? "✓" : "1"}
        </div>
        <span
          className={`mt-2 text-sm ${
            step1 ? "text-green-500 font-semibold" : "text-gray-500"
          }`}
        >
          Login
        </span>
      </div>

      {/* Line between Step 1 and Step 2 */}
      <div
        className={`h-1 w-16 ${
          step1 && step2 ? "bg-green-500" : "bg-gray-300"
        } transition-colors duration-300`}
      ></div>

      {/* Step 2: Shipping */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step2 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
          } transition-colors duration-300`}
        >
          {step2 ? "✓" : "2"}
        </div>
        <span
          className={`mt-2 text-sm ${
            step2 ? "text-green-500 font-semibold" : "text-gray-500"
          }`}
        >
          Shipping
        </span>
      </div>

      {/* Line between Step 2 and Step 3 */}
      <div
        className={`h-1 w-16 ${
          step1 && step2 && step3 ? "bg-green-500" : "bg-gray-300"
        } transition-colors duration-300`}
      ></div>

      {/* Step 3: Summary */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step3 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
          } transition-colors duration-300`}
        >
          {step3 ? "✓" : "3"}
        </div>
        <span
          className={`mt-2 text-sm ${
            step3 ? "text-green-500 font-semibold" : "text-gray-500"
          }`}
        >
          Summary
        </span>
      </div>
    </div>
  );
};

ProgressSteps.propTypes = {
  step1: PropTypes.bool,
  step2: PropTypes.bool,
  step3: PropTypes.bool,
};

export default ProgressSteps;
