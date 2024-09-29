import { useState, useEffect } from "react";
import { useCreateProductsMutation } from "../../redux/api/productApiSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { IoMdListBox, IoMdText, IoMdPricetag } from "react-icons/io";

function ProductList() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();
  const [createProduct] = useCreateProductsMutation();
  const { data: categories } = useFetchCategoriesQuery();

  // Load input values from localStorage when the component mounts
  useEffect(() => {
    const savedName = localStorage.getItem("productName");
    const savedBrand = localStorage.getItem("productBrand");
    const savedDescription = localStorage.getItem("productDescription");
    const savedCategory = localStorage.getItem("productCategory");
    const savedQuantity = localStorage.getItem("productQuantity");
    const savedPrice = localStorage.getItem("productPrice");
    const savedStock = localStorage.getItem("productStock");

    if (savedName) setName(savedName);
    if (savedBrand) setBrand(savedBrand);
    if (savedDescription) setDescription(savedDescription);
    if (savedCategory) setCategory(savedCategory);
    if (savedQuantity) setQuantity(savedQuantity);
    if (savedPrice) setPrice(savedPrice);
    if (savedStock) setStock(savedStock);
  }, []);

  // Save input values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("productName", name);
    localStorage.setItem("productBrand", brand);
    localStorage.setItem("productDescription", description);
    localStorage.setItem("productCategory", category);
    localStorage.setItem("productQuantity", quantity);
    localStorage.setItem("productPrice", price);
    localStorage.setItem("productStock", stock);
  }, [name, brand, description, category, quantity, price, stock]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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
        localStorage.clear();
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-center text-xl font-bold tracking-wider py-3 bg-gradient-to-r from-blue-600 to-purple-600">
        CREATE PRODUCT
      </h2>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-3/4 bg-gray-800 shadow-lg rounded-lg p-8 mx-auto md:mx-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="p-4 border border-gray-600 rounded-lg bg-gray-700 text-gray-200"
                  required
                />
              </div>

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
