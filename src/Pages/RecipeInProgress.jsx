import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { recipeContext } from '../Context/RecipeProvider';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { fetchDrink, fetchMeal } from '../services/ApiRecipeDetails';

const NUMBER_OF_INGREDIENTS = 20;

function RecipeInProgress() {
  const [recipe, setRecipe, ingredients, setIngredients] = useContext(recipeContext);
  const [pageWord, setPageWord] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const history = useHistory();
  const { location } = history;
  const { id } = useParams();

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
      const ingredientsArray = [];
      for (let index = 1; index <= NUMBER_OF_INGREDIENTS; index += 1) {
        if (finalData[`strIngredient${index}`]) {
          ingredientsArray.push({
            ingredient: finalData[`strIngredient${index}`],
            measure: finalData[`strMeasure${index}`],
          });
        }
      }
      setRecipe(finalData);
      setIngredients(ingredientsArray);
    };

    fetchRecipe();
  }, []);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    console.log(inProgressRecipes);
    const inProgressKey = `inProgress${pageWord}s`;
    const recipeId = id;

    if (ingredients.length > 0) {
      const updatedCheckedIngredients = { ...checkedIngredients };

      if (inProgressRecipes[inProgressKey]
        && inProgressRecipes[inProgressKey][recipeId]) {
        inProgressRecipes[inProgressKey][recipeId].forEach((index) => {
          updatedCheckedIngredients[index] = true;
        });
        setCheckedIngredients(updatedCheckedIngredients);
      } else {
        const initialState = ingredients.reduce(
          (acc, curr, index) => ({ ...acc, [index]: false }),
          {},
        );
        setCheckedIngredients(initialState);
      }
    }
  }, [ingredients]);

  const handleCheckboxChange = (index) => {
    setCheckedIngredients((prevIngredients) => {
      const updatedIngredients = { ...prevIngredients };
      updatedIngredients[index] = !updatedIngredients[index];
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...JSON.parse(localStorage.getItem('inProgressRecipes')) || {},
        [`inProgress${pageWord}s`]: {
          ...JSON.parse(localStorage
            .getItem('inProgressRecipes'))?.[`inProgress${pageWord}s`] || {},
          [id]: Object.keys(updatedIngredients).filter((key) => updatedIngredients[key]),
        },
      }));
      return updatedIngredients;
    });
  };

  const handleUrl = () => {
    const url = window.location.href;
    const urlEdit = url.split('/');
    urlEdit.pop();
    const newUrl = urlEdit.join('/');
    return newUrl;
  };

  const verifyTags = (tags) => {
    if (tags === null || tags === '') {
      return [];
    }
    const arr = tags.split(',');
    return arr;
  };

  const doneRecipe = () => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    const recipeObj = {
      id: recipe[`id${pageWord}`],
      type: pageWord.toLowerCase(),
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${pageWord}`],
      image: recipe[`str${pageWord}Thumb`],
      doneDate: new Date(),
      tags: verifyTags(recipe.strTags),
    };

    let newDoneRecipes = [];
    if (doneRecipesStorage) {
      newDoneRecipes = [...doneRecipesStorage, recipeObj];
    } else {
      newDoneRecipes = [recipeObj];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    history.push('/done-recipes');
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${pageWord}Thumb`] }
        alt={ recipe[`str${pageWord}`] }
      />
      <h1 data-testid="recipe-title">{recipe[`str${pageWord}`]}</h1>
      <ShareButton url={ handleUrl() } onClick={ () => setShowMessage(true) } />
      {showMessage && <p>Link copied!</p>}
      <FavoriteButton recipe={ recipe } />
      <h2 data-testid="recipe-category">
        {pageWord === 'Meal' ? recipe.strCategory : recipe.strAlcoholic}
      </h2>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      {ingredients.map((item, index) => (
        <div key={ item.ingredient }>
          <label
            data-testid={ `${index}-ingredient-step` }
            style={
              checkedIngredients[index]
                ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                : {}
            }
          >
            <input
              type="checkbox"
              data-testid={ `${index}-ingredient-input` }
              name="checkbox"
              onChange={ () => handleCheckboxChange(index) }
              checked={ checkedIngredients[index] || false }
            />
            {item.ingredient}
            {' '}
            {item.measure}
          </label>
          <br />
        </div>
      ))}

      <button
        data-testid="finish-recipe-btn"
        disabled={
          !ingredients.every((_ingredient, index) => checkedIngredients[index] === true)
        }
        onClick={ doneRecipe }
      >
        Finish
      </button>
    </>
  );
}

export default RecipeInProgress;
