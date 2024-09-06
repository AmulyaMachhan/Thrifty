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
    path: ["confirmPassword"], // This field will show the error
  });

function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdatedProfile }] =
    useProfileMutation();
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

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
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <div className="relative">
              <FaUser className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                id="username"
                type="text"
                placeholder="Enter name"
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("username")}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("password")}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                type="button"
                onClick={togglePasswordVisibility}
                aria-label="toggle password visibility"
              >
                {isPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                id="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("confirmPassword")}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                aria-label="toggle password visibility"
              >
                {isConfirmPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-black text-white font-semibold tracking-wide py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              UPDATE
            </button>
            <Link
              to="/user-orders"
              className="bg-white text-black font-semibold tracking-wide py-2 px-4 border border-[#000000] rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              ORDERS
            </Link>
          </div>
        </form>
        <div className="py-4">{loadingUpdatedProfile && <Loader />}</div>
      </div>
    </div>
  );
}

export default Profile;
