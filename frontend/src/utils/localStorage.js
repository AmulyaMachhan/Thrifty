//Add a product to local storage
export const addFavouriteToLocalStorage = (product) => {
  const favourites = getFavouritesFromLocalStorage() || [];
  if (favourites.some((p) => p._id === product._id)) {
    favourites.push(product);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};

//Remove product from Local Storage
export const removeFavouriteFromLocalStorage = (productId) => {
  const favourites = getFavouritesFromLocalStorage() || [];
  const updateFavourites = favourites.filter((p) => p._id !== productId);

  localStorage.setItem("favourites", JSON.stringify(updateFavourites));
};

//Retrieve Favourites from Local Storage
export const getFavouritesFromLocalStorage = () => {
  const favouritesJSON = localStorage.getItem("favourites");

  return favouritesJSON ? JSON.parse(favouritesJSON) : [];
};
