import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Footer.css';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const handleDrinksRoute = () => {
    history.push('/drinks');
  };

  const handleFoodRoute = () => {
    history.push('/meals');
  };

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        onClick={ handleDrinksRoute }
      >
        <img
          data-testid="drinks-bottom-btn"
          alt="Icon Drink"
          src={ drinkIcon }
        />
        Drinks
      </button>

      <button
        onClick={ handleFoodRoute }
      >
        <img
          data-testid="meals-bottom-btn"
          alt="Icon Meal"
          src={ mealIcon }
        />
        Comidas
      </button>

    </footer>
  );
}

export default Footer;
