import { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import { searchBarContext } from '../Context/SearchBarProvider';

export default function Meals() {
  const { setApiData } = useContext(searchBarContext);
  useEffect(() => {
    const fetchInitialRecipes = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const MAGIC = 12;
      const response = await fetch(URL);
      const data = await response.json();
      if (data.meals.length > MAGIC) {
        const arraySliced = data.meals.slice(0, MAGIC);
        setApiData(arraySliced);
        return;
      }
      setApiData(data.meals);
    };

    fetchInitialRecipes();
  }, []);
  return (
    <>
      <Header title="Meals" showSearchIcon />
      <Recipes string="Meal" />
      <Footer />
    </>
  );
}
