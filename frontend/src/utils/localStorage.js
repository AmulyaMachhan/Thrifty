//Retrieve Favourites from Local Storage
export const getFavouritesFromLocalStorage = () => {
  const favouritesJSON = localStorage.getItem("favourites");

  return favouritesJSON ? JSON.parse(favouritesJSON) : [];
};
