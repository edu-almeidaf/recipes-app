export const fetchMealApi = async (searchInput, searchInformationRadio) => {
  let response = {};
  switch (searchInformationRadio) {
  case 'ingredient':
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    break;
  case 'name':
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    break;
  default:
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
    break;
  }
  return response.json();
};

export const fetchCocktailApi = async (searchInput, searchInformationRadio) => {
  let response = {};
  switch (searchInformationRadio) {
  case 'ingredient':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    break;
  case 'name':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    break;
  default:
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
    break;
  }
  return response.json();
};
