import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/authSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../Icons";

const profileSchema = z
  .object({
    username: z.string().min(2, "Name should have at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password should have at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password should have at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdatedProfile }] =
    useProfileMutation();
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    setValue("email", userInfo.email);
    setValue("username", userInfo.username);
  }, [userInfo, setValue]);

  const submitHandler = async (data) => {
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username: data.username,
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Update Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Keep your information up to date
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md leading-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md leading-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  {...register("password")}
                  className="block w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md leading-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                >
                  {isPasswordVisible ? (
                    <EyeSlashFilledIcon className="h-5 w-5" />
                  ) : (
                    <EyeFilledIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="confirmPassword"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="block w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md leading-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                >
                  {isConfirmPasswordVisible ? (
                    <EyeSlashFilledIcon className="h-5 w-5" />
                  ) : (
                    <EyeFilledIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
              >
                Update Profile
              </button>
              <Link
                to="/user-orders"
                className="px-6 py-2 border border-gray-600 rounded-md font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
              >
                View Orders
              </Link>
            </div>
          </form>
        </div>

        {loadingUpdatedProfile && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
