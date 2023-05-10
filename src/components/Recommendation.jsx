import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import Carousel from 'react-bootstrap/Carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import {
  fetchRecomendationDrinks,
  fetchRecomendationMeals,
} from '../services/fetchRecomendation';

const recommendedLength = 6;
function Recommendation() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const [recommended, setRecommended] = useState([]);
  const history = useHistory();
  const { location } = history;

  useEffect(() => {
    const { pathname } = location;

    const getFetch = async () => {
      if (pathname.includes('meals')) {
        const fetchRecommendationDrinks = await fetchRecomendationDrinks();
        console.log(fetchRecommendationDrinks);
        setRecommended(fetchRecommendationDrinks.drinks);
      }
      if (pathname.includes('drinks')) {
        const fetchRecommendation = await fetchRecomendationMeals();
        setRecommended(fetchRecommendation.meals);
      }
    };
    getFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <h1>Recomendações</h1>
      <Slider { ...settings }>
        {recommended && recommended
          .filter((_item, index) => index < recommendedLength)
          .map((recommendation, index) => (
            <div
              key={ index }
              // data-testid="recommendation-card"
            >
              <img
                width={ 100 }
                src={ recommendation?.strMealThumb }
                alt={ recommendation?.strTags }
                data-testid={ `${index}-recommendation-card` }

              />
              <h3
                data-testid="recipe-title"
              >
                {recommendation?.strTags}
              </h3>
            </div>
          ))}
      </Slider>
    </section>
  );
}

export default Recommendation;
