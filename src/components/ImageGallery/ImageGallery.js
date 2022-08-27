import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGalleryStyled';

export function ImageGallery({ items, onClick }) {
  return (
    <Gallery>
      {items.map(item => {
        const { id, previewURL, tags } = item;
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            previewURL={previewURL}
            tags={tags}
            onClick={() => onClick({ image: item })}
          />
        );
      })}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      previewURL: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
