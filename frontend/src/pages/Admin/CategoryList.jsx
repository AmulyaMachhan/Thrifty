import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories, refetch, isLoading } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      toast.success(`${result.name} is created.`);
      setName("");
      refetch();
    } catch (error) {
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryID: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();
      toast.success(`${result.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(selectedCategory._id).unwrap();
      toast.success(`Category deleted successfully`);
      setSelectedCategory(null);
      setModalVisible(false);
      refetch();
    } catch (error) {
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen text-white">
      <AdminMenu />
      <h2 className="text-center text-2xl font-bold tracking-wider py-4 bg-gradient-to-r from-purple-600 to-pink-600 shadow-md">
        CATEGORY MANAGEMENT ({categories?.length || 0})
      </h2>
      <div className="max-w-2xl mx-auto p-5 bg-gradient-to-r from-[#303031] to-[#59595a] rounded-lg shadow-lg mt-6">
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
          placeholder="Enter new category name"
          buttonText="Create Category"
        />
        <hr className="my-6 border-gray-600" />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories?.map((category) => (
              <div
                key={category._id}
                className="flex items-center justify-center"
              >
                <button
                  className="w-full bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200 ease-in-out focus:ring-4 focus:ring-pink-300 focus:outline-none"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="p-5 bg-white rounded-lg shadow-xl text-gray-900">
            <h3 className="text-lg font-semibold mb-3">Update Category</h3>
            <CategoryForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateCategory}
              buttonText="Update Category"
              handleDelete={handleDeleteCategory}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
