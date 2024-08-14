// Add a product to local storage
export const addFavouriteToLocalStorage = (product) => {
  // Retrieve existing favourites from local storage
  const favourites = getFavouritesFromLocalStorage();

  // Check if the product is already in the favourites
  if (!favourites.some((p) => p._id === product._id)) {
    favourites.push(product);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};

// Remove product from local storage
export const removeFavouriteFromLocalStorage = (productId) => {
  // Retrieve existing favourites from local storage
  const favourites = getFavouritesFromLocalStorage();

  // Filter out the product to be removed
  const updatedFavourites = favourites.filter((p) => p._id !== productId);

  // Update local storage
  localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
};

// Retrieve favourites from local storage
export const getFavouritesFromLocalStorage = () => {
  // Retrieve favourites JSON string from local storage
  const favouritesJSON = localStorage.getItem("favourites");

  // Parse and return favourites array, or return empty array if not found
  return favouritesJSON ? JSON.parse(favouritesJSON) : [];
};
