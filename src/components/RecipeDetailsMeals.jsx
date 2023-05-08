import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchMeal } from '../tests/helpers/ApiRecipeDetails';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

const NUMBER_OF_INGREDIENTS = 20;

function RecipeDetailsMeals() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const teste = await fetchMeal(id);
      const mealsFetch = teste.meals[0];
      setRecipe(mealsFetch);
      const ingredientsArray = [];
      for (let index = 1; index <= NUMBER_OF_INGREDIENTS; index += 1) {
        if (mealsFetch[`strIngredient${index}`]) {
          ingredientsArray.push({
            ingredient: mealsFetch[`strIngredient${index}`],
            measure: mealsFetch[`strMeasure${index}`],
          });
        }
      }
      setIngredients(ingredientsArray);
    };

    fetchRecipe();
  }, [id]);

  const cleanYoutubeUrl = (url) => {
    console.log(url);
    const urlArray = url.split('=');
    console.log(urlArray[1]);
    return urlArray[1];
  };

  const url = window.location.href;

  return (
    <div>
      <div>
        <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
        <ShareButton url={ url } onClick={ () => setShowMessage(true) } />
        {showMessage && <p>Link copied!</p>}
        <FavoriteButton />
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
        />
        <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
        <h3>Ingredientes</h3>
        <ul>
          { ingredients.map((item, index) => (
            <li
              key={ item.ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {item.ingredient}
              {item.measure}
            </li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>

        {recipe.strYoutube && <iframe
          data-testid="video"
          src={ `https://www.youtube.com/embed/watch?v=${cleanYoutubeUrl(recipe.strYoutube)}` }
          title="video"
        />}
      </div>

    </div>
  );
}

export default RecipeDetailsMeals;
