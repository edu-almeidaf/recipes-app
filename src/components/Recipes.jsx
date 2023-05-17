import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { searchBarContext } from '../Context/SearchBarProvider';
import { fetchCategories } from '../services/fetchCategories';
import CategoryButton from './CategoryButton';
import { fetchAllRecipes } from '../services/fetchRecipesApi';
import '../styles/Recipes.css';

export default function Recipes({ string }) {
  const [categories, setCategories] = useState([]);
  const { apiData, setApiData } = useContext(searchBarContext);
  const history = useHistory();
  const { location } = history;

  const MAGIC_CATEGORIES = 5;
  const MAGIC_RECIPES = 12;

  useEffect(() => {
    const getCategories = async () => {
      const categoryData = await fetchCategories(location.pathname);
      const recipeData = await fetchAllRecipes(location.pathname);

      let categoryArraySliced = [];
      let recipeArraySliced = [];

      if (categoryData.meals) {
        categoryArraySliced = categoryData.meals.slice(0, MAGIC_CATEGORIES);
        recipeArraySliced = recipeData.meals.slice(0, MAGIC_RECIPES);
      } else {
        categoryArraySliced = categoryData.drinks.slice(0, MAGIC_CATEGORIES);
        recipeArraySliced = recipeData.drinks.slice(0, MAGIC_RECIPES);
      }
      setCategories(categoryArraySliced);
      setApiData(recipeArraySliced);
    };

    getCategories();
  }, [location.pathname, setApiData]);

  const resetFilters = async () => {
    const data = await fetchAllRecipes(location.pathname);
    let arraySliced = [];
    if (data.meals) {
      arraySliced = data.meals.slice(0, MAGIC_RECIPES);
    } else {
      arraySliced = data.drinks.slice(0, MAGIC_RECIPES);
    }
    setApiData(arraySliced);
  };

  return (
    <>
      <div
        className="flex justify-center flex-wrap"
      >
        {
          categories.map((category) => (
            <CategoryButton
              key={ category.strCategory }
              category={ category }
              resetFilters={ resetFilters }
            />
          ))
        }
        <button
          className="btn w-36 btn-outline btn-primary shadow-xl m-1 p-2 text-center"
          data-testid="All-category-filter"
          onClick={ resetFilters }
        >
          All
        </button>
      </div>
      <div
        className="flex flex-wrap justify-center"
      >
        {
          apiData.map((recipe, index) => (
            <button
              className="recipes-container
      card shadow-lg m-2 p-4 btn-outline btn-accent w-48"
              data-testid={ `${index}-recipe-card` }
              key={ recipe[`id${string}`] }
              onClick={ () => {
                history.push(`${location.pathname}/${recipe[`id${string}`]}`);
              } }
            >
              <figure>
                <img
                  src={ recipe[`str${string}Thumb`] }
                  alt={ recipe[`str${string}`] }
                  className="card-recipe-img"
                  data-testid={ `${index}-card-img` }
                />
              </figure>

              <div
                className="card-body"
              >
                <h3
                  data-testid={ `${index}-card-name` }
                  className="card-title"
                >
                  { recipe[`str${string}`] }
                </h3>
              </div>
            </button>
          ))
        }
      </div>
    </>
  );
}

Recipes.propTypes = {
  string: PropTypes.string.isRequired,
};
