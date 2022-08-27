import PropTypes from 'prop-types';
import { LoadMoreBtn } from './ButtonStyled';

export function Button({ onClick }) {
  return (
    <LoadMoreBtn type="button" className="load-more" onClick={onClick}>
      Load more
    </LoadMoreBtn>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
