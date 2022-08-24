import PropTypes from 'prop-types';
import { GalleryList } from './ImageGalleryStyled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ images, onClick }) {
  return (
    <GalleryList>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => {
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          caption={tags}
          onClick={onClick}
        />;
      })}
    </GalleryList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
};
