import { useEffect, useState } from "react";
import CategoryForm from "../../components/CategoryForm";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";

function CategoryList() {
  const { data: categories, refetch } = useFetchCategoriesQuery();

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category Name Required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();

      if (!result) {
        toast.error(result.message);
        return;
      } else {
        toast.success(result.message || "Category Created Successfully");
        setName("");
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Name feild required");
      return;
    }

    try {
      const updatedCategory = await updateCategory({
        categoryID: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();

      if (!updatedCategory) {
        toast.error("Updating category error");
        return;
      } else {
        toast.success("Category Updated Successully");
        setUpdatingName("");
        setSelectedCategory(null);
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      toast.error("Error while Updating the category List");
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <CategoryForm
          value={name}
          setValue={(value) => setName(value)}
          handleSubmit={handleCreateCategory}
        />
      </div>
      {categories?.map((category) => (
        <div key={category._id} className="text-white">
          <button onClick={() => setModalVisible(true)}>
            {" "}
            {category.name}
          </button>
        </div>
      ))}

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <CategoryForm />
      </Modal>
    </div>
  );
}

export default CategoryList;
