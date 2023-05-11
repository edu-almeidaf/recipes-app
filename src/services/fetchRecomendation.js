export const fetchRecomendationMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = response.json();
  return data;
};

export const fetchRecomendationDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = response.json();
  return data;
};
