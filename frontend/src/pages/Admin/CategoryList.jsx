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

  return (
    <div className="flex justify-center">
      <div></div>
      {categories?.map((category) => (
        <div key={category._id} className="text-white">
          <button onClick={() => setModalVisible(true)}>
            {" "}
            {category.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
