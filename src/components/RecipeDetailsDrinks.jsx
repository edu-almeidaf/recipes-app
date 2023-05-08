import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDrink } from '../tests/helpers/ApiRecipeDetails';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

const NUMBER_OF_INGREDIENTS = 20;

function RecipeDetailsDrinks() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const teste = await fetchDrink(id);
      const drinksFetch = teste.drinks[0];
      setRecipe(drinksFetch);
      const ingredientsArray = [];
      for (let index = 1; index <= NUMBER_OF_INGREDIENTS; index += 1) {
        if (drinksFetch[`strIngredient${index}`]) {
          ingredientsArray.push({
            ingredient: drinksFetch[`strIngredient${index}`],
            measure: drinksFetch[`strMeasure${index}`],
          });
        }
      }
      setIngredients(ingredientsArray);
    };

    fetchRecipe();
  }, [id]);

  const url = window.location.href;

  return (
    <div>
      <div key={ recipe.strDrink }>
        <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
        <ShareButton url={ url } onClick={ () => setShowMessage(true) } />
        {showMessage && <p>Link copied!</p>}
        <FavoriteButton />
        <img
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
        />
        <h2 data-testid="recipe-category">{recipe.strAlcoholic}</h2>
        <h3>Ingredients</h3>
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
      </div>

    </div>
  );
}

export default RecipeDetailsDrinks;
