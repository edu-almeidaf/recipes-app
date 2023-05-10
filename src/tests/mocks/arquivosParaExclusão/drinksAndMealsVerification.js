import {
  drinkByNameMock,
  drinkByIngredientMock,
  drinkByFirstLetterMock,
  invalidDrinkMock,
  allDrinksLoadingPageMock,
  drinkByCocktailCategoryMock,
  drinksCategoriesMock,
  pageDetailsDrinksMock,
} from './drinksPageMocks';

import {
  mealByNameMock,
  mealByIngredientMock,
  mealByFirstLetterMock,
  invalidMealMock,
  allMealsLoadingPageMock,
  mealByBeefCategoryMock,
  mealsCategoriesMock,
  pageDetailsMealsMock,
} from './mealsPageMocks';

// MEALS LINKS
const SEARCH_LINK_MEAL_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=corba'; /* ok */
const SEARCH_LINK_MEAL_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=garlic'; /* ok */
const SEARCH_LINK_MEAL_BY_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a'; /* ok */
const SEARCH_LINK_MEAL_BY_BEEF_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef'; /* ok */
const URL_MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'; /* ok */
const URL_ALL_MEALS_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; /* ok */
const URL_PAGE_DETAILS_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';

// DRINKS LINKS
const SEARCH_LINK_DRINK_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=moscow'; /* ok */
const SEARCH_LINK_DRINK_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin'; /* ok */
const SEARCH_LINK_DRINK_BY_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'; /* ok */
const SEARCH_LINK_DRINK_BY_COCKTAIL_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'; /* ok */
const URL_DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'; /* ok */
const URL_ALL_DRINKS_RECIPES = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='; /* ok */
const URL_PAGE_DETAILS_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11009';

export const mealsLinkVerification = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    switch (url) {
    case SEARCH_LINK_MEAL_BY_NAME:
      return Promise.resolve(mealByNameMock);
    case SEARCH_LINK_MEAL_BY_INGREDIENT:
      return Promise.resolve(mealByIngredientMock);
    case SEARCH_LINK_MEAL_BY_FIRST_LETTER:
      return Promise.resolve(mealByFirstLetterMock);
    case URL_MEALS_CATEGORIES:
      return Promise.resolve(mealsCategoriesMock);
    case SEARCH_LINK_MEAL_BY_BEEF_CATEGORY:
      return Promise.resolve(mealByBeefCategoryMock);
    case URL_ALL_MEALS_RECIPES:
      return Promise.resolve(allMealsLoadingPageMock);
    case URL_PAGE_DETAILS_MEALS:
      return Promise.resolve(pageDetailsMealsMock);
    default:
      return Promise.resolve(invalidMealMock);
    }
  },
});

export const drinksLinkVerification = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    switch (url) {
    case SEARCH_LINK_DRINK_BY_NAME:
      return Promise.resolve(drinkByNameMock);
    case SEARCH_LINK_DRINK_BY_INGREDIENT:
      return Promise.resolve(drinkByIngredientMock);
    case SEARCH_LINK_DRINK_BY_FIRST_LETTER:
      return Promise.resolve(drinkByFirstLetterMock);
    case URL_DRINKS_CATEGORIES:
      return Promise.resolve(drinksCategoriesMock);
    case SEARCH_LINK_DRINK_BY_COCKTAIL_CATEGORY:
      return Promise.resolve(drinkByCocktailCategoryMock);
    case URL_ALL_DRINKS_RECIPES:
      return Promise.resolve(allDrinksLoadingPageMock);
    case URL_PAGE_DETAILS_DRINKS:
      return Promise.resolve(pageDetailsDrinksMock);
    default:
      return Promise.resolve(invalidDrinkMock);
    }
  },
});
