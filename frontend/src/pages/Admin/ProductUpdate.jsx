import { useNavigate, useParams } from "react-router";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductsMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { ImageModal } from "./Modals/ImageModal";
import Loader from "../../components/Loader";

function ProductUpdate() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(params.id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [uploadProductImage, { isLoading: isImageUploading }] =
    useUploadProductImageMutation();
  const [updateProducts, { isLoading: isUpdating }] =
    useUpdateProductsMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

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
      const res = await uploadProductImage({
        formData,
        productId: params.id,
      }).unwrap();
      setImage(res.image.secure_url);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to Upload Image");
    }
  };

  return (
    <div className="min-h-screen text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 md:w-3/4 p-4">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Update / Delete Product
            </h2>

            <div className="bg-[#272727] rounded-xl p-6 shadow-lg mb-6 border border-gray-800">
              {image && (
                <div
                  className="mb-6 overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <img
                    src={image}
                    alt="product"
                    className="w-full h-64 object-cover rounded-lg transition-all duration-300 ease-in-out hover:opacity-80"
                  />
                </div>
              )}

              <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageSrc={image}
              />

              <div className="mb-6">
                <label className="flex justify-center gap-5 w-full p-4 text-center rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out">
                  {isImageUploading && <Loader />}
                  {image ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full p-3 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Price
                    </label>
                    <input
                      id="price"
                      type="number"
                      className="w-full p-3 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      className="w-full p-3 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Brand
                    </label>
                    <input
                      id="brand"
                      type="text"
                      className="w-full p-3 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full p-3 h-32 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="stock"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Count In Stock
                    </label>
                    <input
                      id="stock"
                      type="number"
                      className="w-full p-3 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full p-3 rounded-lg bg-[#1b1b1b] border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    >
                      <option value="">Choose Category</option>
                      {categories?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    {isUpdating && <Loader />}
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  >
                    {isDeleting && <Loader />}
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
