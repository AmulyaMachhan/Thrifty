import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import EditUserModal from "./Modals/EditUserModal";

function UserList() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [selectedUser, setSelectedUser] = useState(null); // To store the selected user for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toggleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open the modal
  };

  const deleteHandler = async (ID) => {
    if (window.confirm("Are you sure ?")) {
      try {
        await deleteUser(ID);
        toast.success("User Deleted Successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <h2 className="text-center text-2xl font-bold tracking-wider py-3 bg-gradient-to-r from-blue-600 to-purple-600">
        USER MANAGEMENT ({users?.length})
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row py-6">
          <AdminMenu />
          <div className="mx-auto">
            <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-gray-700 to-gray-900 text-left text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">NAME</th>
                  <th className="px-6 py-4">EMAIL</th>
                  <th className="px-6 py-4">ROLE</th>
                  <th className="px-6 py-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-gray-700 border-b border-gray-600 hover:bg-gray-600 transition-colors"
                  >
                    <td className="px-6 py-3">{user._id}</td>
                    <td className="px-6 py-2">{user.username}</td>
                    <td className="px-6 py-2">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className="px-6 py-3">
                      {user.isAdmin ? <span>Admin</span> : <span>User</span>}
                    </td>
                    <td className="px-6 py-3 flex justify-center items-center">
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center"
                        >
                          <FaTrash />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          toggleEdit(user._id, user.name, user.email)
                        }
                        className="ml-4 text-blue-500 hover:text-blue-300"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default UserList;
