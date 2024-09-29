import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useUpdateUserDetailsMutation } from "../../../redux/api/userApiSlice";
import { toast } from "react-toastify";

const schema = z.object({
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Enter a valid email"),
});

const EditUserModal = ({ user, isOpen, onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ username: user.username, email: user.email });
    }
  }, [isOpen, user, reset]);

  const [updateUser] = useUpdateUserDetailsMutation();

  const onSubmit = async (data) => {
    try {
      await updateUser({
        userID: user,
        ...data,
      });

      toast.success("User Updated Successfully");
      refetch();
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-tr from-pink-500 to-yellow-500 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Edit User</h2>
          <button onClick={onClose} className="text-white">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              {...register("username")}
              className="w-full p-2 border rounded-lg"
            />
            {errors.username && (
              <p className="text-red-900 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              {...register("email")}
              className="w-full p-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-900 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

EditUserModal.propTypes = {
  user: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default EditUserModal;
