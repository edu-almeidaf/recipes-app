import React, { useState } from 'react';
import '../styles/BtnStartRecipe.css';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

function BtnStartRecipe() {
  const [nameStartContinue, setNameStartContinue] = useState('Start Recipe');
  const history = useHistory();
  const { location } = history;

  const { id } = useParams();
  console.log(id);

  const handleNameStartContinue = () => {
    const { pathname } = location;

    if (pathname.includes('meals')) {
      history.push(`/drinks/${id}/in-progress`);
    } else {
      history.push(`/meals/${id}/in-progress`);
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
