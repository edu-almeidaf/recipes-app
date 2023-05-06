import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchRecipesCategories } from '../services/fetchCategories';
import { searchBarContext } from '../Context/SearchBarProvider';

export default function CategoryButton({ category, resetFilters }) {
  const [isActive, setIsActive] = useState(false);
  const { setApiData } = useContext(searchBarContext);
  const { location } = useHistory();

  const handleFilterByCategory = async () => {
    const data = await fetchRecipesCategories(category.strCategory, location.pathname);
    const MAGIC = 12;
    let arraySliced = [];
    if (data.meals) {
      arraySliced = data.meals.slice(0, MAGIC);
    } else {
      arraySliced = data.drinks.slice(0, MAGIC);
    }
    setApiData(arraySliced);
  };

  const handleClick = () => {
    if (isActive) {
      resetFilters();
    } else {
      handleFilterByCategory();
    }
    setIsActive(!isActive);
  };

  return (
    <button
      type="button"
      key={ category.strCategory }
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ handleClick }
    >
      {category.strCategory}
    </button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
  resetFilters: PropTypes.func.isRequired,
};
