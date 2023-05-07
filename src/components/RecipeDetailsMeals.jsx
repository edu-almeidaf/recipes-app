import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchMeal } from '../tests/helpers/ApiRecipeDetails';

const NUMBER_OF_INGREDIENTS = 20;

function RecipeDetailsMeals() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const { id } = useParams();

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

  useEffect(() => {
    fetchRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanYoutubeUrl = (url) => {
    console.log(url);
    const urlArray = url.split('=');
    console.log(urlArray[1]);
    return urlArray[1];
  };

  return (
    <div>
      <div>
        <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
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
