export const fetchCategories = async (page) => {
  let response = {};
  if (page === '/meals') {
    response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  } else {
    response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  }

  return response.json();
};

export const fetchRecipesCategories = async (category, page) => {
  let response = {};
  if (page === '/meals') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  }

  return response.json();
};
