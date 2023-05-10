import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ url, onClick }) {
  const copyToClipboard = () => {
    copy(url);
    onClick();
  };
  return (
    <button data-testid="share-btn" onClick={ copyToClipboard }>
      <img src={ shareIcon } alt="share icon" />
    </button>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShareButton;
