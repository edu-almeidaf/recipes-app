import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    const favoriteRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipe.idMeal ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavorites = [...storedFavorites, favoriteRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));

    setIsFavorite(true);
  };

  const handleRemoveFavoriteClick = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavorites = storedFavorites
      .filter((favorite) => favorite.id !== (recipe.idMeal || recipe.idDrink));
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));

    setIsFavorite(false);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = storedFavorites
      .some((favorite) => favorite.id === (recipe.idMeal || recipe.idDrink));

    setIsFavorite(isRecipeFavorite);
  }, [recipe]);

  return (
    <button
      data-testid="favorite-btn"
      onClick={ isFavorite ? handleRemoveFavoriteClick : handleFavoriteClick }
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="favorite button" />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
};

export default FavoriteButton;
