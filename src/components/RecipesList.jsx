import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { searchBarContext } from '../Context/SearchBarProvider';

export default function RecipesList({ string }) {
  const { apiData } = useContext(searchBarContext);
  console.log(apiData);
  return (
    <div className="recipes-container">
      {
        apiData.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe[`id${string}`] }>
            <h3>{ recipe[`str${string}`] }</h3>
            <img src={ recipe[`str${string}Thumb`] } alt="" />
          </div>
        ))
      }
    </div>
  );
}

RecipesList.propTypes = {
  string: PropTypes.string.isRequired,
};
