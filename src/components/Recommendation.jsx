import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import {
  fetchRecomendationDrinks,
  fetchRecomendationMeals,
} from '../services/fetchRecomendation';

const recommendedLength = 6;
function Recommendation() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 0,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  const [recommended, setRecommended] = useState([]);
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;

  useEffect(() => {
    const getFetch = async () => {
      if (pathname.includes('meals')) {
        const fetchRecommendationDrinks = await fetchRecomendationDrinks();
        setRecommended(fetchRecommendationDrinks.drinks);
      }
      if (pathname.includes('drinks')) {
        const fetchRecommendation = await fetchRecomendationMeals();
        console.log(fetchRecommendation);
        setRecommended(fetchRecommendation.meals);
      }
    };
    getFetch();
  }, [pathname]);

  return (
    <section>
      <h1>Recomendações</h1>
      <Slider { ...settings }>
        {recommended && recommended
          .filter((_item, index) => index < recommendedLength)
          .map((recommendation, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ pathname.includes('drinks') ? recommendation?.strMealThumb
                  : recommendation?.strDrinkThumb }
                alt={ recommendation?.strTags }

              />

              <h3
                data-testid={ `${index}-recommendation-title` }

              >
                {recommendation?.strMeal
                  ? recommendation?.strMeal
                  : recommendation?.strDrink}
              </h3>
            </div>
          ))}
      </Slider>
    </section>
  );
}

export default Recommendation;
