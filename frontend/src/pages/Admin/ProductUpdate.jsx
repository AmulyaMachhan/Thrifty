import { useNavigate, useParams } from "react-router";
import AdminMenu from "./AdminMenu";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductsMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";

function ProductUpdate() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(params.id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProducts] = useUpdateProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || "");
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("countInStock", stock);

    try {
      const data = await updateProducts({
        formData,
        productId: params.id,
      }).unwrap();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} Updated Successfully`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { message } = await deleteProduct(params.id).unwrap();
        if (message) {
          toast.success(message || "Product Deleted Successfully");
          navigate("/admin/allproductslist");
        } else {
          toast.error("Delete failed. Try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error while Deleting Product");
      }
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to Upload Image");
    }
  };

  return (
    <>
      <div className="container w-100 mx-auto sm:mx-[0]">
        <div className="flex flex-col justify-center md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-3">
            <div className="h-12">Update / Delete Product</div>

            {image && (
              <div className="text-center">
                <img
                  src={image}
                  alt="product"
                  className="block mx-auto w-full h-[40%]"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-white"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium"
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium"
                  >
                    Brand
                  </label>
                  <input
                    id="brand"
                    type="text"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="p-4 w-full h-32 border rounded-lg bg-[#101011] text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="stock"
                    className="block mb-2 text-sm font-medium"
                  >
                    Count In Stock
                  </label>
                  <input
                    id="stock"
                    type="text"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value={category}>Choose Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductUpdate;
