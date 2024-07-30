import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserDetailsMutation,
} from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* Admin Menu */}
          <table className="w-full md:w-4/5 mx-auto">
            <tHead>
              <tr>
                <td className="px-4 py-2 text-left">ID</td>
                <td className="px-4 py-2 text-left">NAME</td>
                <td className="px-4 py-2 text-left">EMAIL</td>
                <td className="px-4 py-2 text-left">ADMIN</td>
                <td className="px-4 py-2 text-left"></td>
              </tr>
            </tHead>

            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2">{user._id}</td>

                <td className="px-4 py-2">
                  {editableUserID === user._id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editableUsername}
                        onChange={(e) => setEditableUsername(e.target.value)}
                        className="w-full p-2 border-rounded-lg"
                      />
                      <button
                        onClick={() => updateHandler(user._id)}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg "
                      >
                        <FaCheck />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {user.username}
                      {"   "}
                      <button
                        onClick={() =>
                          toggleEdit(user._id, user.username, user.email)
                        }
                      >
                        <FaEdit className="ml[1rem]" />
                      </button>
                    </div>
                  )}
                </td>

                <td className="px-4 py-2">
                  {editableUserID === user._id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editableUserEmail}
                        onChange={(e) => setEditableUserEmail(e.target.value)}
                        className="w-full p-2 border-rounded-lg"
                      />
                      <button
                        onClick={() => updateHandler(user._id)}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg "
                      >
                        <FaCheck />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <a href={`mailto:${user.email}`}>{user.email}</a> {"   "}
                      <button
                        onClick={() =>
                          toggleEdit(user._id, user.username, user.email)
                        }
                      >
                        <FaEdit className="ml[1rem]" />
                      </button>
                    </div>
                  )}
                </td>

                <td className="px-4 py-2">
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>

                <td className="px-4 py-2">
                  {!user.isAdmin && (
                    <div className="flex">
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-red-600 hover-bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
