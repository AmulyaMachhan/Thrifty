import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}/`,
        method: "POST",
        body: newCategory,
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ categoryID, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryID}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (categoryID) => ({
        url: `${CATEGORY_URL}/${categoryID}`,
        method: "DELETE",
      }),
    }),

    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} = categoryApiSlice;
