import React, { useEffect, useState } from 'react';
import '../styles/BtnStartRecipe.css';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const startRecipe = 'Start Recipe';

function BtnStartRecipe() {
  const [nameStartContinue, setNameStartContinue] = useState(startRecipe);
  const [idDrinksRecipe, setIdDrinksRecipe] = useState('');
  const [idMealsRecipe, setIdMealsRecipe] = useState('');
  const history = useHistory();
  const { location } = history;

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const { pathname } = location;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (pathname.includes('meals')) {
      if (inProgressRecipes && inProgressRecipes.meals === id) {
        setNameStartContinue('Continue Recipe');
      } else {
        setNameStartContinue(startRecipe);
      }
    }
    if (pathname.includes('drinks')) {
      if (inProgressRecipes && inProgressRecipes.drinks === id) {
        setNameStartContinue('Continue Recipe');
      } else {
        setNameStartContinue(startRecipe);
      }
    }
  }, [location, id]);

  const handleNameStartContinue = () => {
    const { pathname } = location;

    const saveInProgressRecipes = {
      drinks: idDrinksRecipe,
      meals: idMealsRecipe,

    };

    if (pathname.includes('meals')) {
      setIdMealsRecipe(id);
    } else {
      setIdDrinksRecipe(id);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(saveInProgressRecipes));

    if (pathname.includes('meals')) {
      history.push(`/meals/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <section>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ handleNameStartContinue }
      >
        {nameStartContinue}
      </button>

    </section>
  );
}

export default BtnStartRecipe;
