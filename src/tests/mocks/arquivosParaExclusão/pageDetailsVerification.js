import { pageDetailsDrinksMock, pageDetailsMealsMock } from './pageDetailsMocks';
import { invalidMealMock } from './mealsPageMocks';

const URL_PAGE_DETAILS_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
const URL_PAGE_DETAILS_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11009';

export const pageDetailsVerification = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    switch (url) {
    case URL_PAGE_DETAILS_MEALS:
      return Promise.resolve(pageDetailsMealsMock);
    case URL_PAGE_DETAILS_DRINKS:
      return Promise.resolve(pageDetailsDrinksMock);
    default:
      return Promise.resolve(invalidMealMock);
    }
  },
});
