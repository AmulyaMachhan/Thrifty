import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import CategoryForm from "../../components/CategoryForm";
import CategoryModal from "./Modals/CategoryModal";
import { PlusCircle, Edit2 } from "lucide-react";

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
    <div className="min-h-screen">
      <h2 className="w-full text-center text-xl font-bold tracking-wider bg-black py-4 my-4">
        CATEGORY MANAGEMENT
      </h2>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto mb-12">
          <h2 className="text-center text-3xl font-bold mb-1 text-white">
            Create a new category
          </h2>
          <h5 className="text-center text-gray-300 mb-5">
            Increasing the amount of products everyday!
          </h5>
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
            placeholder="Enter new category name"
            buttonText="Create Category"
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <PlusCircle className="w-5 h-5" />
          </CategoryForm>
        </div>

        <hr className="divider border-1.5 border-gray-300 rounded-full"></hr>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-100 flex items-center justify-center gap-2 tracking-widest">
            TOTAL CATEGORIES{" "}
            <span className="text-pink-500">({categories?.length || 0})</span>
          </h2>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
              {categories?.map((category) => (
                <div
                  key={category._id}
                  className="bg-gradient-to-br from-gray-700 to-black rounded-xl overflow-hidden"
                >
                  <div className="p-3 flex justify-between items-center">
                    <span className="text-sm font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors">
                      {category.name.toUpperCase()}
                    </span>
                    <button
                      onClick={() => {
                        setModalVisible(true);
                        setSelectedCategory(category);
                        setUpdatingName(category.name);
                      }}
                      className="p-2 rounded-full bg-black hover:bg-black transition-colors duration-200 text-white hover:text-gray-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CategoryModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <div className="p-8 bg-gray-900 rounded-xl shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-100 tracking-wide">
            UPDATE CATEGORY
          </h3>
          <CategoryForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateCategory}
            buttonText="Update Category"
            className="space-y-4"
          />
          <button
            onClick={handleDeleteCategory}
            className="mt-4 w-full bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-200 font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500/60"
          >
            <span>Delete Category</span>
          </button>
        </div>
      </CategoryModal>
    </div>
  );
};

export default CategoryList;
