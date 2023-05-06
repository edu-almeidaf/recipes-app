import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { searchBarContext } from '../Context/SearchBarProvider';
import { fetchCategories } from '../services/fetchCategories';
import CategoryButton from './CategoryButton';
import { fetchAllRecipes } from '../services/fetchRecipesApi';

export default function Recipes({ string }) {
  const [categories, setCategories] = useState([]);
  const { apiData, setApiData } = useContext(searchBarContext);
  const history = useHistory();
  const { location } = history;

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories(location.pathname);
      const MAGIC = 5;
      let categoryArraySliced;
      if (data.meals) {
        categoryArraySliced = data.meals.slice(0, MAGIC);
      } else {
        categoryArraySliced = data.drinks.slice(0, MAGIC);
      }
      setCategories(categoryArraySliced);
    };
    getCategories();
  }, []);

  const resetFilters = async () => {
    const data = await fetchAllRecipes(location.pathname);
    const MAGIC = 12;
    let arraySliced = [];
    if (data.meals) {
      arraySliced = data.meals.slice(0, MAGIC);
    } else {
      arraySliced = data.drinks.slice(0, MAGIC);
    }
    setApiData(arraySliced);
  };

  return (
    <>
      <div>
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
          data-testid="All-category-filter"
          onClick={ resetFilters }
        >
          All
        </button>
      </div>
      <div className="recipes-container">
        {
          apiData.map((recipe, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ recipe[`id${string}`] }>
              <h3 data-testid={ `${index}-card-name` }>{ recipe[`str${string}`] }</h3>
              <img
                src={ recipe[`str${string}Thumb`] }
                alt={ recipe[`str${string}`] }
                data-testid={ `${index}-card-img` }
              />
            </div>
          ))
        }
      </div>
    </>
  );
}

Recipes.propTypes = {
  string: PropTypes.string.isRequired,
};
