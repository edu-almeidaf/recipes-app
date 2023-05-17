import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import '../styles/BtnStartRecipe.css';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const startRecipe = 'Start Recipe';

function BtnStartRecipe({ handleNameStartContinue }) {
  const [nameStartContinue, setNameStartContinue] = useState(startRecipe);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const history = useHistory();
  const { location } = history;

  const { id } = useParams();

  useEffect(() => {
    const { pathname } = location;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const verifyDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    verifyDoneRecipe?.forEach((recipe) => {
      if (Number(recipe.id) === Number(id)) {
        setDoneRecipe(true);
      }
    });

    if (pathname.includes('meals')) {
      if (inProgressRecipes && inProgressRecipes.meals && inProgressRecipes.meals[id]) {
        setNameStartContinue('Continue Recipe');
      } else {
        setNameStartContinue(startRecipe);
      }
    }
    if (pathname.includes('drinks')) {
      if (inProgressRecipes && inProgressRecipes.drinks && inProgressRecipes.drinks[id]) {
        setNameStartContinue('Continue Recipe');
      } else {
        setNameStartContinue(startRecipe);
      }
    }
  }, [location, id]);

  return (
    <section
      className="flex justify-center"
    >
      {
        !doneRecipe && (
          <button
            type="button"
            data-testid="start-recipe-btn "
            className="start-recipe-btn btn btn-info mb-2"
            onClick={ handleNameStartContinue }
          >
            {nameStartContinue}
          </button>
        )
      }
    </section>
  );
}

BtnStartRecipe.propTypes = {
  handleNameStartContinue: PropTypes.func.isRequired,
};

export default BtnStartRecipe;
