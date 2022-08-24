import PropTypes from 'prop-types';
import { GalleryListItem, ItemImage } from './ImageGalleryItemStyled';

export function ImageGalleryItem({
  webformatURL,
  caption,
  onClick,
  largeImageURL,
}) {
  return (
    <GalleryListItem
      onClick={() => {
        onClick(largeImageURL);
      }}
    >
      <ItemImage src={webformatURL} alt={caption} />
    </GalleryListItem>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
