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

  const { data: productData } = useGetProductByIdQuery(params._id);
  const { data: categories } = useFetchCategoriesQuery();

  const [name, setName] = useState(productData?.name || "");
  const [image, setImage] = useState(productData?.image || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || 0);
  const [price, setPrice] = useState(productData?.price || 0);
  const [stock, setStock] = useState(productData?.stock || 0);

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProducts] = useUpdateProductsMutation();
  const [deleteProducts] = useDeleteProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
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
      const { data } = await updateProducts({
        formData,
        productId: params._id,
      });

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
      console.log(res.image);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to Upload Image");
    }
  };
  return (
    <>
      <div className="container  xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
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
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="two">
                  <label htmlFor="name block">Price</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="name block">Quantity</label> <br />
                  <input
                    type="number"
                    min="1"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name block">Brand</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="" className="my-5">
                Description
              </label>
              <textarea
                type="text"
                className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">Count In Stock</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">Category</label> <br />
                  <select
                    placeholder="Choose Category"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    onChange={(e) => setCategory(e.target.value)}
                  >
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
