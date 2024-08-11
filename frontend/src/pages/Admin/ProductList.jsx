import { useState } from "react";
import {
  useCreateProductsMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
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
      console.log(res.image.name);

      setImage(res.image);
      setImageURL(res.image);
      console.log(res.image);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to Upload Image");
    }
  };

  return (
    <div className="container overflow-hidden">
      <div className="flex flex-col justify-center md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-2xl font-bold mb-4">Create Product</div>

          {imageURL && (
            <div className="text-center mb-4">
              <img
                src={imageURL}
                alt="product"
                className="block mx-auto max-h-[200px] rounded-lg"
              />
            </div>
          )}

          <div className="mb-6 bg-gray-200 rounded-lg">
            <label
              htmlFor="image"
              className="border border-gray-300 text-gray-800 block w-full text-center rounded-lg cursor-pointer font-thin py-4 "
            >
              {image ? (
                <span className="text-gray-800">{image}</span>
              ) : (
                "Upload Image"
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
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 w-full md:w-auto rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
