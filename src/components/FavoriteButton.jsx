import favIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton() {
  return (
    <button data-testid="favorite-btn">
      <img src={ favIcon } alt="favorite button" />
    </button>

  );
}

export default FavoriteButton;
