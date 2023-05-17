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

  const SLICE_MAGIC = 12;

  const redirectToDetailsPage = (data, route, id) => {
    if (data.length === 1) {
      history.push(`/${route}/${data[0][id]}`);
    }
  };

  const verifyArrayToSlice = (data) => {
    if (data.length > SLICE_MAGIC) {
      const arraySliced = data.slice(0, SLICE_MAGIC);
      return arraySliced;
    }
    return data;
  };

  const arrayHandling = (data, string) => {
    if (data[string] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    const recipeArray = verifyArrayToSlice(data[string]);
    setApiData(recipeArray);
    if (string === 'meals') {
      redirectToDetailsPage(recipeArray, 'meals', 'idMeal');
    } else {
      redirectToDetailsPage(recipeArray, 'drinks', 'idDrink');
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
      arrayHandling(data, 'meals');
    } else {
      data = await fetchCocktailApi(searchInput, searchInformationRadio);
      arrayHandling(data, 'drinks');
    }
  };

  return (
    <form
      className="SearchBar w-full"
      onSubmit={ handleSearchSubmit }
    >
      <input
        className="input input-bordered input-info w-full max-w-xs m-2"
        type="text"
        name="searchInput"
        placeholder="Search"
        data-testid="search-input"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />

      <label
        htmlFor="ingredient-radio"
        className="text-info m-2"
      >
        <input
          className="radio radio-info mr-2"
          type="radio"
          name="searchInformationRadio"
          id="ingredient-radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target }) => setSearchInformationRadio(target.value) }
        />
        Ingredient
      </label>

      <label
        htmlFor="name-radio"
        className="text-info m-2"
      >
        <input
          className="radio radio-info mr-2"
          type="radio"
          name="searchInformationRadio"
          id="name-radio"
          data-testid="name-search-radio"
          value="name"
          onChange={ ({ target }) => setSearchInformationRadio(target.value) }
        />
        Name
      </label>

      <label
        htmlFor="first-letter-radio"
        className="text-info m-2"
      >
        <input
          className="radio radio-info mr-2"
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
        className="text-info m-2"
        type="submit"
        data-testid="exec-search-btn"
        disabled={ searchInformationRadio === '' }
      >
        Search
      </button>
    </form>
  );
}
