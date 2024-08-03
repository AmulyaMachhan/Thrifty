import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";

function CategoryList() {
  const { data: categories } = useFetchCategoriesQuery();

  return (
    <div className="flex justify-center">
      {categories?.map((category) => (
        <div key={category._id} className="text-white">
          {category.name}
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
