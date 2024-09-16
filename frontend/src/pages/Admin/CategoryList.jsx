import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import AdminMenu from "./AdminMenu";
import CategoryForm from "../../components/CategoryForm";
import CategoryModal from "./Modals/CategoryModal";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";

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
        updatedCategory: { name: updatingName },
      }).unwrap();
      toast.success(`${result.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Updating category failed, try again.");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-violet-900 text-white">
      <AdminMenu />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-center text-4xl font-bold mb-8 text-white">
          Category Management
        </h2>
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-center text-2xl font-semibold mb-4 text-pink-300">
              Create New Category
            </h3>
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateCategory}
              placeholder="Enter new category name"
              buttonText="Create Category"
              className="flex items-center space-x-4"
            >
              <PlusCircle className="w-6 h-6" />
            </CategoryForm>
          </div>

          <div className="mb-8">
            <h3 className="text-center text-2xl font-semibold mb-4 text-pink-300">
              Categories ({categories?.length || 0})
            </h3>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories?.map((category) => (
                  <div
                    key={category._id}
                    className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-lg font-medium">
                        {category.name}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                          onClick={() => {
                            setModalVisible(true);
                            setSelectedCategory(category);
                            setUpdatingName(category.name);
                          }}
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-white">
          <h3 className=" text-center text-2xl font-semibold mb-4">
            Update Category
          </h3>
          <CategoryForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
            className="space-y-4"
          />
          <button
            onClick={handleDeleteCategory}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete Category</span>
          </button>
        </div>
      </CategoryModal>
    </div>
  );
};

export default CategoryList;
