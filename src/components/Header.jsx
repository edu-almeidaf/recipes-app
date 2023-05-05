import PropTypes from 'prop-types';

function Header({ title, showSearchIcon }) {
  return (
    <>
      <img
        src="/images/profileIcon.svg"
        alt="profile icon"
        data-testid="profile-top-btn"
      />
      {
        showSearchIcon && (
          <img
            src="./images/searchIcon.svg"
            alt="profile icon"
            data-testid="search-top-btn"
          />
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
