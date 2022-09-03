import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './ModalStyled';

const modalRoot = document.querySelector('#modal-root');
export function Modal({ closeFunction, imageURL, tags }) {
  useEffect(() => {
    const onEscPress = event => {
      if (event.code === 'Escape') closeFunction();
    };
    window.addEventListener('keydown', onEscPress);
    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [closeFunction]);

  return createPortal(
    <Overlay className="overlay" onClick={closeFunction}>
      <ModalWindow className="modal">
        <img src={imageURL} alt={tags} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  closeFunction: PropTypes.func.isRequired,
};
