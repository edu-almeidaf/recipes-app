import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrink, fetchMeal } from '../services/ApiRecipeDetails';
import BtnStartRecipe from '../components/BtnStartRecipe';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { recipeContext } from '../Context/RecipeProvider';
import Recommendation from '../components/Recommendation';

const NUMBER_OF_INGREDIENTS = 20;

function RecipeDetails() {
  const [recipe, setRecipe, ingredients, setIngredients] = useContext(recipeContext);

  const [showMessage, setShowMessage] = useState(false);
  const [pageWord, setPageWord] = useState('');

  const { id } = useParams();
  const history = useHistory();
  const { location } = history;

  useEffect(() => {
    const fetchRecipe = async () => {
      let data = {};
      let recipeArray = [];
      if (location.pathname.includes('meals')) {
        setPageWord('Meal');
        data = await fetchMeal(id);
        recipeArray = data.meals;
      } else {
        setPageWord('Drink');
        data = await fetchDrink(id);
        recipeArray = data.drinks;
      }
      const finalData = recipeArray[0];
      setRecipe(finalData);
      const ingredientsArray = [];
      for (let index = 1; index <= NUMBER_OF_INGREDIENTS; index += 1) {
        if (recipeArray[0][`strIngredient${index}`]) {
          ingredientsArray.push({
            ingredient: recipeArray[0][`strIngredient${index}`],
            measure: recipeArray[0][`strMeasure${index}`],
          });
        }
      }
      setIngredients(ingredientsArray);
    };

    fetchRecipe();
  }, [id, location.pathname, setIngredients, setRecipe]);

  const cleanYoutubeUrl = (url) => {
    const urlArray = url.split('=');
    return urlArray[1];
  };

  const handleMealsLocalStorage = (inProgressRecipes) => {
    let newInProgressRecipes = {};
    if (inProgressRecipes && inProgressRecipes.meals) {
      newInProgressRecipes = {
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [id]: [],
        },
      };
    } else {
      newInProgressRecipes = {
        ...inProgressRecipes,
        meals: {
          [id]: [],
        },
      };
    }
    return newInProgressRecipes;
  };

  const handleDrinksLocalStorage = (inProgressRecipes) => {
    let newInProgressRecipes = {};
    if (inProgressRecipes && inProgressRecipes.drinks) {
      newInProgressRecipes = {
        ...inProgressRecipes,
        drinks: {
          ...inProgressRecipes.drinks,
          [id]: [],
        },
      };
    } else {
      newInProgressRecipes = {
        ...inProgressRecipes,
        drinks: {
          [id]: [],
        },
      };
    }
    return newInProgressRecipes;
  };

  const url = window.location.href;

  const handleNameStartContinue = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let data = {};
    if (location.pathname.includes('meals')) {
      data = handleMealsLocalStorage(inProgressRecipes);
    } else {
      data = handleDrinksLocalStorage(inProgressRecipes);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(data));
    history.push(`${location.pathname}/in-progress`);
  };

  return (
    <div>
      <div>
        <h1 data-testid="recipe-title">{recipe[`str${pageWord}`]}</h1>
        <ShareButton url={ url } onClick={ () => setShowMessage(true) } />
        {showMessage && <p>Link copied!</p>}
        <FavoriteButton recipe={ recipe } />
        <img
          data-testid="recipe-photo"
          src={ recipe[`str${pageWord}Thumb`] }
          alt={ recipe[`str${pageWord}`] }
        />
        <h2 data-testid="recipe-category">
          {pageWord === 'Meal' ? recipe.strCategory : recipe.strAlcoholic}
        </h2>
        <h3>Ingredientes</h3>
        <ul>
          { ingredients.map((item, index) => (
            <li
              key={ item.ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {item.ingredient}
              {' '}
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
      <Recommendation />
      <BtnStartRecipe handleNameStartContinue={ handleNameStartContinue } />
    </div>
  );
}

export default RecipeDetails;
