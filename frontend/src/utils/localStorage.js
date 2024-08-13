//Add a product to local storage
export const addFavouriteToLocalStorage = (product) => {
  const favourites = getFavouritesFromLocalStorage() || [];
  if (favourites.some((p) => p._id === product._id)) {
    favourites.push(product);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};

//Retrieve Favourites from Local Storage
export const getFavouritesFromLocalStorage = () => {
  const favouritesJSON = localStorage.getItem("favourites");

  return favouritesJSON ? JSON.parse(favouritesJSON) : [];
};
