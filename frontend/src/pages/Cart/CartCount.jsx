import { useSelector } from "react-redux";

function CartCount() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="absolute bottom-3 left-3">
      {cartItems.length > 0 && (
        <span>
          <span className="px-1 py-0 text-xs text-white bg-pink-500 rounded-full">
            {cartItems.reduce((a, c) => a + c.qty, 0)}
          </span>
        </span>
      )}
    </div>
  );
}

export default CartCount;
