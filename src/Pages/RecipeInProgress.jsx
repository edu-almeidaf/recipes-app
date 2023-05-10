import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { recipeContext } from '../Context/RecipeProvider';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function RecipeInProgress() {
  const [recipe, ingredients] = useContext(recipeContext);
  console.log(recipe);
  console.log(ingredients);

  const [pageWord, setPageWord] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const url = window.location.href;
  const history = useHistory();
  const { location } = history;

  useEffect(() => {
    const getPathname = () => {
      if (location.pathname.includes('meals')) {
        setPageWord('Meal');
      } else {
        setPageWord('Drink');
      }
    };
    getPathname();
  }, []);

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${pageWord}Thumb`] }
        alt={ recipe[`str${pageWord}`] }
      />
      <h1 data-testid="recipe-title">{recipe[`str${pageWord}`]}</h1>
      <ShareButton url={ url } onClick={ () => setShowMessage(true) } />
      {showMessage && <p>Link copied!</p>}
      <FavoriteButton recipe={ recipe } />
      <h2 data-testid="recipe-category">
        {pageWord === 'Meal' ? recipe.strCategory : recipe.strAlcoholic}
      </h2>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button data-testid="finish-recipe-btn">Finish</button>
    </>
  );
}

export default RecipeInProgress;
