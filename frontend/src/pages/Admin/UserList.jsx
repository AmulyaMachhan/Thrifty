import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserDetailsMutation,
} from "../../redux/api/userApiSlice";
import { Table } from "flowbite-react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

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
      toast.success("User Updated Succesfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const deleteHandler = async (ID) => {
    if (window.confirm("Are you sure ?")) {
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
    <div className="p-4 flex flex-col justify-center overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">Users</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex justify-center w-full">
          <Table className="hoverable text-[1rem]">
            <Table.Head className="text-lg">
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>NAME</Table.HeadCell>
              <Table.HeadCell>EMAIL</Table.HeadCell>
              <Table.HeadCell>ADMIN</Table.HeadCell>
              <Table.HeadCell>ACTIONS</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user._id} className="bg-black-">
                  <Table.Cell>{user._id}</Table.Cell>
                  <Table.Cell>
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
                  </Table.Cell>
                  <Table.Cell>
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
                        <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
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
                  </Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </Table.Cell>
                  <Table.Cell>
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
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}

export default UserList;
