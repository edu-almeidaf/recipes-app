export const fetchMeal = async (id) => {
  const fetchMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(fetchMeals);
  const data = response.json();
  return data;
};

export const fetchDrink = async (id) => {
  const fetchDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(fetchDrinks);
  const data = response.json();
  return data;
};
