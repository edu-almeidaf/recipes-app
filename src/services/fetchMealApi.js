export const fetchMealApi = async (searchInput, searchInformationRadio) => {
  let response = {};
  if (searchInformationRadio === 'ingredient') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
  } else if (searchInformationRadio === 'name') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
  } else {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
  }

  return response.json();
};

export const fetchCocktailApi = async (searchInput, searchInformationRadio) => {
  let response = {};
  if (searchInformationRadio === 'ingredient') {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
  } else if (searchInformationRadio === 'name') {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
  }

  return response.json();
};
