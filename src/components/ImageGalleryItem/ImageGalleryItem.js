import PropTypes from 'prop-types';
import { GalleryItem, ItemImage } from './ImageGalleryItemStyled';

export function ImageGalleryItem({ id, previewURL, tags, onClick }) {
  return (
    <GalleryItem className="gallery-item" onClick={() => onClick(id)}>
      <ItemImage className="gallery-item__image" src={previewURL} alt={tags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  previewURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
