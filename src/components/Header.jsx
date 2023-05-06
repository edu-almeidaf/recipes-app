import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
    <>
      <button onClick={ goToProfilePage }>
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>

      {
        showSearchIcon && (
          <button onClick={ toggleSearchBarInput }>
            <img
              src={ searchIcon }
              alt="profile icon"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      {
        toggleSearchBar && (
          <input type="search" data-testid="search-input" />
        )
      }
      <h1 data-testid="page-title">{title}</h1>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
