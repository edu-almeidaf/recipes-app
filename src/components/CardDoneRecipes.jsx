import React, { useEffect, useState } from 'react';
import CardIndividualRecipe from './CardIndividualRecipe';

export default function DoneRecipes() {
  const [typeOfRecipes, setTypeOfRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalStorage) {
      setTypeOfRecipes(getLocalStorage);
      setDoneRecipes(getLocalStorage);
    }
  }, []);

  const filterRecipes = (type) => {
    if (type === 'all') {
      setTypeOfRecipes(doneRecipes);
    } else {
      const recipeType = type === 'meals' ? 'meal' : 'drink';
      const filteredDoneRecipes = doneRecipes.filter(
        (e) => e.type === recipeType,
      );
      setTypeOfRecipes(filteredDoneRecipes);
    }
  };
  return (
    <>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterRecipes('meals') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drinks') }
        >
          Drinks
        </button>
        <br />
      </div>
      { typeOfRecipes?.map((recipe, i) => (
        <CardIndividualRecipe key={ recipe.id } index={ i } recipe={ recipe } />
      ))}
    </>
  );
}
