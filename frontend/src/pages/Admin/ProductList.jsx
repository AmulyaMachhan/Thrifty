import { useState } from "react";
import {
  useCreateProductsMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdListBox, IoMdText, IoMdPricetag } from "react-icons/io";
import AdminMenu from "./AdminMenu";

function ProductList() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageURL, setImageURL] = useState(null);

  const navigate = useNavigate();
  const [createProduct] = useCreateProductsMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("name", name);
    productData.append("image", image);
    productData.append("brand", brand);
    productData.append("description", description);
    productData.append("category", category);
    productData.append("quantity", quantity);
    productData.append("price", price);
    productData.append("countInStock", stock);

    try {
      const { data } = await createProduct(productData);
      if (data.error) {
        toast.error(data.error);
        return;
      } else {
        toast.success(`${data.name} Created Successfully`);
        navigate("/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      setImageURL(res.image);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to Upload Image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-center text-xl font-bold tracking-wider py-3 bg-gradient-to-r from-blue-600 to-purple-600">
        CREATE PRODUCT
      </h2>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <AdminMenu />
          <div className="md:w-3/4 bg-gray-800 shadow-lg rounded-lg p-8 mx-auto md:mx-0">
            {imageURL && (
              <div className="text-center mb-6">
                <img
                  src={imageURL}
                  alt="product"
                  className="block mx-auto max-h-[200px] rounded-lg shadow-md border border-gray-600"
                />
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="image"
                className="block w-full text-center py-4 border-dashed border-2 border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200 ease-in"
              >
                {image ? (
                  <span className="text-gray-400">{image}</span>
                ) : (
                  <div className="flex justify-center items-center gap-3 text-gray-400 font-semibold">
                    <IoCloudUploadOutline size={24} />
                    <span>Upload Image</span>
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Product Name
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700">
                    <IoMdText className="ml-3 text-gray-400" size={20} />
                    <input
                      id="name"
                      type="text"
                      className="p-4 w-full border-none bg-gray-700 text-gray-200 rounded-lg focus:ring-blue-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Price
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700">
                    <IoMdPricetag className="ml-3 text-gray-400" size={20} />
                    <input
                      id="price"
                      type="number"
                      className="p-4 w-full border-none bg-gray-700 text-gray-200 rounded-lg focus:ring-blue-500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700">
                    <IoMdListBox className="ml-3 text-gray-400" size={20} />
                    <input
                      id="quantity"
                      type="number"
                      className="p-4 w-full border-none bg-gray-700 text-gray-200 rounded-lg focus:ring-blue-500"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Brand
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700">
                    <IoMdText className="ml-3 text-gray-400" size={20} />
                    <input
                      id="brand"
                      type="text"
                      className="p-4 w-full border-none bg-gray-700 text-gray-200 rounded-lg focus:ring-blue-500"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="p-4 w-full h-32 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label
                    htmlFor="stock"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Stock Count
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700">
                    <IoMdListBox className="ml-3 text-gray-400" size={20} />
                    <input
                      id="stock"
                      type="number"
                      className="p-4 w-full border-none bg-gray-700 text-gray-200 rounded-lg focus:ring-blue-500"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="p-4 w-full border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-blue-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories &&
                      categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
