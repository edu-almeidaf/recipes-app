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
    console.log(id);
    verifyDoneRecipe?.forEach((recipe) => {
      if (recipe.id === Number(id)) {
        console.log('Entrou no if');
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
    <section>
      {
        !doneRecipe && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
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
