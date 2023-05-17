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
        setRecommended(fetchRecommendation.meals);
      }
    };
    getFetch();
  }, [pathname]);

  return (
    <section
      className="flex justify-center m-4"
    >
      {/* <h1
        className="card-title"
      >
        Recomendações

      </h1> */}
      <div
        className="card w-96 bg-base-100 shadow-xl"
      >
        <Slider { ...settings }>
          {recommended && recommended
            .filter((_item, index) => index < recommendedLength)
            .map((recommendation, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
              >
                <figure>
                  <img
                    className="border-e-4 "
                    src={ pathname.includes('drinks')
                      ? recommendation?.strMealThumb
                      : recommendation?.strDrinkThumb }
                    alt={ recommendation?.strTags }
                  />
                </figure>
                {/* <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recommendation?.strMeal
                    ? recommendation?.strMeal
                    : recommendation?.strDrink}
                </h3> */}
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
}

export default Recommendation;
