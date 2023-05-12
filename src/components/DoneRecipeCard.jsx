import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function DoneRecipeCard({ recipe, index }) {
  const [ShowMessage, setShowMessage] = useState(false);
  const handleUrl = () => {
    const url = recipe.type === 'meal' ? `http://localhost:3000/meals/${recipe.id}` : `http://localhost:3000/drinks/${recipe.id}`;
    return url;
  };
  return (
    <div key={ index }>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <h3 data-testid={ `${index}-horizontal-name` }>
          { `${recipe.name}` }
        </h3>
      </Link>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt="imagem da receita"
          height="100"
          width="150"
        />
      </Link>
      <ShareButton
        url={ handleUrl() }
        onClick={ () => setShowMessage(true) }
        dataTestId={ `${index}-horizontal-share-btn` }
      />
      {ShowMessage && <p>Link copied!</p>}
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {
          recipe.type === 'meal'
            ? `${recipe.nationality} - ${recipe.category}`
            : `${recipe.alcoholicOrNot}`
        }
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { `Done in: ${recipe.doneDate}` }
      </p>
      {
        recipe.type === 'meal'
        && recipe.tags.map((tag) => (
          <p
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>))
      }
    </div>

  );
}
DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
