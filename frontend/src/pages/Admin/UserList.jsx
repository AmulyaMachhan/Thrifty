import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import EditUserModal from "./Modals/EditUserModal";
import DeleteUserModal from "./Modals/DeleteUserModal";
import { MdEdit } from "react-icons/md";

function UserList() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toggleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const toggleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const deleteHandler = async () => {
    try {
      await deleteUser(selectedUser._id);
      toast.success("User Deleted Successfully");
      refetch();
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <h2 className="text-center text-xl font-bold tracking-wider py-3 bg-gradient-to-r from-blue-600 to-purple-600">
        USER MANAGEMENT ({users?.length})
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex justify-center py-10">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="text-xs sm:text-md bg-gradient-to-r from-gray-500 to-gray-700 text-left text-gray-400 uppercase tracking-wider">
                  <th className="hidden md:block px-3 sm:px-6 py-4 sm:py-4 border-r border-r-gray-600">
                    ID
                  </th>
                  <th className="px-3 sm:px-6 py-4 sm:py-4 border-r border-r-gray-600">
                    NAME
                  </th>
                  <th className="px-3 sm:px-6 py-4 sm:py-4 border-r border-r-gray-600">
                    EMAIL
                  </th>
                  <th className="px-3 sm:px-6 py-4 sm:py-4 border-r border-r-gray-600">
                    ROLE
                  </th>
                  <th className="px-3 sm:px-6 py-4 sm:py-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="text-xs md:text-md bg-gray-700 border-b border-gray-600 hover:bg-gray-600 transition-colors"
                  >
                    <td className="hidden md:block px-6 py-3 border-r border-r-gray-600">
                      {user._id}
                    </td>
                    <td className="px-3 sm:px-6 py-2 border-r border-r-gray-600">
                      {user.username}
                    </td>
                    <td className="px-3 sm:px-6 py-2 border-r border-r-gray-600">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className="px-3 sm:px-6 py-2 border-r border-r-gray-600">
                      {user.isAdmin ? <span>Admin</span> : <span>User</span>}
                    </td>
                    <td className="px-3 sm:px-6 py-2 flex items-center gap-2">
                      <button
                        onClick={() => toggleEdit(user)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg flex items-center"
                      >
                        <MdEdit />
                      </button>
                      {!user.isAdmin && (
                        <button
                          onClick={() => toggleDelete(user)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg flex items-center"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedUser && (
        <>
          <EditUserModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            refetch={refetch}
          />
          <DeleteUserModal
            user={selectedUser}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={deleteHandler}
          />
        </>
      )}
    </div>
  );
}

export default UserList;
