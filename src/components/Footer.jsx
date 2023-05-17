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
      className="footer flex m-5"
    >
      <button
        className="btn btn-outline btn-info"
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
        className="btn btn-outline btn-info"
        onClick={ handleFoodRoute }
      >
        <img
          data-testid="meals-bottom-btn"
          alt="Icon Meal"
          src={ mealIcon }
        />
        Meals
      </button>

    </footer>
  );
}

export default Footer;
