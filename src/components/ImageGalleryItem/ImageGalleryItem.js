import PropTypes from 'prop-types';

export function ImageGalleryItem({ id, previewURL, tags, onClick }) {
  return (
    <li className="gallery-item" onClick={() => onClick(id)}>
      <img src={previewURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  previewURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
