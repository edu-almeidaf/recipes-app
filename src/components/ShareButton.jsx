import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ url, onClick, dataTestId = 'share-btn' }) {
  const copyToClipboard = () => {
    copy(url);
    onClick();
  };
  return (
    <button
      className="m-2 btn btn-accent"
      data-testid={ dataTestId }
      onClick={ copyToClipboard }
      src={ shareIcon }
    >
      <img src={ shareIcon } alt="share icon" />
    </button>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string,
};

export default ShareButton;
