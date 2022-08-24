import PropTypes from 'prop-types';
import { LoadMoreBtn } from './ButtonStyled';

export function Button({ caption, onClick }) {
  return <LoadMoreBtn type="button" onClick={onClick}></LoadMoreBtn>;
}

Button.propTypes = {
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
