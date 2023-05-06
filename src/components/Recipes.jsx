import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { searchBarContext } from '../Context/SearchBarProvider';

export default function Recipes({ string }) {
  const { apiData } = useContext(searchBarContext);
  return (
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
  );
}

Recipes.propTypes = {
  string: PropTypes.string.isRequired,
};
