import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favourites = useSelector((state) => state.favourites);
  const favouriteCount = favourites.length;

  return (
    <div className="absolute bottom-3 left-3">
      {favouriteCount > 0 && (
        <span className="px-1 py-0 text-xs text-white bg-pink-500 rounded-full">
          {favouriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
