import { useEffect } from "react";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";

function ProductList() {
  const { data: products, refetch } = useAllProductsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="w-full flex justify-center align-center h-full">
      {products?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export default ProductList;
