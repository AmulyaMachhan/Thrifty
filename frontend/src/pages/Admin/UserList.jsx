import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserDetailsMutation,
} from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

function UserList() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserDetailsMutation();

  const [editableUserID, setEditableUserID] = useState("");
  const [editableUsername, setEditableUsername] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toggleEdit = (userID, username, email) => {
    setEditableUserID(userID);
    setEditableUsername(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (ID) => {
    try {
      await updateUser({
        userID: ID,
        username: editableUsername,
        email: editableUserEmail,
      });

      setEditableUserID(null);
      toast.success("User Updated Successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const deleteHandler = async (ID) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(ID);
        setEditableUserID(null);
        toast.success("User Deleted Successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <h2 className="text-center text-2xl font-bold tracking-wider py-4 bg-gradient-to-r from-blue-600 to-purple-600">
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
          <div className="w-full md:w-4/5 mx-auto p-4">
            <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-gray-700 to-gray-900 text-left text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">NAME</th>
                  <th className="px-6 py-4">EMAIL</th>
                  <th className="px-6 py-4">ADMIN</th>
                  <th className="px-6 py-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-gray-700 border-b border-gray-600 hover:bg-gray-600 transition-colors"
                  >
                    <td className="px-6 py-4">{user._id}</td>
                    <td className="px-6 py-4">
                      {editableUserID === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUsername}
                            onChange={(e) =>
                              setEditableUsername(e.target.value)
                            }
                            className="p-2 bg-gray-800 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                            className="ml-4 text-blue-500 hover:text-blue-300"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editableUserID === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="p-2 bg-gray-800 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <a
                            href={`mailto:${user.email}`}
                            className="text-blue-400 hover:text-blue-200"
                          >
                            {user.email}
                          </a>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.name, user.email)
                            }
                            className="ml-4 text-blue-500 hover:text-blue-300"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
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
    </div>
  );
}

export default UserList;
