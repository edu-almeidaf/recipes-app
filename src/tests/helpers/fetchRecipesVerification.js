import { fetchDrinkByFirstLetter, fetchDrinkByIngredient, fetchDrinkByName,
  invalidDrinkIngredient } from '../mocks/recipesMocks/fetchDrinksMocks';

import { fetchMealByFirstLetter, fetchMealByIngredient,
  fetchMealByName, invalidMealIngredient } from '../mocks/recipesMocks/fetchMealsMocks';

export const mealsLinkVerification = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    switch (url) {
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata':
      return Promise.resolve(fetchMealByName);
    case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=garlic':
      return Promise.resolve(fetchMealByIngredient);
    case 'https://www.themealdb.com/api/json/v1/1/search.php?f=a':
      return Promise.resolve(fetchMealByFirstLetter);
    default:
      return Promise.resolve(invalidMealIngredient);
    }
  },
});

export const drinksLinkVerification = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    switch (url) {
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=moscow':
      return Promise.resolve(fetchDrinkByName);
    case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin':
      return Promise.resolve(fetchDrinkByIngredient);
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a':
      return Promise.resolve(fetchDrinkByFirstLetter);
    default:
      return Promise.resolve(invalidDrinkIngredient);
    }
  },
});
