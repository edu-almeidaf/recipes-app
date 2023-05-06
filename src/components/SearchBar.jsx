import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMealApi, fetchCocktailApi } from '../services/fetchRecipesApi';
import { searchBarContext } from '../Context/SearchBarProvider';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchInformationRadio, setSearchInformationRadio] = useState('');

  const { setApiData } = useContext(searchBarContext);

  const history = useHistory();
  const { location } = history;

  const redirectToMealDetailsPage = (data) => {
    if (data.meals.length === 1) {
      history.push(`/meals/${data.meals[0].idMeal}`);
    }
  };

  const redirectToDrinkDetailsPage = (data) => {
    if (data.drinks.length === 1) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (searchInformationRadio === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    let data = {};
    if (location.pathname === '/meals') {
      data = await fetchMealApi(searchInput, searchInformationRadio);
      setApiData(data.meals);
      redirectToMealDetailsPage(data);
    } else if (location.pathname === '/drinks') {
      data = await fetchCocktailApi(searchInput, searchInformationRadio);
      setApiData(data.drinks);
      redirectToDrinkDetailsPage(data);
    }
  };

  return (
    <form className="SearchBar" onSubmit={ handleSearchSubmit }>
      <input
        type="text"
        name="searchInput"
        placeholder="Search"
        data-testid="search-input"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />

      <label htmlFor="ingredient-radio">
        <input
          type="radio"
          name="searchInformationRadio"
          id="ingredient-radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target }) => setSearchInformationRadio(target.value) }
        />
        Ingredient
      </label>

      <label htmlFor="name-radio">
        <input
          type="radio"
          name="searchInformationRadio"
          id="name-radio"
          data-testid="name-search-radio"
          value="name"
          onChange={ ({ target }) => setSearchInformationRadio(target.value) }
        />
        Name
      </label>

      <label htmlFor="first-letter-radio">
        <input
          type="radio"
          name="searchInformationRadio"
          id="first-letter-radio"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ ({ target }) => setSearchInformationRadio(target.value) }
        />
        First Letter
      </label>

      <button
        type="submit"
        data-testid="exec-search-btn"
        disabled={ searchInformationRadio === '' }
      >
        Search
      </button>
    </form>
  );
}
