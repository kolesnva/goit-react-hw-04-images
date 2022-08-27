import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalWindow } from './ModalStyled';

export class Modal extends Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    closeFunction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
  }

  onEscPress = event => {
    if (event.code === 'Escape') {
      this.props.closeFunction();
    }
  };

  render() {
    const { closeFunction, imageURL, tags } = this.props;

    return (
      <Overlay className="overlay" onClick={closeFunction}>
        <ModalWindow className="modal">
          <img src={imageURL} alt={tags} />
        </ModalWindow>
      </Overlay>
    );
  }
}
