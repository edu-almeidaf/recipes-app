import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, showSearchIcon }) {
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const history = useHistory();

  const goToProfilePage = () => {
    history.push('/profile');
  };

  const toggleSearchBarInput = () => {
    if (toggleSearchBar) {
      setToggleSearchBar(false);
    } else {
      setToggleSearchBar(true);
    }
  };

  return (
    <header className="flex justify-stretch bg-primary-focus shadow-lg p-4">
      <button
        onClick={ goToProfilePage }
        className="btn m-2 btn-accent"
      >

        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>

      {
        showSearchIcon && (
          <button
            onClick={ toggleSearchBarInput }
            className="btn m-2 btn-accent"
          >
            <img
              src={ searchIcon }
              alt="profile icon"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      {/* <h1 data-testid="page-title">{title}</h1> */}
      {
        toggleSearchBar && (
          <SearchBar />
        )
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
