import { useState } from "react";
import {
  useCreateProductsMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
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
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
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
    <div className="min-h-screen  text-white py-10 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-6 bg-gray-900 rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold mb-8 text-center ">
              Create Product
            </h1>

            {imageURL && (
              <div className="text-center mb-6">
                <img
                  src={imageURL}
                  alt="product"
                  className="block mx-auto max-h-[200px] rounded-lg shadow-lg"
                />
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="image"
                className="border border-dashed border-gray-300 block w-full text-center rounded-lg cursor-pointer py-4 hover:bg-gray-800 transition-colors"
              >
                {image ? (
                  <span className="text-gray-300 ">{image}</span>
                ) : (
                  <div className="flex justify-center items-center gap-3 text-gray-300 font-semibold tracking-wider">
                    <span>
                      <IoCloudUploadOutline size={24} />
                    </span>
                    <span>UPLOAD IMAGE</span>
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
              <div className="flex flex-wrap gap-6">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="p-4 w-full border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-pink-500 focus:border-pink-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-400"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="p-4 w-full border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-pink-500 focus:border-pink-500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium text-gray-400"
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    className="p-4 w-full border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-pink-500 focus:border-pink-500"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-400"
                  >
                    Brand
                  </label>
                  <input
                    id="brand"
                    type="text"
                    className="p-4 w-full border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-pink-500 focus:border-pink-500"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="p-4 w-full h-32 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-pink-500 focus:border-pink-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="stock"
                    className="block mb-2 text-sm font-medium text-gray-400"
                  >
                    Count In Stock
                  </label>
                  <input
                    id="stock"
                    type="number"
                    className="p-4 w-full border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-pink-500 focus:border-pink-500"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-400"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="p-4 w-full border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-pink-500 focus:border-pink-500"
                    onChange={(e) => setCategory(e.target.value)}
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

              <button
                type="submit"
                className="py-4 px-10 w-full md:w-auto rounded-lg text-lg font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
