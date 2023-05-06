import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchCocktailApi, fetchMealApi } from '../services/fetchMealApi';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchInformationRadio, setSearchInformationRadio] = useState('');
  const { location } = useHistory();

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchInformationRadio === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    let apiData = {};
    if (location.pathname === '/meals') {
      apiData = await fetchMealApi(searchInput, searchInformationRadio);
    } else if (location.pathname === '/drinks') {
      apiData = await fetchCocktailApi(searchInput, searchInformationRadio);
    }
    console.log(apiData);
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
