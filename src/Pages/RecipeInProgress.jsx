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
  // const [, setCheckedIngredients] = useState([]);

  const url = window.location.href;
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

  useEffect(() => {
    const getPathname = () => {
      if (location.pathname.includes('meals')) {
        setPageWord('Meal');
      } else {
        setPageWord('Drink');
      }
    };
    getPathname();
  }, [location.pathname]);

  // const handleCheckboxChange = (index) => {
  //   setCheckedIngredients((prevIngredients) => {
  //     const updatedIngredients = [...prevIngredients];
  //     updatedIngredients[index].checked = !updatedIngredients[index].checked;
  //     return updatedIngredients;
  //   });
  // };

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

      { ingredients.map((item, index) => (
        <div key={ item.ingredient }>
          <label
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              name="checkbox"
              // id={ item.ingredient }
              // onChange={ () => handleCheckboxChange(index) }
              // checked={
              //   item.checked
              //   ? {text-decoration: line-through solid rgb(0, 0, 0)}
              //   ?
              // }
            />
            {item.ingredient}
            {' '}
            {item.measure}
          </label>
          <br />
        </div>
      ))}

      <button data-testid="finish-recipe-btn">Finish</button>
    </>
  );
}

export default RecipeInProgress;
